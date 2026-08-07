import ExcelJS from "exceljs";

export function addHyperlink(
  sheet: ExcelJS.Worksheet,
  cellAddress: string,
  text: string,
  url?: string,
) {
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
}
