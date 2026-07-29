import { client } from "@/sanity/lib/client";

export default async function sitemap() {
  const baseUrl = "https://oparzo.com";

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/brands`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/concierge`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/bulk-orders`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic product pages – শুধু স্লাগ-ওয়ালা
  const products = await client.fetch(`
    *[_type == "product"]{
      slug,
      _updatedAt
    }
  `);

  const productPages = products
    .filter((product: any) => product.slug?.current) // ✅ slug থাকলেই নেব
    .map((product: any) => ({
      url: `${baseUrl}/products/${product.slug.current}`,
      lastModified: new Date(product._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  // Dynamic category pages – শুধু স্লাগ-ওয়ালা
  const categories = await client.fetch(`
    *[_type == "category"]{
      slug,
      _updatedAt
    }
  `);

  const categoryPages = categories
    .filter((category: any) => category.slug?.current)
    .map((category: any) => ({
      url: `${baseUrl}/category/${category.slug.current}`,
      lastModified: new Date(category._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  // Dynamic brand pages – শুধু স্লাগ-ওয়ালা
  const brands = await client.fetch(`
    *[_type == "brand"]{
      slug,
      _updatedAt
    }
  `);

  const brandPages = brands
    .filter((brand: any) => brand.slug?.current)
    .map((brand: any) => ({
      url: `${baseUrl}/brands/${brand.slug.current}`,
      lastModified: new Date(brand._updatedAt),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

  return [...staticPages, ...productPages, ...categoryPages, ...brandPages];
}
