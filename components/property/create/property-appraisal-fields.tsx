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

        <div className="grid gap-5 md:grid-cols-2">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">Loại diện tích</label>

              <select
                value={form.land_area_type ?? ""}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    land_area_type: e.target.value || null,
                  }))
                }
                className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4"
              >
                <option value="">Chọn loại diện tích</option>
                <option value="ODT">ODT</option>
                <option value="ONT">ONT</option>
                <option value="LUC">LUC</option>
                <option value="BHK">BHK</option>
                <option value="CLN">CLN</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium">Diện tích</label>

              <input
                value={form.land_area}
                onChange={(e) =>
                  setForm((prev: any) => ({
                    ...prev,
                    land_area: e.target.value.replace(/[^\d.]/g, ""),
                  }))
                }
                className="h-12 w-full rounded-2xl border border-[var(--border)] px-4"
              />
            </div>
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
      </div>
    </div>
  );
}
