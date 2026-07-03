export async function searchComparableProperties(payload: unknown) {
  const response = await fetch("/api/valuation/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return response.json();
}
