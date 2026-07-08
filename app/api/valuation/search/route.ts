import { NextRequest, NextResponse } from "next/server";
import { searchComparableProperties } from "@/services/valuation.server";

export async function POST(request: NextRequest) {
  const form = await request.json();

  const data = await searchComparableProperties(form);

  console.table(
    data.slice(0, 10).map((item: any, index: number) => ({
      rank: index + 1,
      score: item.score,
      district: item.district,
      province: item.province,
      area: item.area,
    })),
  );

  return NextResponse.json(data);
}
