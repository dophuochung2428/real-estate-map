export interface PropertyAppraisalPayload {
  contact_name: string;
  contact_phone: string;

  legal_status: boolean | null;

  business_advantage: boolean | null;

  environment: string;

  land_area_type: "ODT" | "ONT" | "LUC" | "BHK" | "CLN" | null;
  land_area: string;

  frontage_width: string;

  max_depth: string;

  land_shape: string;

  asset_on_land: string;
}
