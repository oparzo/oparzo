"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    setUsers(data || []);
  }

  async function changeRole(id: string, role: string) {
    setUpdatingId(id);

    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });

      const data = await res.json();

      if (data.success) {
        setUsers((prev) =>
          prev.map((u) => (u.id === id ? { ...u, role } : u))
        );
      } else {
        alert(data.error ?? "Couldn't update role.");
      }
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-5xl font-serif mb-10">
        Users
      </h1>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">
                {user.full_name || "Unknown User"}
              </h2>

              <p>{user.email}</p>

              <p>{user.phone || "-"}</p>
            </div>

            <div className="text-right">
              <select
                value={user.role || "customer"}
                disabled={updatingId === user.id}
                onChange={(e) => changeRole(user.id, e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="customer">customer</option>
                <option value="admin">admin</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
