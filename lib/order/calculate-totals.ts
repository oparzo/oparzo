import { verifyCoupon } from "./coupon-helpers";

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
  // ১. Subtotal – items থেকে যোগ করুন
  let subtotal = 0;
  for (const item of items) {
    if (item.quantity < 0) {
      throw new Error("Negative quantity not allowed");
    }
    subtotal += item.total_price;
  }

  // ২. ডিসকাউন্ট – আসল কুপন সিস্টেম থেকে ভেরিফাই করুন
  let discount = 0;
  let coupon_message: string | undefined;

  if (couponCode) {
    const result = await verifyCoupon(couponCode, subtotal);
    if (result.valid) {
      discount = result.discount;
      coupon_message = result.message;
    } else {
      // Invalid coupon – discount 0, message optional
      coupon_message = result.message;
    }
  }

  // ৩. শিপিং ফি – destination অনুযায়ী (বর্তমানে 0, কারণ concierge-confirmed)
  // আপনি চাইলে ফিক্সড রেট চালু করতে পারেন
  let shipping_fee = 0;

  // ৪. গ্র্যান্ড টোটাল
  const grand_total = subtotal - discount + shipping_fee;

  return {
    subtotal,
    discount,
    shipping_fee,
    grand_total,
    coupon_message,
  };
}
