"use client";

// Deliberately dependency-free: a simple CSS-bar chart rather than
// pulling in a charting library sight unseen in an environment where
// `npm install` can't be verified. For the magnitude-comparison charts
// this admin panel needs (revenue/day, top products), this is enough —
// if richer charts (zoom, tooltips, multi-series) are needed later,
// that's a deliberate upgrade, not a default.

export default function BarChart({
  data,
  labelKey,
  valueKey,
  formatValue,
}: {
  data: Record<string, any>[];
  labelKey: string;
  valueKey: string;
  formatValue?: (v: number) => string;
}) {
  const max = Math.max(1, ...data.map((d) => Number(d[valueKey]) || 0));

  return (
    <div className="flex items-end gap-2 h-48">
      {data.map((d, i) => {
        const value = Number(d[valueKey]) || 0;
        const heightPct = (value / max) * 100;

        return (
          <div
            key={i}
            className="flex flex-1 flex-col items-center justify-end gap-2"
          >
            <span className="text-xs text-gray-500">
              {value > 0 ? formatValue?.(value) ?? value : ""}
            </span>

            <div
              className="w-full rounded-t bg-black transition-all"
              style={{ height: `${Math.max(heightPct, value > 0 ? 4 : 0)}%` }}
              title={`${d[labelKey]}: ${value}`}
            />

            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {d[labelKey]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
