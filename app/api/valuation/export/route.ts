import { NextResponse } from "next/server";

import { buildValuationWorkbook } from "@/lib/excel/build-valuation-workbook";

export async function POST(req: Request) {
  const { form, comparables, negotiationRatios, adjustmentData } =
    await req.json();

  const workbook = await buildValuationWorkbook(
    form,
    comparables,
    negotiationRatios,
    adjustmentData,
  );

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

      "Content-Disposition": 'attachment; filename="tham-dinh-gia.xlsx"',
    },
  });
}
