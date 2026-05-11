import { BedDouble, Compass, MapPin, Square } from "lucide-react";

export default function PropertyInfo({ property }: { property: any }) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      {/* TITLE */}
      <h1 className="text-4xl font-bold">{property.title}</h1>

      {/* PRICE */}
      <p className="mt-4 text-3xl font-bold text-red-600">
        {property.price?.toLocaleString()}đ
      </p>

      {/* ADDRESS */}
      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <MapPin size={18} />

        <span>{property.address}</span>
      </div>

      {/* FEATURES */}
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <FeatureCard
          icon={<Square size={22} />}
          label="Diện tích"
          value={`${property.area}m²`}
        />

        <FeatureCard
          icon={<Compass size={22} />}
          label="Hướng"
          value={property.direction}
        />

        <FeatureCard
          icon={<BedDouble size={22} />}
          label="Loại"
          value={property.type}
        />

        <FeatureCard
          icon={<MapPin size={22} />}
          label="Khu vực"
          value={property.district}
        />
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
    <div className="rounded-2xl bg-gray-50 p-5">
      <div className="mb-3 text-red-600">{icon}</div>

      <p className="text-sm text-gray-500">{label}</p>

      <p className="mt-1 font-semibold">{value}</p>
    </div>
  );
}
