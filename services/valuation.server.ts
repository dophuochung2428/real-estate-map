import { createServerClient } from "@/lib/supabase/server";

import { ValuationSearchForm } from "@/types/valuation";

import { filterComparableProperties } from "@/lib/valuation/filter";

export async function searchComparableProperties(form: ValuationSearchForm) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.from("properties").select("*");

  if (error) {
    throw error;
  }

  return filterComparableProperties(data ?? [], form);
}
