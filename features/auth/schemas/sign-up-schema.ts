import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu tối thiểu 8 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất một chữ số")
  .regex(/[^A-Za-z0-9]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt");

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

    password: passwordSchema,

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });
