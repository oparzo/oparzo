import { admin } from "@/lib/supabase/admin";
import {
  CreateOrderInput,
  calculateOrderTotal,
  generateOrderNumber,
} from "@/lib/order";

export async function createOrder(input: CreateOrderInput) {
  const orderNumber = generateOrderNumber();

  // Recompute the discount from the coupon record itself rather than
  // trusting the client-sent amount, and re-check active/expiry/usage
  // limit here too (the /api/coupons/validate check happens earlier in
  // the checkout flow, but that doesn't stop this endpoint being called
  // directly with a stale or already-expired coupon).
  const rawSubtotal = input.items.reduce(
    (sum, item) => sum + item.total_price,
    0
  );

  let couponId: string | null = null;
  let couponCode: string | null = null;
  let verifiedDiscount = 0;

  if (input.coupon_code) {
    const { data: coupon } = await admin
      .from("coupons")
      .select("*")
      .eq("code", input.coupon_code)
      .eq("active", true)
      .single();

    const notExpired =
      !!coupon &&
      (!coupon.expires_at || new Date(coupon.expires_at) >= new Date());

    const underUsageLimit =
      !!coupon && Number(coupon.used_count) < Number(coupon.usage_limit);

    if (coupon && notExpired && underUsageLimit) {
      couponId = coupon.id;
      couponCode = coupon.code;

      if (coupon.discount_type === "percentage") {
        verifiedDiscount = (rawSubtotal * Number(coupon.discount_value)) / 100;

        if (
          coupon.maximum_discount &&
          verifiedDiscount > Number(coupon.maximum_discount)
        ) {
          verifiedDiscount = Number(coupon.maximum_discount);
        }
      } else {
        verifiedDiscount = Number(coupon.discount_value);
      }

      await admin
        .from("coupons")
        .update({
          used_count: Number(coupon.used_count) + 1,
        })
        .eq("id", coupon.id);
    }
  }

  const totals = calculateOrderTotal(
    input.items,
    input.shipping_fee,
    verifiedDiscount
  );

  const { data: order, error } = await admin
    .from("orders")
    .insert({
      order_number: orderNumber,

      profile_id: input.profile_id,

      status: "Pending",

      payment_status: "Pending",

      payment_method: input.payment_method,

      subtotal: totals.subtotal,

      discount: totals.discount,

      shipping_fee: totals.shippingFee,

      total: totals.total,

      coupon_id: couponId,

      coupon_code: couponCode,

      shipping_name: input.shipping_name ?? null,

      shipping_phone: input.shipping_phone ?? null,

      shipping_email: input.shipping_email ?? null,

      shipping_address: input.shipping_address ?? null,

      notes: null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  const items = input.items.map((item) => ({
    order_id: order.id,

    product_slug: item.product_slug,

    product_name: item.product_name,

    variant: item.variant,

    quantity: item.quantity,

    unit_price: item.unit_price,

    total_price: item.total_price,
  }));

  const { error: itemError } = await admin.from("order_items").insert(items);

  if (itemError) {
    throw itemError;
  }

  return {
    ...order,
    items,
    totals,
  };
}
