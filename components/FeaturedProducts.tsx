import ProductCard from "@/components/ProductCard";

interface Props {
  products: any[];
  title?: string;
  subtitle?: string;
  filter?: "featured" | "newArrival" | "bestseller";
  limit?: number;
}

export default function FeaturedProducts({
  products,
  title = "Featured Collection",
  subtitle = "Curated Selection",
  filter = "featured",
  limit = 8,
}: Props) {
  const filteredProducts =
    products?.filter((product) => product?.[filter]).slice(0, limit) || [];

  if (!filteredProducts.length) return null;

  return (
    <section className="bg-[#f7f5ef] py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mb-10 md:mb-14">
          <p className="mb-4 text-[11px] uppercase tracking-[0.4em] text-gray-500">
            {subtitle}
          </p>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight">
            {title}
          </h2>

          <p className="mt-5 max-w-2xl text-sm sm:text-base text-gray-600 leading-7">
            Explore our handpicked selection of premium products from trusted
            global brands.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
