"use client";

import { useState } from "react";

import { toast } from "sonner";

import { createProperty } from "@/services/property.service";

import { propertySchema } from "@/validations/property.schema";

import { z } from "zod";

import PropertyBasicForm from "@/components/property/create/property-basic-form";

import PropertyImageUpload from "@/components/property/create/property-image-upload";

import PropertyMapPicker from "@/components/property/create/property-map-picker";

import PropertyPreviewCard from "@/components/property/create/property-preview-card";

type UploadImage = {
  image_url: string;
  is_thumbnail: boolean;
};

export default function CreatePropertyPage() {
  const [form, setForm] = useState({
    title: "",

    price: "",

    area: "",

    address: "",

    province: "",

    district: "",

    type: "",

    direction: "",

    images: [] as UploadImage[],

    lat: 10.0452,

    lng: 105.7469,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      // VALIDATE
      propertySchema.parse(form);

      // CREATE
      await createProperty(form);

      toast.success("Đăng tin thành công");
    } catch (err) {
      if (err instanceof z.ZodError) {
        toast.error(err.issues[0]?.message);
        return;
      }

      toast.error("Không thể đăng tin");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] p-6">
      <div className="mx-auto max-w-7xl">
        {/* TOP */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Đăng tin bất động sản</h1>

          <p className="mt-2 text-[var(--muted)]">
            Tạo bài đăng chuyên nghiệp giống Batdongsan
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            <PropertyBasicForm form={form} setForm={setForm} />

            <PropertyImageUpload form={form} setForm={setForm} />

            <PropertyMapPicker form={form} setForm={setForm} />
          </div>

          {/* RIGHT */}
          <div>
            <PropertyPreviewCard
              form={form}
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
