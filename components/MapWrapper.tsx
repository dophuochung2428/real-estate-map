"use client";

import dynamic from "next/dynamic";
import { supabase } from "../lib/supabase";
import { Property } from "@/types/property";
import { useState, useMemo, useEffect } from "react";
import debounce from "lodash.debounce";

const Map = dynamic(() => import("./Map"), { ssr: false });

type Bounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export default function MapWrapper({
  data: initialData,
}: {
  data: Property[];
}) {
  const [data, setData] = useState<Property[]>(initialData);

  const handleMove = useMemo(
    () =>
      debounce(async (bounds: Bounds) => {
        const { data: newData, error } = await supabase
          .from("properties")
          .select("*")
          .gte("lat", bounds.minLat)
          .lte("lat", bounds.maxLat)
          .gte("lng", bounds.minLng)
          .lte("lng", bounds.maxLng)
          .limit(200);

        if (error) {
          console.error("Fetch error:", error);
          return;
        }

        setData(newData || []);
      }, 300),
    [],
  );

  useEffect(() => {
    return () => {
      handleMove.cancel();
    };
  }, [handleMove]);

  return <Map data={data} onMove={handleMove} />;
}
