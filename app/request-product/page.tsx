"use client";

import { useState } from "react";

export default function RequestProductPage() {
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState("");

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    product_name: "",
    brand: "",
    product_link: "",
    notes: "",
    full_name: "",
    phone: "",
    email: "",
  });

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/request-product", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setSuccess(
        "Your request has been submitted successfully."
      );

      setForm({
        product_name: "",
        brand: "",
        product_link: "",
        notes: "",
        full_name: "",
        phone: "",
        email: "",
      });

    } catch (err: any) {

      setError(
        err.message ??
          "Something went wrong."
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="bg-[var(--cream)]">

      <section className="max-w-4xl mx-auto px-6 py-20">

        <p className="uppercase tracking-[0.35em] text-xs text-gray-500">
          REQUEST PRODUCT
        </p>

        <h1 className="mt-4 text-5xl font-serif">
          Can't Find Your Product?
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Looking for something that's not yet in our collection?
          Share the product details or paste a link and our concierge
          team will source it from trusted global brands — authentically,
          with care.
        </p>

        <div className="mt-10 rounded-2xl border bg-[var(--cream)] p-6">

          <p className="text-sm text-gray-500">
            We source from trusted brands and retailers including:
          </p>

          <div className="mt-4 flex flex-wrap gap-3">

            <span className="rounded-full border px-4 py-2">
              Amazon
            </span>

            <span className="rounded-full border px-4 py-2">
              Flipkart
            </span>

            <span className="rounded-full border px-4 py-2">
              Myntra
            </span>

            <span className="rounded-full border px-4 py-2">
              Nykaa
            </span>

            <span className="rounded-full border px-4 py-2">
              Brand Websites
            </span>

            <span className="rounded-full border px-4 py-2">
              Other Trusted Stores
            </span>

          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-5"
        ><input
            type="text"
            placeholder="Product Name *"
            value={form.product_name}
            onChange={(e) =>
              setForm({
                ...form,
                product_name: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Brand (Optional)"
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
          />

          <input
            type="url"
            placeholder="Product Link (Amazon, Flipkart, Myntra, Nykaa, Brand Website...)"
            value={form.product_link}
            onChange={(e) =>
              setForm({
                ...form,
                product_link: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
          />

          <textarea
            placeholder="Additional Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4 h-40"
          />

          <input
            type="text"
            placeholder="Full Name *"
            value={form.full_name}
            onChange={(e) =>
              setForm({
                ...form,
                full_name: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number *"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="email"
            placeholder="Email (Optional)"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
          />{success && (
            <div className="rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--gold)] py-4 text-[var(--ink)] uppercase tracking-[0.2em] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </button>

        </form>

      </section>

    </main>
  );
}
