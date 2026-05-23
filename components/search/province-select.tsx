type Props = {
  provinces: string[];

  value: string;

  onChange: (value: string) => void;
};

export default function ProvinceSelect({ provinces, value, onChange }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 text-sm font-medium text-[var(--foreground)] outline-none transition hover:border-[var(--primary)]"
    >
      <option value="">-- Tỉnh / Thành phố --</option>

      {provinces.map((province) => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </select>
  );
}
