"use client";

import { useState } from "react";

export default function BulkOrdersPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    phone: "",
    whatsapp: "",
    email: "",
    product_name: "",
    brand: "",
    estimated_quantity: "",
    product_link: "",
    notes: "",
    full_delivery_address: "",
    nearest_landmark: "",
    postal_code: "",
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!termsAccepted) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setSuccess(
        "Thank you! Your bulk order request has been received. OPARZO will contact you within 24–48 hours."
      );
      setForm({
        company_name: "",
        contact_person: "",
        phone: "",
        whatsapp: "",
        email: "",
        product_name: "",
        brand: "",
        estimated_quantity: "",
        product_link: "",
        notes: "",
        full_delivery_address: "",
        nearest_landmark: "",
        postal_code: "",
      });
      setTermsAccepted(false);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="bg-[var(--cream)]">
      <section className="max-w-4xl mx-auto px-4 py-6">
        <p className="uppercase tracking-[0.3em] text-[10px] text-gray-500">
          BULK ORDERS
        </p>
        <h1 className="mt-1 text-2xl font-serif">Buying for Your Business?</h1>
        <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
          OPARZO helps businesses, retailers, and resellers source authentic
          products directly from trusted global brands.
        </p>

        {/* Important Info – full content, ultra-compact padding */}
        <div className="mt-4 rounded-xl border border-[var(--stone)] bg-white/50 p-3 space-y-2">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500">
            IMPORTANT INFORMATION
          </h2>

          <div className="space-y-1.5 text-xs text-gray-700">
            <p>
              <strong>Advance Payment:</strong> To begin procurement and reserve
              inventory, OPARZO may require an advance payment after the
              quotation has been approved. For most bulk orders, our standard
              policy is 50% advance payment. Depending on the product category,
              supplier requirements, customization, or total order value, the
              advance payment requirement may vary. The remaining balance will
              be payable before dispatch after the final order has been
              confirmed.
            </p>

            <p>
              <strong>Bulk Pricing:</strong> Every quotation is prepared
              individually based on: Product quantity, Brand or supplier,
              Current exchange rate, Shipping &amp; import costs, Customs duties
              (if applicable). A detailed quotation will always be shared before
              order confirmation.
            </p>

            <p>
              <strong>Estimated Delivery:</strong> Most bulk orders are
              delivered within 10–15 business days after advance payment
              confirmation. Delivery time may vary depending on supplier
              processing, customs clearance, shipping schedules, product
              availability, and public holidays.
            </p>

            <p>
              <strong>Why Choose OPARZO?</strong> 100% Authentic International
              Products, Direct Sourcing from Trusted Brands &amp; Retailers,
              Competitive Wholesale Pricing, Quality Inspection Before Dispatch,
              Transparent Pricing &amp; Procurement, Dedicated Business Support.
            </p>
          </div>

          <div className="text-xs text-gray-700">
            <p className="font-medium">Terms &amp; Conditions</p>
            <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
              <li>
                Every bulk order is quoted individually based on product
                quantity and supplier pricing.
              </li>
              <li>Order processing begins only after quotation approval.</li>
              <li>
                A 50% advance payment is generally required before procurement
                starts.
              </li>
              <li>The remaining balance must be paid before dispatch.</li>
              <li>
                Product availability depends on the manufacturer or supplier.
              </li>
              <li>
                Exchange rates, freight charges, customs duties, and import
                costs may change without prior notice.
              </li>
              <li>
                Estimated delivery timelines are indicative and may vary due to
                supplier processing, customs clearance, shipping conditions, or
                public holidays.
              </li>
              <li>
                Once procurement has started, advance payments are generally
                non-refundable unless OPARZO is unable to fulfill the order.
              </li>
              <li>
                Final pricing, exchange rate, delivery timeline, and order
                details will always be confirmed with the customer before
                processing.
              </li>
              <li>
                OPARZO reserves the right to decline orders that cannot be
                sourced or do not meet our quality standards.
              </li>
            </ul>
          </div>
        </div>

        {/* Form – ultra-compact inputs */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input
            type="text"
            placeholder="Company Name (Optional)"
            value={form.company_name}
            onChange={(e) => setForm({ ...form, company_name: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Contact Person Name *"
            required
            value={form.contact_person}
            onChange={(e) =>
              setForm({ ...form, contact_person: e.target.value })
            }
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="tel"
            placeholder="Phone Number *"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="tel"
            placeholder="WhatsApp Number (Optional)"
            value={form.whatsapp}
            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="email"
            placeholder="Email (Optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Product Name *"
            required
            value={form.product_name}
            onChange={(e) => setForm({ ...form, product_name: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Brand (Optional)"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Estimated Quantity *"
            required
            value={form.estimated_quantity}
            onChange={(e) =>
              setForm({ ...form, estimated_quantity: e.target.value })
            }
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="url"
            placeholder="Product Link (Optional)"
            value={form.product_link}
            onChange={(e) => setForm({ ...form, product_link: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />
          <textarea
            placeholder="Additional Requirements / Notes (Optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm h-16"
          />
          <input
            type="text"
            placeholder="Full Delivery Address *"
            required
            value={form.full_delivery_address}
            onChange={(e) =>
              setForm({ ...form, full_delivery_address: e.target.value })
            }
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Nearest Landmark *"
            required
            value={form.nearest_landmark}
            onChange={(e) =>
              setForm({ ...form, nearest_landmark: e.target.value })
            }
            className="w-full rounded-lg border p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Postal Code *"
            required
            value={form.postal_code}
            onChange={(e) => setForm({ ...form, postal_code: e.target.value })}
            className="w-full rounded-lg border p-2 text-sm"
          />

          <div className="flex items-start gap-2 pt-0.5">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mt-0.5 h-3.5 w-3.5 accent-[var(--gold)]"
              required
            />
            <label htmlFor="terms" className="text-[10px] text-gray-600">
              I have read and agree to the Terms &amp; Conditions and Pricing
              Policy.
            </label>
          </div>

          {success && (
            <div className="rounded-lg border border-green-300 bg-green-50 p-2 text-xs text-green-700">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-2 text-xs text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--gold)] py-2.5 text-xs uppercase tracking-[0.2em] text-[var(--ink)] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Request Business Quote"}
          </button>
        </form>
      </section>
    </main>
  );
}
