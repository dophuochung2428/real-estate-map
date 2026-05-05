import { PropertyType, DirectionType } from "@/types/property";

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  house_private: "Nhà riêng",
  apartment: "Chung cư",
  hotel_motel: "Khách sạn / Nhà trọ",
  land_private: "Đất nền riêng",
  land_project: "Đất dự án",
  land_residential: "Đất khu dân cư",
  land_agriculture: "Đất nông nghiệp",
  farm: "Trang trại",
  warehouse_factory: "Kho bãi / Nhà xưởng",
};

export const DIRECTION_LABEL: Record<DirectionType, string> = {
  north: "Bắc",
  south: "Nam",
  east: "Đông",
  west: "Tây",
  northeast: "Đông Bắc",
  northwest: "Tây Bắc",
  southeast: "Đông Nam",
  southwest: "Tây Nam",
};
