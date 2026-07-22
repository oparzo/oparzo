"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default function AdminRolesPage() {
  const [counts, setCounts] = useState<{ admin: number; customer: number }>({
    admin: 0,
    customer: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    const { data } = await supabase.from("profiles").select("role");

    const tally = { admin: 0, customer: 0 };

    (data || []).forEach((row: any) => {
      if (row.role === "admin") tally.admin += 1;
      else tally.customer += 1;
    });

    setCounts(tally);
    setLoading(false);
  }

  // Only two roles actually exist in the database and route-gating logic
  // today (profiles.role: 'admin' | 'customer'). This intentionally
  // doesn't invent a Manager/Super Admin tier that isn't implemented
  // anywhere else in the codebase — that would need its own design work
  // (granular permissions per section) before it'd mean anything here.
  const roles = [
    {
      role: "Admin",
      permissions: "Full access to /admin — orders, products, customers, coupons, etc.",
      count: counts.admin,
    },
    {
      role: "Customer",
      permissions: "Own account, orders, wishlist, addresses only.",
      count: counts.customer,
    },
  ];

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-4">
        Roles & Permissions
      </h1>

      <p className="mb-10 text-gray-500">
        {loading ? "Loading..." : "Live counts from your profiles table."}
      </p>

      <div className="space-y-4">
        {roles.map((item) => (
          <div
            key={item.role}
            className="border rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">
                {item.role} · {item.count}
              </h2>

              <p className="text-gray-500">
                {item.permissions}
              </p>
            </div>

            <Link
              href="/admin/users"
              className="border rounded px-4 py-2"
            >
              Manage in Users
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
