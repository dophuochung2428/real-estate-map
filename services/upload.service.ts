import { createClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";

export async function uploadPropertyImage(file: File) {
  const MAX_SIZE = 10 * 1024 * 1024;

  if (!file.type.startsWith("image/")) {
    throw new Error("File không hợp lệ");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Ảnh tối đa 10MB");
  }

  // 👉 OPTIMIZED COMPRESSION (WebP)
  const compressedFile = await imageCompression(file, {
    maxSizeMB: 0.3, // ép nhỏ hơn nữa (quan trọng)
    maxWidthOrHeight: 1600, // giảm kích thước ảnh (quan trọng)
    useWebWorker: true,
    fileType: "image/webp", // ép luôn WebP
  });

  const supabase = createClient();

  // fallback an toàn
  const isWebp = compressedFile.type === "image/webp";
  const fileExt = isWebp ? "webp" : compressedFile.type.split("/")[1];

  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `properties/${fileName}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(filePath, compressedFile, {
      contentType: compressedFile.type,
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
