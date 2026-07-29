import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { brandQuery } from "@/sanity/lib/queries";

export default async function BrandsPage() {
  const brands = await client.fetch(brandQuery);

  // ✅ শুধু স্লাগ-ওয়ালা ব্র্যান্ড রাখুন
  const validBrands = brands?.filter((brand: any) => brand.slug?.current) || [];

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-[var(--muted)]">
            GLOBAL BRANDS
          </p>
          <h1 className="font-[Cormorant_Garamond] text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] md:text-7xl">
            Discover Brands
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Explore internationally trusted brands carefully selected for
            authenticity, quality and a premium shopping experience.
          </p>
        </div>

        {validBrands.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-[Cormorant_Garamond] text-4xl font-semibold text-[var(--ink)]">
              No Brands Yet
            </h2>
            <p className="mt-5 text-[var(--muted)]">
              Premium brands will appear here soon.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-px bg-[var(--stone)] md:grid-cols-2 xl:grid-cols-3">
            {validBrands.map((brand: any) => (
              <Link
                key={brand._id}
                href={`/brands/${brand.slug.current}`}
                className="group bg-white p-10 transition-all duration-300 hover:bg-[var(--ink)]"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--muted)] transition-colors group-hover:text-white/60">
                  Brand
                </p>
                <h2 className="mt-5 font-[Cormorant_Garamond] text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)] transition-colors group-hover:text-white">
                  {brand.name}
                </h2>
                <p className="mt-8 text-sm uppercase tracking-[0.28em] text-[var(--muted)] transition-colors group-hover:text-white/70">
                  Explore Brand →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
