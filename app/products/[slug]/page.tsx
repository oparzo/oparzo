import { client } from "@/sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";

// ✅ পেজটি ডায়নামিক – বিল্ড টাইমে প্রি-রেন্ডার হবে না
export const dynamic = 'force-dynamic';

// ✅ generateStaticParams সরানো হয়েছে – এখন আর প্রি-রেন্ডার হবে না

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await client.fetch(productBySlugQuery, { slug });
  if (!product) notFound();

  // 🛡️ নিরাপত্তা: slug অবজেক্ট না থাকলে 404 দেখান
  if (!product.slug || !product.slug.current) {
    notFound();
  }

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
