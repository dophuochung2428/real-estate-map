export const PRICE_RANGES = [
  { label: "-- Mức giá --", min: undefined, max: undefined },
  { label: "Dưới 500 triệu", min: 0, max: 500e6 },
  { label: "500tr - 1 tỷ", min: 500e6, max: 1e9 },
  { label: "1 - 2 tỷ", min: 1e9, max: 2e9 },
  { label: "2 - 3 tỷ", min: 2e9, max: 3e9 },
  { label: "3 - 5 tỷ", min: 3e9, max: 5e9 },
  { label: "5 - 10 tỷ", min: 5e9, max: 10e9 },
  { label: "10 - 15 tỷ", min: 10e9, max: 15e9 },
  { label: "15 - 20 tỷ", min: 15e9, max: 20e9 },
  { label: "Trên 20 tỷ", min: 20e9, max: undefined },
];

export const AREA_RANGES = [
  { label: "-- Diện tích --", min: undefined, max: undefined },
  { label: "Dưới 50m²", min: 0, max: 50 },
  { label: "50 - 100m²", min: 50, max: 100 },
  { label: "100 - 200m²", min: 100, max: 200 },
  { label: "Trên 200m²", min: 200, max: undefined },
];