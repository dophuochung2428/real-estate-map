export default function BasicInfoSection() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Thông tin cơ bản</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* TITLE */}
        <div className="md:col-span-2">
          <label className="mb-3 block font-semibold">Tiêu đề</label>

          <input
            placeholder="Nhập tiêu đề..."
            className="h-14 w-full rounded-2xl border px-5 outline-none focus:border-red-600"
          />
        </div>

        {/* TYPE */}
        <div>
          <label className="mb-3 block font-semibold">Loại hình</label>

          <select className="h-14 w-full rounded-2xl border px-5 outline-none">
            <option>Chung cư</option>
            <option>Nhà riêng</option>
            <option>Biệt thự</option>
          </select>
        </div>

        {/* AREA */}
        <div>
          <label className="mb-3 block font-semibold">Diện tích</label>

          <input
            placeholder="120m²"
            className="h-14 w-full rounded-2xl border px-5 outline-none"
          />
        </div>

        {/* ADDRESS */}
        <div className="md:col-span-2">
          <label className="mb-3 block font-semibold">Địa chỉ</label>

          <input
            placeholder="Nhập địa chỉ..."
            className="h-14 w-full rounded-2xl border px-5 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
