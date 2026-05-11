import Container from "@/components/layout/container";

export default function HighlightSection() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* BIG */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 to-red-500 p-10 text-white lg:col-span-2">
            <h2 className="mb-4 max-w-xl text-4xl font-bold leading-tight">
              Khám phá hàng ngàn bất động sản chất lượng
            </h2>

            <p className="mb-8 max-w-lg text-white/80">
              Nền tảng tìm kiếm bất động sản hàng đầu Việt Nam.
            </p>

            <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-red-600">
              Khám phá ngay
            </button>
          </div>

          {/* SMALL */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h3 className="mb-5 text-2xl font-bold">Tin mới nhất</h3>

            <div className="space-y-5">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border-b pb-4 last:border-none">
                  <h4 className="mb-2 line-clamp-2 font-semibold">
                    Căn hộ cao cấp view sông trung tâm
                  </h4>

                  <p className="text-sm text-gray-500">5 phút trước</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
