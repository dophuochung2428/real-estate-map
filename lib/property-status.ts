export type PropertyStatus = "draft" | "pending" | "active" | "sold" | "hidden";

export function getPropertyStatus(status: PropertyStatus) {
  switch (status) {
    case "active":
      return {
        label: "Đang hiển thị",
        className: "bg-green-50 text-green-800 border border-green-200",
      };

    case "pending":
      return {
        label: "Chờ duyệt",
        className:
          "bg-yellow-50 text-yellow-800 border border-yellow-200",
      };

    case "sold":
      return {
        label: "Đã bán",
        className: "bg-blue-50 text-blue-800 border border-blue-200",
      };

    case "hidden":
      return {
        label: "Đã ẩn",
        className: "bg-slate-50 text-slate-700 border border-slate-200",
      };

    default:
      return {
        label: "Bản nháp",
        className: "bg-slate-50 text-slate-700 border border-slate-200",
      };
  }
}
