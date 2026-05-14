import { districts } from "@/constants/location";

type Props = {
  province: string;

  value: string;

  onChange: (value: string) => void;
};

export default function DistrictSelect({
  province,

  value,

  onChange,
}: Props) {
  const items = districts[province] || [];

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!province}
      className="
        h-12
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        px-4
        outline-none
        disabled:opacity-50
      "
    >
      <option value="">Quận / Huyện</option>

      {items.map((district) => (
        <option key={district} value={district}>
          {district}
        </option>
      ))}
    </select>
  );
}
