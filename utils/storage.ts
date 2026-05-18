export function getStoragePath(publicUrl: string) {
  const url = new URL(publicUrl);

  return decodeURIComponent(url.pathname.split("/property-images/")[1]);
}
