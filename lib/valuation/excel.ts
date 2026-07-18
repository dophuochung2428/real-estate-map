import ExcelJS from "exceljs";

import { ValuationSearchForm } from "@/types/valuation";
import { ComparableProperty } from "@/lib/valuation/filter";

type ComparablePropertyWithMeta = ComparableProperty & {
  source?: string;
  contact?: string;
  created_at?: string | null;
};

export async function buildValuationWorkbook(
  form: ValuationSearchForm,
  comparables: ComparablePropertyWithMeta[],
) {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Thẩm định giá");

  sheet.columns = [
    { width: 8 },
    { width: 35 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
    { width: 25 },
  ];

  sheet.mergeCells("A1:F1");

  const title = sheet.getCell("A1");

  title.value = "THÔNG TIN THỊ TRƯỜNG";

  title.font = {
    bold: true,
    size: 16,
  };

  title.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  sheet.addRow([]);

  sheet.addRow(["STT", "Đặc điểm BĐS", "TSTĐ", "TSSS 1", "TSSS 2", "TSSS 3"]);

  const rows = [
    [
      "1",
      "Nguồn tin",
      "",
      comparables[0]?.source ?? "",
      comparables[1]?.source ?? "",
      comparables[2]?.source ?? "",
    ],

    [
      "2",
      "Liên hệ",
      "",
      comparables[0]?.contact ?? "",
      comparables[1]?.contact ?? "",
      comparables[2]?.contact ?? "",
    ],

    [
      "3",
      "Tình trạng giao dịch / Thời điểm",
      form.appraisalDate,
      comparables[0]?.created_at ?? "",
      comparables[1]?.created_at ?? "",
      comparables[2]?.created_at ?? "",
    ],

    [
      "4",
      "Địa chỉ",
      "",
      comparables[0]?.address ?? "",
      comparables[1]?.address ?? "",
      comparables[2]?.address ?? "",
    ],

    [
      "5",
      "Tình trạng pháp lý",
      form.legalStatus === "true" ? "Có" : "Không",
      comparables[0]?.legal_status ? "Có" : "Không",
      comparables[1]?.legal_status ? "Có" : "Không",
      comparables[2]?.legal_status ? "Có" : "Không",
    ],

    [
      "6",
      "Vị trí giao thông",
      form.trafficLocation,
      comparables[0]?.distanceKm
        ? `${comparables[0].distanceKm.toFixed(2)} km`
        : "",
      comparables[1]?.distanceKm
        ? `${comparables[1].distanceKm.toFixed(2)} km`
        : "",
      comparables[2]?.distanceKm
        ? `${comparables[2].distanceKm.toFixed(2)} km`
        : "",
    ],

    [
      "7",
      "An ninh, môi trường sống",
      form.environment,
      comparables[0]?.environment ?? "",
      comparables[1]?.environment ?? "",
      comparables[2]?.environment ?? "",
    ],

    [
      "8",
      "Diện tích thửa đất",
      form.area,
      comparables[0]?.area ?? "",
      comparables[1]?.area ?? "",
      comparables[2]?.area ?? "",
    ],

    [
      "9",
      "Mục đích sử dụng đất",
      form.landAreaType,
      comparables[0]?.land_area_type ?? "",
      comparables[1]?.land_area_type ?? "",
      comparables[2]?.land_area_type ?? "",
    ],

    [
      "10",
      "Diện tích đất theo mục đích sử dụng",
      form.landArea,
      comparables[0]?.land_area ?? "",
      comparables[1]?.land_area ?? "",
      comparables[2]?.land_area ?? "",
    ],

    [
      "11",
      "Chiều rộng mặt tiền",
      form.frontageWidth,
      comparables[0]?.frontage_width ?? "",
      comparables[1]?.frontage_width ?? "",
      comparables[2]?.frontage_width ?? "",
    ],

    [
      "12",
      "Chiều sâu dài nhất",
      form.maxDepth,
      comparables[0]?.max_depth ?? "",
      comparables[1]?.max_depth ?? "",
      comparables[2]?.max_depth ?? "",
    ],

    [
      "13",
      "Hình thể thửa đất",
      form.landShape,
      comparables[0]?.land_shape ?? "",
      comparables[1]?.land_shape ?? "",
      comparables[2]?.land_shape ?? "",
    ],

    [
      "14",
      "Tài sản trên đất",
      form.assetOnLand,
      comparables[0]?.asset_on_land ?? "",
      comparables[1]?.asset_on_land ?? "",
      comparables[2]?.asset_on_land ?? "",
    ],
  ];

  rows.forEach((row) => sheet.addRow(row));

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
        bottom: { style: "thin" },
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
    });
  });

  return workbook;
}
