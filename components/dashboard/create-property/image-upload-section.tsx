"use client";

import { ImagePlus } from "lucide-react";

export default function ImageUploadSection() {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Hình ảnh</h2>

      {/* DROPZONE */}
      <label className="flex h-[300px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 transition hover:border-red-600">
        <ImagePlus className="mb-5 size-14 text-gray-400" />

        <h3 className="mb-2 text-2xl font-bold">Upload hình ảnh</h3>

        <p className="text-gray-500">PNG, JPG tối đa 10MB</p>

        <input type="file" multiple className="hidden" />
      </label>
    </div>
  );
}
