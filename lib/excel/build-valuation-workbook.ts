import ExcelJS from "exceljs";

const LAND_SHAPE_LABELS: Record<string, string> = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
};

export async function buildValuationWorkbook(form: any, comparables: any[]) {
  const workbook = new ExcelJS.Workbook();

  const sheet = workbook.addWorksheet("Thẩm định giá", {
    pageSetup: {
      paperSize: 9,
      orientation: "landscape",
      fitToPage: true,
      fitToWidth: 1,
    },
  });

  // ==========================
  // COLUMN WIDTH
  // ==========================

  sheet.columns = [
    { width: 7 }, // STT
    { width: 42 }, // Đặc điểm BĐS
    { width: 25 }, // Tài sản thẩm định giá
    { width: 25 }, // TSSS 1
    { width: 25 }, // TSSS 2
    { width: 25 }, // TSSS 3
  ];

  // ==========================
  // HELPER
  // ==========================

  const c1 = comparables[0] ?? {};
  const c2 = comparables[1] ?? {};
  const c3 = comparables[2] ?? {};

  const addRow = (
    stt: string,
    label: string,
    appraisal: any = "",
    tss1: any = "",
    tss2: any = "",
    tss3: any = "",
  ) => {
    sheet.addRow([
      stt,
      label,
      appraisal ?? "",
      tss1 ?? "",
      tss2 ?? "",
      tss3 ?? "",
    ]);
  };

  // ==========================
  // TITLE
  // ==========================

  sheet.mergeCells("D1:F1");

  const title = sheet.getCell("D1");

  title.value = "Thông tin thị trường";

  title.font = {
    name: "Times New Roman",
    size: 12,
    bold: true,
  };

  title.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  // ==========================
  // TABLE HEADER
  // ==========================

  sheet.addRow([
    "STT",
    "Đặc điểm BĐS",
    "Tài sản thẩm định giá",
    "TSSS 1",
    "TSSS 2",
    "TSSS 3",
  ]);

  // ==========================
  // DATA
  // ==========================

  addRow("1", "Nguồn tin", "", c1.source, c2.source, c3.source);

  const getContact = (item: any) =>
    [item?.contact_name, item?.contact_phone].filter(Boolean).join(" - ");

  addRow("2", "Liên hệ", "", getContact(c1), getContact(c2), getContact(c3));

  addRow(
    "3",
    "Tình trạng giao dịch/Thời điểm",
    form.appraisalDate,
    c1.created_at,
    c2.created_at,
    c3.created_at,
  );

  addRow("4", "Địa chỉ", form.address, c1.address, c2.address, c3.address);

  const legalStatusText = (value: boolean | null | undefined) =>
    value
      ? "Giấy chứng nhận quyền sử dụng đất, quyền sở hữu nhà ở và tài sản khác gắn liền với đất"
      : "Không có giấy tờ";

  addRow(
    "5",
    "Tình trạng pháp lý",
    legalStatusText(form.legalStatus),
    legalStatusText(c1.legal_status),
    legalStatusText(c2.legal_status),
    legalStatusText(c3.legal_status),
  );

  const businessAdvantageText = (value: boolean | null | undefined) =>
    value
      ? "Khu vực dân cư tương đối đông đúc, không có lợi thế về kinh doanh, cơ sở hạ tầng tương đối hoàn thiện"
      : "Không có lợi thế";

  addRow(
    "6",
    "Vị trí khu vực, lợi thế kinh doanh",
    businessAdvantageText(form.businessAdvantage),
    businessAdvantageText(c1.business_advantage),
    businessAdvantageText(c2.business_advantage),
    businessAdvantageText(c3.business_advantage),
  );

  addRow(
    "7",
    "Vị trí giao thông",
    form.trafficLocation,
    c1.distanceKm ? `Cách TSTĐ ${c1.distanceKm.toFixed(2)} km` : "",
    c2.distanceKm ? `Cách TSTĐ ${c2.distanceKm.toFixed(2)} km` : "",
    c3.distanceKm ? `Cách TSTĐ ${c3.distanceKm.toFixed(2)} km` : "",
  );

  addRow(
    "8",
    "An ninh, môi trường sống",
    form.environment,
    c1.environment,
    c2.environment,
    c3.environment,
  );

  addRow("9", "Diện tích thửa đất (m²)", form.area, c1.area, c2.area, c3.area);

  addRow(
    "10",
    "Mục đích sử dụng đất",
    form.landAreaType,
    c1.land_area_type,
    c2.land_area_type,
    c3.land_area_type,
  );

  addRow("10.1", "Đất ONT (m²)", "", "", "", "");

  addRow("10.2", "Đất CLN (m²)", "", "", "", "");

  addRow(
    "11",
    "Chiều rộng mặt tiền tiếp giáp đường chính (m)",
    form.frontageWidth,
    c1.frontage_width,
    c2.frontage_width,
    c3.frontage_width,
  );

  addRow(
    "12",
    "Chiều sâu dài nhất (m)",
    form.maxDepth,
    c1.max_depth,
    c2.max_depth,
    c3.max_depth,
  );

  addRow(
    "13",
    "Hình thể thửa đất",
    LAND_SHAPE_LABELS[form.landShape] ?? form.landShape,
    LAND_SHAPE_LABELS[c1.land_shape] ?? c1.land_shape,
    LAND_SHAPE_LABELS[c2.land_shape] ?? c2.land_shape,
    LAND_SHAPE_LABELS[c3.land_shape] ?? c3.land_shape,
  );

  addRow(
    "14",
    "Tài sản trên đất",
    form.assetOnLand,
    c1.asset_on_land,
    c2.asset_on_land,
    c3.asset_on_land,
  );
  // ==========================
  // MERGE STT CELLS
  // ==========================

  // STT 10: Mục đích sử dụng đất + 10.1 + 10.2
  // giữ riêng từng dòng vì mẫu hiển thị phân cấp

  // ==========================
  // FONT + ALIGNMENT + BORDER
  // ==========================

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.font = {
        name: "Times New Roman",
        size: 11,
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: colNumber === 2 ? "left" : "center",
        wrapText: true,
      };

      cell.border = {
        top: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      };
    });
  });

  // ==========================
  // HEADER STYLE
  // ==========================

  const header = sheet.getRow(2);

  header.height = 35;

  header.eachCell((cell) => {
    cell.font = {
      name: "Times New Roman",
      size: 11,
      bold: true,
    };

    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };

    cell.border = {
      top: {
        style: "thin",
      },
      left: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
    };
  });

  // ==========================
  // ROW HEIGHT
  // ==========================

  sheet.getRow(1).height = 25;

  sheet.getRow(3).height = 35;

  sheet.getRow(4).height = 45;
  sheet.getRow(5).height = 45;

  sheet.getRow(6).height = 80;
  sheet.getRow(7).height = 80;

  sheet.getRow(8).height = 90;

  sheet.getRow(9).height = 90;

  sheet.getRow(10).height = 60;

  sheet.getRow(11).height = 40;

  sheet.getRow(12).height = 35;

  sheet.getRow(13).height = 35;

  sheet.getRow(14).height = 35;

  sheet.getRow(15).height = 35;

  sheet.getRow(16).height = 35;

  sheet.getRow(17).height = 50;

  // ==========================
  // RED TEXT FOR LAND TYPE
  // ==========================

  ["B12", "B13"].forEach((address) => {
    const cell = sheet.getCell(address);

    cell.font = {
      name: "Times New Roman",
      size: 11,
      color: {
        argb: "FFFF0000",
      },
    };
  });

  // ==========================
  // FREEZE HEADER
  // ==========================

  sheet.views = [
    {
      state: "frozen",
      ySplit: 2,
      zoomScale: 90,
    },
  ];

  // ==========================
  // PRINT SETTINGS
  // ==========================

  sheet.pageSetup = {
    orientation: "landscape",
    paperSize: 9,
    fitToPage: true,
    fitToWidth: 1,
    fitToHeight: 0,
  };

  sheet.pageSetup.margins = {
    left: 0.25,
    right: 0.25,
    top: 0.5,
    bottom: 0.5,
    header: 0.2,
    footer: 0.2,
  };
  // ==========================
  // FORMAT DATA
  // ==========================

  const formatNumber = (value: any) => {
    if (value === null || value === undefined || value === "") {
      return "";
    }

    if (typeof value === "number") {
      return value.toLocaleString("vi-VN");
    }

    return value;
  };

  const formatDate = (value: any) => {
    if (!value) {
      return "";
    }

    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return value;
    }

    return (
      `${date.getDate().toString().padStart(2, "0")}/` +
      `${(date.getMonth() + 1).toString().padStart(2, "0")}/` +
      `${date.getFullYear()}`
    );
  };

  // ==========================
  // APPLY NUMBER FORMAT
  // ==========================

  [
    "C10",
    "D10",
    "E10",
    "F10",

    "C11",
    "D11",
    "E11",
    "F11",

    "C12",
    "D12",
    "E12",
    "F12",

    "C13",
    "D13",
    "E13",
    "F13",
  ].forEach((address) => {
    const cell = sheet.getCell(address);

    cell.value = formatNumber(cell.value);
  });

  // ==========================
  // FORMAT DATE ROW
  // ==========================

  ["C5", "D5", "E5", "F5"].forEach((address) => {
    const cell = sheet.getCell(address);

    cell.value = formatDate(cell.value);
  });

  // ==========================
  // HYPERLINK
  // ==========================

  const addHyperlink = (cellAddress: string, text: string, url?: string) => {
    const cell = sheet.getCell(cellAddress);

    if (!url) {
      cell.value = "";

      return;
    }

    cell.value = {
      text,

      hyperlink: url,
    };

    cell.font = {
      name: "Times New Roman",

      size: 11,

      underline: true,

      color: {
        argb: "FF800080",
      },
    };
  };

  // Ví dụ nếu API sau này trả về link khảo sát
  // nếu chưa có sẽ tự để trống

  addHyperlink("D3", "khảo sát thực tế", c1.surveyUrl);

  addHyperlink("E3", "khảo sát thực tế", c2.surveyUrl);

  addHyperlink("F3", "khảo sát thực tế", c3.surveyUrl);

  // ==========================
  // EMPTY CELL CLEANUP
  // ==========================

  sheet.eachRow((row) => {
    row.eachCell((cell) => {
      if (cell.value === null || cell.value === undefined) {
        cell.value = "";
      }
    });
  });

  // ==========================
  // AUTO FILTER
  // ==========================

  sheet.autoFilter = {
    from: "A2",

    to: "F17",
  };

  // ==========================
  // AUTO ROW HEIGHT
  // ==========================

  sheet.eachRow((row) => {
    let maxLines = 1;

    row.eachCell((cell, colNumber) => {
      if (!cell.value) return;

      const text = String(cell.value);

      const width = sheet.getColumn(colNumber).width || 10;

      const lines = Math.ceil(text.length / width);

      maxLines = Math.max(maxLines, lines);
    });

    row.height = Math.max(20, maxLines * 18);
  });

  sheet.getRow(8).height = 65;
  sheet.getRow(9).height = 65;
  sheet.getRow(10).height = 50;
  sheet.getRow(17).height = 90;

  // ==========================
  // RETURN
  // ==========================

  return workbook;
}
