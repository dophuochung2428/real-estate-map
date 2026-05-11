import L from "leaflet";

export function formatPrice(price: number) {
  if (price >= 1_000_000_000) {
    return `${(price / 1_000_000_000).toFixed(1)} tỷ`;
  }

  if (price >= 1_000_000) {
    return `${Math.round(price / 1_000_000)}tr`;
  }

  return price.toString();
}

export function createMarkerIcon(price: number) {
  return L.divIcon({
    html: `
      <div class="group relative">
        <div
          class="
            rounded-full
            bg-white
            px-4
            py-2
            shadow-xl
            border
            border-gray-200
            text-sm
            font-bold
            text-red-600
            transition-all
          "
        >
          ${formatPrice(price)}
        </div>

        <div
          class="
            absolute
            left-1/2
            top-full
            h-3
            w-3
            -translate-x-1/2
            rotate-45
            bg-white
            border-r
            border-b
            border-gray-200
          "
        />
      </div>
    `,
    className: "",

    iconSize: [90, 40],

    iconAnchor: [45, 40],
  });
}
