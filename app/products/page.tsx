import { client } from "@/sanity/lib/client";
import { productsQuery } from "@/sanity/lib/queries";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage() {
  const products = await client.fetch(productsQuery);

  return (
    <main className="bg-[var(--cream)]">
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.45em] text-[var(--muted)]">
            CURATED COLLECTION
          </p>

          <h1 className="font-[Cormorant_Garamond] text-5xl font-semibold leading-[1.02] tracking-[-0.03em] text-[var(--ink)] md:text-7xl">
            All Products
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Explore authentic international products carefully selected for
            quality, originality and a premium shopping experience.
          </p>
        </div>

        <div className="mt-12 flex items-center justify-between border-b border-[var(--stone)] pb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--muted)]">
            {products.length} Products
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-32 text-center">
            <h2 className="font-[Cormorant_Garamond] text-4xl font-semibold text-[var(--ink)]">
              No Products Yet
            </h2>

            <p className="mt-5 text-[var(--muted)]">
              Our curated collection will be available soon.
            </p>
          </div>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
