"use client";

import { useState } from "react";

import { uploadPropertyImage } from "@/services/upload.service";

type UploadImage = {
  image_url: string;
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
          const url = await uploadPropertyImage(file);

          return {
            image_url: url,
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

  const removeImage = (imageUrl: string) => {
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
