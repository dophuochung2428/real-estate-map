"use client";

import {
  ComparablePropertyWithMeta,
  EditableInputRow,
} from "@/components/valuation/valuation-workspace";
import { LandAreaFormItem, LandAreaItem, LandAreaType } from "@/types/property";
import { ValuationDetailForm, ValuationSearchForm } from "@/types/valuation";

import { useEffect, useState } from "react";

export default function ValuationDetailSection({
  comparables,
  form,
  updateField,
  negotiationRatios,
  setNegotiationRatios,
  setValuationResult,
}: {
  comparables: ComparablePropertyWithMeta[];
  form: ValuationSearchForm & ValuationDetailForm;
  updateField: (key: string, value: string) => void;

  negotiationRatios: string[];
  setNegotiationRatios: React.Dispatch<React.SetStateAction<string[]>>;

  setValuationResult: React.Dispatch<
    React.SetStateAction<{
      negotiatedPrices: string[];
      landUnitPrices: string[];
    }>
  >;
}) {
  function parsePercent(value: string) {
    return Number(value.replace("%", "")) || 0;
  }

  function constructionTotal(
    usableFloorArea?: number | string,
    remainingRatio?: number | string,
    constructionPrice?: number | string,
  ) {
    return (
      Number(usableFloorArea || 0) *
      (Number(remainingRatio || 0) / 100) *
      Number(constructionPrice || 0)
    );
  }

  function negotiatedPrice(price?: number | string, ratio?: string) {
    return Number(price || 0) * (parsePercent(ratio || "") / 100);
  }

  function landAfterConstruction(
    price?: number | string,
    ratio?: string,
    construction?: number,
  ) {
    return negotiatedPrice(price, ratio) - (construction || 0);
  }

  function landUnitPrice(
    price?: number | string,
    ratio?: string,
    construction?: number,
    area?: number | string,
  ) {
    if (!Number(area)) return 0;

    return landAfterConstruction(price, ratio, construction) / Number(area);
  }

  const negotiatedPrices = [
    negotiatedPrice(comparables[0]?.price, negotiationRatios[1]),

    negotiatedPrice(comparables[1]?.price, negotiationRatios[2]),

    negotiatedPrice(comparables[2]?.price, negotiationRatios[3]),
  ];

  const updateLandUnitPrice = (type: LandAreaType, value: string) => {
    const currentLandAreas = form.landAreas ?? [];

    const exists = currentLandAreas.some((item) => item.type === type);

    const nextLandAreas = exists
      ? currentLandAreas.map((item) =>
          item.type === type
            ? {
                ...item,
                unit_price: value,
              }
            : item,
        )
      : [
          ...currentLandAreas,
          {
            type,
            area: "",
            unit_price: value,
          },
        ];

    updateField("landAreas", nextLandAreas as any);
  };

  const landUnitPrices = [
    landUnitPrice(
      comparables[0]?.price,
      negotiationRatios[1],
      constructionTotal(
        comparables[0]?.usable_floor_area,
        comparables[0]?.remaining_value_ratio,
        comparables[0]?.construction_unit_price,
      ),
      comparables[0]?.area,
    ),

    landUnitPrice(
      comparables[1]?.price,
      negotiationRatios[2],
      constructionTotal(
        comparables[1]?.usable_floor_area,
        comparables[1]?.remaining_value_ratio,
        comparables[1]?.construction_unit_price,
      ),
      comparables[1]?.area,
    ),

    landUnitPrice(
      comparables[2]?.price,
      negotiationRatios[3],
      constructionTotal(
        comparables[2]?.usable_floor_area,
        comparables[2]?.remaining_value_ratio,
        comparables[2]?.construction_unit_price,
      ),
      comparables[2]?.area,
    ),
  ];
  useEffect(() => {
    setValuationResult({
      negotiatedPrices: negotiatedPrices.map((v) => Math.round(v).toString()),

      landUnitPrices: landUnitPrices.map((v) => Math.round(v).toString()),
    });
  }, [comparables, negotiationRatios]);
  return (
    <>
      <EditableInputRow
        stt="14.1"
        label="Kết cấu"
        value={form.structure}
        fieldKey="structure"
        comparables={comparables}
        onChange={(v) => updateField("structure", v)}
      />

      <EditableInputRow
        stt="14.2"
        label="Số tầng"
        value={form.floors}
        fieldKey="floors"
        comparables={comparables}
        onChange={(v) => updateField("floors", v)}
      />

      <EditableInputRow
        stt="14.3"
        label="Diện tích sàn sử dụng (m²)"
        value={form.usable_floor_area}
        fieldKey="usable_floor_area"
        comparables={comparables}
        onChange={(v) => updateField("usable_floor_area", v)}
      />

      <EditableInputRow
        stt="14.4"
        label="Tỷ lệ GTCL (%) đề xuất"
        value={form.remaining_value_ratio}
        fieldKey="remaining_value_ratio"
        comparables={comparables}
        onChange={(v) => updateField("remaining_value_ratio", v)}
      />

      <EditableInputRow
        stt="14.5"
        label="Đơn giá xây dựng (đồng/m²) đề xuất"
        value={form.construction_unit_price}
        fieldKey="construction_unit_price"
        comparables={comparables}
        onChange={(v) => updateField("construction_unit_price", v)}
      />

      <CalculatedRow
        stt="15"
        label="Tổng giá trị CTXD (đồng)"
        values={[
          constructionTotal(
            form.usable_floor_area,
            form.remaining_value_ratio,
            form.construction_unit_price,
          ),

          constructionTotal(
            comparables[0]?.usable_floor_area,
            comparables[0]?.remaining_value_ratio,
            comparables[0]?.construction_unit_price,
          ),

          constructionTotal(
            comparables[1]?.usable_floor_area,
            comparables[1]?.remaining_value_ratio,
            comparables[1]?.construction_unit_price,
          ),

          constructionTotal(
            comparables[2]?.usable_floor_area,
            comparables[2]?.remaining_value_ratio,
            comparables[2]?.construction_unit_price,
          ),
        ]}
      />

      <EditableInputRow
        stt="17"
        label="Giá bán / rao bán (đồng)"
        value={form.price}
        fieldKey="price"
        comparables={comparables}
        onChange={(v) => updateField("price", v)}
        readOnly
      />

      <NegotiationRow
        stt="18"
        label="Giá thương lượng"
        prices={[
          Number(form.price),

          Number(comparables[0]?.price),

          Number(comparables[1]?.price),

          Number(comparables[2]?.price),
        ]}
        ratios={negotiationRatios}
        setRatios={setNegotiationRatios}
      />

      <CalculatedRow
        stt="19"
        label="Giá sau khi chuyển mục đích sử dụng đất (đồng)"
        values={[
          landAfterConstruction(
            form.price,
            negotiationRatios[0],
            constructionTotal(
              form.usable_floor_area,
              form.remaining_value_ratio,
              form.construction_unit_price,
            ),
          ),

          landAfterConstruction(
            comparables[0]?.price,
            negotiationRatios[1],
            constructionTotal(
              comparables[0]?.usable_floor_area,
              comparables[0]?.remaining_value_ratio,
              comparables[0]?.construction_unit_price,
            ),
          ),

          landAfterConstruction(
            comparables[1]?.price,
            negotiationRatios[2],
            constructionTotal(
              comparables[1]?.usable_floor_area,
              comparables[1]?.remaining_value_ratio,
              comparables[1]?.construction_unit_price,
            ),
          ),

          landAfterConstruction(
            comparables[2]?.price,
            negotiationRatios[3],
            constructionTotal(
              comparables[2]?.usable_floor_area,
              comparables[2]?.remaining_value_ratio,
              comparables[2]?.construction_unit_price,
            ),
          ),
        ]}
      />

      <CalculatedRow
        stt="20"
        label="Đơn giá QSDĐ ODT (đồng/m²)"
        values={[
          landUnitPrice(
            form.price,
            negotiationRatios[0],
            constructionTotal(
              form.usable_floor_area,
              form.remaining_value_ratio,
              form.construction_unit_price,
            ),
            form.area,
          ),

          landUnitPrice(
            comparables[0]?.price,
            negotiationRatios[1],
            constructionTotal(
              comparables[0]?.usable_floor_area,
              comparables[0]?.remaining_value_ratio,
              comparables[0]?.construction_unit_price,
            ),
            comparables[0]?.area,
          ),

          landUnitPrice(
            comparables[1]?.price,
            negotiationRatios[2],
            constructionTotal(
              comparables[1]?.usable_floor_area,
              comparables[1]?.remaining_value_ratio,
              comparables[1]?.construction_unit_price,
            ),
            comparables[1]?.area,
          ),

          landUnitPrice(
            comparables[2]?.price,
            negotiationRatios[3],
            constructionTotal(
              comparables[2]?.usable_floor_area,
              comparables[2]?.remaining_value_ratio,
              comparables[2]?.construction_unit_price,
            ),
            comparables[2]?.area,
          ),
        ]}
      />

      <EditableInputRow
        stt="21"
        label="Đơn giá đất theo Nghị quyết số 16/2025/NQ-HĐND ngày 30/12/2025 của HĐND tỉnh An Giang"
        value={form.resolution_land_price}
        fieldKey="resolution_land_price"
        comparables={comparables}
        onChange={(v) => updateField("resolution_land_price", v)}
      />

      <LandUnitPriceRow
        stt="21.1"
        label="Đất ODT (đồng/m²)"
        landType="ODT"
        form={form}
        comparables={comparables}
        onChange={(value) => {
          updateLandUnitPrice("ODT", value);
        }}
      />

      <LandUnitPriceRow
        stt="21.2"
        label="Đất CLN (đồng/m²)"
        landType="CLN"
        form={form}
        comparables={comparables}
        onChange={(value) => {
          updateLandUnitPrice("CLN", value);
        }}
      />

      <LandUnitPriceRow
        stt="21.3"
        label="Đất LUC (đồng/m²)"
        landType="LUC"
        form={form}
        comparables={comparables}
        onChange={(value) => {
          updateLandUnitPrice("LUC", value);
        }}
      />
    </>
  );
}

function LandUnitPriceRow({
  stt,
  label,
  landType,
  form,
  comparables,
  onChange,
}: {
  stt: string;
  label: string;
  landType: LandAreaType;
  form: ValuationSearchForm & ValuationDetailForm;
  comparables: ComparablePropertyWithMeta[];
  onChange: (value: string) => void;
}) {
  // Giá TSTĐ đang nhập
  const appraisalPrice = getLandUnitPrice(form.landAreas, landType);

  // Giá của TSSS 1, 2, 3
  const comparablePrices = comparables.map((comparable) =>
    getLandUnitPrice(comparable.landAreas, landType),
  );

  return (
    <tr>
      {/* STT */}
      <td className="border border-[var(--border)] p-3 text-center">{stt}</td>

      {/* Nội dung */}
      <td className="border border-[var(--border)] p-3 font-medium">{label}</td>

      {/* TSTĐ - NHẬP */}
      <td className="border border-[var(--border)] p-2">
        <input
          type="number"
          value={appraisalPrice || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Nhập đơn giá"
          className="
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            py-2
            text-[var(--foreground)]
            outline-none
            focus:border-[var(--primary)]
          "
        />
      </td>

      {/* TSSS 1 - C1 */}
      <td className="border border-[var(--border)] p-3 text-right">
        {comparablePrices[0] ? comparablePrices[0].toLocaleString("vi-VN") : ""}
      </td>

      {/* TSSS 2 - C2 */}
      <td className="border border-[var(--border)] p-3 text-right">
        {comparablePrices[1] ? comparablePrices[1].toLocaleString("vi-VN") : ""}
      </td>

      {/* TSSS 3 - C3 */}
      <td className="border border-[var(--border)] p-3 text-right">
        {comparablePrices[2] ? comparablePrices[2].toLocaleString("vi-VN") : ""}
      </td>
    </tr>
  );
}

function CalculatedRow({
  stt,
  label,
  values,
}: {
  stt: string;
  label: string;
  values: number[];
}) {
  return (
    <tr>
      <td className="border border-[var(--border)] p-3 text-center">{stt}</td>

      <td className="border border-[var(--border)] p-3 font-medium">{label}</td>

      {values.map((v, i) => (
        <td key={i} className="border border-[var(--border)] p-3">
          {Math.round(v).toLocaleString("vi-VN")}
        </td>
      ))}
    </tr>
  );
}

function parsePercent(value: string) {
  return Number(value.replace(/%/g, "").trim()) || 0;
}

function getLandUnitPrice(
  landAreas: (LandAreaFormItem | LandAreaItem)[] | undefined,
  type: LandAreaType,
): number {
  if (!landAreas?.length) {
    return 0;
  }

  const item = landAreas.find((landArea) => landArea.type === type);

  return Number(item?.unit_price || 0);
}

function NegotiationRow({
  stt,
  label,
  prices,
  ratios,
  setRatios,
}: {
  stt: string;
  label: string;
  prices: number[];
  ratios: string[];
  setRatios: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <tr>
      <td className="border border-[var(--border)] p-3 text-center">{stt}</td>

      <td className="border border-[var(--border)] p-3 font-medium">{label}</td>

      {prices.map((price, index) => {
        const ratio = parsePercent(ratios[index]);
        const negotiatedPrice = price * (ratio / 100);

        return (
          <td key={index} className="border border-[var(--border)] p-2">
            <input
              value={ratios[index]}
              placeholder="%"
              onChange={(e) => {
                const next = [...ratios];
                next[index] = e.target.value;
                setRatios(next);
              }}
              className="mb-2 w-full rounded border border-[var(--border)] px-2 py-1"
            />

            <div className="rounded bg-[var(--hover)] p-2 text-right">
              {Math.round(negotiatedPrice).toLocaleString("vi-VN")}
            </div>
          </td>
        );
      })}
    </tr>
  );
}
