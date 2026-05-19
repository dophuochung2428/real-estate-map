"use client";

import { useEffect, useState } from "react";

type Province = {
  code: number;
  name: string;
};

type District = {
  code: number;
  name: string;
};

export function useVietnamAddress() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [loading, setLoading] = useState(false);

  // load provinces
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading(true);

      const res = await fetch("https://provinces.open-api.vn/api/v2/?depth=1");

      const data = await res.json();
      setProvinces(data);

      setLoading(false);
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode: number) => {
    try {
      const res = await fetch(
        `https://provinces.open-api.vn/api/v2/p/${provinceCode}?depth=2`,
      );

      const data = await res.json();

      const safeDistricts = Array.isArray(data?.wards) ? data.wards : [];

      setDistricts(safeDistricts);
    } catch (err) {
      console.error(err);
      setDistricts([]);
    }
  };

  return {
    provinces,
    districts,
    fetchDistricts,
    loading,
  };
}
