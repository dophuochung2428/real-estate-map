"use client";

import { useState } from "react";
import { ComparableProperty } from "@/lib/valuation/filter";
import { ValuationDetailForm, ValuationSearchForm } from "@/types/valuation";
import ValuationDetailSection from "@/components/valuation/valuation-detail-section";
import { Filter } from "lucide-react";
import ValuationAdjustmentTable from "./valuation-adjustment-table";
import { LandAreaFormItem, LandAreaType } from "@/types/property";

export type ComparablePropertyWithMeta = ComparableProperty & {
  source?: string;
  contact?: string;
  created_at?: string | null;
};

const LAND_SHAPE_LABELS: Record<string, string> = {
  square: "Vuông",
  rectangle: "Chữ nhật",
  expanding_back: "Nở hậu",
  narrowing_back: "Tóp hậu",
  irregular: "Không đều",
};

const LAND_AREA_TYPES: LandAreaType[] = ["ODT", "ONT", "LUC", "BHK", "CLN"];

function getLandArea(
  landAreas: LandAreaFormItem[] | undefined,
  types: LandAreaType[],
): string {
  if (!landAreas?.length) {
    return "";
  }

  const total = landAreas
    .filter((item) => {
      return item.type !== "" && types.includes(item.type);
    })
    .reduce((sum, item) => {
      const area = Number(item.area);

      return sum + (Number.isFinite(area) ? area : 0);
    }, 0);

  return total > 0 ? String(total) : "";
}

export default function ValuationWorkspace() {
  const [form, setForm] = useState<ValuationSearchForm & ValuationDetailForm>({
    source: "",
    contact: "",

    appraisalDate: "",

    address: "",

    legalStatus: "",

    businessAdvantage: "",

    trafficLocation: "",

    environment: "",

    area: "",

    landAreas: [],

    frontageWidth: "",
    maxDepth: "",

    landShape: "",

    assetOnLand: "",

    latitude: "",
    longitude: "",

    structure: "",
    floors: "",
    usable_floor_area: "",
    remaining_value_ratio: "",
    construction_unit_price: "",
    resolution_land_price: "",
    price: "",
  });

  const [candidates, setCandidates] = useState<ComparablePropertyWithMeta[]>(
    [],
  );

  const [selectingColumn, setSelectingColumn] = useState<number | null>(null);

  const [comparables, setComparables] = useState<ComparablePropertyWithMeta[]>(
    [],
  );
  const [isSearching, setIsSearching] = useState(false);

  const [isExporting, setIsExporting] = useState(false);

  const [viewingComparable, setViewingComparable] =
    useState<ComparablePropertyWithMeta | null>(null);

  type ConstructionData = {
    structure: string;
    floors: string;
    usableFloorArea: string;
    remainingQuality: string;
    constructionUnitPrice: string;
  };

  const [constructionData, setConstructionData] = useState<ConstructionData>({
    structure: "",
    floors: "",
    usableFloorArea: "",
    remainingQuality: "",
    constructionUnitPrice: "",
  });

  const canExport = comparables[0] && comparables[1] && comparables[2];

  const [valuationResult, setValuationResult] = useState({
    negotiatedPrices: ["", "", ""],
    landUnitPrices: ["", "", ""],
  });

  const [adjustmentData, setAdjustmentData] = useState<{
    ratios: number[][];
    adjustments: number[][];
    results: number[][];
    sizeInputs: number[];
    adjustmentRange: string[];
  }>({
    ratios: [],
    adjustments: [],
    results: [],
    sizeInputs: [],
    adjustmentRange: [],
  });

  const [negotiationRatios, setNegotiationRatios] = useState(["", "", "", ""]);

  async function handleExport() {
    if (!canExport) {
      alert("Vui lòng chọn đủ 3 tài sản so sánh.");
      return;
    }

    try {
      setIsExporting(true);

      const response = await fetch("/api/valuation/export", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form,
          comparables,
          negotiationRatios,
          adjustmentData,
        }),
      });

      if (!response.ok) {
        throw new Error("Export failed");
      }

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = "tham-dinh-gia.xlsx";

      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);

      alert("Xuất Excel thất bại.");
    } finally {
      setIsExporting(false);
    }
  }

  async function handleSearch() {
    try {
      setIsSearching(true);

      const { source: _source, contact: _contact, ...searchPayload } = form;

      const response = await fetch("/api/valuation/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchPayload),
      });

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const result = (await response.json()) as ComparablePropertyWithMeta[];

      setCandidates(result);

      setComparables(result.slice(0, 3));
    } catch (error) {
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  }

  function handleComparableChange(columnIndex: number, propertyId: string) {
    const selected = candidates.find((item) => item.id === propertyId);

    if (!selected) {
      return;
    }

    const next = [...comparables];

    next[columnIndex] = selected;

    setComparables(next);
  }

  function updateField(key: string, value: string) {
    if (key === "source" || key === "contact") {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function updateLandArea(type: LandAreaType, value: string) {
    setForm((prev) => {
      const landAreas = [...prev.landAreas];

      const index = landAreas.findIndex((item) => item.type === type);

      if (index >= 0) {
        landAreas[index] = {
          ...landAreas[index],
          area: value,
        };
      } else {
        landAreas.push({
          type,
          area: value,
          unit_price: "",
        });
      }

      return {
        ...prev,
        landAreas,
      };
    });
  }

  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--border)]
          px-5
          py-4
        "
      >
        <h2 className="font-semibold text-lg">Thông tin thị trường</h2>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="
              rounded-xl
              bg-[var(--primary)]
              px-4
              py-2
              text-white
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isSearching ? "Đang tìm..." : "Tìm TSSS"}
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || !canExport}
            title={!canExport ? "Cần chọn đủ 3 tài sản so sánh" : undefined}
            className="
    rounded-xl
    border
    border-[var(--border)]
    px-4
    py-2
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
          >
            {isExporting ? "Đang xuất..." : "Xuất Excel"}
          </button>
        </div>
      </div>

      <div className="overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                STT
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                  text-left
                "
              >
                Đặc điểm BĐS
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                  text-left
                "
              >
                TSTĐ
              </th>

              <th
                className="
    border
    border-[var(--border)]
    bg-[var(--hover)]
    p-3
  "
              >
                <ComparableHeader
                  index={1}
                  comparable={comparables[0]}
                  onOpen={() => setSelectingColumn(0)}
                />
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                <ComparableHeader
                  index={2}
                  comparable={comparables[1]}
                  onOpen={() => setSelectingColumn(1)}
                />
              </th>

              <th
                className="
                  border
                  border-[var(--border)]
                  bg-[var(--hover)]
                  p-3
                "
              >
                <ComparableHeader
                  index={3}
                  comparable={comparables[2]}
                  onOpen={() => setSelectingColumn(2)}
                />
              </th>
            </tr>
          </thead>

          <tbody>
            <ReadOnlyComparisonRow
              stt="1"
              label="Nguồn tin"
              fieldKey="source"
              comparables={comparables}
            />

            <ReadOnlyComparisonRow
              stt="2"
              label="Liên hệ"
              fieldKey="contact"
              comparables={comparables}
            />

            <ReadOnlyComparisonRow
              stt="3"
              label="Tình trạng giao dịch / Thời điểm"
              fieldKey="appraisalDate"
              comparables={comparables}
            />

            {/* <EditableInputRow
              stt="4"
              label="Địa chỉ"
              value={form.address}
              fieldKey="address"
              comparables={comparables}
              onChange={(v) => updateField("address", v)}
            /> */}

            <tr>
              <td className="border border-[var(--border)] p-3 text-center">
                4
              </td>

              <td className="border border-[var(--border)] p-3">Tọa độ</td>

              <td className="border border-[var(--border)] p-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="mb-1 text-xs opacity-70">Lat</div>
                    <input
                      value={form.latitude}
                      onChange={(e) => updateField("latitude", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                    />
                  </div>

                  <div>
                    <div className="mb-1 text-xs opacity-70">Lng</div>
                    <input
                      value={form.longitude}
                      onChange={(e) => updateField("longitude", e.target.value)}
                      className="w-full rounded-lg border border-[var(--border)] px-3 py-2"
                    />
                  </div>
                </div>
              </td>

              <td className="border border-[var(--border)] p-3">
                {comparables[0]?.address ?? "-"}
              </td>

              <td className="border border-[var(--border)] p-3">
                {comparables[1]?.address ?? "-"}
              </td>

              <td className="border border-[var(--border)] p-3">
                {comparables[2]?.address ?? "-"}
              </td>
            </tr>

            <EditableSelectRow
              stt="5"
              label="Tình trạng pháp lý"
              value={form.legalStatus}
              fieldKey="legalStatus"
              comparables={comparables}
              onChange={(v) => updateField("legalStatus", v)}
              options={[
                {
                  value: "true",
                  label: "Có",
                },
                {
                  value: "false",
                  label: "Không",
                },
              ]}
            />

            <EditableSelectRow
              stt="6"
              label="Vị trí khu vực, lợi thế kinh doanh"
              value={form.businessAdvantage}
              fieldKey="businessAdvantage"
              comparables={comparables}
              onChange={(v) => updateField("businessAdvantage", v)}
              options={[
                {
                  value: "true",
                  label: "Có lợi thế",
                },
                {
                  value: "false",
                  label: "Không có lợi thế",
                },
              ]}
            />

            <EditableInputRow
              stt="7"
              label="Vị trí giao thông"
              value={form.trafficLocation}
              fieldKey="trafficLocation"
              comparables={comparables}
              onChange={(v) => updateField("trafficLocation", v)}
            />

            <EditableInputRow
              stt="8"
              label="An ninh, môi trường sống"
              value={form.environment}
              fieldKey="environment"
              comparables={comparables}
              onChange={(v) => updateField("environment", v)}
            />

            <EditableInputRow
              stt="9"
              label="Diện tích thửa đất (m²)"
              value={form.area}
              fieldKey="area"
              comparables={comparables}
              onChange={(v) => updateField("area", v)}
              required
            />

            <EditableSelectRow
              stt="10"
              label="Mục đích sử dụng đất"
              value={form.landAreas[0]?.type ?? ""}
              fieldKey="landAreas"
              comparables={comparables}
              onChange={(v) => {
                setForm((prev) => {
                  const landAreas = [...prev.landAreas];

                  if (landAreas.length === 0) {
                    landAreas.push({
                      type: v as LandAreaType,
                      area: "",
                      unit_price: "",
                    });
                  } else {
                    landAreas[0] = {
                      ...landAreas[0],
                      type: v as LandAreaType | "",
                    };
                  }

                  return {
                    ...prev,
                    landAreas,
                  };
                });
              }}
              options={[
                {
                  value: "ODT",
                  label: "ODT",
                },
                {
                  value: "ONT",
                  label: "ONT",
                },
                {
                  value: "LUC",
                  label: "LUC",
                },
                {
                  value: "BHK",
                  label: "BHK",
                },
                {
                  value: "CLN",
                  label: "CLN",
                },
              ]}
            />

            <EditableInputRow
              stt="10.1"
              label="Đất ODT (m²)"
              value={getLandArea(form.landAreas, ["ODT"])}
              fieldKey="odtLandArea"
              comparables={comparables}
              onChange={(v) => updateLandArea("ODT", v)}
            />

            <EditableInputRow
              stt="10.2"
              label="Đất CLN (m²)"
              value={getLandArea(form.landAreas, ["CLN"])}
              fieldKey="clnLandArea"
              comparables={comparables}
              onChange={(v) => updateLandArea("CLN", v)}
            />

            <EditableInputRow
              stt="10.3"
              label="Đất HNK/NTS/BHK (m²)"
              value={getLandArea(form.landAreas, ["BHK"])}
              fieldKey="hnkNtsBhkLandArea"
              comparables={comparables}
              onChange={(v) => updateLandArea("BHK", v)}
            />

            <EditableInputRow
              stt="11"
              label="Chiều rộng mặt tiền tiếp giáp đường chính (m)"
              value={form.frontageWidth}
              fieldKey="frontageWidth"
              comparables={comparables}
              onChange={(v) => updateField("frontageWidth", v)}
              required
            />

            <EditableInputRow
              stt="12"
              label="Chiều sâu dài nhất (m)"
              value={form.maxDepth}
              fieldKey="maxDepth"
              comparables={comparables}
              onChange={(v) => updateField("maxDepth", v)}
              required
            />

            <EditableInputRow
              stt="13"
              label="Hình thể thửa đất"
              value={form.landShape}
              fieldKey="landShape"
              comparables={comparables}
              onChange={(v) => updateField("landShape", v)}
            />

            <EditableInputRow
              stt="14"
              label="Tài sản trên đất"
              value={form.assetOnLand}
              fieldKey="assetOnLand"
              comparables={comparables}
              onChange={(v) => updateField("assetOnLand", v)}
            />

            <ValuationDetailSection
              comparables={comparables}
              form={form}
              updateField={updateField}
              negotiationRatios={negotiationRatios}
              setNegotiationRatios={setNegotiationRatios}
              setValuationResult={setValuationResult}
            />
          </tbody>
        </table>

        <ValuationAdjustmentTable
          form={form}
          comparables={comparables}
          valuationResult={valuationResult}
          setAdjustmentData={setAdjustmentData}
        />
      </div>
      {selectingColumn !== null && (
        <div
          className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
    "
        >
          <div
            className="
        max-h-[80vh]
        w-[900px]
        overflow-hidden
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        text-[var(--foreground)]
        shadow-2xl
      "
          >
            <div
              className="
          flex
          items-center
          justify-between
          border-b
          border-[var(--border)]
          bg-[var(--card)]
          px-5
          py-4
        "
            >
              <h3 className="text-lg font-semibold">
                Chọn bất động sản cho TSSS {selectingColumn! + 1}
              </h3>

              {comparables[selectingColumn] && (
                <div
                  className="
      mt-3
      rounded-lg
      border
      border-[var(--border)]
      bg-[var(--hover)]
      p-3
      text-sm
    "
                >
                  <div className="font-medium">Đang chọn:</div>

                  <div>{comparables[selectingColumn].address}</div>

                  <div className="text-xs opacity-70">
                    Điểm: {comparables[selectingColumn].score}
                    {" • "}
                    Khoảng cách:{" "}
                    {comparables[selectingColumn].distanceKm.toFixed(2)} km
                  </div>
                </div>
              )}

              <button
                onClick={() => setSelectingColumn(null)}
                className="
            rounded-lg
            border
            border-[var(--border)]
            px-3
            py-1
            hover:bg-[var(--hover)]
          "
              >
                Đóng
              </button>
            </div>

            <div className="max-h-[65vh] overflow-auto">
              <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 z-10 bg-[var(--card)]">
                  <tr>
                    <th className="border border-[var(--border)] p-3">Điểm</th>

                    <th className="border border-[var(--border)] p-3">
                      Khoảng cách
                    </th>

                    <th className="border border-[var(--border)] p-3">
                      Địa chỉ
                    </th>

                    <th className="border border-[var(--border)] p-3">
                      Thao tác
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {candidates.map((item) => {
                    const isCurrent =
                      comparables[selectingColumn!]?.id === item.id;

                    const usedBy = comparables.findIndex(
                      (c) => c?.id === item.id,
                    );

                    return (
                      <tr
                        key={item.id}
                        className={`
      transition-colors
      ${
        isCurrent
          ? "border-l-4 border-green-500 bg-[var(--hover)]"
          : "hover:bg-[var(--hover)]"
      }
    `}
                      >
                        <td
                          className="
                    border
                    border-[var(--border)]
                    p-3
                    text-center
                  "
                        >
                          {item.score}
                        </td>

                        <td
                          className="
                    border
                    border-[var(--border)]
                    p-3
                    text-center
                  "
                        >
                          {item.distanceKm?.toFixed(2)} km
                        </td>

                        <td
                          className="
                    border
                    border-[var(--border)]
                    p-3
                  "
                        >
                          {item.address}
                        </td>

                        <td
                          className="
    border
    border-[var(--border)]
    p-3
    text-center
  "
                        >
                          {usedBy >= 0 && (
                            <div className="mb-2 flex justify-center">
                              <span
                                className={`
        rounded-full
        px-2
        py-1
        text-xs
        text-white
        ${isCurrent ? "bg-green-600" : "bg-blue-500"}
      `}
                              >
                                {isCurrent
                                  ? `Đang chọn (TSSS ${usedBy + 1})`
                                  : `TSSS ${usedBy + 1}`}
                              </span>
                            </div>
                          )}

                          <button
                            onClick={() => setViewingComparable(item)}
                            className="
    rounded-lg
    border
    px-3
    py-2
  "
                          >
                            Xem
                          </button>

                          <button
                            disabled={isCurrent}
                            className="
  rounded-lg
  bg-[var(--primary)]
  px-3
  py-2
  text-white
  transition-all
  hover:opacity-90
  disabled:bg-green-600
  disabled:opacity-100
  disabled:cursor-not-allowed
"
                            onClick={() => {
                              handleComparableChange(selectingColumn!, item.id);

                              setSelectingColumn(null);
                            }}
                          >
                            {isCurrent ? "Đang chọn" : "Chọn"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {viewingComparable && (
        <div
          className="
      fixed
      inset-0
      z-[60]
      flex
      items-center
      justify-center
      bg-black/60
      backdrop-blur-sm
    "
        >
          <div
            className="
        w-[600px]
        max-h-[85vh]
        overflow-auto
        rounded-2xl
        border
        border-[var(--border)]
        bg-[var(--card)]
        p-6
        shadow-2xl
      "
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                Chi tiết tài sản so sánh
              </h2>

              <button
                onClick={() => setViewingComparable(null)}
                className="
            rounded-lg
            border
            px-3
            py-1
            hover:bg-[var(--hover)]
          "
              >
                Đóng
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs opacity-60">Địa chỉ</div>
                <div className="font-medium">
                  {viewingComparable.address || "-"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-60">Điểm phù hợp</div>
                  <div className="font-semibold text-green-600">
                    {viewingComparable.score} điểm
                  </div>
                </div>

                <div>
                  <div className="text-xs opacity-60">Khoảng cách</div>
                  <div>{viewingComparable.distanceKm?.toFixed(2)} km</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-60">Diện tích</div>
                  <div>{viewingComparable.area ?? "-"} m²</div>
                </div>

                <div>
                  <div className="text-xs opacity-60">Giá</div>
                  <div>
                    {viewingComparable.price
                      ? `${viewingComparable.price} đồng`
                      : "-"}
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-2 text-xs opacity-60">
                  Diện tích theo mục đích sử dụng đất
                </div>

                {viewingComparable.landAreas?.length ? (
                  <div className="space-y-2">
                    {viewingComparable.landAreas.map((landArea) => (
                      <div
                        key={landArea.type}
                        className="
            flex
            items-center
            justify-between
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            py-2
          "
                      >
                        <span className="font-medium">{landArea.type}</span>

                        <span>{landArea.area} m²</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>-</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs opacity-60">Chiều rộng mặt tiền</div>
                  <div className="font-medium">
                    {viewingComparable.frontage_width
                      ? `${viewingComparable.frontage_width} m`
                      : "-"}
                  </div>
                </div>

                <div>
                  <div className="text-xs opacity-60">Chiều sâu</div>
                  <div className="font-medium">
                    {viewingComparable.max_depth
                      ? `${viewingComparable.max_depth} m`
                      : "-"}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs opacity-60">Pháp lý</div>
                <div>{viewingComparable.legal_status ? "Có" : "Không"}</div>
              </div>

              <div>
                <div className="text-xs opacity-60">Hình thể đất</div>
                <div>
                  {LAND_SHAPE_LABELS[viewingComparable.land_shape ?? ""] ??
                    viewingComparable.land_shape ??
                    "-"}
                </div>
              </div>

              <div>
                <div className="text-xs opacity-60">Tài sản trên đất</div>
                <div>{viewingComparable.asset_on_land || "-"}</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setViewingComparable(null)}
                className="
            rounded-lg
            border
            px-4
            py-2
          "
              >
                Đóng
              </button>

              <button
                onClick={() => {
                  handleComparableChange(
                    selectingColumn!,
                    viewingComparable.id,
                  );

                  setViewingComparable(null);
                  setSelectingColumn(null);
                }}
                className="
            rounded-lg
            bg-[var(--primary)]
            px-4
            py-2
            text-white
          "
              >
                Chọn TSSS này
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function EditableInputRow({
  stt,
  label,
  value,
  fieldKey,
  comparables,
  onChange,
  required = false,
  readOnly = false,
}: {
  stt: string;
  label: string;
  value: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
  onChange: (value: string) => void;
  required?: boolean;
  readOnly?: boolean;
}) {
  const isEmpty = !value?.trim();

  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <input
          value={value}
          readOnly={readOnly}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full
            rounded-lg
            border
            bg-[var(--background)]
            px-3
            py-2
            text-[var(--foreground)]
            outline-none
            transition-colors
    ${
      readOnly
        ? "cursor-default border-[var(--border)] opacity-70"
        : required && isEmpty
          ? "border-red-500 focus:border-red-500"
          : "border-[var(--border)] focus:border-[var(--primary)]"
    }
          `}
        />
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

function ReadOnlyComparisonRow({
  stt,
  label,
  fieldKey,
  comparables,
}: {
  stt: string;
  label: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
}) {
  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-[var(--foreground)]/70">
          -
        </div>
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

function EditableSelectRow({
  stt,
  label,
  value,
  fieldKey,
  comparables,
  onChange,
  options,
}: {
  stt: string;
  label: string;
  value: string;
  fieldKey: string;
  comparables: ComparablePropertyWithMeta[];
  onChange: (value: string) => void;
  options: {
    value: string;
    label: string;
  }[];
}) {
  return (
    <tr>
      <td
        className="
          border
          border-[var(--border)]
          p-3
          text-center
          text-[var(--foreground)]
        "
      >
        {stt}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-3
          font-medium
          text-[var(--foreground)]
        "
      >
        {label}
      </td>

      <td
        className="
          border
          border-[var(--border)]
          p-2
        "
      >
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            rounded-lg
            border
            border-[var(--border)]
            bg-[var(--background)]
            px-3
            py-2
            text-[var(--foreground)]
          "
        >
          <option value="">Chọn</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>

      <ComparableValueCell comparable={comparables[0]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[1]} fieldKey={fieldKey} />
      <ComparableValueCell comparable={comparables[2]} fieldKey={fieldKey} />
    </tr>
  );
}

export function ComparableValueCell({
  comparable,
  fieldKey,
}: {
  comparable?: ComparablePropertyWithMeta;
  fieldKey: string;
}) {
  return (
    <td className="border border-[var(--border)] p-3 text-[var(--foreground)]">
      {getComparableValue(comparable, fieldKey)}
    </td>
  );
}

function ComparableHeader({
  index,
  comparable,
  onOpen,
}: {
  index: number;
  comparable?: ComparablePropertyWithMeta;
  onOpen: () => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span>{getComparableHeaderLabel(index, comparable)}</span>

      <button
        type="button"
        onClick={onOpen}
        className="
    rounded-md
    border
    border-[var(--border)]
    p-1
    hover:bg-[var(--hover)]
  "
        title="Chọn BĐS so sánh"
      >
        <Filter size={14} />
      </button>
    </div>
  );
}
function getComparableValue(
  comparable: ComparablePropertyWithMeta | undefined,
  fieldKey: string,
) {
  if (!comparable) {
    return "";
  }

  switch (fieldKey) {
    case "source":
      return comparable.source ?? "";
    case "contact": {
      const parts = [comparable.contact_name, comparable.contact_phone].filter(
        Boolean,
      );

      return parts.join(" - ");
    }
    case "appraisalDate":
      return comparable.created_at
        ? new Date(comparable.created_at).toLocaleDateString("vi-VN")
        : "";
    case "address":
      return comparable.address ?? "";
    case "legalStatus":
      return comparable.legal_status === undefined
        ? ""
        : comparable.legal_status
          ? "Có"
          : "Không";
    case "businessAdvantage":
      return comparable.business_advantage === undefined
        ? ""
        : comparable.business_advantage
          ? "Có lợi thế"
          : "Không có lợi thế";
    case "trafficLocation":
      return comparable.distanceKm !== undefined
        ? `Cách TSTĐ ${comparable.distanceKm.toFixed(2)} km`
        : "";
    case "environment":
      return comparable.environment ?? "";
    case "area":
      return comparable.area ? `${comparable.area} m²` : "";
    case "landAreas":
      return getComparableLandAreaTypes(comparable);

    case "odtLandArea":
      return getComparableLandArea(comparable, ["ODT"]);

    case "clnLandArea":
      return getComparableLandArea(comparable, ["CLN"]);

    case "hnkNtsBhkLandArea":
      return getComparableLandArea(comparable, ["BHK"]);
    case "frontageWidth":
      return comparable.frontage_width !== undefined
        ? `${comparable.frontage_width} m`
        : "";
    case "maxDepth":
      return comparable.max_depth !== undefined
        ? `${comparable.max_depth} m`
        : "";
    case "landShape":
      return comparable.land_shape
        ? (LAND_SHAPE_LABELS[comparable.land_shape] ?? comparable.land_shape)
        : "";
    case "assetOnLand":
      return comparable.asset_on_land ?? "";
    case "price":
      return comparable.price ? `${comparable.price} đồng` : "";

    case "structure":
      return comparable.structure ?? "";

    case "floors":
      return comparable.floors ?? "";

    case "usable_floor_area":
      return comparable.usable_floor_area
        ? `${comparable.usable_floor_area} m²`
        : "";

    case "remaining_value_ratio":
      return comparable.remaining_value_ratio
        ? `${comparable.remaining_value_ratio}%`
        : "";

    case "construction_unit_price":
      return comparable.construction_unit_price
        ? `${comparable.construction_unit_price} đồng/m²`
        : "";

    case "resolution_land_price":
      return comparable.resolution_land_price ?? "";
  }
}

function getComparableLandAreaTypes(
  comparable: ComparablePropertyWithMeta,
): string {
  if (!comparable.landAreas?.length) {
    return "";
  }

  return comparable.landAreas
    .map((item) => item.type)
    .filter(Boolean)
    .join(" + ");
}

function getComparableLandArea(
  comparable: ComparablePropertyWithMeta,
  types: LandAreaType[],
): string {
  if (!comparable.landAreas?.length) {
    return "";
  }

  const total = comparable.landAreas
    .filter((item) => types.includes(item.type))
    .reduce((sum, item) => {
      return sum + item.area;
    }, 0);

  return total > 0 ? `${total} m²` : "";
}

function getComparableHeaderLabel(
  index: number,
  comparable?: ComparablePropertyWithMeta,
) {
  if (!comparable) {
    return `TSSS ${index}`;
  }

  return `TSSS ${index} (${comparable.score}đ)`;
}
