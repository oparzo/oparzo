export default function StockBadge({
  stock,
}: {
  stock: number;
}) {
  if (stock <= 0) {
    return (
      <span className="inline-flex rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
        Out of Stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
        Only {stock} Left
      </span>
    );
  }

  return (
    <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
      In Stock
    </span>
  );
}
