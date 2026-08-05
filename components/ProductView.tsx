import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatVariantLabel } from "@/lib/format";
import AddToBag from "@/components/AddToBag";
import WishlistButton from "@/components/WishlistButton";
import ProductGallery from "@/components/ProductGallery";
import Price from "@/components/Price";
import StockBadge from "@/components/StockBadge";
import BrandInfo from "@/components/BrandInfo";
import { Product, Variant } from "@/types/product";

export default function ProductView({ product }: { product: Product }) {
  const firstVariant: Variant | undefined = product.variants?.[0];

  return (
    <div className="grid grid-cols-1 gap-12 py-12 lg:grid-cols-2">
      {/* Gallery */}
      <ProductGallery images={product.images} />

      {/* Product Info */}
      <div className="space-y-6">
        {/* Brand */}
        {product.brand && (
          <Link
            href={`/brands/${product.brandSlug}`}
            className="text-[11px] uppercase tracking-[0.3em] text-gray-500 hover:text-[var(--gold)] transition"
          >
            {product.brand}
          </Link>
        )}

        {/* Title */}
        <h1 className="font-serif text-4xl sm:text-5xl leading-tight text-[var(--ink)]">
          {product.name}
        </h1>

        {/* Price & Stock */}
        <div className="flex items-center gap-4">
          <Price
            price={firstVariant?.price || 0}
            comparePrice={firstVariant?.comparePrice}
          />
          {/* ✅ stock is now optional, so pass directly */}
          <StockBadge stock={firstVariant?.stock} />
        </div>

        {/* Variants */}
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

        {/* Description */}
        {product.description && (
          <div className="prose prose-sm max-w-none text-gray-600 pt-4">
            <p>{product.description}</p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[var(--stone)]">
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 text-lg">✓</span>
            <span>100% genuine</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 text-lg">✓</span>
            <span>Lowest price guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 text-lg">✓</span>
            <span>Satisfaction guarantee</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <span className="text-green-600 text-lg">✓</span>
            <span>Direct Global Sourcing</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 col-span-2 sm:col-span-1">
            <span className="text-green-600 text-lg">✓</span>
            <span>Quality Checked Before Dispatch</span>
          </div>
        </div>

        {/* Add to Bag & Wishlist */}
        <div className="flex flex-wrap gap-4 pt-6">
          <AddToBag product={product} variant={firstVariant} />
          <WishlistButton product={product} />
        </div>

        {/* Brand Info */}
        <BrandInfo product={product} />
      </div>
    </div>
  );
}
