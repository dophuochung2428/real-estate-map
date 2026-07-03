import { NextRequest, NextResponse } from "next/server";
import { searchComparableProperties } from "@/services/valuation.server";

export async function POST(request: NextRequest) {
  const form = await request.json();

  const data = await searchComparableProperties(form);

  return NextResponse.json(data);
}
