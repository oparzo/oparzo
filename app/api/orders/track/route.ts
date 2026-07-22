import { NextRequest, NextResponse } from "next/server";
import { admin } from "@/lib/supabase/admin";

// Order numbers are a 6-digit random suffix (~900k possibilities per
// day, see lib/order/order-number.ts) with no rate limiting on this
// endpoint — guessable enough that order number alone isn't a safe
// lookup key. Requiring the phone number on the order too turns this
// into a two-factor lookup (matches the common "order number + email/
// phone" pattern most ecommerce sites use for guest tracking), and the
// selected columns are limited to what the tracking page actually
// displays — no shipping name/email/address in the response, even
// though the requester proved they know the order.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("order_number")?.trim();
  const phone = searchParams.get("phone")?.trim();

  if (!orderNumber || !phone) {
    return NextResponse.json(
      {
        success: false,
        error: "order_number and phone are both required",
      },
      { status: 400 }
    );
  }

  const { data, error } = await admin
    .from("orders")
    .select(
      `
      order_number,
      status,
      payment_method,
      payment_status,
      total,
      created_at,
      order_items ( id, product_name, quantity, total_price )
    `
    )
    .eq("order_number", orderNumber)
    .eq("shipping_phone", phone)
    .single();

  if (error || !data) {
    return NextResponse.json(
      {
        success: false,
        error: "No matching order found. Check your order number and phone number.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    order: data,
  });
}
