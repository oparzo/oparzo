import { client } from "@/sanity/lib/client";
import { productsQuery, brandQuery } from "@/sanity/lib/queries";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BrandShowcase from "@/components/BrandShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import WhyShop from "@/components/WhyShop";
import CustomerReviews from "@/components/CustomerReviews";

export default async function Home() {
  const products = await client.fetch(productsQuery);
  const brands = await client.fetch(brandQuery);
  const categories = await client.fetch(`
    *[_type=="category"]{ _id, name, slug }
  `);

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
