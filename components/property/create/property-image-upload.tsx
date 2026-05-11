"use client";

import Image from "next/image";

import { Upload, Star, Trash2 } from "lucide-react";

import { useImageUpload } from "@/hooks/use-image-upload";

import { useEffect } from "react";

type Props = {
  form: any;

  setForm: any;
};

export default function PropertyImageUpload({
  form,

  setForm,
}: Props) {
  const {
    images,

    loading,

    uploadImages,

    removeImage,

    setThumbnail,
  } = useImageUpload();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    await uploadImages(e.target.files);
  };

  useEffect(() => {
    setForm((prev: any) => ({
      ...prev,

      images,
    }));
  }, [images, setForm]);

  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Hình ảnh</h2>

      {/* UPLOAD */}
      <label className="flex h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-[var(--border)] transition hover:border-red-400">
        <Upload size={42} className="mb-4 text-gray-400" />

        <p className="font-semibold">
          {loading ? "Đang upload..." : "Upload hình ảnh"}
        </p>

        <p className="mt-2 text-sm text-gray-500">Chọn nhiều ảnh</p>

        <input
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </label>

      {/* PREVIEW */}
      {images.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
          {images.map((image) => (
            <div
              key={image.image_url}
              className="group relative overflow-hidden rounded-2xl"
            >
              <Image
                src={image.image_url}
                alt="Property"
                width={400}
                height={300}
                className="h-[180px] w-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 flex items-start justify-between bg-black/40 p-3 opacity-0 transition group-hover:opacity-100">
                {/* THUMBNAIL */}
                <button
                  onClick={() => setThumbnail(image.image_url)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    image.is_thumbnail
                      ? "bg-yellow-400 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Star
                    size={18}
                    fill={image.is_thumbnail ? "currentColor" : "none"}
                  />
                </button>

                {/* DELETE */}
                <button
                  onClick={() => removeImage(image.image_url)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* BADGE */}
              {image.is_thumbnail && (
                <div className="absolute left-3 top-3 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold text-black">
                  Thumbnail
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
