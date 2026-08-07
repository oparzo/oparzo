"use client";

import { useEffect, useState } from "react";

type Address = {
  id: string;
  receiver_name: string;
  phone: string;
  district: string;
  area: string;
  address: string;
  postal_code: string;
};

export default function AddressesPage() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [form, setForm] = useState({
    receiver_name: "",
    phone: "",
    district: "",
    area: "",
    address: "",
    postal_code: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAddresses();
  }, []);

  async function loadAddresses() {
    const res = await fetch("/api/addresses");

    if (res.status === 401) {
      setIsLoggedIn(false);
      setAuthChecked(true);
      return;
    }

    const data = await res.json();

    if (data.success) {
      setAddresses(data.addresses ?? []);
    }

    setAuthChecked(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveAddress(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setForm({
        receiver_name: "",
        phone: "",
        district: "",
        area: "",
        address: "",
        postal_code: "",
      });

      loadAddresses();
    }

    setLoading(false);
  }

  if (!authChecked) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-neutral-500">Loading...</p>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
          My Account
        </p>

        <h1 className="mt-4 text-4xl font-serif">Delivery Addresses</h1>

        <p className="mt-6 text-neutral-600">
          Log in to save and manage your delivery addresses.
        </p>

        <a
          href="/login"
          className="mt-8 inline-flex rounded-full bg-[var(--gold)] px-8 py-3 text-[var(--ink)]"
        >
          Log In
        </a>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">
        My Account
      </p>

      <h1 className="mt-4 text-5xl font-serif">Delivery Addresses</h1>

      <div className="grid lg:grid-cols-2 gap-12 mt-14">
        <form onSubmit={saveAddress} className="space-y-5">
          <input
            name="receiver_name"
            value={form.receiver_name}
            onChange={handleChange}
            aria-label="Receiver Name"
            placeholder="Receiver Name"
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            aria-label="Phone Number"
            placeholder="Phone Number"
            className="w-full border rounded-xl p-4"
            required
          />

          <input
            name="district"
            value={form.district}
            onChange={handleChange}
            aria-label="District"
            placeholder="District"
            className="w-full border rounded-xl p-4"
            required
          />
          <input
            name="area"
            value={form.area}
            onChange={handleChange}
            aria-label="Area / Thana"
            placeholder="Area / Thana"
            className="w-full border rounded-xl p-4"
            required
          />

          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            aria-label="Full Address"
            placeholder="Full Address"
            className="w-full border rounded-xl p-4 h-32"
            required
          />

          <input
            name="postal_code"
            value={form.postal_code}
            onChange={handleChange}
            aria-label="Postal Code"
            placeholder="Postal Code"
            className="w-full border rounded-xl p-4"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--gold)] text-[var(--ink)] py-4"
          >
            {loading ? "Saving..." : "Save Address"}
          </button>
        </form>

        <div>
          <h2 className="text-2xl font-serif mb-6">Saved Addresses</h2>

          {addresses.length === 0 ? (
            <div className="rounded-2xl border p-8 text-neutral-500">
              No saved address yet.
            </div>
          ) : (
            <div className="space-y-5">
              {addresses.map((item) => (
                <div key={item.id} className="rounded-2xl border p-6">
                  <h3 className="text-xl font-semibold">
                    {item.receiver_name}
                  </h3>

                  <p className="mt-2">{item.phone}</p>

                  <p className="mt-2">
                    {item.area}, {item.district}
                  </p>

                  <p className="mt-2">{item.address}</p>

                  {item.postal_code && (
                    <p className="mt-2">Postal Code: {item.postal_code}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
