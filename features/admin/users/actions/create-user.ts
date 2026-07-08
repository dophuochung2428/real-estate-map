"use server";

import { headers } from "next/headers";
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

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");
  const protocol = headerList.get("x-forwarded-proto") ?? "https";
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  const origin = siteUrl || (host ? `${protocol}://${host}` : "http://localhost:3000");
  const redirectUrl = new URL("/auth/callback", origin);
  redirectUrl.searchParams.set("next", "/set-password");

  await createUserService({
    email,
    full_name,
    role,
    redirectTo: redirectUrl.toString(),
  });

  revalidatePath("/admin/users");
}
