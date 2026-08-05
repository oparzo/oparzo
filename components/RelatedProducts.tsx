import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/types/product";

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-16 border-t border-[var(--stone)]">
      <h2 className="text-2xl font-serif mb-8">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product._id}
            href={`/products/${product.slug.current}`}
            className="group"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white border border-[var(--stone)]">
              {product.images?.[0] && (
                <Image
                  src={urlFor(product.images[0]).width(400).height(400).url()}
                  alt={product.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              )}
            </div>
            <h3 className="mt-3 font-medium text-sm">{product.name}</h3>
            <p className="text-sm text-gray-500">
              {product.variants?.[0]?.price
                ? `$${product.variants[0].price}`
                : "Price on Request"}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
