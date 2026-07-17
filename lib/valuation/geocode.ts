async function searchAddress(query: string) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query,
    )}&limit=1`,
    {
      headers: {
        "User-Agent": "real-asset-val",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
  };
}

export async function geocodeAddress(address: string) {

  let result = await searchAddress(address);

  if (result) {
    return result;
  }

  // bỏ phần trước dấu phẩy đầu tiên
  const parts = address.split(",");

  if (parts.length > 1) {
    const shorter = parts.slice(1).join(",").trim();

    result = await searchAddress(shorter);

    if (result) {
      return result;
    }
  }

  // lấy 2 phần cuối
  if (parts.length >= 2) {
    const provinceOnly = parts.slice(-2).join(",").trim();

    result = await searchAddress(provinceOnly);

    if (result) {
      return result;
    }
  }

  return null;
}
