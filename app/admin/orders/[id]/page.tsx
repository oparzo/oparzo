"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

const STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadOrder() {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(`/api/admin/orders/${id}`);
      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
        setItems(data.items ?? []);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(status: string) {
    setUpdating(true);

    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setOrder(data.order);
      } else {
        alert(data.error ?? "Couldn't update order status.");
      }
    } finally {
      setUpdating(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto p-10">
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="max-w-5xl mx-auto p-10">
        <h1 className="text-3xl font-serif mb-4">
          Order not found
        </h1>
        <Link href="/admin/orders" className="underline">
          Back to Orders
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <Link href="/admin/orders" className="text-sm text-gray-500 underline">
        ← Back to Orders
      </Link>

      <div className="mt-6 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-serif">
            {order.order_number}
          </h1>
          <p className="mt-2 text-gray-500">
            {new Date(order.created_at).toLocaleString()}
          </p>
        </div>

        <select
          value={order.status}
          disabled={updating}
          onChange={(e) => updateStatus(e.target.value)}
          className="border rounded-lg p-3"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">Customer</h2>

          <p>{order.shipping_name || "Guest"}</p>
          {order.shipping_phone && <p>{order.shipping_phone}</p>}
          {order.shipping_email && <p>{order.shipping_email}</p>}
          {order.shipping_address && (
            <p className="mt-2 text-gray-500">{order.shipping_address}</p>
          )}
        </div>

        <div className="rounded-xl border p-6">
          <h2 className="mb-4 text-lg font-semibold">Payment</h2>

          <div className="flex justify-between border-b pb-2">
            <span>Method</span>
            <span>{order.payment_method}</span>
          </div>

          <div className="flex justify-between border-b py-2">
            <span>Payment Status</span>
            <span>{order.payment_status}</span>
          </div>

          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between py-2 text-green-600">
              <span>
                Discount{order.coupon_code ? ` (${order.coupon_code})` : ""}
              </span>
              <span>- {formatCurrency(order.discount)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border p-6">
        <h2 className="mb-4 text-lg font-semibold">Items</h2>

        {items.length === 0 ? (
          <p className="text-gray-500">No items recorded for this order.</p>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b pb-3"
              >
                <div>
                  <p>{item.product_name}</p>
                  {item.variant && (
                    <p className="text-sm text-gray-500">{item.variant}</p>
                  )}
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p>{formatCurrency(item.total_price)}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
