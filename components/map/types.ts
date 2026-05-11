import { Property } from "@/types/property";

export type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export type MapViewProps = {
  data: Property[];

  onMove: (bounds: Bounds) => void;

  onMapLoad?: (map: import("leaflet").Map) => void;

  onPropertySelect?: (property: Property) => void;
};
