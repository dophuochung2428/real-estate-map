import Image from "next/image";

export default function PropertyPopup({ property }: { property: any }) {
  const thumbnail = property.property_images?.find(
    (img: any) => img.is_thumbnail,
  );

  return (
    <div className="w-[260px] overflow-hidden rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-sm">
      {/* IMAGE */}
      <Image
        src={thumbnail?.image_url || "https://placehold.co/400x300"}
        alt={property.title}
        width={400}
        height={300}
        className="h-[160px] w-full object-cover"
      />

      {/* CONTENT */}
      <div className="p-3">
        <h3 className="line-clamp-2 font-semibold text-[var(--heading)]">{property.title}</h3>

        <p className="mt-2 text-lg font-bold text-[var(--primary)]">
          {property.price?.toLocaleString()}đ
        </p>

        <p className="mt-2 text-sm text-[var(--text-muted)]">{property.address}</p>
      </div>
    </div>
  );
}
