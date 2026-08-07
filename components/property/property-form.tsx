"use client";

import { useState } from "react";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import dynamic from "next/dynamic";

import PropertyBasicForm from "@/components/property/create/property-basic-form";

import PropertyImageUpload from "@/components/property/create/property-image-upload";

import PropertyPreviewCard from "@/components/property/create/property-preview-card";

import { propertySchema } from "@/validations/property.schema";

import {
  createProperty,
  updateProperty,
  updateAppraisal,
} from "@/services/property.service";

import { CreatePropertyPayload } from "@/types/create-property";
import { uploadImage, deleteImage } from "@/services/image-upload.service";
import PropertyAppraisalFields from "@/components/property/create/property-appraisal-fields";

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
  // appraisal defaults
  contact_name: "",
  contact_phone: "",
  legal_status: null,
  business_advantage: null,
  environment: "",
  land_area_type: null, // "ODT" | "ONT" | "LUC" | "BHK" | "CLN"
  land_area: "",
  frontage_width: "",
  max_depth: "",
  land_shape: "",
  asset_on_land: "",
  structure: "",
  floors: "",
  usable_floor_area: "",
  remaining_value_ratio: "",
  construction_unit_price: "",
  resolution_land_price: "",
  odt_land_price: "",
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
        const uploadedImages: any[] = [];

        const uploadedKeys: string[] = [];

        try {
          for (const image of result.data.images) {
            if (!image.file) {
              uploadedImages.push(image);

              continue;
            }

            const uploaded = await uploadImage(image.file);

            uploadedKeys.push(uploaded.key);

            uploadedImages.push({
              image_url: uploaded.url,
              image_key: uploaded.key,
              is_thumbnail: image.is_thumbnail,
            });
          }

          const payload = {
            ...result.data,
            images: uploadedImages,
          };

          const property = await createProperty(payload);

          toast.success("Đăng tin thành công");

          router.push(`/properties/${property.id}`);
        } catch (error) {
          await Promise.all(uploadedKeys.map((key) => deleteImage(key)));

          throw error;
        }
      }

      // EDIT
      else {
        const uploadedImages: any[] = [];

        const uploadedKeys: string[] = [];

        try {
          for (const image of result.data.images) {
            if (!image.is_new) {
              uploadedImages.push(image);

              continue;
            }

            const uploaded = await uploadImage(image.file);

            uploadedKeys.push(uploaded.key);

            uploadedImages.push({
              image_url: uploaded.url,
              image_key: uploaded.key,
              is_thumbnail: image.is_thumbnail,
            });
          }

          const payload = {
            ...result.data,
            images: uploadedImages,
          };

          await updateProperty(initialData.id, payload);

          // If appraisal fields changed, call updateAppraisal to preserve appraisal update logic
          const appraisalFields = [
            "contact_name",
            "contact_phone",
            "legal_status",
            "business_advantage",
            "environment",
            "land_area_type",
            "land_area",
            "frontage_width",
            "max_depth",
            "land_shape",
            "asset_on_land",

            "structure",
            "floors",
            "usable_floor_area",
            "remaining_value_ratio",
            "construction_unit_price",
            "resolution_land_price",
            "odt_land_price",
          ];

          const hasAppraisalChanged = appraisalFields.some((f) => {
            const before = initialData?.[f] ?? "";
            const after = (payload as any)[f] ?? "";

            // Normalize boolean/nulls and strings for comparison
            return String(before) !== String(after);
          });

          if (hasAppraisalChanged) {
            const appraisalPayload: any = {};

            appraisalFields.forEach((f) => {
              if (typeof (payload as any)[f] !== "undefined") {
                appraisalPayload[f] = (payload as any)[f];
              }
            });

            await updateAppraisal(initialData.id, appraisalPayload);
          }

          toast.success("Cập nhật thành công");

          router.push("/dashboard/properties");
        } catch (error) {
          await Promise.all(uploadedKeys.map((key) => deleteImage(key)));

          throw error;
        }
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

          {mode === "create" && (
            <p className="mt-2 text-sm text-green-400/80">
              Bạn có thể nhập cả thông tin thẩm định ở bên dưới trước khi gửi.
            </p>
          )}
        </div>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div className="space-y-6">
            <PropertyBasicForm
              form={form}
              setForm={setForm}
              errors={errors}
              mode={mode}
            />

            <PropertyImageUpload form={form} setForm={setForm} />

            <PropertyMapPicker form={form} setForm={setForm} />

            {/* Appraisal fields included for both create and edit flows */}
            <PropertyAppraisalFields form={form} setForm={setForm} />
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
