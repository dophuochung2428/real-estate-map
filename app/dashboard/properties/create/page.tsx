"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { createProperty } from "@/services/property.service";

import { propertySchema } from "@/validations/property.schema";

import { z } from "zod";

import PropertyBasicForm from "@/components/property/create/property-basic-form";

import PropertyImageUpload from "@/components/property/create/property-image-upload";

import PropertyPreviewCard from "@/components/property/create/property-preview-card";

import { CreatePropertyPayload } from "@/types/create-property";

import dynamic from "next/dynamic";

const PropertyMapPicker = dynamic(
  () => import("@/components/property/create/property-map-picker"),
  {
    ssr: false,
  },
);

type UploadImage = {
  image_url: string;
  is_thumbnail: boolean;
};

const initialForm: CreatePropertyPayload = {
  title: "",
  price: "",
  area: "",
  address: "",
  province: "",
  district: "",
  type: "",
  direction: "",
  lat: 0,
  lng: 0,
  description: "",
  amenities: [],
  images: [],
};

export default function CreatePropertyPage() {
  const router = useRouter();

  const [form, setForm] = useState<CreatePropertyPayload>(initialForm);

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      console.log("FORM DATA:", form);

      const result = propertySchema.safeParse(form);

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};

        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;

          fieldErrors[field] = issue.message;
        });

        setErrors(fieldErrors);

        return;
      }

      setErrors({});

      const property = await createProperty(form);

      console.log("CREATED:", property);

      setForm(initialForm);

      router.push(`/properties/${property.id}`);

      toast.success("Đăng tin thành công");
    } catch (err) {
      console.log("ERROR:", err);

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

          <p className="mt-2 text-[var(--muted)]">Tạo bài đăng Batdongsan</p>
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            <PropertyBasicForm form={form} setForm={setForm} errors={errors} />

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
