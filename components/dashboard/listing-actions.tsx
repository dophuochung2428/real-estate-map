"use client";

import Link from "next/link";

import { Pencil, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { deleteProperty } from "@/services/property.service";

export default function ListingActions({ propertyId }: { propertyId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Xóa tin đăng?");

    if (!confirmed) {
      return;
    }

    await deleteProperty(propertyId);

    toast.success("Đã xóa tin");

    router.refresh();
  };

  return (
    <div className="flex items-center gap-3">
      <Link
        href={`/dashboard/properties/${propertyId}/edit`}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
        "
      >
        <Pencil size={18} />
      </Link>

      <button
        onClick={handleDelete}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-red-50
          text-red-600
        "
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
