"use client";

import { useState } from "react";

export default function RequestProductPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [form, setForm] = useState({
    product_name: "",
    brand: "",
    product_link: "",
    notes: "",
    full_name: "",
    phone: "",
    whatsapp: "",
    email: "",
    full_delivery_address: "",
    nearest_landmark: "",
    postal_code: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Check if terms are accepted
    if (!termsAccepted) {
      setError("You must agree to the Terms & Conditions and Pricing Policy.");
      return;
    }

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

      // New success message
      setSuccess(
        "Thank you! Your request has been received successfully. OPARZO will review your request and contact you with a quotation within 24–48 hours."
      );
      setForm({
        product_name: "",
        brand: "",
        product_link: "",
        notes: "",
        full_name: "",
        phone: "",
        whatsapp: "",
        email: "",
        full_delivery_address: "",
        nearest_landmark: "",
        postal_code: "",
      });
      setTermsAccepted(false); // reset checkbox
    } catch (err: any) {
      setError(err.message ?? "Something went wrong.");
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
          Looking for something that's not yet in our collection? Share the product details or a
          product link, and OPARZO Sourcing Team will source authentic products directly from
          trusted global retailers and brands.
        </p>

        {/* Important Information Box */}
        <div className="mt-10 rounded-2xl border border-[var(--stone)] bg-white/50 p-6 sm:p-8">
          <h2 className="text-sm uppercase tracking-[0.35em] text-gray-500">
            IMPORTANT INFORMATION
          </h2>

          <div className="mt-6 space-y-6">
            {/* Advance Payment */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Advance Payment
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                To begin the sourcing process, 50% advance payment is required after you approve
                the final quotation.
                <br />
                <span className="text-xs text-gray-500">
                  This policy allows OPARZO to secure authentic products from trusted global
                  retailers while maintaining a transparent and reliable purchasing process.
                  <br />
                  The remaining 50% balance will be payable before dispatch after the final price
                  and order details have been confirmed.
                </span>
              </p>
            </div>

            {/* Estimated Pricing */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Estimated Pricing
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                The final payable amount is calculated using the current exchange rate.
                <br />
                <span className="text-xs text-gray-500">
                  Current estimated exchange rate:
                  <br />
                  1 INR = BDT 0.70
                  <br />
                  Exchange rates are indicative and may change at the time of order confirmation.
                </span>
              </p>
            </div>

            {/* Estimated Delivery Time */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Estimated Delivery Time
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                Most orders are delivered within 10–12 business days after the advance payment is
                confirmed.
                <br />
                <span className="text-xs text-gray-500">
                  Delivery time may vary depending on supplier processing, product availability,
                  customs clearance, shipping conditions, or public holidays.
                </span>
              </p>
            </div>

            {/* Business Policy */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Business Policy
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                For OPARZO's cross-border import model, the standard advance payment tiers are:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5 leading-relaxed">
                <li>
                  <strong>30% Advance</strong> — Suitable for low-value orders.
                </li>
                <li>
                  <strong>50% Advance</strong> — Standard policy for most orders (recommended).
                </li>
                <li>
                  <strong>100% Advance</strong> — Applicable for custom-made, special-order, or
                  high-value products.
                </li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-xs text-gray-500">
                  OPARZO's official policy: 50% advance payment will be the standard for all regular
                  orders. This creates a fair balance between customer trust and operational
                  security while ensuring a smooth sourcing and import process.
                </span>
              </p>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Terms & Conditions
              </h3>
              <ul className="mt-1 space-y-1 text-sm text-gray-600 leading-relaxed list-disc pl-5">
                <li>
                  A 50% advance payment is required before the sourcing process begins.
                </li>
                <li>
                  The remaining 50% balance must be paid before dispatch.
                </li>
                <li>Exchange rates may change without prior notice.</li>
                <li>
                  Shipping charges, customs duties, and import costs may vary depending on the
                  product and supplier.
                </li>
                <li>Product availability is subject to the retailer or brand.</li>
                <li>
                  Once a product has been purchased from the supplier on your behalf, the advance
                  payment is generally non-refundable.
                </li>
                <li>
                  If OPARZO is unable to source the requested product before purchase, the advance
                  payment will be fully refunded.
                </li>
                <li>
                  Final pricing, exchange rate, and estimated delivery timeline will always be
                  confirmed with the customer before the order is processed.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trusted Brands */}
        <div className="mt-10 rounded-2xl border bg-[var(--cream)] p-6">
          <p className="text-sm text-gray-500">
            We source from trusted brands and retailers including:
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="rounded-full border px-4 py-2">Amazon</span>
            <span className="rounded-full border px-4 py-2">Flipkart</span>
            <span className="rounded-full border px-4 py-2">Myntra</span>
            <span className="rounded-full border px-4 py-2">Nykaa</span>
            <span className="rounded-full border px-4 py-2">Brand Websites</span>
            <span className="rounded-full border px-4 py-2">Other Trusted Stores</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-5">
          <input
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
            type="tel"
            placeholder="WhatsApp Number"
            value={form.whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
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
          />

          <input
            type="text"
            placeholder="Full Delivery Address *"
            value={form.full_delivery_address}
            onChange={(e) =>
              setForm({
                ...form,
                full_delivery_address: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Nearest Landmark *"
            value={form.nearest_landmark}
            onChange={(e) =>
              setForm({
                ...form,
                nearest_landmark: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          <input
            type="text"
            placeholder="Postal Code *"
            value={form.postal_code}
            onChange={(e) =>
              setForm({
                ...form,
                postal_code: e.target.value,
              })
            }
            className="w-full rounded-xl border p-4"
            required
          />

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-1 h-5 w-5 accent-[var(--gold)] border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              I have read and agree to the Terms &amp; Conditions and Pricing Policy.
            </label>
          </div>

          {success && (
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
