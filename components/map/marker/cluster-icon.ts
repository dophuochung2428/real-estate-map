import L from "leaflet";

export function createClusterIcon(count: number) {
  let size = 50;

  if (count > 50) {
    size = 60;
  }

  if (count > 100) {
    size = 70;
  }

  return L.divIcon({
    html: `
      <div
        class="
          flex
          items-center
          justify-center
          rounded-full
          bg-red-600
          text-white
          font-bold
          shadow-2xl
          border-4
          border-white
        "
        style="
          width:${size}px;
          height:${size}px;
        "
      >
        ${count}
      </div>
    `,
    className: "",

    iconSize: [size, size],
  });
}
