"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { toggleFavorite } from "@/services/favorite.service";

type Props = {
  propertyId: string;
};

export default function FavoriteButton({ propertyId }: Props) {
  const [loading, setLoading] = useState(false);

  const [liked, setLiked] = useState(false);

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      setLoading(true);

      const result = await toggleFavorite(propertyId);

      setLiked(result);

      toast.success(result ? "Đã lưu tin" : "Đã bỏ lưu");
    } catch {
      toast.error("Vui lòng đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`
        flex
        h-11
        w-11
        items-center
        justify-center
        rounded-full
        backdrop-blur-xl
        transition
        ${
          liked
            ? "bg-red-600 text-white"
            : "bg-white/80 text-gray-700 hover:bg-white"
        }
      `}
    >
      <Heart size={18} fill={liked ? "currentColor" : "none"} />
    </button>
  );
}
