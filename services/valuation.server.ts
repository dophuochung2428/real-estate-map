import { createServerClient } from "@/lib/supabase/server";
import { ValuationSearchForm } from "@/types/valuation";
import { filterComparableProperties } from "@/lib/valuation/filter";
import { LandAreaItem, LandAreaType } from "@/types/property";

type PropertyLandAreaRow = {
  id: string;
  property_id: string;
  land_type: LandAreaType;
  area: number | string;
  unit_price: number | string | null;
};

export async function searchComparableProperties(form: ValuationSearchForm) {
  const supabase = await createServerClient();

  const { data, error } = await supabase.from("properties").select(`
      *,
      landAreas:property_land_areas(
        id,
        property_id,
        land_type,
        area,
        unit_price
      )
    `);

  if (error) {
    throw error;
  }

  const properties = (data ?? []).map((property) => ({
    ...property,

    landAreas: ((property.landAreas ?? []) as PropertyLandAreaRow[]).map(
      (landArea): LandAreaItem => ({
        type: landArea.land_type,
        area: Number(landArea.area),
        unit_price:
          landArea.unit_price !== null ? Number(landArea.unit_price) : null,
      }),
    ),
  }));

  return filterComparableProperties(properties, form);
}
