import Link from "next/link";
import { Product } from "@/types/product";

export default function BrandInfo({ product }: { product: Product }) {
  if (!product.brand) return null;

  return (
    <div className="border-t border-[var(--stone)] pt-6 mt-6">
      <h3 className="text-sm font-medium">About {product.brand}</h3>
      {product.brandDescription && (
        <p className="mt-2 text-sm text-gray-600">{product.brandDescription}</p>
      )}
      <Link
        href={`/brands/${product.brandSlug}`}
        className="mt-3 inline-block text-sm text-[var(--gold)] hover:underline"
      >
        View all {product.brand} products →
      </Link>
    </div>
  );
}
