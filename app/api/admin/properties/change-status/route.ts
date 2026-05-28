import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  pending: ["active", "rejected"],
  active: ["sold"],
  sold: ["active"],
  rejected: ["pending"],
};

export async function PATCH(req: Request) {
  const supabase = await createServerClient();

  const { id, status } = await req.json();

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 },
    );
  }

  // 1. check user login
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. get current property
  const { data: property, error: fetchError } = await supabase
    .from("properties")
    .select("id, status")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !property) {
    return NextResponse.json({ error: "Property not found" }, { status: 404 });
  }

  // 3. validate transition
  const allowedNext = ALLOWED_TRANSITIONS[property.status] || [];

  if (!allowedNext.includes(status)) {
    return NextResponse.json(
      {
        error: `Cannot change status from ${property.status} to ${status}`,
      },
      { status: 400 },
    );
  }

  // 4. update property
  const { data: updatedProperty, error: updateError } = await supabase
    .from("properties")
    .update({
      status,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select(
      `
    *,
    owner:profiles (
      id,
      full_name,
      email
    ),
    property_images (
      image_url,
      is_thumbnail
    )
  `,
    )
    .maybeSingle();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  // 5. audit log
  await supabase.from("property_status_logs").insert({
    property_id: id,
    old_status: property.status,
    new_status: status,
    changed_by: user.id,
  });

  return NextResponse.json({
    success: true,
    property: updatedProperty,
  });
}
