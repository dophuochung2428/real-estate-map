import Image from "next/image";
import { formatPrice } from "@/components/map/utils/price-format";

type Props = {
  form: any;

  onSubmit?: () => void;

  submitting?: boolean;
};

type UploadImage = {
  image_url: string;
  is_thumbnail: boolean;
};

export default function PropertyPreviewCard({
  form,
  onSubmit,
  submitting,
}: Props) {
  return (
    <div className="sticky top-24 rounded-3xl bg-[var(--card)] p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold">Preview</h2>

      <div className="overflow-hidden rounded-3xl bg-[var(--card)] border border-[var(--border)]">
        <div className="relative">
          <Image
            src={
              form.images?.find((img: UploadImage) => img.is_thumbnail)
                ?.image_url || "/images/placeholder.png"
            }
            alt="Preview"
            width={600}
            height={400}
            className="h-[220px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 font-semibold text-[var(--foreground)]">
            {form.title || "Tiêu đề bài đăng"}
          </h3>

          <p className="mt-2 text-lg font-bold text-red-500">
            {form.price ? formatPrice(Number(form.price)) : "Giá"}
          </p>

          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            {form.address || "Địa chỉ"}
          </p>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={submitting}
        className="mt-5 h-12 w-full rounded-2xl bg-red-600 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
      >
        {submitting ? "Đang đăng..." : "Đăng tin"}
      </button>
    </div>
  );
}
