import { client } from "@/sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";

// ✅ generateStaticParams সরানো হয়েছে – পেজ এখন ডায়নামিক
// Vercel-এ বিল্ড এরর এড়াতে এই সিদ্ধান্ত

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(productBySlugQuery, { slug });
  if (!product) notFound();

  const relatedProducts = await client.fetch(relatedProductsQuery, {
    slug,
    brandSlug: product.brandSlug,
    categorySlug: product.categorySlug,
  });

  return (
    <main className="max-w-7xl mx-auto px-6">
      <ProductView product={product} />
      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
