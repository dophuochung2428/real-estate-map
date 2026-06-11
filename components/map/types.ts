import { Property } from "@/types/property";

import { GeoFilter } from "@/types/geo-filter";

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

  highlightGeoJson?: any;

  geoFilter: GeoFilter;

  onLocateUser: () => void;

  onRadiusChange: (radius: number) => void;

  showRadiusPanel: boolean;

  onHideRadiusPanel: () => void;
};
