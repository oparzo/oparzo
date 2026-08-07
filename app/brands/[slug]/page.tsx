import { client } from "@/sanity/lib/client";

import ProductCard from "@/components/ProductCard";

import { productsByBrandQuery, brandBySlugQuery } from "@/sanity/lib/queries";

import { notFound } from "next/navigation";

export default async function BrandPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const brand = await client.fetch(
    brandBySlugQuery,

    {
      slug,
    }
  );

  if (!brand) {
    notFound();
  }

  const products = await client.fetch(
    productsByBrandQuery,

    {
      slug,
    }
  );

  return (
    <main>
      <section
        className="
bg-[#f7f5ef]
py-24
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
"
        >
          <p
            className="
text-xs
tracking-[0.5em]
uppercase
text-gray-500
mb-6
"
          >
            Featured Brand
          </p>

          <h1
            className="
text-6xl
md:text-8xl
font-serif
"
          >
            {brand.name}
          </h1>

          <p
            className="
mt-8
max-w-2xl
text-gray-600
text-lg
"
          >
            {brand.description}
          </p>
        </div>
      </section>

      <section
        className="
max-w-7xl
mx-auto
px-6
py-24
"
      >
        <h2
          className="
text-5xl
font-serif
mb-12
"
        >
          Collection
        </h2>

        <div
          className="
grid
grid-cols-2
md:grid-cols-4
gap-8
"
        >
          {!products || products.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">
              No products from this brand yet.
            </p>
          ) : (
            products.map((product: any) => (
              <ProductCard
                key={product._id}

                product={product}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
