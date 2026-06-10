"use server";

import { createServerClient } from "@/lib/supabase/server";
import { updateUserStatus } from "./server/update-user-status";
import { supabaseAdmin } from "@/lib/supabase/service";

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

export async function changeUserPassword(id: string, password: string) {
  try {
    const supabase = await createServerClient();

    // 1. get current user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    // 2. không cho tự đổi chính mình (optional rule của bạn)
    if (user.id === id) {
      return {
        success: false,
        message: "Không thể đổi mật khẩu chính tài khoản của bạn",
      };
    }

    // 3. check role đúng bảng profiles
    const { data: currentUser, error: roleError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (roleError || !currentUser) {
      return {
        success: false,
        message: "Không thể xác thực quyền",
      };
    }

    if (currentUser.role !== "admin") {
      return {
        success: false,
        message: "Bạn không có quyền thực hiện thao tác này",
      };
    }

    // 4. update password bằng SERVICE ROLE (admin client)
    const { error } = await supabaseAdmin.auth.admin.updateUserById(id, {
      password,
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Không thể đổi mật khẩu",
    };
  }
}
