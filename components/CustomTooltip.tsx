type CustomTooltipProps = {
  active?: boolean;
  payload?: any[];
  label?: string;
  usePercentage: boolean;
};

export const CustomTooltip = ({
  active,
  payload,
  label,
  usePercentage,
}: CustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="rounded-xl bg-black/80 px-4 py-3 text-white shadow-lg">
      <p className="mb-2 text-sm font-semibold">{label}</p>

      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="flex-1">{entry.name}</span>
            <span className="font-medium">
              {usePercentage
                ? `${entry.value.toFixed(2)}%`
                : Number(entry.value).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
