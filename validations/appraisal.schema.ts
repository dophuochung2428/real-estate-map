import { z } from "zod";

export const appraisalSchema = z.object({
  contact_name: z.string().optional(),

  contact_phone: z.string().optional(),

  legal_status: z.boolean().nullable().optional(),

  business_advantage: z.boolean().nullable().optional(),

  environment: z.string().optional(),

  land_area_type: z
    .enum(["ODT", "ONT", "LUC", "BHK", "CLN"])
    .nullable()
    .optional(),

  land_area: z.string().optional(),

  frontage_width: z.string().optional(),

  max_depth: z.string().optional(),

  land_shape: z.string().optional(),

  asset_on_land: z.string().optional(),

  structure: z.string().optional(),

  floors: z.string().optional(),

  usable_floor_area: z.string().optional(),

  remaining_value_ratio: z.string().optional(),

  construction_unit_price: z.string().optional(),

  resolution_land_price: z.string().optional(),

  odt_land_price: z.string().optional(),
});
