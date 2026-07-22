import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import WishlistButton from "@/components/WishlistButton";
import Price from "@/components/Price";
import { formatVariantLabel } from "@/lib/format";

export default function ProductCard({ product }: any) {
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(900).url()
    : null;

  const variant = product.variants?.[0];
  const variantLabel = formatVariantLabel(variant);

  return (
    <article className="group w-full">
      <Link href={`/products/${product.slug.current}`}>

        <div className="relative aspect-square overflow-hidden border border-[#ece7dc] bg-white">

          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              sizes="(max-width:640px) 50vw,(max-width:1024px) 33vw,25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}

          <div className="absolute right-2 top-2 sm:right-3 sm:top-3">
            <WishlistButton product={product} />
          </div>

        </div>

        <div className="pt-3 sm:pt-4">

          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
            {product.brand}
          </p>

          <h3 className="mt-2 font-serif text-lg sm:text-xl lg:text-2xl leading-tight text-[var(--ink)]">
            {product.name}
          </h3>

          {variantLabel && (
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              {variantLabel}
            </p>
          )}

          <div className="mt-3 text-base sm:text-lg">
            <Price
              price={variant?.price ?? 0}
              comparePrice={variant?.comparePrice}
            />
          </div>

        </div>

      </Link>
    </article>
  );
}
