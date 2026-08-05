import { client } from "@/sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";

// ✅ বিল্ড টাইমে শুধুমাত্র বৈধ স্লাগগুলো প্রি-রেন্ডার করুন
export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product"]{ slug }`);
  // 🔥 শুধুমাত্র সেই প্রোডাক্টগুলো নিন যাদের slug আছে (null বাদ দিন)
  return products
    .filter((product: any) => product.slug?.current)
    .map((product: any) => ({
      slug: product.slug.current,
    }));
}

// ✅ প্রোডাক্ট ডিটেইল পেজ (ডায়নামিক)
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
