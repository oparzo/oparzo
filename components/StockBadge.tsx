export default function StockBadge({ stock }: { stock?: number }) {
  if (stock === undefined || stock === null) {
    return null;
  }

  const isInStock = stock > 0;

  return (
    <span
      className={`text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded ${
        isInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
      }`}
    >
      {isInStock ? 'In Stock' : 'Out of Stock'}
    </span>
  );
}
