const properties = [
  {
    title: "Căn hộ cao cấp",
    status: "Đang hiển thị",
    views: "12.4K",
    price: "3.2 tỷ",
  },

  {
    title: "Nhà phố trung tâm",
    status: "Chờ duyệt",
    views: "2.1K",
    price: "5.8 tỷ",
  },
];

export default function PropertiesManagementPage() {
  return (
    <div>
      {/* HEADER */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="mb-2 text-4xl font-bold">Quản lý tin đăng</h1>

          <p className="text-gray-500">Danh sách bất động sản</p>
        </div>

        <button className="rounded-2xl bg-red-600 px-6 py-4 font-semibold text-white">
          Tạo tin mới
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-[#f8f8f8]">
            <tr>
              <th className="px-6 py-5 text-left">Tin đăng</th>

              <th className="px-6 py-5 text-left">Trạng thái</th>

              <th className="px-6 py-5 text-left">Lượt xem</th>

              <th className="px-6 py-5 text-left">Giá</th>

              <th className="px-6 py-5 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {properties.map((property) => (
              <tr key={property.title} className="border-t">
                <td className="px-6 py-5 font-semibold">{property.title}</td>

                <td className="px-6 py-5">
                  <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600">
                    {property.status}
                  </span>
                </td>

                <td className="px-6 py-5">{property.views}</td>

                <td className="px-6 py-5 font-bold text-red-600">
                  {property.price}
                </td>

                <td className="px-6 py-5">
                  <div className="flex gap-3">
                    <button className="rounded-xl border px-4 py-2 text-sm">
                      Sửa
                    </button>

                    <button className="rounded-xl border px-4 py-2 text-sm text-red-600">
                      Xoá
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
