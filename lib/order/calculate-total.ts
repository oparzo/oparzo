import { OrderItem } from "./types";

export function calculateOrderTotal(
  items: OrderItem[],
  shippingFee = 0,
  discount = 0
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.total_price,
    0
  );

  const total = subtotal + shippingFee - discount;

  return {
    subtotal,
    shippingFee,
    discount,
    total,
  };
}
