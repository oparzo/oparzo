"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { formatCurrency } from "@/lib/format";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function loadOrder() {
    setLoading(true);
    setNotFound(false);

    try {
      const res = await fetch(`/api/orders/${id}`);
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

  if (loading) {
    return (
      <main className="max-w-5xl mx-auto py-20 px-6">
        Loading...
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-3xl font-serif mb-3">
          Order not found
        </h1>
        <p className="text-gray-500">
          This order doesn't exist, or isn't associated with your
          account. If you placed it as a guest, use{" "}
          <a href="/track-order" className="underline">
            Track Order
          </a>{" "}
          instead.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto py-20 px-6">
      <h1 className="text-5xl font-serif mb-4">
        {order.order_number}
      </h1>

      <p className="mb-2">
        <strong>Status:</strong> {order.status}
      </p>

      <p className="mb-2">
        <strong>Total:</strong> {formatCurrency(order.total)}
      </p>

      {(order.shipping_name || order.shipping_address) && (
        <div className="mb-10 mt-6 border rounded-lg p-5">
          <h2 className="font-semibold mb-2">
            Shipping To
          </h2>

          {order.shipping_name && (
            <p>{order.shipping_name}</p>
          )}

          {order.shipping_phone && (
            <p>{order.shipping_phone}</p>
          )}

          {order.shipping_email && (
            <p>{order.shipping_email}</p>
          )}

          {order.shipping_address && (
            <p className="text-gray-600">
              {order.shipping_address}
            </p>
          )}
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-5 flex justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {item.product_name}
              </h3>

              <p>Qty: {item.quantity}</p>
            </div>

            <div>
              {formatCurrency(item.total_price)}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
