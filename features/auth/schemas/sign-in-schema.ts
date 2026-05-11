import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email không hợp lệ"),

  password: z.string().min(6),
});
