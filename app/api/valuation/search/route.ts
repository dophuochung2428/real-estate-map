import { NextRequest, NextResponse } from "next/server";
import { searchComparableProperties } from "@/services/valuation.server";
import { requireAuth } from "@/features/auth/server/require-auth";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth();

    const supabase = await createServerClient();

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "staff") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const form = await request.json();

    const data = await searchComparableProperties(form);

    return NextResponse.json(data);
  } catch (err) {
    console.error("VALUATION SEARCH ERROR", err);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
