
import { z } from "zod";
import { appraisalSchema } from "./appraisal.schema";

const basePropertySchema = z.object({
  title: z.string().trim().min(10, "Vui lòng nhập tiêu đề"),

  price: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập giá")
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v), {
      message: "Giá không hợp lệ",
    })
    .refine((v) => v > 0, {
      message: "Giá phải lớn hơn 0",
    }),

  area: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập diện tích")
    .transform((v) => Number(v))
    .refine((v) => !isNaN(v), {
      message: "Diện tích không hợp lệ",
    })
    .refine((v) => v > 0, {
      message: "Diện tích phải lớn hơn 0",
    }),

  address: z.string().trim().min(5, "Vui lòng nhập địa chỉ"),

  province: z.string().trim().min(1, "Chọn tỉnh/thành"),

  district: z.string().trim().min(1, "Chọn quận/huyện"),

  type: z.string().trim().min(1, "Chọn loại bất động sản"),

  direction: z.string().nullable().optional(),

  description: z.string().trim().min(20, "Mô tả tối thiểu 20 ký tự"),

  lat: z
    .number({
      message: "Thiếu tọa độ",
    })
    .refine((v) => v !== 0, {
      message: "Không xác định được vị trí",
    }),

  lng: z
    .number({
      message: "Thiếu tọa độ",
    })
    .refine((v) => v !== 0, {
      message: "Không xác định được vị trí",
    }),

  images: z
    .array(
      z.object({
        image_url: z.string(),

        image_key: z.string().optional(),

        is_thumbnail: z.boolean(),

        is_new: z.boolean().optional(),

        file: z.any().optional(),
      }),
    )
    .min(1, "Phải có ít nhất 1 ảnh"),
});

// Merge appraisal fields so they are preserved during validation
export const propertySchema = basePropertySchema.merge(appraisalSchema);
