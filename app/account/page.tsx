"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Address {
  id: string;
  receiver_name: string;
  phone: string;
  address: string;
  area: string | null;
  district: string | null;
  postal_code: string | null;
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [form, setForm] = useState({
    receiver_name: "",
    phone: "",
    address: "",
    area: "",
    district: "",
    postal_code: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      await fetchAddresses();
      setLoading(false);
    };
    fetchUser();
  }, [router]);

  async function fetchAddresses() {
    const res = await fetch("/api/addresses");
    const data = await res.json();
    if (data.success) {
      setAddresses(data.addresses || []);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  function handleEdit(addr: Address) {
    setEditingAddress(addr);
    setForm({
      receiver_name: addr.receiver_name,
      phone: addr.phone,
      address: addr.address,
      area: addr.area || "",
      district: addr.district || "",
      postal_code: addr.postal_code || "",
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const payload = {
      ...form,
      id: editingAddress?.id,
    };

    const method = editingAddress ? "PUT" : "POST";
    const res = await fetch("/api/addresses", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (data.success) {
      setMessage({
        type: "success",
        text: editingAddress ? "Address updated!" : "Address saved!",
      });
      setEditingAddress(null);
      setForm({
        receiver_name: "",
        phone: "",
        address: "",
        area: "",
        district: "",
        postal_code: "",
      });
      await fetchAddresses();
    } else {
      setMessage({
        type: "error",
        text: data.message || "Something went wrong",
      });
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this address?")) return;
    const res = await fetch(`/api/addresses?id=${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      setMessage({ type: "success", text: "Address deleted" });
      await fetchAddresses();
    } else {
      setMessage({ type: "error", text: data.message || "Failed to delete" });
    }
  }

  if (loading) {
    return (
      <main className="bg-[var(--cream)] min-h-screen py-20 text-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="bg-[var(--cream)] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-serif mb-2">My Account</h1>
        <p className="text-gray-500 text-sm mb-8">
          Welcome, {user?.user_metadata?.full_name || user?.email}
        </p>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <Link
              href="/account"
              className="block px-4 py-3 bg-white rounded-lg font-medium shadow-sm hover:shadow-md transition"
            >
              My Account
            </Link>
            <Link
              href="/orders"
              className="block px-4 py-3 bg-white/70 rounded-lg hover:shadow-sm transition"
            >
              Orders
            </Link>
            <Link
              href="/wishlist"
              className="block px-4 py-3 bg-white/70 rounded-lg hover:shadow-sm transition"
            >
              Wishlist
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 bg-white/70 rounded-lg hover:shadow-sm transition text-red-600"
            >
              Logout
            </button>
          </div>

          {/* Address Management */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-serif mb-4">Saved Addresses</h2>

              {addresses.length === 0 ? (
                <p className="text-gray-500 mb-4">No addresses saved yet.</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className="border border-[var(--stone)] rounded-lg p-4 flex justify-between items-start"
                    >
                      <div>
                        <p className="font-medium">{addr.receiver_name}</p>
                        <p className="text-sm text-gray-500">{addr.phone}</p>
                        <p className="text-sm text-gray-600">
                          {addr.address}
                          {addr.area && `, ${addr.area}`}
                          {addr.district && `, ${addr.district}`}
                          {addr.postal_code && ` – ${addr.postal_code}`}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(addr)}
                          className="text-xs text-[var(--gold)] hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(addr.id)}
                          className="text-xs text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <hr className="my-6 border-[var(--stone)]" />

              <h3 className="font-medium mb-3">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Receiver Name *"
                    required
                    value={form.receiver_name}
                    onChange={(e) =>
                      setForm({ ...form, receiver_name: e.target.value })
                    }
                    className="w-full border border-[var(--stone)] rounded-lg p-3"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border border-[var(--stone)] rounded-lg p-3"
                  />
                </div>
                <textarea
                  placeholder="Full Address *"
                  required
                  rows={2}
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full border border-[var(--stone)] rounded-lg p-3"
                />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Area (optional)"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    className="w-full border border-[var(--stone)] rounded-lg p-3"
                  />
                  <input
                    type="text"
                    placeholder="District (optional)"
                    value={form.district}
                    onChange={(e) =>
                      setForm({ ...form, district: e.target.value })
                    }
                    className="w-full border border-[var(--stone)] rounded-lg p-3"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code (optional)"
                    value={form.postal_code}
                    onChange={(e) =>
                      setForm({ ...form, postal_code: e.target.value })
                    }
                    className="w-full border border-[var(--stone)] rounded-lg p-3"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-[var(--gold)] text-[var(--ink)] px-6 py-2 rounded-lg font-medium hover:opacity-85 transition"
                  >
                    {editingAddress ? "Update Address" : "Save Address"}
                  </button>
                  {editingAddress && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAddress(null);
                        setForm({
                          receiver_name: "",
                          phone: "",
                          address: "",
                          area: "",
                          district: "",
                          postal_code: "",
                        });
                      }}
                      className="bg-gray-200 px-6 py-2 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
