import { useVietnamAddress } from "@/hooks/use-vietnam-address";
import { useEffect } from "react";

type Props = {
  form: any;

  setForm: any;

  errors: Record<string, string>;
};

const geocode = async (address: string) => {
  const res = await fetch(
    `/api/geocode?address=${encodeURIComponent(address)}`,
  );

  const data = await res.json();

  if (!data?.lat || !data?.lng) return null;

  return {
    lat: Number(data.lat),
    lng: Number(data.lng),
  };
};

export default function PropertyBasicForm({ form, setForm, errors }: Props) {
  const { provinces, districts, fetchDistricts } = useVietnamAddress();

  const updateMapLocation = async (district?: string, province?: string) => {
    const query = [district, province, "Vietnam"].filter(Boolean).join(", ");

    if (!query) return;

    try {
      const location = await geocode(query);

      if (!location) return;

      setForm((prev: any) => ({
        ...prev,
        lat: location.lat,
        lng: location.lng,
        isManualLocation: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!form.province) return;

    const province = provinces.find((p) => p.name === form.province);

    if (province) {
      fetchDistricts(province.code);
    }
  }, [form.province, provinces]);

  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Thông tin cơ bản</h2>

      <div className="grid gap-5">
        {/* TITLE */}
        <div>
          <label className="mb-2 block font-medium">Tiêu đề</label>

          <input
            value={form.title}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Nhập tiêu đề..."
            className={`h-12 w-full rounded-2xl border bg-transparent px-4 outline-none focus:ring-4
  ${
    errors.title
      ? "border-red-500 focus:ring-red-100"
      : "border-[var(--border)]"
  }`}
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-500">{errors.title}</p>
          )}
        </div>

        {/* PRICE */}
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block font-medium">Giá</label>

            <input
              value={form.price}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setForm((prev: any) => ({
                  ...prev,
                  price: value,
                }));
              }}
              placeholder="3 tỷ..."
              className={`h-12 w-full rounded-2xl border bg-transparent px-4 outline-none
  ${errors.price ? "border-red-500" : "border-[var(--border)]"}`}
            />

            {errors.price && (
              <p className="mt-2 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block font-medium">Diện tích</label>

            <input
              value={form.area}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                setForm((prev: any) => ({
                  ...prev,
                  area: value,
                }));
              }}
              placeholder="120m²..."
              className={`h-12 w-full rounded-2xl border bg-transparent px-4 outline-none
  ${errors.area ? "border-red-500" : "border-[var(--border)]"}`}
            />

            {errors.area && (
              <p className="mt-2 text-sm text-red-500">{errors.area}</p>
            )}
          </div>
        </div>

        {/* ADDRESS */}
        <div>
          <label className="mb-2 block font-medium">Địa chỉ</label>

          <input
            value={form.address}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                address: e.target.value,
              }))
            }
            placeholder="Địa chỉ..."
            className={`h-12 w-full rounded-2xl border bg-transparent px-4 outline-none
  ${errors.address ? "border-red-500" : "border-[var(--border)]"}`}
          />

          {errors.address && (
            <p className="mt-2 text-sm text-red-500">{errors.address}</p>
          )}
        </div>

        <select
          value={form.province}
          onChange={async (e) => {
            const value = e.target.value;

            const selected = provinces.find((p) => p.name === value);

            setForm((prev: any) => ({
              ...prev,
              province: value,
              district: "",
            }));

            if (selected) {
              fetchDistricts(selected.code);

              await updateMapLocation(undefined, value);
            }
          }}
          className={`h-12 w-full rounded-2xl border bg-[var(--card)] px-4 text-[var(--foreground)] appearance-none
  ${errors.province ? "border-red-500" : "border-[var(--border)]"}`}
        >
          <option value="">Chọn tỉnh / thành</option>

          {provinces.map((p) => (
            <option key={p.code} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="mt-2 text-sm text-red-500">{errors.province}</p>
        )}

        <select
          value={form.district}
          disabled={!form.province}
          onChange={async (e) => {
            const district = e.target.value;

            setForm((prev: any) => ({
              ...prev,
              district,
            }));

            await updateMapLocation(district, form.province);
          }}
          className={`h-12 w-full rounded-2xl border bg-[var(--card)] px-4 text-[var(--foreground)] appearance-none
  ${errors.district ? "border-red-500" : "border-[var(--border)]"}`}
        >
          <option value="">Chọn quận / huyện</option>

          {districts.map((d) => (
            <option key={d.code} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="mt-2 text-sm text-red-500">{errors.district}</p>
        )}

        <div>
          <label className="mb-2 block font-medium">Loại bất động sản</label>

          <select
            value={form.type}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                type: e.target.value,
              }))
            }
            className={`h-12 w-full rounded-2xl border bg-[var(--card)] px-4 text-[var(--foreground)] appearance-none
  ${errors.type ? "border-red-500" : "border-[var(--border)]"}`}
          >
            <option value="">Chọn loại</option>
            <option value="house_private">Nhà riêng</option>
            <option value="apartment">Chung cư</option>
            <option value="hotel_motel">Khách sạn / Motel</option>
            <option value="land_private">Đất riêng</option>
            <option value="land_project">Đất dự án</option>
            <option value="land_residential">Đất thổ cư</option>
            <option value="land_agriculture">Đất nông nghiệp</option>
            <option value="farm">Trang trại</option>
            <option value="warehouse_factory">Kho xưởng</option>
          </select>

          {errors.type && (
            <p className="mt-2 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block font-medium">Hướng</label>

          <select
            value={form.direction}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                direction: e.target.value,
              }))
            }
            className="h-12 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 text-[var(--foreground)] appearance-none"
          >
            <option value="">Chọn hướng</option>
            <option value="north">Bắc</option>
            <option value="south">Nam</option>
            <option value="east">Đông</option>
            <option value="west">Tây</option>
            <option value="northeast">Đông Bắc</option>
            <option value="northwest">Tây Bắc</option>
            <option value="southeast">Đông Nam</option>
            <option value="southwest">Tây Nam</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">Mô tả</label>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            rows={6}
            placeholder="Mô tả bất động sản..."
            className={`w-full rounded-2xl border bg-transparent p-4 outline-none
  ${errors.description ? "border-red-500" : "border-[var(--border)]"}`}
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-500">{errors.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
