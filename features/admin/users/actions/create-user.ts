"use server";

import { revalidatePath } from "next/cache";

import { createUserService } from "../server/create-user";

export async function createUserAction(formData: FormData) {
  const email = formData.get("email") as string;

  const full_name = formData.get("full_name") as string;

  const role = formData.get("role") as "admin" | "staff" | "customer";

  // VALIDATION
  if (!email || !full_name) {
    throw new Error("Thiếu dữ liệu");
  }

  await createUserService({
    email,
    full_name,
    role,
  });

  revalidatePath("/admin/users");
}
