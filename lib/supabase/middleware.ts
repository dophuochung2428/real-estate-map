import { createServerClient as createServerSupabaseClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment",
  );
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerSupabaseClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  // lấy user hiện tại
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // chưa login
  if (!user) {
    return {
      response,
      hasSession: false,
    };
  }

  // check status
  const { data: profile } = await supabase
    .from("profiles")
    .select("status")
    .eq("id", user.id)
    .single();

  // nếu bị khóa
  if (profile?.status === "suspended") {
    const redirectResponse = NextResponse.redirect(
      new URL("/login", request.url),
    );

    // xóa cookies auth
    request.cookies.getAll().forEach((cookie) => {
      if (cookie.name.startsWith("sb-")) {
        redirectResponse.cookies.delete(cookie.name);
      }
    });

    return {
      response: redirectResponse,
      hasSession: false,
    };
  }

  return {
    response,
    hasSession: true,
  };
}
