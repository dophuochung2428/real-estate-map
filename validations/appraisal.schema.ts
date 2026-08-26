import { z } from "zod";

export const appraisalSchema = z.object({
  source: z.string().optional(),

  state_unit_price: z.number().nullable().optional(),
  contact_name: z.string().optional(),
  contact_phone: z.string().optional(),

  legal_status: z.boolean().nullable().optional(),
  business_advantage: z.boolean().nullable().optional(),

  environment: z.string().optional(),

  landAreas: z
    .array(
      z.object({
        type: z.enum(["ODT", "ONT", "LUC", "BHK", "CLN"]),
        area: z.number().min(0, "Diện tích không hợp lệ"),
        unit_price: z.number().nullable().optional(),
      }),
    )
    .min(1, "Phải có ít nhất 1 loại đất"),

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
});
