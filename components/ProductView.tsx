"use client";

import { useMemo, useState } from "react";

import WishlistButton from "@/components/WishlistButton";
import AddToBag from "@/components/AddToBag";
import ProductGallery from "@/components/ProductGallery";
import ProductTrust from "@/components/ProductTrust";
import BrandInfo from "@/components/BrandInfo";
import Price from "@/components/Price";
import StockBadge from "@/components/StockBadge";
import { formatVariantLabel } from "@/lib/format";

export default function ProductView({
  product,
}: {
  product: any;
}) {
  const variants = product.variants ?? [];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = variants[selectedIndex];

  const price = selected?.price ?? 0;
  const comparePrice = selected?.comparePrice;
  const stock = selected?.stock ?? 0;

  const label = useMemo(
    () => formatVariantLabel(selected),
    [selected]
  );

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">

          <ProductGallery images={product.images} />

          <div>

            <div className="flex items-start justify-between gap-6">

              <div>

                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--muted)]">
                  {product.brand}
                </p>

                <h1 className="mt-5 font-[Cormorant_Garamond] text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] lg:text-6xl">
                  {product.name}
                </h1>

              </div>

              <WishlistButton product={product} />

            </div>

            <div className="mt-8">
              <StockBadge stock={stock} />
            </div>

            <div className="mt-8">
              <Price
                price={price}
                comparePrice={comparePrice}
              />
            </div>

            {label && (
              <p className="mt-3 text-[15px] text-[var(--muted)]">
                {label}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-3">{variants.map((variant: any, index: number) => (

                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`min-w-[90px] border px-5 py-3 text-sm transition ${
                    selectedIndex === index
                      ? "border-[var(--gold)] bg-[var(--ink)] text-white"
                      : "border-[var(--stone)] bg-white text-[var(--ink)] hover:border-[var(--gold)]"
                  }`}
                >
                  {[
                    variant.volume,
                    variant.weight,
                    variant.size,
                    variant.color,
                    variant.shade,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </button>

              ))}
            </div>

            <div className="mt-10">
              <AddToBag
                product={product}
                variant={selected}
              />
            </div>

            <div className="mt-8 rounded-sm border border-[var(--stone)] bg-[var(--surface)] p-6">

              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                Cash on Delivery
              </p>

              <p className="mt-3 leading-7 text-[var(--ink)]">
                Pay only after receiving your order. Every order is verified
                before dispatch and backed by our concierge support.
              </p>

            </div>

            <div className="mt-14">

              <h2 className="font-[Cormorant_Garamond] text-3xl font-semibold">
                Product Description
              </h2>

              <p className="mt-5 leading-8 text-[var(--muted)]">
                {product.description}
              </p>

            </div><BrandInfo
              brand={product.brand}
              description={product.brandDescription}
            />

            <ProductTrust />

            <div className="mt-14 rounded-sm border border-[var(--stone)] bg-white p-8">

              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--muted)]">
                Shipping & Returns
              </p>

              <div className="mt-6 space-y-4 text-[var(--ink)]">

                <p>
                  • Authentic products sourced from trusted international retailers.
                </p>

                <p>
                  • Bangladesh-wide delivery with order confirmation before dispatch.
                </p>

                <p>
                  • Concierge support available before and after purchase.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section></main>
  );
}
