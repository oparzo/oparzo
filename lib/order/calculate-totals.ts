import { verifyCoupon } from "./coupon-helpers";
import { getShippingFee } from "@/lib/settings/shipping";

interface CalculateTotalsInput {
  items: Array<{
    product_slug: string;
    quantity: number;
    unit_price: number;
    total_price: number;
  }>;
  couponCode: string | null;
  paymentMethod: string;
  destination: string | null;
  profileId: string;
}

interface CalculateTotalsOutput {
  subtotal: number;
  discount: number;
  shipping_fee: number;
  grand_total: number;
  coupon_message?: string;
}

export async function calculateTotals({
  items,
  couponCode,
  paymentMethod,
  destination,
  profileId,
}: CalculateTotalsInput): Promise<CalculateTotalsOutput> {
  // 1. Calculate subtotal from items
  let subtotal = 0;
  for (const item of items) {
    if (item.quantity < 0) {
      throw new Error("Negative quantity not allowed");
    }
    subtotal += item.total_price;
  }

  // 2. Discount – verify via real coupon system
  let discount = 0;
  let coupon_message: string | undefined;

  if (couponCode) {
    const result = await verifyCoupon(couponCode, subtotal);
    if (result.valid) {
      discount = result.discount;
      coupon_message = result.message;
    } else {
      coupon_message = result.message;
    }
  }

  // 3. Shipping fee – dynamic from settings (default 0, concierge-confirmed)
  const shipping_fee = await getShippingFee({
    destination,
    subtotal,
    profileId,
    paymentMethod,
  });

  // 4. Grand total
  const grand_total = subtotal - discount + shipping_fee;

  return {
    subtotal,
    discount,
    shipping_fee,
    grand_total,
    coupon_message,
  };
}
