import { NextResponse } from "next/server";
import { createBulkOrder } from "@/lib/bulk-orders/services/create-bulk-order";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { HttpError } from "@/lib/order/guard";

// রেট লিমিটার
const limiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  prefix: "rl:bulk",
});

export async function POST(request: Request) {
  try {
    // IP-ভিত্তিক রেট লিমিট
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const { success } = await limiter.limit(ip);
    if (!success) {
      throw new HttpError(429, "Too many requests. Please try again later.");
    }

    const body = await request.json();

    const result = await createBulkOrder({
      company_name: body.company_name,
      contact_person: body.contact_person,
      phone: body.phone,
      whatsapp: body.whatsapp,
      email: body.email,
      product_name: body.product_name,
      brand: body.brand,
      estimated_quantity: body.estimated_quantity,
      product_link: body.product_link,
      notes: body.notes,
      full_delivery_address: body.full_delivery_address,
      nearest_landmark: body.nearest_landmark,
      postal_code: body.postal_code,
    });

    return NextResponse.json(
      { success: true, bulkOrder: result },
      { status: 201 }
    );
  } catch (err) {
    if (err instanceof HttpError) {
      return NextResponse.json(
        { success: false, message: err.message },
        { status: err.status }
      );
    }
    console.error("[bulk-orders] unhandled:", err);
    return NextResponse.json(
      { success: false, message: "Submission failed" },
      { status: 500 }
    );
  }
}
