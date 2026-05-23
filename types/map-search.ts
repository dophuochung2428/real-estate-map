export type MapSearchResult = {
  lat: number;
  lng: number;

  geojson?: GeoJSON.GeoJsonObject;

  boundingbox?: string[];

  type?: string;
};
