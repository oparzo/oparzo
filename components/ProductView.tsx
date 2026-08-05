import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { formatCurrency, formatVariantLabel } from "@/lib/format";
import AddToBag from "@/components/AddToBag";
import WishlistButton from "@/components/WishlistButton";
import ProductGallery from "@/components/ProductGallery";
import Price from "@/components/Price";
import StockBadge from "@/components/StockBadge";
import BrandInfo from "@/components/BrandInfo";
import { Product, Variant } from "@/types/product";

export default function ProductView({ product }: { product: Product }) {
  const firstVariant: Variant | undefined = product.variants?.[0];
  const isInStock = firstVariant?.stock && firstVariant.stock > 0;

  return (
    <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-2">
      <ProductGallery images={product.images} />

      <div className="space-y-6">
        {product.brand && (
          <Link
            href={`/brands/${product.brandSlug}`}
            className="text-[11px] uppercase tracking-[0.3em] text-gray-500 hover:text-[var(--gold)] transition"
          >
            {product.brand}
          </Link>
        )}

        <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-[var(--ink)]">
          {product.name}
        </h1>

        <div className="flex items-center gap-4">
          <Price
            price={firstVariant?.price || 0}
            comparePrice={firstVariant?.comparePrice}
          />
          <StockBadge stock={firstVariant?.stock} />
        </div>

        {product.variants && product.variants.length > 0 && (
          <div className="pt-4">
            <p className="text-sm font-medium">Select variant</p>
            <div className="mt-2 flex flex-wrap gap-3">
              {product.variants.map((variant, idx) => (
                <button
                  key={idx}
                  className="border border-[var(--stone)] px-4 py-2 text-sm hover:border-[var(--ink)] transition"
                >
                  {formatVariantLabel(variant)}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.description && (
          <div className="prose prose-sm max-w-none text-gray-600 pt-4">
            <p>{product.description}</p>
          </div>
        )}

        <div className="flex flex-wrap gap-4 pt-6">
          <AddToBag product={product} variant={firstVariant} />
          <WishlistButton product={product} />
        </div>

        <BrandInfo product={product} />
      </div>
    </div>
  );
}
