"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { buildSearchQuery } from "@/lib/search/build-query";

import { parseSearchQuery } from "@/lib/search/parse-query";

import { Filters } from "@/types/filter";

export function useSearchQuery() {
  const router = useRouter();

  const pathname = usePathname();

  const searchParams = useSearchParams();

  const filters = parseSearchQuery(
    new URLSearchParams(searchParams.toString()),
  );

  const updateFilters = (newFilters: Filters) => {
    const query = buildSearchQuery(newFilters);

    router.push(`${pathname}?${query}`);
  };

  return {
    filters,

    updateFilters,
  };
}
