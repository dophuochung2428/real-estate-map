import Link from "next/link";

import Container from "@/components/layout/container";

type Property = {
  district?: string;

  province?: string;
};

type Props = {
  properties: Property[];
};

function buildLocations(properties: Property[]) {
  const map = new Map<string, number>();

  properties.forEach((property) => {
    const locationKey = property.district || property.province;

    if (!locationKey) return;

    map.set(locationKey, (map.get(locationKey) || 0) + 1);
  });

  return Array.from(map.entries())
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 6);
}

export default function LocationSection({ properties }: Props) {
  const locations = buildLocations(properties);

  return (
    <section className="py-14">
      <Container>
        <div className="mb-8">
          <div className="mb-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">
              Khu vực nổi bật
            </span>
          </div>

          <h2 className="text-3xl font-bold">
            Khám phá bất động sản theo khu vực
          </h2>

          <p className="mt-2 text-gray-500">
            Những khu vực đang có tin đăng mới nhất trên hệ thống
          </p>
        </div>

        {locations.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            Chưa có dữ liệu khu vực
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {locations.map((location) => (
              <Link
                key={location.name}
                href={`/map?district=${encodeURIComponent(location.name)}`}
                className="
    group
    relative
    h-[320px]
    cursor-pointer
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    shadow-lg
  "
              >
                {/* IMAGE */}
                <div
                  className="
  absolute
  inset-0
  bg-cover
  bg-center
  transition-all
  duration-700
  ease-out
  group-hover:scale-110
"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1600&auto=format&fit=crop)",
                  }}
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* CONTENT */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <span
                    className="
      mb-3
      inline-flex
      rounded-full
      bg-white/20
      px-3
      py-1
      text-xs
      font-medium
      backdrop-blur-md
    "
                  >
                    Mới cập nhật
                  </span>

                  <h3 className="mb-1 text-2xl font-bold">{location.name}</h3>

                  <p className="text-sm text-white/80">
                    {location.total} tin đăng
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
