import { Compass, Home, MapPin, Square } from "lucide-react";

import { PROPERTY_TYPE_LABEL, DIRECTION_LABEL } from "@/constants/property";

export default function PropertyInfo({ property }: { property: any }) {
  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-[var(--card)] shadow-xl">
      {/* TOP */}
      <div className="border-b border-white/10 p-8">
        <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
          {property.title}
        </h1>

        <div className="mt-4 flex items-center gap-2 text-sm text-white/50">
          <MapPin size={16} />
          <span>{property.address}</span>
        </div>

        <div className="mt-6 flex items-end gap-3">
          <p className="text-4xl font-extrabold tracking-tight text-red-500">
            {property.price?.toLocaleString()}đ
          </p>
          <span className="pb-1 text-sm text-white/40">Giá bán</span>
        </div>
      </div>

      {/* FEATURES */}
      <div className="grid grid-cols-2 gap-5 p-8 lg:grid-cols-4">
        <FeatureCard
          icon={<Square size={22} />}
          label="Diện tích"
          value={`${property.area || 0} m²`}
        />

        <FeatureCard
          icon={<Compass size={22} />}
          label="Hướng"
          value={
            property.direction
              ? DIRECTION_LABEL[
                  property.direction as keyof typeof DIRECTION_LABEL
                ]
              : "Đang cập nhật"
          }
        />

        <FeatureCard
          icon={<Home size={22} />}
          label="Loại hình"
          value={
            property.type
              ? PROPERTY_TYPE_LABEL[
                  property.type as keyof typeof PROPERTY_TYPE_LABEL
                ]
              : "Bất động sản"
          }
        />

        <FeatureCard
          icon={<MapPin size={22} />}
          label="Khu vực"
          value={property.district || "Đang cập nhật"}
        />
      </div>

      {/* DESCRIPTION */}
      <div className="border-t border-white/10 p-8">
        <h2 className="text-2xl font-bold text-white">Thông tin mô tả</h2>

        <div className="mt-6 whitespace-pre-line leading-8 text-white/65">
          {property.description || "Chưa có mô tả cho bất động sản này."}
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="group min-w-0 rounded-[28px] border border-white/10 bg-white/[0.03] p-5 transition duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-white/[0.05] hover:shadow-2xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-500/10 text-red-500 transition group-hover:scale-110">
        {icon}
      </div>

      <div className="mt-5 min-w-0">
        <p className="text-sm text-white/50">{label}</p>

        <p className="mt-2 truncate text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
