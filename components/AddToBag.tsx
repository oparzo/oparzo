"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";

export default function AddToBag({
  product,
  variant,
}: {
  product: any;
  variant: any;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [stickyVisible, setStickyVisible] = useState(false);

  // Show sticky bar once the main button scrolls out of view
  useEffect(() => {
    const mainBtn = document.getElementById("add-to-bag-main");
    if (!mainBtn) return;

    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(mainBtn);
    return () => observer.disconnect();
  }, []);

  function handleAdd() {
    if (!variant) return;
    addToCart({
      ...product,
      selectedVariant: variant,
      price: variant.price,
      quantity: qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <>
      {/* ── Inline (desktop and top of mobile) ── */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            aria-label="Decrease quantity"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="h-11 w-11 rounded-lg border border-[var(--ink)] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--cream)]"
          >
            −
          </button>

          <span className="w-10 text-center text-lg" aria-live="polite">
            {qty}
          </span>

          <button
            aria-label="Increase quantity"
            onClick={() => setQty(qty + 1)}
            className="h-11 w-11 rounded-lg border border-[var(--ink)] text-[var(--ink)] transition hover:bg-[var(--ink)] hover:text-[var(--cream)]"
          >
            +
          </button>
        </div>

        <button
          id="add-to-bag-main"
          disabled={!variant}
          onClick={handleAdd}
          className="w-full bg-[var(--gold)] py-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--ink)] transition hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {!variant
            ? "Unavailable"
            : added
            ? "Added to Bag ✓"
            : "Add to Bag"}
        </button>
      </div>

      {/* ── Sticky mobile bar — appears when main button scrolls off screen ── */}
      {stickyVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-4 border-t border-[var(--stone)] bg-[var(--cream)] px-6 py-4 lg:hidden">
          <div className="flex items-center gap-3">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="h-10 w-10 border border-[var(--ink)] text-[var(--ink)]"
            >
              −
            </button>

            <span className="w-8 text-center">{qty}</span>

            <button
              aria-label="Increase quantity"
              onClick={() => setQty(qty + 1)}
              className="h-10 w-10 border border-[var(--ink)] text-[var(--ink)]"
            >
              +
            </button>
          </div>

          <button
            disabled={!variant}
            onClick={handleAdd}
            className="flex-1 bg-[var(--gold)] py-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--ink)] disabled:opacity-40"
          >
            {!variant
              ? "Unavailable"
              : added
              ? "Added ✓"
              : "Add to Bag"}
          </button>
        </div>
      )}
    </>
  );
}
