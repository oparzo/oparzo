"use client";

import { useState } from "react";

export default function ReportsPage() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [downloading, setDownloading] = useState<string | null>(null);

  async function downloadCsv(url: string, key: string) {
    setDownloading(key);

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        alert(data?.error ?? "Download failed.");
        return;
      }

      const blob = await res.blob();
      const disposition = res.headers.get("Content-Disposition") ?? "";
      const match = disposition.match(/filename="(.+)"/);
      const filename = match?.[1] ?? `${key}.csv`;

      const downloadUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(downloadUrl);
    } finally {
      setDownloading(null);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-2">Reports</h1>
      <p className="mb-10 text-gray-500">
        Export real data straight from your database as CSV.
      </p>

      <div className="border rounded-xl p-8 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Orders</h2>

        <div className="mb-5 flex flex-wrap gap-4">
          <label className="flex flex-col text-sm text-gray-600">
            From
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1 border rounded-lg p-2"
            />
          </label>

          <label className="flex flex-col text-sm text-gray-600">
            To
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1 border rounded-lg p-2"
            />
          </label>
        </div>

        <p className="mb-4 text-sm text-gray-500">
          Leave both blank to export all orders.
        </p>

        <button
          onClick={() => {
            const params = new URLSearchParams();
            if (from) params.set("from", from);
            if (to) params.set("to", to);

            downloadCsv(
              `/api/admin/reports/orders?${params.toString()}`,
              "orders"
            );
          }}
          disabled={downloading === "orders"}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          {downloading === "orders"
            ? "Preparing..."
            : "Download Orders CSV"}
        </button>
      </div>

      <div className="border rounded-xl p-8">
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>

        <p className="mb-4 text-sm text-gray-500">
          All registered customers, with contact info and role.
        </p>

        <button
          onClick={() =>
            downloadCsv("/api/admin/reports/customers", "customers")
          }
          disabled={downloading === "customers"}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          {downloading === "customers"
            ? "Preparing..."
            : "Download Customers CSV"}
        </button>
      </div>
    </main>
  );
}
