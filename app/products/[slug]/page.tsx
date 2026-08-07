import { client } from "@/sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";

// ✅ পেজটি সম্পূর্ণ ডায়নামিক – কখনো প্রি-রেন্ডার হবে না
export const dynamic = "force-dynamic";
export const dynamicParams = false; // অজানা প্যারামিটারের জন্য 404

// ❌ generateStaticParams সম্পূর্ণ সরানো হয়েছে

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // প্রোডাক্ট ফেচ করুন
  const product = await client.fetch(productBySlugQuery, { slug });
  if (!product) notFound();

  // 🛡️ নিরাপত্তা: slug না থাকলে 404
  if (!product.slug || !product.slug.current) {
    notFound();
  }

  // সম্পর্কিত প্রোডাক্ট ফেচ করুন – শুধু যাদের slug আছে
  const relatedProductsRaw = await client.fetch(relatedProductsQuery, {
    slug,
    brandSlug: product.brandSlug,
    categorySlug: product.categorySlug,
  });

  // ✅ null slug-ওয়ালা প্রোডাক্ট বাদ দিন
  const relatedProducts = relatedProductsRaw.filter(
    (p: any) => p.slug?.current
  );

  return (
    <main className="max-w-7xl mx-auto px-6">
      <ProductView product={product} />
      {relatedProducts.length > 0 && (
        <RelatedProducts products={relatedProducts} />
      )}
    </main>
  );
}
