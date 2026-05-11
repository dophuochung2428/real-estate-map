import { z } from "zod";

export const propertySchema = z.object({
  title: z.string().min(10, "Tiêu đề quá ngắn"),

  price: z.string().min(1, "Nhập giá"),

  area: z.string().min(1, "Nhập diện tích"),

  address: z.string().min(5, "Nhập địa chỉ"),

  type: z.string().min(1, "Chọn loại hình"),
});
