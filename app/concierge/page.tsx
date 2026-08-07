"use client";

import { useCart } from "@/components/cart/CartProvider";
import { formatCurrency } from "@/lib/format";

export default function ConciergePage() {
  const { cart, subtotal } = useCart();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20">
      <h1 className="text-5xl font-light">Concierge Checkout</h1>

      <p className="mt-6 text-gray-600">
        Complete your request and our concierge team will contact you.
      </p>

      <div className="mt-12 border p-8">
        <h2 className="text-2xl mb-6">Order Summary</h2>

        {cart.map((item: any, index: number) => (
          <div
            key={`${item._id}-${index}`}
            className="flex justify-between border-b py-4"
          >
            <span>
              {item.name} × {item.quantity}
            </span>

            <span>
              {item.currency ?? ""} {item.price * item.quantity}
            </span>
          </div>
        ))}

        <div className="mt-8 text-xl font-medium">
          Total: {formatCurrency(subtotal)}
        </div>

        <button className="mt-8 w-full border py-4 hover:bg-black hover:text-white transition">
          Send Request To Concierge
        </button>
      </div>
    </main>
  );
}
