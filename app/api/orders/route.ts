import { NextResponse } from "next/server";
import { createOrder } from "@/lib/order/services/create-order";
import { getCurrentUser } from "@/lib/auth/auth";
import { formatVariantLabel } from "@/lib/format";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Guest checkout stays allowed (profile_id null). If the shopper is
    // logged in, the profile_id always comes from their session, never
    // from the request body, so it can't be spoofed to another account.
    const user = await getCurrentUser();

    const items = (body.products || []).map((item: any) => ({
      product_slug: item.slug ?? item._id,
      product_name: item.name,

      variant: formatVariantLabel(item.selectedVariant),

      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
    }));

    const order = await createOrder({
      profile_id: user?.id ?? null,
      address_id: body.address_id ?? null,
      payment_method:
        body.payment_method ?? "Cash on Delivery",
      shipping_fee: body.shipping_fee ?? 0,
      discount: body.discount ?? 0,
      coupon_code: body.coupon_code ?? null,
      subtotal: 0,
      total: 0,
      items,

      shipping_name: body.name ?? null,
      shipping_phone: body.phone ?? null,
      shipping_email: body.email ?? null,
      shipping_address: body.address ?? null,
    });

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Order creation failed",
      },
      {
        status: 500,
      }
    );
  }
}
