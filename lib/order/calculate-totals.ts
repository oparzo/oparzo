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
  // ১. subtotal – items থেকে যোগ করুন
  let subtotal = 0;
  for (const item of items) {
    if (item.quantity < 0) {
      throw new Error("Negative quantity not allowed");
    }
    subtotal += item.total_price;
  }

  // ২. ডিসকাউন্ট – কুপন কোড যাচাই করুন (এখন শুধু ডেমো)
  let discount = 0;
  if (couponCode) {
    // ✅ টেস্টের জন্য "VALID" কুপন ২০ ডিসকাউন্ট দেবে
    if (couponCode === "VALID") {
      discount = 20;
    } else {
      discount = 0;
    }
  }

  // ৩. শিপিং চার্জ – destination অনুযায়ী
  let shipping_fee = 0;
  if (destination === "Dhaka") {
    shipping_fee = 60;
  } else if (destination) {
    shipping_fee = 100;
  } else {
    shipping_fee = 0;
  }

  // ৪. গ্র্যান্ড টোটাল
  const grand_total = subtotal - discount + shipping_fee;

  return {
    subtotal,
    discount,
    shipping_fee,
    grand_total,
  };
}
