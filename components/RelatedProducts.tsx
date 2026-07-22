import ProductCard from "@/components/ProductCard";

export default function RelatedProducts({
  products,
}: {
  products: any[];
}) {
  if (!products?.length) return null;

  return (
    <section className="mt-24">

      <h2 className="text-3xl font-serif mb-10">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

    </section>
  );
}
