"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Product, Variant } from "@/types/product";

export default function AddToBag({
  product,
  variant,
}: {
  product: Product;
  variant?: Variant;
}) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    if (!variant) return;

    addToCart({
      _id: product._id,
      name: product.name,
      slug: product.slug.current,
      price: variant.price,
      quantity: qty,
      selectedVariant: variant,
      images: product.images,
      brand: product.brand,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={() => setQty(Math.max(1, qty - 1))}
          className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center"
        >
          −
        </button>
        <span className="w-12 text-center">{qty}</span>
        <button
          onClick={() => setQty(qty + 1)}
          className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        disabled={!variant}
        className="bg-[var(--gold)] text-[var(--ink)] px-8 py-3 rounded-lg font-medium transition hover:opacity-85 disabled:opacity-50"
      >
        Add to Bag
      </button>
    </div>
  );
}
