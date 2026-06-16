import { NextResponse } from "next/server";
import { deletePropertyImage } from "@/services/upload.service";

export async function POST(req: Request) {
  const { key } = await req.json();

  await deletePropertyImage(key);

  return NextResponse.json({ success: true });
}
