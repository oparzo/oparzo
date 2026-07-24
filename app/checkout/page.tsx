"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { supabase } from "@/lib/supabase/client";
import { formatCurrency, formatVariantLabel } from "@/lib/format";

type SavedAddress = {
  id: string;
  receiver_name: string;
  phone: string;
  district: string;
  area: string;
  address: string;
  postal_code: string;
};

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [couponLoading, setCouponLoading] = useState(false);

  const [couponMessage, setCouponMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const [orderError, setOrderError] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [savedAddresses, setSavedAddresses] =
    useState<SavedAddress[]>([]);

  const [selectedAddressId, setSelectedAddressId] =
    useState<string | null>(null);

  const [saveNewAddress, setSaveNewAddress] =
    useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    loadAccountAndAddresses();
  }, []);

  async function loadAccountAndAddresses() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setIsLoggedIn(true);

    const res = await fetch("/api/addresses");
    const data = await res.json();

    if (data.success && data.addresses?.length) {
      setSavedAddresses(data.addresses);
      selectAddress(data.addresses[0]);
    }
  }

  function selectAddress(addr: SavedAddress) {
    setSelectedAddressId(addr.id);

    setForm((prev) => ({
      ...prev,
      name: addr.receiver_name,
      phone: addr.phone,
      address: [
        addr.address,
        addr.area,
        addr.district,
      ]
        .filter(Boolean)
        .join(", "),
    }));
  }

  function useNewAddress() {
    setSelectedAddressId(null);

    setForm((prev) => ({
      ...prev,
      name: "",
      phone: "",
      address: "",
    }));
  }

  const totalItems = useMemo(() => {
    return cart.reduce(
      (sum: number, item: any) =>
        sum + item.quantity,
      0
    );
  }, [cart]);

  const grandTotal = Math.max(
    subtotal - discount,
    0
  );

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function applyCoupon() {
    if (!couponCode.trim()) {
      setCouponMessage({
        type: "error",
        text: "Please enter a coupon code.",
      });
      return;
    }

    setCouponLoading(true);
    setCouponMessage(null);

    try {
      const res = await fetch("/api/coupons/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode, subtotal }),
      });
      const data = await res.json();

      if (data.success) {
        setCoupon(data.coupon);
        setDiscount(data.discount || 0);
        setCouponMessage({
          type: "success",
          text: data.message || "Coupon applied successfully!",
        });
      } else {
        setCoupon(null);
        setDiscount(0);
        setCouponMessage({
          type: "error",
          text: data.message || "Invalid or expired coupon.",
        });
      }
    } catch (err) {
      setCouponMessage({
        type: "error",
        text: "Failed to apply coupon. Please try again.",
      });
    } finally {
      setCouponLoading(false);
    }
  }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    setOrderError("");
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          form,
          couponCode: coupon?.code || null,
          discount,
          subtotal,
          grandTotal,
          selectedAddressId,
          saveNewAddress,
        }),
      });

      const data = await res.json();

      if (data.success) {
        clearCart();
        setSuccess(true);
      } else {
        setOrderError(data.message || "Failed to place order. Please check your information.");
      }
    } catch (err) {
      setOrderError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-20 text-center">
        <div className="rounded-2xl bg-[var(--cream)] p-10 shadow-sm">
          <h1 className="text-4xl font-serif text-[var(--ink)]">Order Confirmed!</h1>
          <p className="mt-4 text-gray-600">
            Thank you for your order. The OPARZO Concierge Team will review and confirm your details shortly.
          </p>
          <a
            href="/"
            className="mt-8 inline-block rounded-xl bg-[var(--gold)] px-8 py-3 font-medium text-[var(--ink)] transition hover:opacity-90"
          >
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-12">
      <h1 className="mb-10 text-4xl font-serif">Checkout</h1>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <form onSubmit={submitOrder} className="space-y-8">
          {isLoggedIn && savedAddresses.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Saved Addresses</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => selectAddress(addr)}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      selectedAddressId === addr.id
                        ? "border-[var(--gold)] bg-[var(--cream)]"
                        : "border-gray-200"
                    }`}
                  >
                    <p className="font-medium">{addr.receiver_name}</p>
                    <p className="text-sm text-gray-500">{addr.phone}</p>
                    <p className="mt-2 text-sm text-gray-600">
                      {[addr.address, addr.area, addr.district]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={useNewAddress}
                className="text-sm font-medium text-[var(--gold)] underline hover:opacity-80"
              >
                Or enter a new address
              </button>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Information</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                required
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Receiver Name"
                className="mt-1 w-full rounded-lg border p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                required
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                className="mt-1 w-full rounded-lg border p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="mt-1 w-full rounded-lg border p-3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
              <textarea
                required
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House, Road, Area, District"
                rows={3}
                className="mt-1 w-full rounded-lg border p-3"
              />
            </div>

            {/* New: Save address checkbox */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="saveAddress"
                checked={saveNewAddress}
                onChange={(e) => setSaveNewAddress(e.target.checked)}
                className="h-5 w-5 accent-[var(--gold)]"
              />
              <label htmlFor="saveAddress" className="text-sm text-gray-600">
                Save this address for future orders
              </label>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <h3 className="mb-4 text-lg font-semibold">Coupon</h3>

            <div className="flex gap-3">
              <input
                value={couponCode}
                onChange={(e) =>
                  setCouponCode(e.target.value.toUpperCase())
                }
                placeholder="Coupon Code"
                aria-label="Coupon Code"
                className="flex-1 rounded-lg border p-3"
              />

              <button
                type="button"
                onClick={applyCoupon}
                disabled={couponLoading}
                className="rounded-lg bg-[var(--gold)] px-5 text-[var(--ink)]"
              >
                {couponLoading ? "Checking..." : "Apply"}
              </button>
            </div>

            {couponMessage && (
              <p
                role={couponMessage.type === "error" ? "alert" : "status"}
                className={`mt-3 text-sm ${
                  couponMessage.type === "error"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {couponMessage.text}
              </p>
            )}
          </div>

          {orderError && (
            <p role="alert" className="text-sm text-red-600">
              {orderError}
            </p>
          )}

          <p className="text-sm leading-7 text-gray-500">
            Cash on Delivery — no payment is required today.
            Your order will be confirmed by the OPARZO
            Concierge Team before dispatch.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--gold)] py-4 text-[var(--ink)] transition hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Place Order"}
          </button>
        </form>

        <div className="h-fit rounded-2xl bg-[var(--cream)] p-8">
          <h2 className="text-3xl font-serif">Order Summary</h2>

          <div className="mt-8 space-y-5">
            {cart.map((item: any) => (
              <div
                key={`${item._id}-${JSON.stringify(item.selectedVariant)}`}
                className="flex justify-between border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{item.name}</h3>

                  {item.selectedVariant && (
                    <p className="mt-1 text-sm text-gray-500">
                      {formatVariantLabel(item.selectedVariant)}
                    </p>
                  )}

                  <p className="mt-1 text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                <div>
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-3">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span className="text-green-600">
                - {formatCurrency(discount)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Calculated Later</span>
            </div>

            <div className="flex justify-between border-t pt-4 text-xl font-semibold">
              <span>Estimated Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>
          </div>

          <p className="mt-8 text-sm leading-7 text-gray-500">
            Final shipping charge, customs duties,
            and any applicable adjustments will be
            confirmed by the OPARZO Concierge Team
            before processing your order.
          </p>
        </div>
      </div>
    </main>
  );
}
