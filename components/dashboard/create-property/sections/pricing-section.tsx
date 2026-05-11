export default function PricingSection() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold">Giá bán</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {/* PRICE */}
        <div>
          <label className="mb-3 block font-semibold">Giá</label>

          <input
            placeholder="3.2"
            className="h-14 w-full rounded-2xl border px-5 outline-none"
          />
        </div>

        {/* UNIT */}
        <div>
          <label className="mb-3 block font-semibold">Đơn vị</label>

          <select className="h-14 w-full rounded-2xl border px-5 outline-none">
            <option>Tỷ</option>
            <option>Triệu</option>
          </select>
        </div>

        {/* NEGOTIABLE */}
        <div>
          <label className="mb-3 block font-semibold">Hình thức</label>

          <select className="h-14 w-full rounded-2xl border px-5 outline-none">
            <option>Bán</option>
            <option>Cho thuê</option>
          </select>
        </div>
      </div>
    </div>
  );
}
