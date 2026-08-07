"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { formatCurrency } from "@/lib/format";

type Order = {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("orders")
      .select("id, order_number, status, total, created_at")
      .eq("profile_id", user.id)
      .order("created_at", { ascending: false });

    setOrders(data || []);
    setLoading(false);
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[var(--cream)]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="text-4xl font-serif">Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--cream)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm uppercase tracking-[0.35em] text-gray-500">
          Account
        </p>

        <h1 className="font-serif text-5xl">My Orders</h1>

        <p className="mt-4 text-gray-600">
          View your order history and track every purchase.
        </p>

        {orders.length === 0 ? (
          <div className="mt-12 rounded-2xl border bg-[var(--cream)] p-12 text-center">
            <h2 className="font-serif text-3xl">No Orders Yet</h2>

            <p className="mt-4 text-gray-600">
              Your orders will appear here after your first purchase.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-[var(--gold)] px-8 py-3 text-[var(--ink)]"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="mt-12 space-y-6">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block rounded-2xl border bg-[var(--cream)] p-6 transition hover:border-[var(--ink)] hover:shadow-sm"
              >
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                      Order Number
                    </p>

                    <h2 className="mt-2 text-2xl font-serif">
                      {order.order_number}
                    </h2>

                    <p className="mt-3 text-gray-600">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-left md:text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                      Status
                    </p>

                    <div className="mt-3 inline-flex rounded-full bg-[var(--stone)] px-4 py-2 text-sm font-medium">
                      {order.status}
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                      Total
                    </p>

                    <p className="mt-2 text-3xl font-serif">
                      {formatCurrency(order.total)}
                    </p>

                    <p className="mt-3 text-sm font-medium">View Details →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
