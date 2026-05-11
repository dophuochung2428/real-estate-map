import { supabase } from "@/lib/supabase";

export async function uploadPropertyImage(file: File) {
  const fileExt = file.name.split(".").pop();

  const fileName = `${Date.now()}.${fileExt}`;

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
