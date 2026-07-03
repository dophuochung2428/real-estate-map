export function normalizeAddress(address: string) {
  return address
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[.,/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
