import { NextResponse } from "next/server";
import { uploadPropertyImage } from "@/services/upload.service";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file" }, { status: 400 });
  }

  const result = await uploadPropertyImage(file);

  return NextResponse.json(result);
}
