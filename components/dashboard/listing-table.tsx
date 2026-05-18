import Image from "next/image";

import ListingActions from "./listing-actions";

export default function ListingTable({ listings }: { listings: any[] }) {
  return (
    <div className="overflow-hidden rounded-3xl bg-[var(--card)] shadow-sm">
      <table className="w-full">
        <thead className="border-b bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left">Tin đăng</th>

            <th className="px-6 py-4 text-left">Giá</th>

            <th className="px-6 py-4 text-left">Trạng thái</th>

            <th className="px-6 py-4 text-left">Hành động</th>
          </tr>
        </thead>

        <tbody>
          {listings.map((property) => {
            const thumbnail = property.property_images?.find(
              (img: any) => img.is_thumbnail,
            );

            return (
              <tr key={property.id} className="border-b">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={
                        thumbnail?.image_url || "https://placehold.co/200x150"
                      }
                      alt={property.title}
                      width={120}
                      height={80}
                      className="rounded-xl object-cover"
                    />

                    <div>
                      <h3 className="font-semibold">{property.title}</h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {property.address}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 font-semibold text-red-600">
                  {property.price?.toLocaleString()}đ
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    {property.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <ListingActions propertyId={property.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
