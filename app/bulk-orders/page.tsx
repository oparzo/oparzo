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
      setError("You must agree to the Terms & Conditions and Pricing Policy.");
      return;
    }

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/bulk-orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(
          "Thank you! Your request has been received successfully. OPARZO will review your request and contact you with a quotation within 24–48 hours."
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
      } else {
        setError(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Unable to submit your request. Please try again.");
    }

    setLoading(false);
  }

  return (
    <main className="bg-[var(--cream)]">
      <section className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <p className="uppercase tracking-[0.35em] text-xs text-gray-500">
          BULK ORDERS
        </p>

        <h1 className="mt-4 text-5xl font-serif">Buying for Your Business?</h1>

        <p className="mt-6 text-lg text-gray-600 leading-8">
          Looking for authentic products in larger quantities? OPARZO helps businesses, retailers,
          corporate clients, and resellers source genuine international products directly from
          trusted global brands and verified retailers. Every order is handled with transparent
          pricing, reliable procurement, and dedicated support.
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
                To begin procurement and reserve inventory, OPARZO may require an advance payment
                after the quotation has been approved.
                <br />
                <span className="text-xs text-gray-500">
                  For most bulk orders, our standard policy is 50% advance payment.
                  <br />
                  Depending on the product category, supplier requirements, customization, or total
                  order value, the advance payment requirement may vary.
                  <br />
                  The remaining balance will be payable before dispatch after the final order has
                  been confirmed.
                </span>
              </p>
            </div>

            {/* Bulk Pricing */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Bulk Pricing
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                Every quotation is prepared individually based on:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5 leading-relaxed">
                <li>Product quantity</li>
                <li>Brand or supplier</li>
                <li>Current exchange rate</li>
                <li>Shipping &amp; import costs</li>
                <li>Customs duties (if applicable)</li>
              </ul>
              <p className="mt-2 text-sm text-gray-600">
                <span className="text-xs text-gray-500">
                  A detailed quotation will always be shared before order confirmation.
                </span>
              </p>
            </div>

            {/* Estimated Delivery */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Estimated Delivery
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                Most bulk orders are delivered within 10–15 business days after advance payment
                confirmation.
                <br />
                <span className="text-xs text-gray-500">
                  Delivery time may vary depending on supplier processing, customs clearance,
                  shipping schedules, product availability, and public holidays.
                </span>
              </p>
            </div>

            {/* Why Choose OPARZO? */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Why Choose OPARZO?
              </h3>
              <ul className="mt-2 space-y-1 text-sm text-gray-600 list-disc pl-5 leading-relaxed">
                <li>100% Authentic International Products</li>
                <li>Direct Sourcing from Trusted Brands &amp; Retailers</li>
                <li>Competitive Wholesale Pricing</li>
                <li>Quality Inspection Before Dispatch</li>
                <li>Transparent Pricing &amp; Procurement</li>
                <li>Dedicated Business Support</li>
              </ul>
            </div>

            {/* Terms & Conditions */}
            <div>
              <h3 className="text-sm font-medium text-[var(--ink)]">
                Terms &amp; Conditions
              </h3>
              <ul className="mt-1 space-y-1 text-sm text-gray-600 leading-relaxed list-disc pl-5">
                <li>
                  Every bulk order is quoted individually based on product quantity and supplier
                  pricing.
                </li>
                <li>Order processing begins only after quotation approval.</li>
                <li>
                  A 50% advance payment is generally required before procurement starts.
                </li>
                <li>The remaining balance must be paid before dispatch.</li>
                <li>Product availability depends on the manufacturer or supplier.</li>
                <li>
                  Exchange rates, freight charges, customs duties, and import costs may change
                  without prior notice.
                </li>
                <li>
                  Estimated delivery timelines are indicative and may vary due to supplier
                  processing, customs clearance, shipping conditions, or public holidays.
                </li>
                <li>
                  Once procurement has started, advance payments are generally non-refundable unless
                  OPARZO is unable to fulfill the order.
                </li>
                <li>
                  Final pricing, exchange rate, delivery timeline, and order details will always be
                  confirmed with the customer before processing.
                </li>
                <li>
                  OPARZO reserves the right to decline orders that cannot be sourced or do not meet
                  our quality standards.
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-12 space-y-5">
          {/* Company Name (Optional) */}
          <input
            type="text"
            placeholder="Company Name (Optional)"
            className="w-full rounded-xl border p-4"
            value={form.company_name}
            onChange={(e) =>
              setForm({
                ...form,
                company_name: e.target.value,
              })
            }
          />

          {/* Contact Person Name * */}
          <input
            type="text"
            placeholder="Contact Person Name *"
            className="w-full rounded-xl border p-4"
            required
            value={form.contact_person}
            onChange={(e) =>
              setForm({
                ...form,
                contact_person: e.target.value,
              })
            }
          />

          {/* Phone Number * */}
          <input
            type="tel"
            placeholder="Phone Number *"
            className="w-full rounded-xl border p-4"
            required
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
          />

          {/* WhatsApp Number (Optional) */}
          <input
            type="tel"
            placeholder="WhatsApp Number (Optional)"
            className="w-full rounded-xl border p-4"
            value={form.whatsapp}
            onChange={(e) =>
              setForm({
                ...form,
                whatsapp: e.target.value,
              })
            }
          />

          {/* Email (Optional) */}
          <input
            type="email"
            placeholder="Email (Optional)"
            className="w-full rounded-xl border p-4"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
          />

          {/* Product Name * */}
          <input
            type="text"
            placeholder="Product Name *"
            className="w-full rounded-xl border p-4"
            required
            value={form.product_name}
            onChange={(e) =>
              setForm({
                ...form,
                product_name: e.target.value,
              })
            }
          />

          {/* Brand (Optional) */}
          <input
            type="text"
            placeholder="Brand (Optional)"
            className="w-full rounded-xl border p-4"
            value={form.brand}
            onChange={(e) =>
              setForm({
                ...form,
                brand: e.target.value,
              })
            }
          />

          {/* Estimated Quantity * */}
          <input
            type="text"
            placeholder="Estimated Quantity *"
            className="w-full rounded-xl border p-4"
            required
            value={form.estimated_quantity}
            onChange={(e) =>
              setForm({
                ...form,
                estimated_quantity: e.target.value,
              })
            }
          />

          {/* Product Link (Optional) */}
          <input
            type="url"
            placeholder="Product Link (Optional)"
            className="w-full rounded-xl border p-4"
            value={form.product_link}
            onChange={(e) =>
              setForm({
                ...form,
                product_link: e.target.value,
              })
            }
          />

          {/* Additional Requirements / Notes (Optional) */}
          <textarea
            placeholder="Additional Requirements / Notes (Optional)"
            className="w-full rounded-xl border p-4 h-40"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

          {/* Full Delivery Address * */}
          <input
            type="text"
            placeholder="Full Delivery Address *"
            className="w-full rounded-xl border p-4"
            required
            value={form.full_delivery_address}
            onChange={(e) =>
              setForm({
                ...form,
                full_delivery_address: e.target.value,
              })
            }
          />

          {/* Nearest Landmark * */}
          <input
            type="text"
            placeholder="Nearest Landmark *"
            className="w-full rounded-xl border p-4"
            required
            value={form.nearest_landmark}
            onChange={(e) =>
              setForm({
                ...form,
                nearest_landmark: e.target.value,
              })
            }
          />

          {/* Postal Code * */}
          <input
            type="text"
            placeholder="Postal Code *"
            className="w-full rounded-xl border p-4"
            required
            value={form.postal_code}
            onChange={(e) =>
              setForm({
                ...form,
                postal_code: e.target.value,
              })
            }
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
            {loading ? "Submitting..." : "Request Business Quote"}
          </button>
        </form>
      </section>
    </main>
  );
}
