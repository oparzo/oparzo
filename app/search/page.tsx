"use client";

import { useState } from "react";
import { client } from "@/sanity/lib/client";
import { searchProductsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search(value: string) {
    setTerm(value);

    if (!value.trim()) {
      setProducts([]);
      return;
    }

    setLoading(true);

    const result = await client.fetch(searchProductsQuery, { term: value });

    setProducts(result);
    setLoading(false);
  }

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-[var(--muted)]">
            DISCOVER
          </p>

          <h1 className="font-[Cormorant_Garamond] text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] md:text-7xl">
            Search Collection
          </h1>

          <p className="mt-8 text-lg leading-8 text-[var(--muted)]">
            Search authentic products, trusted brands and curated collections.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl">
          <input
            value={term}
            onChange={(e) => search(e.target.value)}
            placeholder="Search products or brands..."
            className="w-full border-b-2 border-[var(--ink)] bg-transparent py-5 text-2xl outline-none placeholder:text-[var(--muted)]"
          />
        </div>
        {loading && (
          <p className="mt-14 text-center text-[var(--muted)]">Searching...</p>
        )}

        {!loading && term && products.length === 0 && (
          <div className="py-24 text-center">
            <h2 className="font-[Cormorant_Garamond] text-4xl font-semibold text-[var(--ink)]">
              Nothing Found
            </h2>

            <p className="mt-5 text-[var(--muted)]">
              Try another keyword or browse our collections.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
