export type PropertyStatus = "draft" | "pending" | "active" | "sold" | "hidden";

export function getPropertyStatus(status: PropertyStatus) {
  switch (status) {
    case "active":
      return {
        label: "Đang hiển thị",
        className: "bg-green-500/10 text-green-400 border border-green-500/20",
      };

    case "pending":
      return {
        label: "Chờ duyệt",
        className:
          "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
      };

    case "sold":
      return {
        label: "Đã bán",
        className: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
      };

    case "hidden":
      return {
        label: "Đã ẩn",
        className: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
      };

    default:
      return {
        label: "Bản nháp",
        className: "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20",
      };
  }
}
