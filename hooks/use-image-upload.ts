"use client";

import { useState } from "react";
import imageCompression from "browser-image-compression";
type UploadImage = {
  file?: File;
  image_url: string;
  image_key?: string;
  is_thumbnail: boolean;
  is_new?: boolean;
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

          return {
            file: compressedFile as File,
            image_url: URL.createObjectURL(compressedFile),
            is_thumbnail: false,
            is_new: true,
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

  const removeImage = (imageKey: string | undefined, imageUrl: string) => {
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
