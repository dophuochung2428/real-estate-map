import { Property } from "@/types/property";

type Props = {
  property: Property;
};

export default function PropertyMap({ property }: Props) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-5 text-2xl font-bold">Vị trí</h2>

      <div className="h-[420px] rounded-3xl bg-gray-200" />
    </div>
  );
}
