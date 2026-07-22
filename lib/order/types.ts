export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Processing"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface OrderItem {
  product_slug: string;
  product_name: string;

  variant?: string;

  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CreateOrderInput {
  profile_id?: string | null;
  address_id?: string | null;

  payment_method: string;

  subtotal: number;
  discount: number;
  shipping_fee: number;
  total: number;

  coupon_code?: string | null;

  // Shipping contact details captured at checkout. address_id (a saved
  // address) is preferred when present; these free-text fields cover the
  // current checkout form and guest orders that don't have a saved address.
  shipping_name?: string | null;
  shipping_phone?: string | null;
  shipping_email?: string | null;
  shipping_address?: string | null;

  items: OrderItem[];
}
