"use client";

import { useState } from "react";

export default function BulkOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    const form = e.currentTarget;

    const formData = new FormData(form);

    const body = {
      company_name: formData.get("company_name"),
      contact_person: formData.get("contact_person"),
      phone: formData.get("phone"),
      email: formData.get("email"),

      products: formData.get("products"),
      quantity: formData.get("quantity"),
      delivery_location: formData.get("delivery_location"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(
          "Your bulk order request has been submitted successfully."
        );
        form.reset();
      } else {
        setError(
          data.message ??
            "Something went wrong. Please try again."
        );
      }
    } catch {
      setError(
        "Unable to submit your request. Please try again."
      );
    }

    setLoading(false);
  }

  return (
    <main className="bg-[var(--cream)]">

      <section className="max-w-5xl mx-auto px-6 py-20">

        <p className="uppercase tracking-[0.35em] text-xs text-gray-500">
          BULK ORDERS
        </p>

        <h1 className="mt-4 text-5xl font-serif">
          Business & Bulk Purchasing
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Whether you're purchasing for a business,
          retail store, salon, pharmacy, corporate
          gifting, or a large event, Oparzo provides
          dedicated sourcing, competitive pricing,
          and personalized support for bulk orders.
        </p>

        <div className="mt-10 grid md:grid-cols-4 gap-4">

          <div className="rounded-xl border bg-[var(--cream)] p-5 text-center">
            <h3 className="font-medium">
              Retail Stores
            </h3>
          </div>

          <div className="rounded-xl border bg-[var(--cream)] p-5 text-center">
            <h3 className="font-medium">
              Salons & Spas
            </h3>
          </div>

          <div className="rounded-xl border bg-[var(--cream)] p-5 text-center">
            <h3 className="font-medium">
              Corporate Gifts
            </h3>
          </div>

          <div className="rounded-xl border bg-[var(--cream)] p-5 text-center">
            <h3 className="font-medium">
              Resellers
            </h3>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-5"
        ><input
            name="company_name"
            type="text"
            required
            placeholder="Business / Company Name *"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="contact_person"
            type="text"
            required
            placeholder="Contact Person *"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="phone"
            type="tel"
            required
            placeholder="Phone Number *"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="email"
            type="email"
            placeholder="Business Email (Optional)"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="products"
            type="text"
            required
            placeholder="Products Required *"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="quantity"
            type="text"
            placeholder="Estimated Quantity"
            className="w-full rounded-xl border p-4"
          />

          <input
            name="delivery_location"
            type="text"
            placeholder="Delivery Location"
            className="w-full rounded-xl border p-4"
          />

          <textarea
            name="message"
            placeholder="Tell us about your requirements..."
            className="w-full rounded-xl border p-4 h-40"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--gold)] py-4 text-[var(--ink)] uppercase tracking-[0.2em] disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : "Request Business Quote"}
          </button>{success && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4">
              <p className="text-green-700">
                {success}
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <p className="text-red-700">
                {error}
              </p>
            </div>
          )}

        </form>

      </section>

    </main>
  );
}
