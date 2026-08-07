"use client";

import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/components/cart/CartProvider";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency, formatVariantLabel } from "@/lib/format";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[var(--cream)]">
        <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
          <p className="mb-5 text-[11px] uppercase tracking-[0.45em] text-[var(--muted)]">
            SHOPPING BAG
          </p>
          <h1 className="font-[Cormorant_Garamond] text-6xl font-semibold">
            Your Bag Is Empty
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Discover our carefully curated collection of authentic global
            products.
          </p>
          <Link
            href="/products"
            className="mt-12 inline-flex h-14 items-center justify-center bg-[var(--gold)] px-10 text-xs uppercase tracking-[0.3em] text-[var(--ink)]"
          >
            Explore Collection
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-[11px] uppercase tracking-[0.45em] text-[var(--muted)]">
          SHOPPING BAG
        </p>
        <h1 className="mt-5 font-[Cormorant_Garamond] text-6xl font-semibold">
          Your Bag
        </h1>

        <div className="mt-16 grid gap-16 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {cart.map((item: any, index: number) => (
              <div
                key={`${item._id}-${JSON.stringify(item.selectedVariant)}`}
                className="flex gap-6 border-b border-[var(--stone)] pb-8"
              >
                <div className="relative h-36 w-28 flex-shrink-0 overflow-hidden rounded-sm bg-white">
                  {item.images?.[0] && (
                    <Image
                      src={urlFor(item.images[0]).width(400).url()}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--muted)]">
                    {item.brand}
                  </p>
                  <h2 className="mt-2 font-[Cormorant_Garamond] text-3xl font-semibold">
                    {item.name}
                  </h2>
                  {item.selectedVariant && (
                    <p className="mt-2 text-sm text-[var(--muted)]">
                      {formatVariantLabel(item.selectedVariant)}
                    </p>
                  )}
                  <p className="mt-4 text-lg font-medium">
                    {formatCurrency(item.price)}
                  </p>

                  <div className="mt-6 flex items-center gap-4">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="flex h-10 w-10 items-center justify-center border border-[var(--stone)]"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="flex h-10 w-10 items-center justify-center border border-[var(--stone)]"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(index)}
                    className="mt-6 w-fit text-xs uppercase tracking-[0.3em] text-[var(--muted)] transition hover:text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-sm border border-[var(--stone)] bg-[var(--surface)] p-8">
            <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--muted)]">
              ORDER SUMMARY
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted)]">Shipping</span>
                <span>Calculated at Checkout</span>
              </div>
              <div className="border-t border-[var(--stone)] pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">Estimated Total</span>
                  <span className="text-2xl font-semibold">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-10 flex h-14 w-full items-center justify-center bg-[var(--gold)] text-xs uppercase tracking-[0.3em] text-[var(--ink)] transition hover:opacity-90"
            >
              Proceed to Checkout
            </Link>
            <p className="mt-8 text-sm leading-7 text-[var(--muted)]">
              Shipping charges and any applicable customs fees will be confirmed
              by the OPARZO Concierge Team before your order is processed.
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
