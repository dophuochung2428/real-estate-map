import { provinces } from "@/constants/location";

type Props = {
  value: string;

  onChange: (value: string) => void;
};

export default function ProvinceSelect({
  value,

  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="
        h-12
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        px-4
        outline-none
      "
    >
      <option value="">Tỉnh / Thành phố</option>

      {provinces.map((province) => (
        <option key={province} value={province}>
          {province}
        </option>
      ))}
    </select>
  );
}
