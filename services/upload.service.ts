import { createClient } from "@/lib/supabase/client";

export async function uploadPropertyImage(file: File) {
  const MAX_SIZE = 10 * 1024 * 1024;

  if (!file.type.startsWith("image/")) {
    throw new Error("File không hợp lệ");
  }

  if (file.size > MAX_SIZE) {
    throw new Error("Ảnh tối đa 10MB");
  }

  const supabase = createClient();
  const fileExt = file.name.split(".").pop();

  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const filePath = `properties/${fileName}`;

  const { error } = await supabase.storage
    .from("property-images")
    .upload(filePath, file);

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("property-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
