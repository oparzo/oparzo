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
}

export async function calculateTotals({
  items,
  couponCode,
  paymentMethod,
  destination,
  profileId,
}: CalculateTotalsInput): Promise<CalculateTotalsOutput> {
  // ১. subtotal গণনা – items থেকে
  const subtotal = items.reduce((sum, item) => sum + item.total_price, 0);

  // ২. ডিসকাউন্ট – কুপন কোড যাচাই করুন
  let discount = 0;
  if (couponCode) {
    // TODO: Supabase থেকে কুপন ভেরিফাই করুন
    // const coupon = await verifyCoupon(couponCode, subtotal);
    // if (coupon) discount = coupon.discount_amount;
    discount = 0; // placeholder
  }

  // ৩. শিপিং চার্জ – destination অনুযায়ী
  let shipping_fee = 0;
  // TODO: destination অনুযায়ী shipping fee ক্যালকুলেট করুন
  // base: 100, outside Dhaka: 150

  // ৪. গ্র্যান্ড টোটাল
  const grand_total = subtotal - discount + shipping_fee;

  return {
    subtotal,
    discount,
    shipping_fee,
    grand_total,
  };
}
