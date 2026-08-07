import { client } from "@/sanity/lib/client";
import {
  productsQuery,
  brandQuery,
} from "@/sanity/lib/queries";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyShop from "@/components/WhyShop";
import CustomerReviews from "@/components/CustomerReviews";

const categoriesQuery = `
  *[_type=="category"]{
    _id,
    name,
    slug
  }
`;

export default async function Home() {
  // Parallel data fetching – 3x faster than sequential
  const [products, brands, categories] = await Promise.all([
    client.fetch(productsQuery),
    client.fetch(brandQuery),
    client.fetch(categoriesQuery),
  ]);

  return (
    <main>
      <Hero />
      <Categories categories={categories} />
      <BrandShowcase brands={brands} />
      <FeaturedProducts
        products={products}
        filter="newArrival"
        title="New Arrivals"
        subtitle="Just Landed"
      />
      <FeaturedProducts
        products={products}
        filter="featured"
        title="Featured Collection"
        subtitle="Curated Selection"
      />
      <FeaturedProducts
        products={products}
        filter="bestseller"
        title="Best Sellers"
        subtitle="Customer Favorites"
      />
      <WhyShop />
      <CustomerReviews />
    </main>
  );
}
