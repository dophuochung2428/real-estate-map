"use client";

import { useEffect, useMemo, useState } from "react";
interface Props {
  code: string;
  title: string;

  appraisal: React.ReactNode;
  comparable1: React.ReactNode;
  comparable2: React.ReactNode;
  comparable3: React.ReactNode;

  basePrices: number[];
  previousResults?: number[];
  onResultChange?: (values: number[]) => void;

  calculationType?: CalculationType;
  appraisalNumber?: number;
  comparableNumbers?: number[];

  onAdjustmentChange?: (values: number[]) => void;
  onRatioChange?: (values: number[]) => void;
  onBaseValueChange?: (value: number) => void;

  required?: boolean;
}

type CalculationType = "manual" | "size";

export default function AdjustmentFactor({
  code,
  title,
  appraisal,
  comparable1,
  comparable2,
  comparable3,
  basePrices,
  previousResults,
  onResultChange,
  calculationType = "manual",
  appraisalNumber,
  comparableNumbers,
  onAdjustmentChange,
  onRatioChange,
  onBaseValueChange,
  required = false,
}: Props) {
  const [inputValue, setInputValue] = useState("");
  const [ratios, setRatios] = useState(["", "", ""]);

  function parsePercent(value: string) {
    return Number(value.replace("%", "")) || 0;
  }

  function calculateSizeRatio(value: number) {
    const base = Number(inputValue);

    if (!base || !appraisalNumber || !comparableNumbers) return 0;

    return Number(((value - appraisalNumber) / base).toFixed(1));
  }

  const calculatedRatios = useMemo(() => {
    if (calculationType === "size") {
      return (
        comparableNumbers?.map((item) => calculateSizeRatio(item)) ?? [
          "",
          "",
          "",
        ]
      );
    }

    return ratios;
  }, [calculationType, comparableNumbers, ratios, inputValue, appraisalNumber]);

  const adjustments = useMemo(() => {
    return basePrices.map((price, index) => {
      const ratio = Number(calculatedRatios[index]) || 0;
      return (price * ratio) / 100;
    });
  }, [basePrices, calculatedRatios]);

  useEffect(() => {
    onRatioChange?.(calculatedRatios.map((x) => Number(x) || 0));
  }, [JSON.stringify(calculatedRatios)]);

  useEffect(() => {
    onAdjustmentChange?.(adjustments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(adjustments)]);

  const results = useMemo(() => {
    return basePrices.map((price, index) => {
      if (previousResults) {
        return previousResults[index] + adjustments[index];
      }

      return price + adjustments[index];
    });
  }, [basePrices, previousResults, adjustments]);

  useEffect(() => {
    onResultChange?.(results);
  }, [JSON.stringify(results)]);

  return (
    <>
      {/* Dòng dữ liệu C1 */}
      <tr>
        <td className="border p-2 text-center font-bold">{code}</td>

        <td className="border p-2 font-semibold">
          {title}

          {required && <span className="ml-1 text-red-500">*</span>}
        </td>

        <td className="border p-2"></td>

        <td className="border p-2">{appraisal}</td>

        <td className="border p-2">{comparable1}</td>

        <td className="border p-2">{comparable2}</td>

        <td className="border p-2">{comparable3}</td>
      </tr>

      {/* Thông số điều chỉnh - chỉ dành cho C6/C7/C8 */}
      {calculationType === "size" && (
        <tr>
          <td className="border p-2"></td>

          <td className="border p-2 text-sm text-slate-500">
            Thông số điều chỉnh
          </td>

          <td className="border p-2"></td>

          {/* TSTĐ - nhập */}
          <td className="border p-2">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => {
                const value = e.target.value;

                setInputValue(value);

                onBaseValueChange?.(Number(value) || 0);
              }}
              className={`
              w-full
              rounded
              border
              bg-emerald-50
              px-2
              py-1
              text-right
              outline-none
              ${
                required && !inputValue.trim()
                  ? "border-red-500 focus:border-red-500"
                  : "border-emerald-200 focus:border-emerald-400"
              }
            `}
            />
          </td>

          {/* TSSS1 / TSSS2 / TSSS3 - kết quả thông số điều chỉnh */}
          {comparableNumbers?.map((item, index) => (
            <td key={index} className="border bg-emerald-50 p-2 text-right">
              {inputValue ? calculateSizeRatio(item).toFixed(1) : ""}
            </td>
          ))}
        </tr>
      )}

      {/* Tỷ lệ điều chỉnh */}
      <tr>
        <td className="border p-2"></td>

        <td className="border p-2">Tỷ lệ điều chỉnh</td>

        <td className="border p-2 text-center">%</td>

        {calculationType === "size" ? (
          <>
            {/* TSTĐ */}
            <td className="border p-2"></td>

            {/* TSSS1 / TSSS2 / TSSS3 */}
            {comparableNumbers?.map((item, index) => (
              <td key={index} className="border p-2 text-right">
                {inputValue ? calculateSizeRatio(item).toFixed(1) + "%" : ""}
              </td>
            ))}
          </>
        ) : (
          <>
            {/* TSTĐ không nhập */}
            <td className="border p-2"></td>

            {/* TSSS1 TSSS2 TSSS3 nhập tay */}
            {ratios.map((ratio, index) => (
              <td key={index} className="border p-2">
                <input
                  value={ratio}
                  onChange={(e) => {
                    const next = [...ratios];
                    next[index] = e.target.value;
                    setRatios(next);
                  }}
                  className="
                  w-full
                  rounded
                  border
                  px-2
                  py-1
                  text-right
                "
                />
              </td>
            ))}
          </>
        )}
      </tr>

      {/* Mức điều chỉnh */}
      <tr>
        <td className="border p-2"></td>

        <td className="border p-2">Mức điều chỉnh</td>

        <td className="border p-2 text-center">đồng/m²</td>

        <td className="border p-2"></td>

        {adjustments.map((value, index) => (
          <td key={index} className="border p-2 text-right">
            {Math.round(value).toLocaleString("vi-VN")}
          </td>
        ))}
      </tr>

      {/* Giá sau điều chỉnh */}
      <tr>
        <td className="border p-2"></td>

        <td className="border p-2">Giá sau điều chỉnh</td>

        <td className="border p-2 text-center">đồng/m²</td>

        <td className="border p-2"></td>

        {results.map((value, index) => (
          <td key={index} className="border p-2 text-right font-semibold">
            {Math.round(value).toLocaleString("vi-VN")}
          </td>
        ))}
      </tr>
    </>
  );
}
