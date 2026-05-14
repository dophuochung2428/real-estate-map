type Props = {
  value: string;

  onChange: (value: string) => void;
};

export default function SortSelect({
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
      <option value="">Sắp xếp</option>

      <option value="price_asc">Giá tăng dần</option>

      <option value="price_desc">Giá giảm dần</option>

      <option value="area_desc">Diện tích lớn</option>
    </select>
  );
}
