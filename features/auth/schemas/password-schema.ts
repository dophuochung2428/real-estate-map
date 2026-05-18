import { z } from "zod";

export const strongPasswordSchema = z
  .string()
  .min(8, "Mật khẩu tối thiểu 8 ký tự")
  .regex(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ hoa")
  .regex(/[a-z]/, "Mật khẩu phải có ít nhất một chữ thường")
  .regex(/[0-9]/, "Mật khẩu phải có ít nhất một chữ số")
  .regex(/[^A-Za-z0-9]/, "Mật khẩu phải có ít nhất một ký tự đặc biệt");
