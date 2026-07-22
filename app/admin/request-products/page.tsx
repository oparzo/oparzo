"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STATUSES = ["Pending", "Reviewing", "Sourced", "Declined"];

const STATUS_COLORS: Record<string, string> = {
  Pending: "bg-yellow-100 text-yellow-800",
  Reviewing: "bg-blue-100 text-blue-800",
  Sourced: "bg-green-100 text-green-800",
  Declined: "bg-gray-200 text-gray-600",
};

export default function AdminRequestProductsPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {
    try {
      const res = await fetch("/api/admin/request-products");
      const data = await res.json();

      if (data.success) {
        setRequests(data.requests);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    setUpdatingId(id);

    try {
      const res = await fetch(`/api/admin/request-products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (data.success) {
        setRequests((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
      } else {
        alert(data.error ?? "Couldn't update status.");
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
            ADMIN
          </p>

          <h1 className="mt-3 text-4xl font-serif">
            Request Products
          </h1>

          <p className="mt-3 text-gray-600">
            Customer sourcing requests.
          </p>
        </div>

        <Link href="/admin" className="rounded-xl border px-5 py-3">
          Dashboard
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Brand</th>
              <th className="p-4 text-left">Link</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-gray-500">
                  No requests found.
                </td>
              </tr>
            ) : (
              requests.map((request: any) => (
                <tr key={request.id} className="border-t align-top">
                  <td className="p-4">
                    <p>{request.full_name}</p>
                    {request.email && (
                      <p className="text-sm text-gray-500">
                        {request.email}
                      </p>
                    )}
                  </td>

                  <td className="p-4">{request.phone}</td>

                  <td className="p-4">
                    <p>{request.product_name}</p>
                    {request.notes && (
                      <p className="text-sm text-gray-500">
                        {request.notes}
                      </p>
                    )}
                  </td>

                  <td className="p-4">{request.brand || "-"}</td>

                  <td className="p-4">
                    {request.product_link ? (
                      <a
                        href={request.product_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-4">
                    <select
                      value={request.status}
                      disabled={updatingId === request.id}
                      onChange={(e) =>
                        updateStatus(request.id, e.target.value)
                      }
                      className={`rounded-full border-0 px-3 py-1 text-sm ${
                        STATUS_COLORS[request.status] ??
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
