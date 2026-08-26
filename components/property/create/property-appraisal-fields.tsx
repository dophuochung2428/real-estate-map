"use client";

import React from "react";

export default function PropertyAppraisalFields({
  form,
  setForm,
}: {
  form: any;
  setForm: (fn: (prev: any) => any) => void;
}) {
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6">
      <h2 className="mb-6 text-2xl font-bold">Thông tin thẩm định</h2>

      <div className="grid gap-5">
        <div>
          <label className="mb-2 block font-medium">Tên liên hệ</label>

          <input
            value={form.contact_name}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                contact_name: e.target.value,
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Số điện thoại</label>

          <input
            value={form.contact_phone}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                contact_phone: e.target.value,
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-transparent px-4 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Tình trạng pháp lý</label>

          <select
            value={form.legal_status === null ? "" : String(form.legal_status)}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                legal_status:
                  e.target.value === "" ? null : e.target.value === "true",
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
          >
            <option value="">Chưa chọn</option>

            <option value="true">Có sổ</option>

            <option value="false">Không có sổ</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Lợi thế kinh doanh</label>

          <select
            value={
              form.business_advantage === null
                ? ""
                : String(form.business_advantage)
            }
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                business_advantage:
                  e.target.value === "" ? null : e.target.value === "true",
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
          >
            <option value="">Chưa chọn</option>

            <option value="true">Có</option>

            <option value="false">Không</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">An ninh - môi trường</label>

          <textarea
            rows={4}
            value={form.environment}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, environment: e.target.value }))
            }
            className="w-full rounded-2xl border border-[var(--border)] bg-transparent p-4 outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">Thông tin đất</label>

          <div className="space-y-4">
            {(form.landAreas ?? []).map((item: any, index: number) => {
              const selectedTypes = (form.landAreas ?? [])
                .map((land: any, i: number) => (i !== index ? land.type : null))
                .filter(Boolean);

              return (
                <div
                  key={index}
                  className="grid items-end gap-4 md:grid-cols-[1fr_1fr_1fr_auto]"
                >
                  {/* LOẠI ĐẤT */}
                  <div>
                    <label className="mb-2 block text-sm text-[var(--muted)]">
                      Loại đất
                    </label>

                    <select
                      value={item.type ?? ""}
                      onChange={(e) =>
                        setForm((prev: any) => {
                          const landAreas = [...(prev.landAreas ?? [])];

                          landAreas[index] = {
                            ...landAreas[index],
                            type: e.target.value,
                          };

                          return {
                            ...prev,
                            landAreas,
                          };
                        })
                      }
                      className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
                    >
                      <option value="">Chọn loại đất</option>

                      <option
                        value="ODT"
                        disabled={selectedTypes.includes("ODT")}
                      >
                        ODT
                      </option>

                      <option
                        value="ONT"
                        disabled={selectedTypes.includes("ONT")}
                      >
                        ONT
                      </option>

                      <option
                        value="LUC"
                        disabled={selectedTypes.includes("LUC")}
                      >
                        LUC
                      </option>

                      <option
                        value="BHK"
                        disabled={selectedTypes.includes("BHK")}
                      >
                        BHK
                      </option>

                      <option
                        value="CLN"
                        disabled={selectedTypes.includes("CLN")}
                      >
                        CLN
                      </option>
                    </select>
                  </div>

                  {/* DIỆN TÍCH */}
                  <div>
                    <label className="mb-2 block text-sm text-[var(--muted)]">
                      Diện tích (m²)
                    </label>

                    <input
                      value={item.area ?? ""}
                      onChange={(e) =>
                        setForm((prev: any) => {
                          const landAreas = [...(prev.landAreas ?? [])];

                          landAreas[index] = {
                            ...landAreas[index],
                            area: e.target.value.replace(/[^\d.]/g, ""),
                          };

                          return {
                            ...prev,
                            landAreas,
                          };
                        })
                      }
                      className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                      placeholder="Ví dụ: 100"
                    />
                  </div>

                  {/* ĐƠN GIÁ */}
                  <div>
                    <label className="mb-2 block text-sm text-[var(--muted)]">
                      Đơn giá (đồng/m²)
                    </label>

                    <input
                      value={item.unit_price ?? ""}
                      onChange={(e) =>
                        setForm((prev: any) => {
                          const landAreas = [...(prev.landAreas ?? [])];

                          landAreas[index] = {
                            ...landAreas[index],
                            unit_price: e.target.value.replace(/[^\d]/g, ""),
                          };

                          return {
                            ...prev,
                            landAreas,
                          };
                        })
                      }
                      className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
                      placeholder="Ví dụ: 5000000"
                    />
                  </div>

                  {/* XÓA */}
                  <button
                    type="button"
                    onClick={() =>
                      setForm((prev: any) => ({
                        ...prev,
                        landAreas: (prev.landAreas ?? []).filter(
                          (_: any, i: number) => i !== index,
                        ),
                      }))
                    }
                    className="h-12 rounded-2xl border border-red-500/30 px-4 text-red-400 hover:bg-red-500/10"
                  >
                    Xóa
                  </button>
                </div>
              );
            })}

            {/* THÊM LOẠI ĐẤT */}
            {(form.landAreas ?? []).length < 5 && (
              <button
                type="button"
                onClick={() =>
                  setForm((prev: any) => ({
                    ...prev,
                    landAreas: [
                      ...(prev.landAreas ?? []),
                      {
                        type: "",
                        area: "",
                        unit_price: "",
                      },
                    ],
                  }))
                }
                className="rounded-2xl border border-dashed border-[var(--border)] px-5 py-3 font-medium hover:bg-[var(--card)]"
              >
                + Thêm loại đất
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Chiều rộng mặt tiền
            </label>

            <input
              value={form.frontage_width}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  frontage_width: e.target.value.replace(/[^\d.]/g, ""),
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Chiều sâu lớn nhất</label>

            <input
              value={form.max_depth}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  max_depth: e.target.value.replace(/[^\d.]/g, ""),
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">Hình thể thửa đất</label>

          <select
            value={form.land_shape}
            onChange={(e) =>
              setForm((prev: any) => ({ ...prev, land_shape: e.target.value }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
          >
            <option value="">Chọn hình thể</option>

            <option value="square">Vuông</option>

            <option value="rectangle">Chữ nhật</option>

            <option value="expanding_back">Nở hậu</option>

            <option value="narrowing_back">Tóp hậu</option>

            <option value="irregular">Không đều</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Tài sản trên đất</label>

          <textarea
            rows={4}
            value={form.asset_on_land}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                asset_on_land: e.target.value,
              }))
            }
            className="w-full rounded-2xl border border-[var(--border)] bg-transparent p-4 outline-none"
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Kết cấu</label>

            <input
              value={form.structure}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  structure: e.target.value,
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">Số tầng</label>

            <input
              value={form.floors}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  floors: e.target.value.replace(/[^\d]/g, ""),
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
              placeholder="Ví dụ: 2"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">
              Diện tích sàn sử dụng (m²)
            </label>

            <input
              value={form.usable_floor_area}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  usable_floor_area: e.target.value.replace(/[^\d.]/g, ""),
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
              placeholder="Ví dụ: 120"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Tỉ lệ GTCL (%) đề xuất
            </label>

            <input
              value={form.remaining_value_ratio}
              onChange={(e) =>
                setForm((prev: any) => ({
                  ...prev,
                  remaining_value_ratio: e.target.value.replace(/[^\d.]/g, ""),
                }))
              }
              className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
              placeholder="Ví dụ: 80"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Đơn giá nhà nước (đồng/m²)
          </label>

          <input
            value={form.state_unit_price ?? ""}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                state_unit_price: e.target.value.replace(/[^\d]/g, ""),
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            placeholder="Ví dụ: 5000000"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Đơn giá xây dựng (đồng/m²) đề xuất
          </label>

          <input
            value={form.construction_unit_price}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                construction_unit_price: e.target.value.replace(/[^\d]/g, ""),
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            placeholder="Ví dụ: 5000000"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Đơn giá đất theo Nghị quyết số 16/2025/NQ-HĐND ngày 31/12/2025 của
            Hội đồng nhân dân tỉnh An Giang
          </label>

          <input
            value={form.resolution_land_price}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                resolution_land_price: e.target.value,
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
            placeholder="Ví dụ: Text"
          />
        </div>
      </div>
    </div>
  );
}
