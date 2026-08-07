import { NextResponse } from "next/server";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { admin } from "@/lib/supabase/admin";
import { client } from "@/sanity/lib/client";

// ✅ Zod Schema – ইনপুট ভ্যালিডেশন
const ReviewInput = z.object({
  product_slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Invalid slug format"),
  user_name: z.string().min(2).max(80),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(10).max(2000),
});

// ✅ রেট লিমিটার – প্রতি IP ৩টি রিভিউ প্রতি ১০ মিনিটে
const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  prefix: "rl:reviews",
});

// ✅ GET – অ্যাপ্রুভড রিভিউ আনা
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

    if (all) {
      query = query.limit(limit);
    } else if (productSlug) {
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

// ✅ POST – নতুন রিভিউ জমা (অ্যাপ্রুভাল পেন্ডিং)
export async function POST(request: Request) {
  try {
    // ১. IP-ভিত্তিক রেট লিমিট
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { success } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ২. Zod দিয়ে ইনপুট ভ্যালিডেট
    const body = await request.json();
    const validated = ReviewInput.parse(body);

    // ৩. ✅ Sanity-তে slug আসলেই আছে কিনা চেক করুন
    const sanityCheck = await client.fetch(
      `*[_type == "product" && slug.current == $slug][0]{ _id }`,
      { slug: validated.product_slug }
    );

    if (!sanityCheck) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    // ৪. Supabase-এ রিভিউ ইনসার্ট
    const { data, error } = await admin
      .from("reviews")
      .insert({
        product_slug: validated.product_slug,
        user_name: validated.user_name,
        rating: validated.rating,
        comment: validated.comment,
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
    // Zod এরর হ্যান্ডলিং
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          issues: error.issues,
        },
        { status: 422 }
      );
    }

    console.error("POST review error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit review" },
      { status: 500 }
    );
  }
}
