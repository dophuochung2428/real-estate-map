"use client";

import { Heart } from "lucide-react";

import { useFavorites } from "@/hooks/use-favorites";

export default function FavoriteButton({ propertyId }: { propertyId: string }) {
  const {
    isFavorite,

    toggleFavorite,
  } = useFavorites();

  const active = isFavorite(propertyId);

  return (
    <button
      onClick={() => toggleFavorite(propertyId)}
      className={`flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl transition ${
        active
          ? "bg-red-600 text-white"
          : "bg-white/80 text-gray-700 hover:bg-white"
      }`}
    >
      <Heart size={18} fill={active ? "currentColor" : "none"} />
    </button>
  );
}
