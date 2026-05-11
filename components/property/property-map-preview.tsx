import { Property } from "@/types/property";

export default function PropertyMapPreview({
  property,
}: {
  property: Property;
}) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-4 text-2xl font-bold">Vị trí</h2>

      <div className="h-[350px] rounded-3xl bg-gray-200" />

      <p className="mt-4 text-gray-500">{property.address}</p>
    </div>
  );
}
