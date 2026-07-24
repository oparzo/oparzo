import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import ProductReviews from "@/components/ProductReviews";

import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

import {
  productBySlugQuery,
  relatedProductsQuery,
} from "@/sanity/lib/queries";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(
    productBySlugQuery,
    { slug }
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = await client.fetch(
    relatedProductsQuery,
    {
      slug,
      brandSlug: product.brandSlug,
      categorySlug: product.categorySlug,
    }
  );

  return (
    <main className="max-w-7xl mx-auto px-6">
      <ProductView product={product} />

      {/* Product Reviews */}
      <ProductReviews productSlug={slug} />

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
