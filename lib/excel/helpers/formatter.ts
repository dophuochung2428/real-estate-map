export function formatNumber(value: any) {
  if (value == null || value === "") return "";

  if (typeof value === "number") {
    return value.toLocaleString("vi-VN");
  }

  return value;
}

export function formatDate(value: any) {
  if (!value) return "";

  const date = new Date(value);

  if (isNaN(date.getTime())) {
    return value;
  }

  return (
    `${date.getDate().toString().padStart(2, "0")}/` +
    `${(date.getMonth() + 1).toString().padStart(2, "0")}/` +
    date.getFullYear()
  );
}

export function getContact(item: any) {
  return [item?.contact_name, item?.contact_phone].filter(Boolean).join(" - ");
}
