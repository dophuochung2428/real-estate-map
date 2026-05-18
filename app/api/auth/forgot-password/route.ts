import { NextResponse } from "next/server";
import { z } from "zod";

import { createServerClient } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email("Email không hợp lệ"),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: result.error.issues[0]?.message || "Dữ liệu không hợp lệ." },
      { status: 400 },
    );
  }

  const redirectTo = `${new URL(request.url).origin}/reset-password`;
  const supabase = await createServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(result.data.email, {
    redirectTo,
  });

  if (error) {
    return NextResponse.json(
      { message: "Không thể gửi yêu cầu đặt lại mật khẩu." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Yêu cầu đặt lại mật khẩu đã được gửi." });
}
