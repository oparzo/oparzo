import ProductCard from "@/components/ProductCard";
import { Product } from "@/types/product";

interface FeaturedProductsProps {
  products: Product[];
  filter?: "featured" | "newArrival" | "bestseller";
  title: string;
  subtitle: string;
}

export default function FeaturedProducts({
  products,
  filter,
  title,
  subtitle,
}: FeaturedProductsProps) {
  const safeProducts = products || [];

  let filteredProducts = safeProducts;

  if (filter === "featured") {
    filteredProducts = safeProducts.filter((p) => p.featured === true);
  } else if (filter === "newArrival") {
    filteredProducts = safeProducts.filter((p) => p.newArrival === true);
  } else if (filter === "bestseller") {
    filteredProducts = safeProducts.filter((p) => p.bestseller === true);
  }

  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
            {subtitle}
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)]">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
