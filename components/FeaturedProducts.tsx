import ProductCard from "@/components/ProductCard";

interface FeaturedProductsProps {
  products: any[];
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
  // Filter products based on the filter prop
  let filteredProducts = products;

  if (filter === "featured") {
    filteredProducts = products.filter((p) => p.featured === true);
  } else if (filter === "newArrival") {
    filteredProducts = products.filter((p) => p.newArrival === true);
  } else if (filter === "bestseller") {
    filteredProducts = products.filter((p) => p.bestseller === true);
  }

  // If no products match the filter, don't render the section
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-gray-500">
            {subtitle}
          </p>
          <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl text-[var(--ink)]">
            {title}
          </h2>
        </div>

        {/* Product Grid - Responsive: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
