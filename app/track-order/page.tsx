"use client";

import { useState } from "react";
import { formatCurrency } from "@/lib/format";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [order, setOrder] =
    useState<any>(null);

  const [error, setError] =
    useState("");

  async function searchOrder(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const params = new URLSearchParams({
        order_number: orderNumber,
        phone,
      });

      const res = await fetch(
        `/api/orders/track?${params.toString()}`
      );

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        setError(
          data.error || "Order not found."
        );
      }
    } catch {
      setError("Unable to track order.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">

      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
        Order Tracking
      </p>

      <h1 className="mt-4 text-5xl font-serif">
        Track Your Order
      </h1>

      <form
        onSubmit={searchOrder}
        className="mt-10 space-y-6"
      >

        <input
          required
          value={orderNumber}
          onChange={(e) =>
            setOrderNumber(e.target.value)
          }
          placeholder="Enter Order Number"
          className="w-full rounded-xl border p-5"
        />

        <input
          required
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
          placeholder="Phone Number Used at Checkout"
          className="w-full rounded-xl border p-5"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-[var(--gold)] px-10 py-4 text-white"
        >
          {loading
            ? "Searching..."
            : "Track Order"}
        </button>{error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

      </form>

      {order && (

        <div className="mt-12 rounded-2xl border bg-[var(--cream)] p-8">

          <h2 className="text-3xl font-serif">
            {order.order_number}
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Status
              </p>

              <p className="mt-2 text-xl">
                {order.status}
              </p>

            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Payment
              </p>

              <p className="mt-2 text-xl">
                {order.payment_method}
              </p>

            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Total
              </p>

              <p className="mt-2 text-2xl font-serif">
                {formatCurrency(order.total)}
              </p>

            </div>

            <div>

              <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
                Date
              </p>

              <p className="mt-2">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </p>

            </div>

          </div>

          <h3 className="mt-12 mb-6 text-2xl font-serif">
            Ordered Items
          </h3>

          <div className="space-y-4">

            {order.order_items?.map((item: any) => (

              <div
                key={item.id}
                className="flex justify-between rounded-xl border bg-[var(--cream)] p-5"
              >

                <div>

                  <p className="font-medium">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>

                </div>

                <div>
                  {formatCurrency(item.total_price)}
                </div>

              </div>

            ))}

          </div>

        </div>

      )}</main>
  );
}
