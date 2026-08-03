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
    { width: 6 }, // A
    { width: 32 }, // B
    { width: 10 }, // C
    { width: 26 }, // D
    { width: 26 }, // E
    { width: 26 }, // F
    { width: 26 }, // G
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
      "",
      appraisal ?? "",
      tss1 ?? "",
      tss2 ?? "",
      tss3 ?? "",
    ]);
  };

  // ==========================
  // TITLE
  // ==========================

  sheet.mergeCells("A1:G1");

  const title = sheet.getCell("A1");

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
    "",
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

  addRow("4", "Địa chỉ", "", c1.address, c2.address, c3.address);

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

  addRow(
    "9",
    "Diện tích thửa đất (m²)",
    form.area,
    Number(String(c1.area).replace(",", ".")),
    Number(String(c2.area).replace(",", ".")),
    Number(String(c3.area).replace(",", ".")),
  );

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

  addRow("14.1", "Kết cấu", "", "", "", "");

  addRow("14.2", "Số tầng", "", "", "", "");

  addRow("14.3", "Diện tích sàn sử dụng (m²)", "", "", "", "");

  addRow("14.4", "Tỷ lệ GTCL (%) đề xuất", "", "", "", "");

  addRow("14.5", "Đơn giá xây dựng (đồng/m²) đề xuất", "", "", "", "");

  addRow("15", "Tổng giá trị CTXD (đồng)", "", "", "", "");

  addRow(
    "16",
    "Chi phí chuyển mục đích sử dụng đất từ đất NN sang đất ODT (đồng)",
    "",
    "",
    "",
    "",
  );

  addRow("17", "Giá bán/rao bán (đồng)", "", c1.price , c2.price, c3.price);

  addRow("18", "Giá thương lượng (đồng)", "", "", "", "");

  addRow(
    "19",
    "Giá sau khi chuyển mục đích sử dụng đất (đồng)",
    "",
    "",
    "",
    "",
  );

  addRow("20", "Đơn giá QSDĐ ODT (đồng/m²)", "", "", "", "");

  addRow(
    "21",
    "Đơn giá đất theo Nghị quyết số 16/2025/NQ-HĐND ngày 31/12/2025 của Hội đồng nhân dân tỉnh An Giang",
    "",
    "",
    "",
    "",
  );

  addRow("", "Đất ODT (đồng/m²)", "", "", "", "");

  addRow("", "Đất CLN (đồng/m²)", "", "", "", "");
  addRow(
    "",
    "Tổng quá trị QSDĐ đất theo bảng giá của HĐND tỉnh An Giang",
    "",
    "",
    "",
    "",
  );
  addRow(
    "",
    "Hạn mức chuyển đổi đất ở theo quyết định số …./QĐ-UBND của UBND tỉnh An Giang (m²)",
    "",
    "",
    "",
    "",
  );
  addRow(
    "",
    "Hệ số điều chỉnh giá đất theo Quyết định số …./QĐ-UBND của UBND tỉnh An Giang",
    "",
    "",
    "",
    "",
  );
  addRow("", "Đất ODT", "", "", "", "");
  addRow("", "Đất CLN/HNK", "", "", "", "");

  sheet.addRow(["Phân tích thông tin thu thập"]);

  sheet.addRow([
    "C1",
    "Yếu tố chênh lệch về thời điểm giao dịch: TSTĐG tương đồng với TSSS1, tương đồng với TSSS2, tương đồng với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C2",
    "Yếu tố chênh lệch về tình trạng pháp lý: TSTĐG tương đồng so với TSSS1, tương đồng so với TSSS2, tương đồng so với TSSS3.",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C3",
    "Yếu tố chênh lệch về vị trí khu vực, lợi thế kinh doanh: TSTĐG tương đồng so với TSSS1, tương đồng so với TSSS2, tương đồng so với TSSS3.",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C4",
    "Yếu tố chênh lệch về vị trí giao thông: TSTĐG lợi thế hơn so với TSSS1, lợi thế hơn so với TSSS2, lợi thế hơn so với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C5",
    "Yếu tố chênh lệch về an ninh, môi trường sống: TSTĐG tương đồng so với TSSS1, tương đồng so với TSSS2, tương đồng so với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C6",
    "Yếu tố chênh lệch về quy mô: TSTĐG kém lợi thế hơn so với TSSS1, kém lợi thế hơn so với TSSS2, tương đồng với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C7",
    "Yếu tố chênh lệch về chiều rộng mặt tiền: TSTĐG lợi thế hơn so với TSSS1, lợi thế hơn so với TSSS2, tương đồng so với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C8",
    "Yếu tố chênh lệch về chiều sâu thửa đất: TSTĐG kém lợi thế hơn so với TSSS1, kém lợi thế hơn so với TSSS2, tương đồng so với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow([
    "C9",
    "Yếu tố chênh lệch về hình dáng thửa đất: TSTĐG tương đồng so với TSSS1, lợi thế hơn so với TSSS2, lợi thế hơn so với TSSS3",
    "",
    "",
    "",
    "",
    "",
  ]);

  sheet.addRow(["", "", "", "", "", "", ""]); // 49

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow([
    "Stt",
    "Yếu tố so sánh",
    "Đơn vị tính",
    "TSTĐG",
    "TSSS 1",
    "TSSS 2",
    "TSSS 3",
  ]); // 50

  sheet.addRow([
    "A",
    "Giá thị trường (Giá trước điều chỉnh)",
    "đồng",
    "",
    "",
    "",
    "",
  ]); // 51

  sheet.addRow([
    "B",
    "Giá quy đổi về đơn vị so sánh chuẩn",
    "đồng/m²",
    "",
    "",
    "",
    "",
  ]); // 52

  sheet.addRow(["C", "Điều chỉnh các yếu tố so sánh", "", "", "", "", ""]); // 53

  sheet.addRow(["C1", "Tình trạng giao dịch/Thời điểm", "", "", "", "", ""]); // 54

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 55

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 56

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 57

  sheet.addRow(["C2", "Tình trạng pháp lý", "", "", "", "", ""]); // 58

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 59

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 60

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 61

  sheet.addRow([
    "C3",
    "Vị trí khu vực, lợi thế kinh doanh",
    "",
    "",
    "",
    "",
    "",
  ]); // 62

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 63

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 64

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 65

  sheet.addRow(["C4", "Vị trí giao thông", "", "", "", "", ""]); //

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 67

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 68

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 69

  sheet.addRow(["C5", "An ninh, môi trường sống", "", "", "", "", ""]); // 70

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 71

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 72

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 73

  sheet.addRow(["C6", "Quy mô", "m²", "", "", "", ""]); // 74

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 75

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 76

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 77

  sheet.addRow([
    "C7",
    "Chiều rộng mặt tiền tiếp giáp đường chính (m)",
    "",
    "",
    "",
    "",
    "",
  ]); // 78

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 79

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 80

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 81

  sheet.addRow(["C8", "Chiều sâu dài nhất (m)", "", "", "", "", ""]); // 82

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 83

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 84

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 85

  sheet.addRow(["C9", "Hình thể khu đất", "", "", "", "", ""]); // 86

  sheet.addRow(["", "", "", "", "", "", ""]);

  sheet.addRow(["", "Tỷ lệ điều chỉnh", "", "", "", "", ""]); // 87

  sheet.addRow(["", "Mức điều chỉnh", "đồng/m²", "", "", "", ""]); // 88

  sheet.addRow(["", "Giá sau điều chỉnh", "đồng/m²", "", "", "", ""]); // 89

  sheet.addRow(["D", "Mức giá chỉ dẫn", "", "", "", "", ""]); // 99

  sheet.addRow([
    "1",
    "Giá trị trung bình của mức giá chỉ dẫn",
    "đồng/m²",
    "",
    "",
    "",
    "",
  ]); // 100

  sheet.addRow([
    "2",
    "Mức độ chênh lệch với giá trị trung bình của các mức giá chỉ dẫn",
    "%",
    "",
    "",
    "",
    "",
  ]); // 101

  sheet.addRow([
    "E",
    "Tổng hợp các số liệu điều chỉnh tại mục C",
    "",
    "",
    "",
    "",
    "",
  ]); // 102

  sheet.addRow(["1", "Tổng giá trị điều chỉnh gộp", "đồng/m²", "", "", "", ""]); // 103

  sheet.addRow(["2", "Tổng số lần điều chỉnh", "lần", "", "", "", ""]); // 104

  sheet.addRow(["3", "Biên độ điều chỉnh", "%", "", "", "", ""]); // 105

  sheet.addRow([
    "4",
    "Tổng giá trị điều chỉnh thuần",
    "đồng/m²",
    "",
    "",
    "",
    "",
  ]); // 106

  sheet.addRow(["", "", "", "", "", "", ""]); // 114

  sheet.addRow(["", "", "", "", "", "", ""]); // 114

  sheet.addRow([
    "Stt",
    "Tên tài sản",
    "CLCL (%)",
    "Diện tích (m²)",
    "Đơn giá (đồng/m²)",
    "Giá trị tài sản ước tính (đồng)",
  ]); // 110

  sheet.addRow(["I", "GIÁ TRỊ QUYỀN SỬ DỤNG ĐẤT (ODT)", "", "", "", ""]); // 111

  sheet.addRow(["1", "", "", "", "", ""]); // 112

  sheet.addRow(["II", "GIÁ TRỊ CÔNG TRÌNH XÂY DỰNG TRÊN ĐẤT", "", "", "", ""]); // 113

  sheet.addRow(["1", "", "", "", "", ""]); // 114

  sheet.addRow(["2", "", "", "", "", ""]); // 115

  sheet.addRow(["3", "", "", "", "", ""]); // 116

  sheet.addRow(["4", "", "", "", "", ""]); // 117

  sheet.addRow(["", "Tổng cộng", "", "", "", ""]); // 118

  sheet.addRow(["", "Làm tròn", "", "", "", ""]); // 119

  // ==========================
  // MERGE STT CELLS
  // ==========================

  // STT 10: Mục đích sử dụng đất + 10.1 + 10.2
  // giữ riêng từng dòng vì mẫu hiển thị phân cấp

  sheet.mergeCells("A38:G38");

  sheet.mergeCells("A48:G48");

  sheet.mergeCells("A54:A58");
  sheet.mergeCells("A59:A63");
  sheet.mergeCells("A64:A68");
  sheet.mergeCells("A69:A73");
  sheet.mergeCells("A74:A78");
  sheet.mergeCells("A79:A83");
  sheet.mergeCells("A84:A88");
  sheet.mergeCells("A89:A93");
  sheet.mergeCells("A94:A98");

  sheet.mergeCells("B54:B55");
  sheet.mergeCells("B59:B60");
  sheet.mergeCells("B64:B65");
  sheet.mergeCells("B69:B70");
  sheet.mergeCells("B74:B75");
  sheet.mergeCells("B79:B80");
  sheet.mergeCells("B84:B85");
  sheet.mergeCells("B89:B90");
  sheet.mergeCells("B94:B95");

  sheet.mergeCells("C54:C55");
  sheet.mergeCells("C59:C60");
  sheet.mergeCells("C64:C65");
  sheet.mergeCells("C69:C70");
  sheet.mergeCells("C74:C75");
  sheet.mergeCells("C79:C80");
  sheet.mergeCells("C84:C85");
  sheet.mergeCells("C89:C90");
  sheet.mergeCells("C94:C95");

  sheet.mergeCells("E100:G100");
  sheet.mergeCells("B110:E110");
  sheet.mergeCells("B112:E112");

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

  header.height = 15.6;

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

  sheet.getRow(1).height = 15.8;

  sheet.getRow(3).height = 46.8;

  sheet.getRow(4).height = 31.2;
  sheet.getRow(5).height = 31.2;

  sheet.getRow(6).height = 64.4;
  sheet.getRow(7).height = 46.8;

  sheet.getRow(8).height = 78;

  sheet.getRow(9).height = 93.6;

  for (let row = 10; row <= 18; row++) {
    sheet.getRow(row).height = 15.6;
  }

  sheet.getRow(19).height = 46.8;

  for (let row = 20; row <= 24; row++) {
    sheet.getRow(row).height = 15.6;
  }

  for (let row = 25; row <= 29; row++) {
    sheet.getRow(row).height = 22.4;
  }

  sheet.getRow(30).height = 65.3;

  for (let row = 32; row <= 37; row++) {
    sheet.getRow(row).outlineLevel = 1;
  }

  sheet.properties.outlineLevelRow = 1;

  for (let row = 39; row <= 47; row++) {
    sheet.getRow(row).height = 15.6;
  }

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
  // FORMAT NUMBER ROW
  // ==========================

  for (let row = 23; row <= 29; row++) {
    ["E", "F", "G"].forEach((col) => {
      sheet.getCell(`${col}${row}`).numFmt = "#,##0";
    });
  }

  // FORMULA

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}24`).value = {
      formula: `${col}21*${col}22*${col}23`,
    };

    sheet.getCell(`${col}25`).value = {
      formula: `(${col}34-${col}14)*(${col}31-${col}32)+(${col}11-${col}34)*(${col}31*${col}36-${col}32*${col}37)`,
    };

    sheet.getCell(`${col}28`).value = {
      formula: `${col}27-${col}24+${col}25`,
    };

    sheet.getCell(`${col}29`).value = {
      formula: `${col}28/${col}11`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}51`).value = {
      formula: `${col}27`,
    };

    sheet.getCell(`${col}52`).value = {
      formula: `${col}29`,
    };

    sheet.getCell(`${col}51`).numFmt = "#,##0";
    sheet.getCell(`${col}52`).numFmt = "#,##0";
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}54`).value = {
      formula: `${col}5`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}55`).value = {
      formula: `IF(${col}56=0,"tương đồng",IF(${col}56>0,"kém lợi thế hơn",IF(${col}56<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}57`).value = {
      formula: `${col}56*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}58`).value = {
      formula: `${col}52+${col}57`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}59`).value = {
      formula: `${col}7`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}60`).value = {
      formula: `IF(${col}61=0,"tương đồng",IF(${col}61>0,"kém lợi thế hơn",IF(${col}61<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}62`).value = {
      formula: `${col}61*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}63`).value = {
      formula: `${col}58+${col}62`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}64`).value = {
      formula: `${col}8`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}65`).value = {
      formula: `IF(${col}66=0,"tương đồng",IF(${col}66>0,"kém lợi thế hơn",IF(${col}66<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}67`).value = {
      formula: `${col}66*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}68`).value = {
      formula: `${col}63+${col}67`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}69`).value = {
      formula: `${col}9`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}70`).value = {
      formula: `IF(${col}71=0,"tương đồng",IF(${col}71>0,"kém lợi thế hơn",IF(${col}71<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}72`).value = {
      formula: `${col}71*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}73`).value = {
      formula: `${col}68+${col}72`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}74`).value = {
      formula: `${col}10`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}75`).value = {
      formula: `IF(${col}76=0,"tương đồng",IF(${col}76>0,"kém lợi thế hơn",IF(${col}76<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}77`).value = {
      formula: `${col}76*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}78`).value = {
      formula: `${col}73+${col}77`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}79`).value = {
      formula: `${col}11`,
    };
  });

  sheet.getCell("I79").value = {
    formula: "ROUND((E79-$D$79)/$H$79,1)",
  };

  sheet.getCell("J79").value = {
    formula: "ROUND((F79-$D$79)/$H$79,1)",
  };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}80`).value = {
      formula: `IF(${col}81=0,"tương đồng",IF(${col}81>0,"kém lợi thế hơn",IF(${col}81<0,"lợi thế hơn","")))`,
    };
  });

  sheet.getCell("E81").value = { formula: "I79%" };
  sheet.getCell("F81").value = { formula: "J79%" };
  sheet.getCell("G81").value = { formula: "K79%" };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}82`).value = {
      formula: `${col}81*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}83`).value = {
      formula: `${col}78+${col}82`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}84`).value = {
      formula: `${col}15`,
    };
  });

  sheet.getCell("I84").value = {
    formula: "ROUND(($D$84-E84)/$H$84,1)",
  };

  sheet.getCell("J84").value = {
    formula: "ROUND(($D$84-F84)/$H$84,1)",
  };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}85`).value = {
      formula: `IF(${col}86=0,"tương đồng",IF(${col}86>0,"kém lợi thế hơn",IF(${col}86<0,"lợi thế hơn","")))`,
    };
  });

  sheet.getCell("E86").value = { formula: "I84%" };
  sheet.getCell("F86").value = { formula: "J84%" };
  sheet.getCell("G86").value = { formula: "K84%" };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}87`).value = {
      formula: `${col}86*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}88`).value = {
      formula: `${col}83+${col}87`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}89`).value = {
      formula: `${col}16`,
    };
  });

  sheet.getCell("I89").value = {
    formula: "ROUND((E89-$D$89)/$H$89,1)",
  };

  sheet.getCell("J89").value = {
    formula: "ROUND((F89-$D$89)/$H$89,1)",
  };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}90`).value = {
      formula: `IF(${col}91=0,"tương đồng",IF(${col}91>0,"kém lợi thế hơn",IF(${col}91<0,"lợi thế hơn","")))`,
    };
  });

  sheet.getCell("E91").value = { formula: "I89%" };
  sheet.getCell("F91").value = { formula: "J89%" };
  sheet.getCell("G91").value = { formula: "K89%" };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}92`).value = {
      formula: `${col}91*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}93`).value = {
      formula: `${col}88+${col}92`,
    };
  });

  ["D", "E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}94`).value = {
      formula: `${col}17`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}95`).value = {
      formula: `IF(${col}96=0,"tương đồng",IF(${col}96>0,"kém lợi thế hơn",IF(${col}96<0,"lợi thế hơn","")))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}97`).value = {
      formula: `${col}96*${col}$52`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}98`).value = {
      formula: `${col}93+${col}97`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}99`).value = {
      formula: `${col}98`,
    };
  });

  sheet.getCell("E100").value = {
    formula: "AVERAGE(E99:G99)",
  };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}101`).value = {
      formula: `(${col}99-$E$100)/$E$100`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}103`).value = {
      formula: `SUM(ABS(${col}57),ABS(${col}62),ABS(${col}67),ABS(${col}72),ABS(${col}77),ABS(${col}82),ABS(${col}87),ABS(${col}92),ABS(${col}97))`,
    };
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}104`).value = {
      formula: `10-COUNTIF(${col}56:${col}98,0)/2`,
    };

    sheet.getCell(`${col}104`).numFmt = "0.00";
  });

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}106`).value = {
      formula: `SUM(${col}57,${col}62,${col}67,${col}72,${col}77,${col}82,${col}87,${col}92,${col}97)`,
    };
  });

  sheet.getCell("F107").value = {
    formula: "ROUND(E100,-3)",
  };

  sheet.getCell("F110").value = {
    formula: "SUM(F111)",
  };

  sheet.getCell("D111").value = {
    formula: "D11",
  };

  sheet.getCell("E111").value = {
    formula: "F107",
  };

  sheet.getCell("F111").value = {
    formula: "D111*E111",
  };

  sheet.getCell("F112").value = {
    formula: "SUM(F113:F116)",
  };

  [113, 114, 115, 116].forEach((row) => {
    sheet.getCell(`F${row}`).value = {
      formula: `E${row}*D${row}*C${row}`,
    };
  });

  sheet.getCell("F117").value = {
    formula: "F110+F112",
  };

  sheet.getCell("F118").value = {
    formula: "ROUND(F117,-3)",
  };

  // ==========================
  // HIGHLIGHT
  // ==========================

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}26`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E2F0D9" },
    };

    sheet.getCell(`${col}27`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
  });

  // ==========================
  // horizontal
  // ==========================

  for (let row = 2; row <= 37; row++) {
    sheet.mergeCells(`B${row}:C${row}`);

    sheet.getCell(`B${row}`).alignment = {
      horizontal: "left",
      vertical: "middle",
      wrapText: true,
    };
  }

  for (let row = 39; row <= 47; row++) {
    sheet.mergeCells(`B${row}:F${row}`);

    sheet.getCell(`B${row}`).alignment = {
      horizontal: "left",
      vertical: "middle",
    };
  }

  // ==========================
  // CORLOR-IN_LINE
  // ==========================

  ["A", "B", "C", "D"].forEach((col) => {
    sheet.getCell(`${col}3`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "D9D9D9",
      },
    };
  });

  [5, 7, 9, 25].forEach((row) => {
    ["A", "B", "C", "D", "E", "F", "G", "H"].forEach((col) => {
      sheet.getCell(`${col}${row}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "D9D9D9",
        },
      };
    });
  });

  [10, 12, 14, 16, 18, 20, 22, 24].forEach((row) => {
    ["B", "C", "D", "E", "F", "G", "H"].forEach((col) => {
      sheet.getCell(`${col}${row}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "D9D9D9",
        },
      };
    });
  });

  [11, 13, 15, 17, 19, 21, 23].forEach((row) => {
    sheet.getCell(`A${row}`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "D9D9D9",
      },
    };
  });

  ["38", "48"].forEach((row) => {
    for (let col = 1; col <= 7; col++) {
      const cell = sheet.getRow(Number(row)).getCell(col);

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "9BBB59",
        },
      };

      cell.font = {
        name: "Times New Roman",
        size: 11,
        bold: true,
      };

      cell.alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    }
  });

  [54, 59, 64, 69, 74, 79, 84, 89, 94].forEach((row) => {
    ["D", "E", "F", "G"].forEach((col) => {
      sheet.getCell(`${col}${row}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "D9D9D9", // xám nhạt
        },
      };
    });
  });

  [79, 84, 89].forEach((row) => {
    ["H", "I", "J", "K"].forEach((col) => {
      sheet.getCell(`${col}${row}`).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
          argb: "9BBB59",
        },
      };
    });
  });

  sheet.getCell("E100").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "9BBB59", // xanh lá
    },
  };

  sheet.getCell("E100").font = {
    ...sheet.getCell("E110").font,
    color: {
      argb: "FF0000", // đỏ
    },
    bold: true,
  };

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}104`).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FFFF00", // vàng
      },
    };
  });

  sheet.getCell("F107").fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: {
      argb: "FFFF00",
    },
  };

  // ==========================
  // FONT-BOLD
  // ==========================

  ["E", "F", "G"].forEach((col) => {
    sheet.getCell(`${col}29`).font = {
      name: "Times New Roman",
      size: 11,
      bold: true,
    };
  });

  [
    50, 51, 52, 53, 54, 59, 64, 69, 74, 79, 84, 89, 94, 99, 102, 109, 110, 112,
    117, 118,
  ].forEach((row) => {
    sheet.getRow(row).eachCell((cell) => {
      cell.font = {
        ...cell.font,
        bold: true,
      };
    });
  });

  sheet.getCell("F107").font = {
    ...sheet.getCell("F107").font,
    bold: true,
  };

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

  // ==========================
  // RETURN
  // ==========================

  return workbook;
}
