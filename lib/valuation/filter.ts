import { Property } from "@/types/property";

import { ValuationSearchForm } from "@/types/valuation";

import { calculateScore } from "./score";

export function filterComparableProperties(
  properties: Property[],
  form: ValuationSearchForm,
  // ) {
  //   return properties
  //     .map((property) => ({
  //       property,

  //       score: calculateScore(property, form),
  //     }))
  //     .sort((a, b) => b.score - a.score)
  //     .slice(0, 3)
  //     .map((item) => item.property);
  // }
) {
  const result = properties
    .map((property) => ({
      property,
      score: calculateScore(property, form),
    }))
    .sort((a, b) => b.score - a.score);

  console.table(result.slice(0, 10));

  return result.slice(0, 3).map((item) => item.property);
}
