import { z } from "zod";
import { strongPasswordSchema } from "./password-schema";

export const signUpSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(3, "Username tối thiểu 3 ký tự")
      .max(20)
      .regex(/^[a-z0-9_]+$/, "Username chỉ gồm chữ thường, số và dấu _"),

    email: z.string().email("Email không hợp lệ"),

    phone: z.string().regex(/^(0|\+84)[0-9]{9}$/, "Số điện thoại không hợp lệ"),

    password: strongPasswordSchema,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
