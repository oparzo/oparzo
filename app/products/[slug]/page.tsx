import { client } from "@/sanity/lib/client";
import { productBySlugQuery, relatedProductsQuery } from "@/sanity/lib/queries";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import { notFound } from "next/navigation";

// ✅ ISR – বিল্ড টাইমে প্রোডাক্ট স্লাগ প্রি-রেন্ডার (শুধু স্লাগ-ওয়ালা)
export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product"]{ slug }`);
  return products
    .filter((product: any) => product.slug?.current) // ✅ null slug বাদ
    .map((product: any) => ({
      slug: product.slug.current,
    }));
}

// ✅ প্রোডাক্ট ডিটেইল পেজ
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
