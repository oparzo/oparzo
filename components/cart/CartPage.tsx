"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + (item.price ?? 0) * (item.quantity ?? 1),
    0
  );

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-serif">Shopping Bag</h1>

        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm underline"
          >
            Clear Bag
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Your shopping bag is empty.</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item: any, index: number) => (
              <div
                key={index}
                className="border rounded-xl p-6 flex justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500">
                    {item.brand}
                  </p>

                  {item.selectedVariant && (
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>
                        <strong>
                          {item.selectedVariant.type}:
                        </strong>{" "}
                        {item.selectedVariant.value}
                      </p>

                      {item.selectedVariant.color && (
                        <p>
                          <strong>Color:</strong>{" "}
                          {item.selectedVariant.color}
                        </p>
                      )}
                    </div>
                  )}

                  <p className="mt-3">
                    Qty: {item.quantity}
                  </p>

                  <p className="mt-2 font-medium">
                    BDT {item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-10 border-t pt-8 flex justify-between items-center">
            <h2 className="text-3xl font-serif">
              Total
            </h2>

            <p className="text-2xl">
              BDT {total}
            </p>
          </div>

          <Link
            href="/checkout"
            className="mt-8 inline-flex rounded-lg bg-[var(--gold)] text-[var(--ink)] px-8 py-4"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </main>
  );
}
