import { formatCurrency } from "@/lib/format";

type PriceProps = {
  price: number;
  comparePrice?: number | null;
};

export default function Price({ price, comparePrice }: PriceProps) {
  const hasDiscount = comparePrice != null && comparePrice > price;

  const saveAmount = hasDiscount ? comparePrice - price : 0;

  const savePercent = hasDiscount
    ? Math.round((saveAmount / comparePrice) * 100)
    : 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xl sm:text-2xl font-semibold text-[var(--ink)]">
          {formatCurrency(price)}
        </span>

        {hasDiscount && (
          <span className="text-sm sm:text-base text-gray-400 line-through">
            {formatCurrency(comparePrice)}
          </span>
        )}
      </div>

      {hasDiscount && (
        <p className="mt-1 text-xs sm:text-sm text-green-700">
          Save {formatCurrency(saveAmount)} ({savePercent}% OFF)
        </p>
      )}
    </div>
  );
}
