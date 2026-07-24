import { NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productSlug = searchParams.get("productSlug");
  const all = searchParams.get("all") === "true";
  const limit = parseInt(searchParams.get("limit") || "3", 10);

  try {
    let query = admin
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (productSlug) {
      query = query.eq("product_slug", productSlug);
    }

    // all=true হলে limit প্রয়োগ করব, অন্যথায় ডিফল্ট ৩
    if (all) {
      query = query.limit(limit);
    } else if (productSlug) {
      // নির্দিষ্ট প্রোডাক্টের জন্য সর্বোচ্চ ৩টি
      query = query.limit(3);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, reviews: data || [] });
  } catch (error) {
    console.error("GET reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product_slug, user_name, rating, comment } = body;

    if (!product_slug || !user_name || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    const { data, error } = await admin
      .from("reviews")
      .insert({
        product_slug,
        user_name,
        rating,
        comment,
        is_approved: false,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Review submitted for approval",
      review: data,
    });
  } catch (error) {
    console.error("POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit review" },
      { status: 500 }
    );
  }
}
