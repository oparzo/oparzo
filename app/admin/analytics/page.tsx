"use client";

import { useEffect, useState } from "react";
import BarChart from "@/components/admin/BarChart";
import { formatCurrency } from "@/lib/format";

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch("/api/admin/analytics");
      const json = await res.json();

      if (json.success) {
        setData(json);
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
      <main className="max-w-7xl mx-auto p-10">
        <h1 className="text-5xl font-serif mb-10">Analytics</h1>
        <p className="text-gray-500">Loading...</p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="max-w-7xl mx-auto p-10">
        <h1 className="text-5xl font-serif mb-10">Analytics</h1>
        <p className="text-gray-500">Couldn't load analytics data.</p>
      </main>
    );
  }

  const dayLabels = data.revenueByDay.map((d: any) => ({
    ...d,
    label: d.date.slice(5), // MM-DD
  }));

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-2">Analytics</h1>
      <p className="mb-10 text-gray-500">Last {data.windowDays} days.</p>

      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="border rounded-xl p-8">
          <p>Revenue</p>
          <h2 className="text-4xl font-bold mt-3">
            {formatCurrency(data.revenue)}
          </h2>
        </div>

        <div className="border rounded-xl p-8">
          <p>Orders</p>
          <h2 className="text-4xl font-bold mt-3">{data.orderCount}</h2>
        </div>

        <div className="border rounded-xl p-8">
          <p>Average Order</p>
          <h2 className="text-4xl font-bold mt-3">
            {formatCurrency(data.averageOrder)}
          </h2>
        </div>
      </div>

      <div className="border rounded-xl p-8 mb-10">
        <h2 className="text-xl font-semibold mb-6">Revenue by Day</h2>

        {data.revenue === 0 ? (
          <p className="text-gray-500">No orders in this window yet.</p>
        ) : (
          <BarChart
            data={dayLabels}
            labelKey="label"
            valueKey="total"
            formatValue={(v) => `৳${v}`}
          />
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="border rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Orders by Status</h2>

          {data.statusBreakdown.length === 0 ? (
            <p className="text-gray-500">No orders in this window yet.</p>
          ) : (
            <div className="space-y-3">
              {data.statusBreakdown.map((s: any) => (
                <div
                  key={s.status}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{s.status}</span>
                  <span className="font-medium">{s.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-6">Top Products</h2>

          {data.topProducts.length === 0 ? (
            <p className="text-gray-500">No items sold in this window yet.</p>
          ) : (
            <div className="space-y-3">
              {data.topProducts.map((p: any) => (
                <div
                  key={p.name}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{p.name}</span>
                  <span className="font-medium">{p.quantity} sold</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border rounded-xl p-8">
        <h2 className="text-xl font-semibold mb-4">Coupon Usage</h2>

        <div className="flex gap-10">
          <div>
            <p className="text-gray-500">Redemptions</p>
            <p className="text-2xl font-bold">{data.couponStats.redemptions}</p>
          </div>

          <div>
            <p className="text-gray-500">Total Discount Given</p>
            <p className="text-2xl font-bold">
              {formatCurrency(data.couponStats.totalDiscount)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
