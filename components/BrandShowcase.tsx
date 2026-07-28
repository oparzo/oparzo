import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface Brand {
  _id: string;
  name: string;
  slug: { current: string };
  logo?: any;
  description?: string;
}

export default function BrandShowcase({ brands }: { brands: Brand[] }) {
  if (!brands || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
            GLOBAL BRANDS
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)]">
            Discover Brands
          </h2>
          <p className="mt-3 text-sm text-gray-500 leading-relaxed">
            Explore internationally trusted brands, carefully curated for authenticity,
            quality, and a premium shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands.map((brand) => {
            const logoUrl = brand.logo
              ? urlFor(brand.logo).width(200).height(100).url()
              : null;

            return (
              <Link
                key={brand._id}
                href={`/brands/${brand.slug.current}`}
                className="group block border border-[var(--stone)] rounded-lg p-6 text-center hover:shadow-md transition"
              >
                {logoUrl ? (
                  <div className="relative h-16 w-full">
                    <Image
                      src={logoUrl}
                      alt={brand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-16 flex items-center justify-center text-sm font-medium text-gray-400">
                    {brand.name}
                  </div>
                )}
                <p className="mt-3 text-sm font-medium text-[var(--ink)] group-hover:text-[var(--gold)] transition">
                  {brand.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
