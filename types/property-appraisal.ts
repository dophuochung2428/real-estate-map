import { LandAreaItem } from "./property";

export type BusinessAdvantage = "low" | "normal" | "other" | "high";

export interface PropertyAppraisalPayload {
  contact_name: string;
  contact_phone: string;

  legal_status: boolean | null;
  business_advantage: BusinessAdvantage | null;

  environment: string;
  landAreas: LandAreaItem[];
  frontage_width: string;
  max_depth: string;
  land_shape: string;
  asset_on_land: string;
}
