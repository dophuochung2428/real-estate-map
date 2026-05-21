"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

import PropertyBasicForm from "@/components/property/create/property-basic-form";

import PropertyImageUpload from "@/components/property/create/property-image-upload";

import PropertyPreviewCard from "@/components/property/create/property-preview-card";

import { propertySchema } from "@/validations/property.schema";

import { createProperty, updateProperty } from "@/services/property.service";

import { CreatePropertyPayload } from "@/types/create-property";

const PropertyMapPicker = dynamic(
  () => import("@/components/property/create/property-map-picker"),
  {
    ssr: false,
  },
);

type Props = {
  mode: "create" | "edit";

  initialData?: any;
};

const initialForm: CreatePropertyPayload = {
  title: "",
  price: "",
  area: "",
  address: "",
  province: "",
  district: "",
  type: "",
  direction: null,
  lat: 0,
  lng: 0,
  description: "",
  amenities: [],
  images: [],
};

export default function PropertyForm({ mode, initialData }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<any>(
    initialData
      ? {
          ...initialData,

          price: String(initialData.price ?? ""),

          area: String(initialData.area ?? ""),
        }
      : initialForm,
  );

  const [submitting, setSubmitting] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const normalizedForm = {
        ...form,
        direction: form.direction ?? null,
      };

      const result = propertySchema.safeParse(normalizedForm);

      if (!result.success) {
        const fieldErrors: Record<string, string> = {};

        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;

          fieldErrors[field] = issue.message;
        });

        setErrors(fieldErrors);

        setSubmitting(false);

        return;
      }

      setErrors({});

      // CREATE
      if (mode === "create") {
        const property = await createProperty(result.data);

        toast.success("Đăng tin thành công");

        router.push(`/properties/${property.id}`);
      }

      // EDIT
      else {
        await updateProperty(initialData.id, result.data);

        toast.success("Cập nhật thành công");

        router.push("/dashboard/properties");
      }
    } catch (err) {
      console.log(err);

      toast.error(
        mode === "create" ? "Không thể đăng tin" : "Không thể cập nhật",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] p-6">
      <div className="mx-auto max-w-7xl">
        {/* TOP */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            {mode === "create"
              ? "Đăng tin bất động sản"
              : "Chỉnh sửa bất động sản"}
          </h1>

          <p className="mt-2 text-[var(--muted)]">
            {mode === "create"
              ? "Tạo bài đăng Batdongsan"
              : "Cập nhật thông tin bài đăng"}
          </p>
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
