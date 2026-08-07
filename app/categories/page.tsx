import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { categoryQuery } from "@/sanity/lib/queries";

export default async function CategoriesPage() {
  const categories = await client.fetch(categoryQuery);

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-[var(--muted)]">
            EXPLORE
          </p>

          <h1 className="font-[Cormorant_Garamond] text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] md:text-7xl">
            Categories
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Browse thoughtfully curated categories featuring authentic
            international products selected for quality, performance and
            everyday luxury.
          </p>
        </div>

        {!categories || categories.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-[Cormorant_Garamond] text-4xl font-semibold text-[var(--ink)]">
              No Categories Yet
            </h2>

            <p className="mt-5 text-[var(--muted)]">
              Categories will appear here once they are published.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid gap-px bg-[var(--stone)] md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="group bg-white p-10 transition-all duration-300 hover:bg-[var(--ink)]"
              >
                <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--muted)] transition-colors group-hover:text-white/60">
                  Category
                </p>

                <h2 className="mt-5 font-[Cormorant_Garamond] text-4xl font-semibold tracking-[-0.03em] text-[var(--ink)] transition-colors group-hover:text-white">
                  {category.name}
                </h2>

                <p className="mt-8 text-sm uppercase tracking-[0.28em] text-[var(--muted)] transition-colors group-hover:text-white/70">
                  Explore Collection →
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
