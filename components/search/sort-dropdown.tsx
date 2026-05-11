export default function SortDropdown() {
  return (
    <select className="h-11 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 outline-none">
      <option>Mới nhất</option>

      <option>Giá tăng dần</option>

      <option>Giá giảm dần</option>

      <option>Diện tích</option>
    </select>
  );
}
