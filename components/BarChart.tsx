interface BarChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  maxValue?: number;
}

export default function BarChart({ data, maxValue = 20 }: BarChartProps) {
  return (
    <div className="flex items-end gap-4 h-64">
      {data.map((item) => (
        <div key={item.label} className="flex flex-col items-center gap-2">
          <div
            className={`${item.color} rounded-t`}
            style={{
              width: "48px",
              height: `${(item.value / maxValue) * 180}px`,
            }}
          />
          <span className="text-sm text-gray-600">{item.label}</span>
          <span className="text-xs text-gray-500">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
