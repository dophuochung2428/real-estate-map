export function normalizeAdministrativeName(value?: string | null) {
  if (!value) return "";

  return value
    .toLowerCase()
    .replace(/^tỉnh\s+/i, "")
    .replace(/^thành phố\s+/i, "")
    .replace(/^quận\s+/i, "")
    .replace(/^huyện\s+/i, "")
    .replace(/^xã\s+/i, "")
    .replace(/^phường\s+/i, "")
    .replace(/^thị trấn\s+/i, "")
    .trim();
}
