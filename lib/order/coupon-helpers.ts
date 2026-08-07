import { admin } from "@/lib/supabase/admin";

export interface Coupon {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  minimum_order?: number;
  maximum_discount?: number;
  expires_at?: string;
  usage_limit?: number;
  used_count?: number;
  active: boolean;
}

export async function verifyCoupon(
  code: string,
  subtotal: number
): Promise<{ valid: boolean; discount: number; coupon?: Coupon; message?: string }> {
  if (!code) {
    return { valid: false, discount: 0, message: "No coupon code provided" };
  }

  const { data: coupon, error } = await admin
    .from("coupons")
    .select("*")
    .eq("code", code)
    .eq("active", true)
    .single();

  if (error || !coupon) {
    return { valid: false, discount: 0, message: "Invalid coupon code" };
  }

  // Check expiration
  if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
    return { valid: false, discount: 0, message: "Coupon has expired" };
  }

  // Check usage limit
  if (coupon.usage_limit && (coupon.used_count || 0) >= coupon.usage_limit) {
    return { valid: false, discount: 0, message: "Coupon usage limit exceeded" };
  }

  // Check minimum order
  if (coupon.minimum_order && subtotal < coupon.minimum_order) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order of ${coupon.minimum_order} required`,
    };
  }

  let discount = 0;
  if (coupon.discount_type === "percentage") {
    discount = (subtotal * coupon.discount_value) / 100;
    if (coupon.maximum_discount && discount > coupon.maximum_discount) {
      discount = coupon.maximum_discount;
    }
  } else {
    discount = coupon.discount_value;
  }

  return {
    valid: true,
    discount,
    coupon,
    message: "Coupon applied successfully!",
  };
}
