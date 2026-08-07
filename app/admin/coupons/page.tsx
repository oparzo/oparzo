"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);

  useEffect(() => {
    loadCoupons();
  }, []);

  async function loadCoupons() {
    const { data } = await supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false });

    setCoupons(data || []);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">Coupons</h1>

      <div className="space-y-4">
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            className="border rounded-lg p-5 flex justify-between"
          >
            <div>
              <h2 className="font-bold">{coupon.code}</h2>
              <p>Discount: {coupon.discount}%</p>
              <p>Status: {coupon.active ? "Active" : "Inactive"}</p>
            </div>

            <div>Expires: {coupon.expires_at || "Never"}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
