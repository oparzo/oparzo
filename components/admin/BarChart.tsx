interface BarChartProps {
  data: any[];
  labelKey: string;
  valueKey: string;
  formatValue?: (value: any) => string;
  color?: string;
  height?: number;
}

export default function BarChart({
  data,
  labelKey,
  valueKey,
  formatValue = (v) => v,
  color = "#AD8A45",
  height = 200,
}: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => Number(d[valueKey])), 1);

  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {data.map((item, idx) => {
        const label = item[labelKey];
        const value = Number(item[valueKey]);
        return (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1">
            <div
              className="w-full rounded-t transition-all duration-500"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: color,
                minHeight: 4,
              }}
            />
            <span className="text-[10px] text-gray-500 truncate w-full text-center">
              {label}
            </span>
            {formatValue && (
              <span className="text-[9px] text-gray-400">
                {formatValue(value)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
