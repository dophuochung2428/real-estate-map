export const LAND_SHAPE_LABELS = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
} as const;

export type LandShape = keyof typeof LAND_SHAPE_LABELS;

export const legalStatusText = (value?: boolean | null) =>
  value
    ? "Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất"
    : "Không có giấy tờ";

export const businessAdvantageText = (value?: boolean | null) =>
  value
    ? "Khu vực dân cư tương đối đông đúc, không có lợi thế về kinh doanh, cơ sở hạ tầng tương đối hoàn thiện"
    : "Không có lợi thế";
