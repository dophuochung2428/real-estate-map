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

      const res = await fetch("https://provinces.open-api.vn/api/?depth=1");

      const data = await res.json();
      setProvinces(data);

      setLoading(false);
    };

    fetchProvinces();
  }, []);

  const fetchDistricts = async (provinceCode: number) => {
    const res = await fetch(
      `https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`,
    );

    const data = await res.json();
    setDistricts(data.districts);
  };

  return {
    provinces,
    districts,
    fetchDistricts,
    loading,
  };
}
