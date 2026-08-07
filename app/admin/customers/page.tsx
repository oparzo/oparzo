"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    setCustomers(data || []);
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">Customers</h1>

      <div className="space-y-4">
        {customers.map((customer) => (
          <div key={customer.id} className="border rounded-lg p-5">
            <h2 className="font-bold">{customer.full_name || "No Name"}</h2>

            <p>{customer.email}</p>

            <p className="text-gray-500">{customer.phone}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
