interface BarChartProps {
  data: Array<{ label: string; value: number }>;
  color?: string;
  height?: number;
}

export default function BarChart({ data, color = "#AD8A45", height = 200 }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {data.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-2 flex-1">
          <div
            className="w-full rounded-t transition-all duration-500"
            style={{
              height: `${(item.value / maxValue) * 100}%`,
              backgroundColor: color,
              minHeight: 4,
            }}
          />
          <span className="text-[10px] text-gray-500 truncate w-full text-center">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}
