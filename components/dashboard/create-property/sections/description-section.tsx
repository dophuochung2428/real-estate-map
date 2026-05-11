export default function DescriptionSection() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Mô tả chi tiết</h2>

      <textarea
        rows={10}
        placeholder="Nhập mô tả..."
        className="w-full rounded-3xl border p-5 outline-none focus:border-red-600"
      />
    </div>
  );
}
