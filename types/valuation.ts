export interface ValuationSearchForm {
  source: string;
  contact: string;

  appraisalDate: string;

  address: string;

  legalStatus: string;

  businessAdvantage: string;

  trafficLocation: string;

  environment: string;

  area: string;

  landAreaType: string;
  landArea: string;

  frontageWidth: string;
  maxDepth: string;

  landShape: string;

  assetOnLand: string;

  latitude: string;
  longitude: string;
}

export interface ValuationDetailForm {
  structure: string;
  floors: string;
  usable_floor_area: string;
  remaining_value_ratio: string;
  construction_unit_price: string;

  price: string;

  negotiation_ratio?: string;

  resolution_land_price: string;
  odt_land_price: string;
}
