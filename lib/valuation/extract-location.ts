import { normalizeAddress } from "./normalize-address";

export interface LocationResult {
  commune: string;
  province: string;
}

export function extractLocation(address: string) {
  const text = address.toLowerCase();

  const provinceMatch = text.match(/tỉnh\s+([^,.()\n]+)/i);

  const districtMatch = text.match(/(xã|phường|thị trấn)\s+([^,.()\n]+)/i);

  return {
    province: provinceMatch ? provinceMatch[1].trim() : "",

    district: districtMatch
      ? `${districtMatch[1]} ${districtMatch[2]}`.trim()
      : "",
  };
}
