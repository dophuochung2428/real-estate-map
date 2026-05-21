import { DIRECTION_LABEL } from "@/constants/property";

export function formatDirection(direction?: string | null) {
  if (!direction) return "Đang cập nhật";
  return (
    DIRECTION_LABEL[direction as keyof typeof DIRECTION_LABEL] ??
    "Đang cập nhật"
  );
}
