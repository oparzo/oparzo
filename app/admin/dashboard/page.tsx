"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/format";

type Dashboard = {
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  totalRevenue: number;
  pendingOrders: number;
  pendingRequests: number;
  lowStockProducts: {
    _id: string;
    name: string;
    slug: string;
    lowestStock: number;
  }[];
};

const EMPTY: Dashboard = {
  totalOrders: 0,
  totalCustomers: 0,
  totalProducts: 0,
  totalRevenue: 0,
  pendingOrders: 0,
  pendingRequests: 0,
  lowStockProducts: [],
};

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [stats, setStats] = useState<Dashboard>(EMPTY);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();

      if (data.success) {
        setStats(data.dashboard);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif">Loading Dashboard...</h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif">Dashboard</h1>
        <p className="mt-4 text-gray-500">
          Couldn't load dashboard data. Try refreshing.
        </p>
      </main>
    );
  }

  const hasAlerts =
    stats.pendingOrders > 0 ||
    stats.pendingRequests > 0 ||
    stats.lowStockProducts.length > 0;

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">Admin</p>

      <h1 className="mt-4 text-5xl font-serif">Dashboard</h1>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Orders
          </p>

          <h2 className="mt-4 text-4xl font-serif">{stats.totalOrders}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Customers
          </p>

          <h2 className="mt-4 text-4xl font-serif">{stats.totalCustomers}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Products
          </p>

          <h2 className="mt-4 text-4xl font-serif">{stats.totalProducts}</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500">
            Revenue
          </p>

          <h2 className="mt-4 text-4xl font-serif">
            {formatCurrency(stats.totalRevenue)}
          </h2>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border bg-white p-8">
        <h2 className="text-2xl font-serif">Needs Attention</h2>

        {!hasAlerts ? (
          <p className="mt-4 text-gray-500">
            Nothing needs your attention right now.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {stats.pendingOrders > 0 && (
              <Link
                href="/admin/orders"
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50"
              >
                <span>
                  {stats.pendingOrders} order
                  {stats.pendingOrders === 1 ? "" : "s"} awaiting processing
                </span>
                <span className="text-gray-400">→</span>
              </Link>
            )}

            {stats.pendingRequests > 0 && (
              <Link
                href="/admin/request-products"
                className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50"
              >
                <span>
                  {stats.pendingRequests} product request
                  {stats.pendingRequests === 1 ? "" : "s"} awaiting review
                </span>
                <span className="text-gray-400">→</span>
              </Link>
            )}

            {stats.lowStockProducts.length > 0 && (
              <div className="rounded-xl border p-4">
                <p className="mb-3">
                  {stats.lowStockProducts.length} product
                  {stats.lowStockProducts.length === 1 ? "" : "s"} low in stock
                </p>

                <div className="space-y-2">
                  {stats.lowStockProducts.slice(0, 5).map((p) => (
                    <Link
                      key={p._id}
                      href={`/products/${p.slug}`}
                      target="_blank"
                      className="flex justify-between text-sm text-gray-600 hover:text-black"
                    >
                      <span>{p.name}</span>
                      <span>{p.lowestStock} left</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
