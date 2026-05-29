"use server";

import { createServerClient } from "@/lib/supabase/server";
import { updateUserStatus } from "./server/update-user-status";

export async function suspendUser(id: string) {
  try {
    const supabase = await createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.id === id) {
      return {
        success: false,
        message: "Không thể khóa chính tài khoản của bạn",
      };
    }

    await updateUserStatus(id, "suspended");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Không thể khóa tài khoản",
    };
  }
}

export async function activateUser(id: string) {
  try {
    await updateUserStatus(id, "active");

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Không thể mở khóa tài khoản",
    };
  }
}
