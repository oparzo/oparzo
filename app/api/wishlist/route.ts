import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/auth/auth";
import { client as sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

// The `wishlist` table only stores profile_id + product_id (a Sanity _id).
// The page needs display data (name, brand, price, image, slug), so this
// route enriches the DB rows with a Sanity lookup before returning them.
async function enrichWithProductData(rows: any[]) {
  if (rows.length === 0) return [];

  const ids = rows.map((row) => row.product_id);

  const products = await sanityClient.fetch(
    `*[_type == "product" && _id in $ids]{
      _id,
      name,
      slug,
      images,
      variants[]{ price },
      "brand": brand->name
    }`,
    { ids }
  );

  const productMap = new Map(products.map((p: any) => [p._id, p]));

  return rows
    .map((row) => {
      const product: any = productMap.get(row.product_id);

      if (!product) return null;

      return {
        id: row.id,
        product_id: row.product_id,
        product_name: product.name,
        brand: product.brand ?? "",
        price: product.variants?.[0]?.price ?? 0,
        image: product.images?.[0]
          ? urlFor(product.images[0]).width(800).url()
          : null,
        slug: product.slug?.current ?? "",
      };
    })
    .filter(Boolean);
}

export async function GET() {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("wishlist")
      .select("*")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    const items = await enrichWithProductData(data || []);

    return NextResponse.json({
      success: true,
      items,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    const body = await request.json();

    // Avoid duplicate rows if the same product is "added" twice
    // (e.g. a stale UI state or a double click).
    const { data: existing } = await supabase
      .from("wishlist")
      .select("id")
      .eq("profile_id", user.id)
      .eq("product_id", body.product_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        success: true,
        wishlist: existing,
      });
    }

    const { data, error } = await supabase
      .from("wishlist")
      .insert({
        profile_id: user.id,
        product_id: body.product_id,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      wishlist: data,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await requireUser();
    const supabase = await createClient();

    // Support deleting either by the wishlist row's own id (used by the
    // /wishlist page) or by product_id (used by the toggle button, which
    // only knows the Sanity product id).
    let id: string | null = null;
    let product_id: string | null = null;

    try {
      const body = await request.json();
      id = body?.id ?? null;
      product_id = body?.product_id ?? null;
    } catch {
      // no JSON body — fall back to query params
    }

    if (!id && !product_id) {
      const { searchParams } = new URL(request.url);
      id = searchParams.get("id");
      product_id = searchParams.get("product_id");
    }

    let query = supabase.from("wishlist").delete().eq("profile_id", user.id);

    query = id
      ? query.eq("id", id)
      : query.eq("product_id", product_id as string);

    const { error } = await query;

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
