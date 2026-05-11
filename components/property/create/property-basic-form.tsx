type Props = {
  form: any;

  setForm: any;
};

export default function PropertyBasicForm({ form, setForm }: Props) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Thông tin cơ bản</h2>

      <div className="grid gap-5">
        {/* TITLE */}
        <div>
          <label className="mb-2 block font-medium">Tiêu đề</label>

          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Nhập tiêu đề..."
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none focus:ring-4 focus:ring-red-100"
          />
        </div>

        {/* PRICE */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Giá</label>

            <input
              value={form.price}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              placeholder="3 tỷ..."
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Diện tích</label>

            <input
              value={form.area}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  area: e.target.value,
                }))
              }
              placeholder="120m²..."
              className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
            />
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="mb-2 block font-medium">Địa chỉ</label>

          <input
            value={form.address}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            placeholder="Địa chỉ..."
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
