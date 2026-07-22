"use client";

import { useEffect, useState } from "react";

const STATUS_STYLE: Record<string, string> = {
  done: "bg-green-100 text-green-700",
  verify: "bg-yellow-100 text-yellow-800",
  connected: "bg-green-100 text-green-700",
  missing: "bg-gray-100 text-gray-600",
};

const STATUS_LABEL: Record<string, string> = {
  done: "Done",
  verify: "Verify",
  connected: "Connected",
  missing: "Not Set Up",
};

export default function AdminSecurityPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const res = await fetch("/api/admin/system-status");
      const json = await res.json();

      if (json.success) setData(json);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-2">
        Security & System Status
      </h1>

      <p className="mb-10 text-gray-500">
        Real status, not a decorative checklist — integration checks are
        live; security items are a maintained log of what's actually been
        implemented, checked directly against the codebase.
      </p>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Integrations</h2>

            <div className="space-y-3">
              {data?.integrations.map((i: any) => (
                <div
                  key={i.name}
                  className="flex items-center justify-between border rounded-xl p-4"
                >
                  <div>
                    <p className="font-medium">{i.name}</p>
                    <p className="text-sm text-gray-500">{i.detail}</p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${STATUS_STYLE[i.status]}`}
                  >
                    {STATUS_LABEL[i.status]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Security Measures
            </h2>

            <div className="space-y-3">
              {data?.security.map((s: any) => (
                <div key={s.item} className="border rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{s.item}</p>

                    <span
                      className={`rounded-full px-3 py-1 text-sm ${STATUS_STYLE[s.status]}`}
                    >
                      {STATUS_LABEL[s.status]}
                    </span>
                  </div>

                  <p className="mt-1 text-sm text-gray-500">{s.detail}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
