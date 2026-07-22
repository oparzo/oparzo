export default function BrandInfo({
  brand,
  description,
}: {
  brand: string;
  description?: string;
}) {
  if (!description) return null;

  return (
    <section className="mt-12 rounded-2xl border bg-white p-6">
      <h3 className="text-xl font-semibold">
        About {brand}
      </h3>

      <p className="mt-4 leading-8 text-gray-600">
        {description}
      </p>
    </section>
  );
}
