"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
type UploadImage = {
  image_url: string;
  image_key: string;
  is_thumbnail: boolean;
};

export function useImageUpload() {
  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState<UploadImage[]>([]);

  const uploadImages = async (files: FileList) => {
    try {
      setLoading(true);

      const uploaded = await Promise.all(
        Array.from(files).map(async (file) => {
          const compressedFile = await imageCompression(file, {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
            fileType: "image/webp",
          });

          const formData = new FormData();
          formData.append("file", compressedFile);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();

          return {
            image_url: data.url,
            image_key: data.key,
            is_thumbnail: false,
          };
        }),
      );

      setImages((prev) => {
        const isFirstUpload = prev.length === 0;

        const formatted = uploaded.map((img, index) => ({
          ...img,
          is_thumbnail: isFirstUpload && index === 0,
        }));

        return [...prev, ...formatted];
      });
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (imageKey: string, imageUrl: string) => {
    setImages((prev) => prev.filter((img) => img.image_url !== imageUrl));
  };

  const setThumbnail = (imageUrl: string) => {
    setImages((prev) =>
      prev.map((img) => ({
        ...img,

        is_thumbnail: img.image_url === imageUrl,
      })),
    );
  };

  return {
    images,

    loading,

    uploadImages,

    removeImage,

    setThumbnail,

    setImages,
  };
}
