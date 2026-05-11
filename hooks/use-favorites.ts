"use client";

import { useEffect, useState } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // LOAD
  useEffect(() => {
    const saved = localStorage.getItem("favorites");

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // SAVE
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // TOGGLE
  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      }

      return [...prev, propertyId];
    });
  };

  // CHECK
  const isFavorite = (propertyId: string) => {
    return favorites.includes(propertyId);
  };

  return {
    favorites,

    toggleFavorite,

    isFavorite,
  };
}
