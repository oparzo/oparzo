"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

type WishlistItem = {
  id: string;
  product_id: string;
  product_name: string;
  brand: string;
  price: number;
  image: string | null;
  slug: string;
};

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  async function loadWishlist() {
    try {
      const res = await fetch("/api/wishlist");

      if (res.status === 401) {
        setIsLoggedIn(false);
        return;
      }

      const data = await res.json();

      if (data.success) {
        setItems(data.items ?? []);
      }
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(id: string) {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-serif">Loading...</h1>
      </main>
    );
  }

  if (!isLoggedIn) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
          My Account
        </p>

        <h1 className="mt-4 text-4xl font-serif">Wishlist</h1>

        <p className="mt-6 text-gray-600">
          Items you heart while browsing are saved on this device. Log in to
          keep your wishlist synced across devices — anything you've already
          saved will carry over automatically.
        </p>

        <Link
          href="/login"
          className="mt-8 inline-flex rounded-xl bg-[var(--gold)] px-8 py-4 text-[var(--ink)]"
        >
          Log In
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-xs uppercase tracking-[0.35em] text-gray-500">
        My Account
      </p>

      <h1 className="mt-4 text-5xl font-serif">Wishlist</h1>
      <div className="mt-12">
        {items.length === 0 ? (
          <div className="rounded-2xl border p-12 text-center">
            <h2 className="text-3xl font-serif">Your Wishlist Is Empty</h2>

            <p className="mt-4 text-gray-600">
              Save your favourite products to purchase later.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-xl bg-[var(--gold)] px-8 py-4 text-[var(--ink)]"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border bg-[var(--cream)] p-6"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.product_name}
                    className="mb-5 h-56 w-full rounded-xl object-cover"
                  />
                )}

                <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
                  {item.brand}
                </p>

                <h2 className="mt-3 text-2xl font-serif">
                  {item.product_name}
                </h2>

                <p className="mt-3 text-lg">{formatCurrency(item.price)}</p>

                <div className="mt-8 flex gap-3">
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex-1 rounded-xl bg-[var(--gold)] py-3 text-center text-[var(--ink)]"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="rounded-xl border px-5"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
