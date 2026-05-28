import { NextResponse } from "next/server";
import { getAdminProperties } from "@/features/admin/properties/server/get-admin-properties";

export async function GET() {
  try {
    const properties = await getAdminProperties();

    return NextResponse.json(properties);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
