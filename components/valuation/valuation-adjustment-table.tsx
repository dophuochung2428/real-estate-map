"use client";

import { ValuationDetailForm, ValuationSearchForm } from "@/types/valuation";
import AdjustmentFactor from "./adjustment-factor";
import { ComparablePropertyWithMeta } from "./valuation-workspace";
import { useCallback, useEffect, useState } from "react";
interface Props {
  form: ValuationSearchForm & ValuationDetailForm;
  comparables: ComparablePropertyWithMeta[];

  valuationResult: {
    negotiatedPrices: string[];
    landUnitPrices: string[];
  };

  setAdjustmentData: React.Dispatch<
    React.SetStateAction<{
      ratios: number[][];
      adjustments: number[][];
      results: number[][];
      sizeInputs: number[];
      adjustmentRange: string[]; // thêm
    }>
  >;
}

const LAND_SHAPE_LABELS: Record<string, string> = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
};

function getAppraisalValue(
  form: ValuationSearchForm & ValuationDetailForm,
  field: string,
) {
  switch (field) {
    case "appraisalDate":
      return form.appraisalDate;

    case "legalStatus":
      return form.legalStatus === "true"
        ? "Có"
        : form.legalStatus === "false"
          ? "Không"
          : "";

    case "businessAdvantage":
      return form.businessAdvantage === "high"
        ? "Lợi thế"
        : form.businessAdvantage === "low"
          ? "Kém lợi thế"
          : form.businessAdvantage === "normal"
            ? "Bình thường"
            : form.businessAdvantage === "other"
              ? "Khác"
              : "";

    case "trafficLocation":
      return form.trafficLocation;

    case "environment":
      return form.environment;

    case "area":
      return form.area ? `${form.area} m²` : "";

    case "frontageWidth":
      return form.frontageWidth ? `${form.frontageWidth} m` : "";

    case "maxDepth":
      return form.maxDepth ? `${form.maxDepth} m` : "";

    case "landShape":
      return LAND_SHAPE_LABELS[form.landShape] ?? form.landShape;

    default:
      return "";
  }
}

function getComparableValue(
  comparable: ComparablePropertyWithMeta | undefined,
  field: string,
) {
  if (!comparable) return "";

  switch (field) {
    case "appraisalDate":
      return comparable.created_at
        ? new Date(comparable.created_at).toLocaleDateString("vi-VN")
        : "";

    case "legalStatus":
      return comparable.legal_status ? "Có" : "Không";

    case "businessAdvantage":
      return comparable.business_advantage === "high"
        ? "Lợi thế"
        : comparable.business_advantage === "low"
          ? "Kém lợi thế"
          : comparable.business_advantage === "normal"
            ? "Bình thường"
            : comparable.business_advantage === "other"
              ? "Khác"
              : "";

    case "trafficLocation":
      return comparable.distanceKm !== undefined
        ? `Cách TSTĐ ${comparable.distanceKm.toFixed(2)} km`
        : "";

    case "environment":
      return comparable.environment ?? "";

    case "area":
      return comparable.area ? `${comparable.area} m²` : "";

    case "frontageWidth":
      return comparable.frontage_width ? `${comparable.frontage_width} m` : "";

    case "maxDepth":
      return comparable.max_depth ? `${comparable.max_depth} m` : "";

    case "landShape":
      return comparable.land_shape
        ? (LAND_SHAPE_LABELS[comparable.land_shape] ?? comparable.land_shape)
        : "";

    default:
      return "";
  }
}

const factors = [
  {
    code: "C1",
    title: "Tình trạng giao dịch/Thời điểm",
    field: "appraisalDate",
  },
  {
    code: "C2",
    title: "Tình trạng pháp lý",
    field: "legalStatus",
  },
  {
    code: "C3",
    title: "Vị trí khu vực, lợi thế kinh doanh",
    field: "businessAdvantage",
  },
  {
    code: "C4",
    title: "Vị trí giao thông",
    field: "trafficLocation",
  },
  {
    code: "C5",
    title: "An ninh, môi trường sống",
    field: "environment",
  },
  {
    code: "C6",
    title: "Quy mô",
    field: "area",
  },
  {
    code: "C7",
    title: "Chiều rộng mặt tiền tiếp giáp đường chính(m)",
    field: "frontageWidth",
  },
  {
    code: "C8",
    title: "Chiều sâu dài nhất(m)",
    field: "maxDepth",
  },
  {
    code: "C9",
    title: "Hình thể khu đất",
    field: "landShape",
  },
];

export default function ValuationAdjustmentTable({
  form,
  comparables,
  valuationResult,
  setAdjustmentData,
}: Props) {
  const basePrices = valuationResult.landUnitPrices.map(Number);

  const [factorResults, setFactorResults] = useState<number[][]>([]);

  const [factorAdjustments, setFactorAdjustments] = useState<number[][]>([]);

  const [factorRatios, setFactorRatios] = useState<number[][]>([]);

  const [adjustmentRange, setAdjustmentRange] = useState(["", "", ""]);

  const [sizeInputs, setSizeInputs] = useState<number[]>([]);

  const handleBaseValueChange = useCallback((index: number, value: number) => {
    setSizeInputs((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const handleRatioChange = useCallback((index: number, values: number[]) => {
    setFactorRatios((prev) => {
      const next = [...prev];
      next[index] = values;
      return next;
    });
  }, []);

  const handleAdjustmentChange = useCallback(
    (index: number, values: number[]) => {
      setFactorAdjustments((prev) => {
        const next = [...prev];
        next[index] = values;
        return next;
      });
    },
    [],
  );

  const handleFactorResult = useCallback((index: number, values: number[]) => {
    setFactorResults((prev) => {
      const next = [...prev];
      next[index] = values;
      return next;
    });
  }, []);

  const factorHandlers = factors.map((_, index) => {
    return (values: number[]) => {
      handleFactorResult(index, values);
    };
  });

  const indicatedPrices = factorResults[8];

  const averageIndicatedPrice = indicatedPrices
    ? (indicatedPrices[0] + indicatedPrices[1] + indicatedPrices[2]) / 3
    : 0;

  const grossAdjustments = [0, 1, 2].map((col) => {
    return factorAdjustments.reduce(
      (sum, row) => sum + Math.abs(row?.[col] ?? 0),
      0,
    );
  });

  const adjustmentCounts = [0, 1, 2].map((col) =>
    factorRatios.reduce((count, row) => {
      return count + ((row?.[col] ?? 0) !== 0 ? 1 : 0);
    }, 0),
  );

  const netAdjustments = [0, 1, 2].map((col) => {
    return factorAdjustments.reduce((sum, row) => sum + (row?.[col] ?? 0), 0);
  });

  useEffect(() => {
    setAdjustmentData({
      ratios: factorRatios,
      adjustments: factorAdjustments,
      results: factorResults,
      sizeInputs: sizeInputs,
      adjustmentRange: adjustmentRange,
    });
  }, [
    factorRatios,
    factorAdjustments,
    factorResults,
    sizeInputs,
    adjustmentRange,
  ]);

  return (
    <div className="mt-8 overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-[var(--hover)]">
            <th className="border border-[var(--border)] p-2 w-14">Stt</th>

            <th className="border border-[var(--border)] p-2 min-w-[280px]">
              Yếu tố so sánh
            </th>

            <th className="border border-[var(--border)] p-2 w-24">Đơn vị</th>

            <th className="border border-[var(--border)] p-2 min-w-[180px]">
              TSTĐ
            </th>

            <th className="border border-[var(--border)] p-2 min-w-[180px]">
              TSSS 1
            </th>

            <th className="border border-[var(--border)] p-2 min-w-[180px]">
              TSSS 2
            </th>

            <th className="border border-[var(--border)] p-2 min-w-[180px]">
              TSSS 3
            </th>
          </tr>
        </thead>

        <tbody>
          {/* ================= A ================= */}
          <tr>
            <td className="border p-2 text-center font-bold">A</td>

            <td className="border p-2 font-semibold">
              Giá thị trường (Giá trước điều chỉnh)
            </td>

            <td className="border p-2 text-center">đồng</td>

            <td className="border p-2"></td>

            <td className="border p-2">
              {valuationResult.negotiatedPrices[0]}
            </td>

            <td className="border p-2">
              {valuationResult.negotiatedPrices[1]}
            </td>

            <td className="border p-2">
              {valuationResult.negotiatedPrices[2]}
            </td>
          </tr>
          {/* ================= B ================= */}
          <tr>
            <td className="border p-2 text-center font-bold">B</td>

            <td className="border p-2 font-semibold">
              Giá quy đổi về đơn vị so sánh chuẩn
            </td>

            <td className="border p-2 text-center">đồng/m²</td>

            <td className="border p-2"></td>

            <td className="border p-2">{valuationResult.landUnitPrices[0]}</td>

            <td className="border p-2">{valuationResult.landUnitPrices[1]}</td>

            <td className="border p-2">{valuationResult.landUnitPrices[2]}</td>
          </tr>
          {/* ================= C ================= */}
          <tr>
            <td className="border p-2 text-center font-bold">C</td>

            <td colSpan={6} className="border p-2 font-bold">
              Điều chỉnh các yếu tố so sánh
            </td>
          </tr>
          <>
            {factors.map((factor, index) => (
              <AdjustmentFactor
                key={factor.code}
                code={factor.code}
                title={factor.title}
                appraisal={getAppraisalValue(form, factor.field)}
                comparable1={getComparableValue(comparables[0], factor.field)}
                comparable2={getComparableValue(comparables[1], factor.field)}
                comparable3={getComparableValue(comparables[2], factor.field)}
                basePrices={basePrices}
                previousResults={
                  index === 0 ? undefined : factorResults[index - 1]
                }
                onResultChange={factorHandlers[index]}
                calculationType={
                  ["C6", "C7", "C8"].includes(factor.code) ? "size" : "manual"
                }
                appraisalNumber={
                  factor.code === "C6"
                    ? Number(form.area)
                    : factor.code === "C7"
                      ? Number(form.frontageWidth)
                      : factor.code === "C8"
                        ? Number(form.maxDepth)
                        : undefined
                }
                comparableNumbers={
                  factor.code === "C6"
                    ? comparables.map((x) => Number(x.area))
                    : factor.code === "C7"
                      ? comparables.map((x) => Number(x.frontage_width))
                      : factor.code === "C8"
                        ? comparables.map((x) => Number(x.max_depth))
                        : undefined
                }
                onAdjustmentChange={(values) =>
                  handleAdjustmentChange(index, values)
                }
                onRatioChange={(values) => handleRatioChange(index, values)}
                onBaseValueChange={(value) =>
                  handleBaseValueChange(index, value)
                }
                required={["C6", "C7", "C8"].includes(factor.code)}
              />
            ))}
          </>
          {/* ================= D ================= */}

          <tr>
            <td className="border p-2 text-center font-bold">D</td>

            <td className="border p-2 font-semibold">Mức giá chỉ dẫn</td>

            <td className="border p-2 text-center">đồng/m²</td>

            <td className="border p-2"></td>

            <td className="border p-2 text-right font-semibold">
              {factorResults[8]?.[0]
                ? Math.round(factorResults[8][0]).toLocaleString("vi-VN")
                : ""}
            </td>

            <td className="border p-2 text-right font-semibold">
              {factorResults[8]?.[1]
                ? Math.round(factorResults[8][1]).toLocaleString("vi-VN")
                : ""}
            </td>

            <td className="border p-2 text-right font-semibold">
              {factorResults[8]?.[2]
                ? Math.round(factorResults[8][2]).toLocaleString("vi-VN")
                : ""}
            </td>
          </tr>
          {/* ================= KẾT QUẢ ================= */}
          <tr>
            <td className="border p-2 text-center">1</td>

            <td className="border p-2">
              Giá trị trung bình của mức giá chỉ dẫn
            </td>

            <td className="border p-2 text-center">đồng/m²</td>

            <td className="border p-2"></td>

            <td
              className="border bg-lime-200 p-2 text-center font-bold text-black"
              colSpan={3}
            >
              {factorResults[8]
                ? Math.round(
                    (factorResults[8][0] +
                      factorResults[8][1] +
                      factorResults[8][2]) /
                      3,
                  ).toLocaleString("vi-VN")
                : ""}
            </td>
          </tr>
          <tr>
            <td className="border p-2 text-center">2</td>

            <td className="border p-2">
              Mức độ chênh lệch với giá trị trung bình của các mức giá chỉ dẫn
            </td>

            <td className="border p-2 text-center">%</td>

            <td className="border p-2"></td>

            {indicatedPrices?.map((price, index) => (
              <td key={index} className="border p-2 text-right">
                {averageIndicatedPrice
                  ? (
                      ((price - averageIndicatedPrice) /
                        averageIndicatedPrice) *
                      100
                    ).toFixed(1) + "%"
                  : ""}
              </td>
            ))}
          </tr>
          <tr>
            <td className="border p-2 font-bold" colSpan={2}>
              Tổng hợp các số liệu điều chỉnh tại mục C
            </td>

            <td className="border"></td>

            <td className="border"></td>

            <td className="border"></td>

            <td className="border"></td>

            <td className="border"></td>
          </tr>
          <tr>
            <td className="border text-center">1</td>

            <td className="border p-2">Tổng giá trị điều chỉnh gộp</td>

            <td className="border text-center">đồng/m²</td>

            <td className="border"></td>

            <td>{grossAdjustments[0].toLocaleString("vi-VN")}</td>

            <td>{grossAdjustments[1].toLocaleString("vi-VN")}</td>

            <td>{grossAdjustments[2].toLocaleString("vi-VN")}</td>
          </tr>
          <tr>
            <td className="border text-center">2</td>

            <td className="border p-2">Tổng số lần điều chỉnh</td>

            <td className="border text-center">lần</td>

            <td className="border"></td>

            <td className="border bg-yellow-200 text-center text-black">
              {adjustmentCounts[0]}
            </td>

            <td className="border bg-yellow-200 text-center text-black">
              {adjustmentCounts[1]}
            </td>

            <td className="border bg-yellow-200 text-center text-black">
              {adjustmentCounts[2]}
            </td>
          </tr>
          <tr>
            <td className="border text-center">3</td>

            <td className="border p-2">Biên độ điều chỉnh</td>

            <td className="border text-center">%</td>

            <td className="border"></td>

            {adjustmentRange.map((value, index) => (
              <td key={index} className="border p-2">
                <input
                  value={value}
                  onChange={(e) => {
                    const next = [...adjustmentRange];
                    next[index] = e.target.value;
                    setAdjustmentRange(next);
                  }}
                  className="w-full rounded border px-2 py-1 text-right"
                />
              </td>
            ))}
          </tr>
          <tr>
            <td className="border text-center">4</td>

            <td className="border p-2">Tổng giá trị điều chỉnh thuần</td>

            <td className="border text-center">đồng/m²</td>

            <td className="border"></td>

            <td className="border p-2 text-right">
              {Math.round(netAdjustments[0]).toLocaleString("vi-VN")}
            </td>

            <td className="border p-2 text-right">
              {Math.round(netAdjustments[1]).toLocaleString("vi-VN")}
            </td>

            <td className="border p-2 text-right">
              {Math.round(netAdjustments[2]).toLocaleString("vi-VN")}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
