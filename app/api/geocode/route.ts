import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ message: "Missing address" }, { status: 400 });
  }

  try {
    const searchRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address,
      )}&format=jsonv2&limit=1`,
      {
        headers: {
          "User-Agent": "real-estate-app",
        },
      },
    );

    const searchData = await searchRes.json();

    if (!searchData.length) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    const item = searchData[0];

    let geojson = null;

    if (item.osm_type && item.osm_id) {
      const osmType =
        item.osm_type === "way"
          ? "W"
          : item.osm_type === "relation"
            ? "R"
            : "N";

      const detailRes = await fetch(
        `https://nominatim.openstreetmap.org/details.php?osmtype=${osmType}&osmid=${item.osm_id}&polygon_geojson=1&format=json`,
        {
          headers: {
            "User-Agent": "real-estate-app",
          },
        },
      );

      const detailData = await detailRes.json();

      geojson = detailData.geometry;
    }

    return NextResponse.json({
      lat: parseFloat(item.lat),
      lng: parseFloat(item.lon),
      geojson,
      boundingbox: item.boundingbox,
    });
  } catch (error) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
