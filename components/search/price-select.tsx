import { PRICE_RANGES } from "@/constants/filter";

type Props = {
  minPrice?: number;

  maxPrice?: number;

  onChange: (value: { minPrice?: number; maxPrice?: number }) => void;
};

export default function PriceSelect({ minPrice, onChange }: Props) {
  return (
    <select
      value={
        minPrice !== undefined
          ? PRICE_RANGES.findIndex((r) => r.min === minPrice).toString()
          : "0"
      }
      className="h-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] outline-none transition hover:border-[var(--primary)]"
      onChange={(e) => {
        const range = PRICE_RANGES[Number(e.target.value)];

        onChange({
          minPrice: range.min,
          maxPrice: range.max,
        });
      }}
    >
      {PRICE_RANGES.map((opt, idx) => (
        <option key={idx} value={idx}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
