"use client";

import { useEffect, useState } from "react";

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();

      if (data.success) {
        setPayments(data.providers);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-4">
        Payment Methods
      </h1>

      <p className="mb-10 text-gray-500">
        {loading
          ? "Loading..."
          : "Live status based on which gateway credentials are set in your environment."}
      </p>

      <div className="space-y-4">
        {payments.map((method) => (
          <div
            key={method.id}
            className="border rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {method.name}
              </h2>

              {method.status === "not_configured" &&
                method.requiredEnvVars.length > 0 && (
                  <p className="text-sm text-gray-500">
                    Needs: {method.requiredEnvVars.join(", ")}
                  </p>
                )}
            </div>

            <span
              className={
                method.status === "active"
                  ? "px-3 py-1 rounded bg-green-100 text-green-700"
                  : "px-3 py-1 rounded bg-gray-100 text-gray-600"
              }
            >
              {method.status === "active" ? "Active" : "Not Configured"}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
