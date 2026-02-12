interface PieChartProps {
  data: Array<{ label: string; value: number; color: string }>;
  size?: number;
}

export default function PieChart({ data, size = 200 }: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const segments = data.map((item) => {
    const sliceAngle = (item.value / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;

    const x1 = Math.cos((startAngle * Math.PI) / 180) * (size / 2);
    const y1 = Math.sin((startAngle * Math.PI) / 180) * (size / 2);
    const x2 = Math.cos((endAngle * Math.PI) / 180) * (size / 2);
    const y2 = Math.sin((endAngle * Math.PI) / 180) * (size / 2);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const pathData = [
      `M 0 0`,
      `L ${x1} ${y1}`,
      `A ${size / 2} ${size / 2} 0 ${largeArc} 1 ${x2} ${y2}`,
      "Z",
    ].join(" ");

    currentAngle = endAngle;

    return { pathData, color: item.color, label: item.label, value: item.value };
  });

  const percentage = data.map((item) => ({
    label: item.label,
    percent: Math.round((item.value / total) * 100),
    color: item.color,
  }));

  return (
    <div className="flex items-center gap-8">
      <svg width={size + 20} height={size + 20} viewBox={`${-size / 2 - 10} ${-size / 2 - 10} ${size + 20} ${size + 20}`}>
        {segments.map((segment, index) => (
          <path key={index} d={segment.pathData} fill={segment.color} />
        ))}
      </svg>
      <div className="space-y-2">
        {percentage.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`} />
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className="text-sm font-semibold text-gray-800">{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
