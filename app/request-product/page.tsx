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
    if (!termsAccepted) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/request-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSuccess("Thank you! Your request has been received. OPARZO will contact you within 24–48 hours.");
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
        <p className="uppercase tracking-[0.3em] text-[10px] text-gray-500">REQUEST PRODUCT</p>
        <h1 className="mt-1 text-2xl font-serif">Can't Find Your Product?</h1>
        <p className="mt-1.5 text-xs text-gray-600 leading-relaxed">
          Looking for something not yet in our collection? Share the details or a link, and OPARZO Sourcing Team will source it for you.
        </p>

        {/* ✅ Trusted Brands – এখন উপরে */}
        <div className="mt-4 rounded-xl border border-[var(--stone)] bg-white/50 p-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">We source from trusted brands and retailers including:</p>
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Amazon</span>
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Flipkart</span>
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Myntra</span>
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Nykaa</span>
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Brand Websites</span>
            <span className="rounded-full border border-[var(--stone)] px-3 py-1 text-[10px] text-gray-600 bg-white">Other Trusted Stores</span>
          </div>
        </div>

        {/* Important Info – full content, ultra-compact padding */}
        <div className="mt-4 rounded-xl border border-[var(--stone)] bg-white/50 p-3 space-y-2">
          <h2 className="text-[10px] uppercase tracking-[0.3em] text-gray-500">IMPORTANT INFORMATION</h2>

          <div className="space-y-1.5 text-xs text-gray-700">
            <p><strong>Advance Payment:</strong> To begin the sourcing process, 50% advance payment is required after you approve the final quotation. This policy allows OPARZO to secure authentic products from trusted global retailers while maintaining a transparent and reliable purchasing process. The remaining 50% balance will be payable before dispatch after the final price and order details have been confirmed.</p>

            <p><strong>Estimated Pricing:</strong> The final payable amount is calculated using the current exchange rate. Current estimated exchange rate: 1 INR = BDT 0.70. Exchange rates are indicative and may change at the time of order confirmation.</p>

            <p><strong>Estimated Delivery Time:</strong> Most orders are delivered within 10–12 business days after the advance payment is confirmed. Delivery time may vary depending on supplier processing, product availability, customs clearance, shipping conditions, or public holidays.</p>

            <p><strong>Business Policy:</strong> For OPARZO's cross-border import model, the standard advance payment tiers are: 30% Advance — Suitable for low-value orders. 50% Advance — Standard policy for most orders (recommended). 100% Advance — Applicable for custom-made, special-order, or high-value products. OPARZO's official policy: 50% advance payment will be the standard for all regular orders. This creates a fair balance between customer trust and operational security while ensuring a smooth sourcing and import process.</p>
          </div>

          <div className="text-xs text-gray-700">
            <p className="font-medium">Terms &amp; Conditions</p>
            <ul className="list-disc pl-4 space-y-0.5 text-gray-600">
              <li>A 50% advance payment is required before the sourcing process begins.</li>
              <li>The remaining 50% balance must be paid before dispatch.</li>
              <li>Exchange rates may change without prior notice.</li>
              <li>Shipping charges, customs duties, and import costs may vary depending on the product and supplier.</li>
              <li>Product availability is subject to the retailer or brand.</li>
              <li>Once a product has been purchased from the supplier on your behalf, the advance payment is generally non-refundable.</li>
              <li>If OPARZO is unable to source the requested product before purchase, the advance payment will be fully refunded.</li>
              <li>Final pricing, exchange rate, and estimated delivery timeline will always be confirmed with the customer before the order is processed.</li>
            </ul>
          </div>
        </div>

        {/* Form – ultra-compact inputs */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input type="text" placeholder="Product Name *" required value={form.product_name} onChange={(e) => setForm({...form, product_name: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="text" placeholder="Brand (Optional)" value={form.brand} onChange={(e) => setForm({...form, brand: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="url" placeholder="Product Link (Optional)" value={form.product_link} onChange={(e) => setForm({...form, product_link: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <textarea placeholder="Additional Notes" value={form.notes} onChange={(e) => setForm({...form, notes: e.target.value})} className="w-full rounded-lg border p-2 text-sm h-16" />
          <input type="text" placeholder="Full Name *" required value={form.full_name} onChange={(e) => setForm({...form, full_name: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="tel" placeholder="Phone Number *" required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="tel" placeholder="WhatsApp Number" value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="email" placeholder="Email (Optional)" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="text" placeholder="Full Delivery Address *" required value={form.full_delivery_address} onChange={(e) => setForm({...form, full_delivery_address: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="text" placeholder="Nearest Landmark *" required value={form.nearest_landmark} onChange={(e) => setForm({...form, nearest_landmark: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />
          <input type="text" placeholder="Postal Code *" required value={form.postal_code} onChange={(e) => setForm({...form, postal_code: e.target.value})} className="w-full rounded-lg border p-2 text-sm" />

          <div className="flex items-start gap-2 pt-0.5">
            <input type="checkbox" id="terms" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-0.5 h-3.5 w-3.5 accent-[var(--gold)]" required />
            <label htmlFor="terms" className="text-[10px] text-gray-600">I have read and agree to the Terms &amp; Conditions and Pricing Policy.</label>
          </div>

          {success && <div className="rounded-lg border border-green-300 bg-green-50 p-2 text-xs text-green-700">{success}</div>}
          {error && <div className="rounded-lg border border-red-300 bg-red-50 p-2 text-xs text-red-700">{error}</div>}

          <button type="submit" disabled={loading} className="w-full rounded-lg bg-[var(--gold)] py-2.5 text-xs uppercase tracking-[0.2em] text-[var(--ink)] disabled:opacity-60">
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </section>
    </main>
  );
}
