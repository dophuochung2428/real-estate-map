import L from "leaflet";

import { formatPrice } from "./price-format";

const getColorByPrice = (price: number, min: number, max: number) => {
  if (min === max) {
    return "#22c55e";
  }

  const ratio = (price - min) / (max - min);

  if (ratio < 0.33) {
    return "#22c55e";
  }

  if (ratio < 0.66) {
    return "#f59e0b";
  }

  return "#ef4444";
};

export const createMarkerIcon = (price: number, min: number, max: number) => {
  const color = getColorByPrice(price, min, max);

  return L.divIcon({
    html: `
      <div class="marker-wrapper">
        <svg viewBox="0 0 24 24" width="40" height="50">
          <path 
            fill="${color}" 
            stroke="white"
            stroke-width="1"
            d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"
          />
          <circle cx="12" cy="9" r="3" fill="white"/>
        </svg>

        <div class="marker-price">
          ${formatPrice(price)}
        </div>
      </div>
    `,
    className: "",
    iconSize: [40, 50],
    iconAnchor: [20, 50],
  });
};
