import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ message: "Missing address" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`,
    );

    const data = await res.json();

    if (!data.results?.length) {
      return NextResponse.json(
        { message: "Address not found" },
        { status: 404 },
      );
    }

    const loc = data.results[0].geometry.location;

    return NextResponse.json({
      lat: loc.lat,
      lng: loc.lng,
    });
  } catch (err) {
    return NextResponse.json({ message: "Geocode failed" }, { status: 500 });
  }
}
