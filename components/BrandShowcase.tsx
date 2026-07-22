import Link from "next/link";

export default function BrandShowcase({ brands }: any) {
  return (
    <section className="bg-[var(--cream)] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gray-500">
          GLOBAL BRANDS
        </p>

        <h2 className="font-serif text-4xl leading-tight md:text-6xl">
          Discover Brands
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Explore internationally trusted brands, carefully curated for
          authenticity, quality, and a premium shopping experience.
        </p>

        <div className="mt-12 grid grid-cols-2 overflow-hidden border border-[var(--stone)] md:mt-16 md:grid-cols-4">
          {brands?.slice(0, 12).map((brand: any) => (
            <Link
              key={brand._id}
              href={`/brands/${brand.slug.current}`}
              className="
                group
                flex
                h-28
                md:h-40
                items-center
                justify-center
                border-r
                border-b
                border-[var(--stone)]
                bg-white
                p-4
                transition-colors
                duration-300
                hover:bg-[var(--ink)]
              "
            >
              <h3 className="text-center font-serif text-xl md:text-2xl transition-colors group-hover:text-white">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
