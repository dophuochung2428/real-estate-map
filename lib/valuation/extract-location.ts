export interface LocationResult {
  district: string;
  province: string;
}

export function extractLocation(address: string): LocationResult {
  const text = address.toLowerCase();

  const districtMatch = text.match(/(xã|phường|thị trấn|quận|huyện|thị xã|đặc khu)\s+([^,.()\n]+)/i);
  const provinceMatch = text.match(/(tỉnh|thành phố)\s+([^,.()\n]+)/i);

  return {
    district: districtMatch ? districtMatch[2].trim() : "",
    province: provinceMatch ? provinceMatch[2].trim() : "",
  };
}
