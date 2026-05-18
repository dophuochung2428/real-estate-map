import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(10),

  price: z.string().min(1),

  area: z.string().min(1),

  address: z.string().min(5),

  province: z.string().min(1),

  district: z.string().min(1),

  type: z.string().min(1),

  direction: z.string().min(1),

  description: z.string().min(20),

  images: z
    .array(
      z.object({
        image_url: z.string(),
        is_thumbnail: z.boolean(),
      }),
    )
    .min(1),
});
