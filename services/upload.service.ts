import imageCompression from "browser-image-compression";
import { r2 } from "@/lib/r2/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function uploadPropertyImage(file: File) {
  const fileName = `${crypto.randomUUID()}.webp`;
  const filePath = `properties/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();

  await r2.send(
    new PutObjectCommand({
      Bucket: "property-images",
      Key: filePath,
      Body: Buffer.from(arrayBuffer),
      ContentType: "image/webp",
    }),
  );

  const publicUrl = `${process.env.R2_PUBLIC_URL}/${filePath}`;

  return {
    url: publicUrl,
    key: filePath,
  };
}

export async function deletePropertyImage(filePath: string) {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: "property-images",
      Key: filePath,
    }),
  );
}
