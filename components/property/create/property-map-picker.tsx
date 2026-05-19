"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

type Props = {
  form: any;
  setForm: any;
};

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapController({ form }: any) {
  const map = useMap();

  useEffect(() => {
    const lat = Number(form?.lat);
    const lng = Number(form?.lng);

    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

    const timeout = setTimeout(() => {
      const zoom = form.district ? 13 : 10;

      map.setView([lat, lng], zoom, {
        animate: true,
      });
    }, 150);

    return () => clearTimeout(timeout);
  }, [form?.lat, form?.lng, map]); // 👈 THÊM map VÀO ĐÂY

  return null;
}

function LocationPicker({ setForm }: any) {
  useMapEvents({
    click(e) {
      setForm((prev: any) => ({
        ...prev,
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        isManualLocation: true,
      }));
    },
  });

  return null;
}

function DraggableMarker({ form, setForm }: any) {
  const hasLocation =
    typeof form.lat === "number" &&
    typeof form.lng === "number" &&
    !Number.isNaN(form.lat) &&
    !Number.isNaN(form.lng);

  if (!hasLocation) return null;

  return (
    <Marker
      position={[form.lat, form.lng]}
      draggable
      icon={markerIcon}
      eventHandlers={{
        dragend: (e) => {
          const pos = e.target.getLatLng();

          setForm((prev: any) => ({
            ...prev,
            lat: pos.lat,
            lng: pos.lng,
            isManualLocation: true,
          }));
        },
      }}
    />
  );
}

export default function PropertyMapPicker({ form, setForm }: Props) {
  const hasLocation =
    typeof form.lat === "number" &&
    typeof form.lng === "number" &&
    !Number.isNaN(form.lat) &&
    !Number.isNaN(form.lng);

  const DEFAULT_CENTER: [number, number] = [10.7769, 106.7009];
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Vị trí bản đồ</h2>

      <div className="overflow-hidden rounded-3xl">
        <MapContainer
          center={
            hasLocation ? [Number(form.lat), Number(form.lng)] : DEFAULT_CENTER
          }
          zoom={13}
          scrollWheelZoom
          className="h-[500px] w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapController form={form} />
          <LocationPicker setForm={setForm} />
          <DraggableMarker form={form} setForm={setForm} />
        </MapContainer>
      </div>

      {/* DEBUG INFO */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border p-4">
          <p className="text-sm text-gray-500">Latitude</p>
          <input
            type="number"
            value={form.lat ?? ""}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                lat: e.target.value === "" ? null : Number(e.target.value),
                isManualLocation: true,
              }))
            }
            className="w-full rounded-lg border p-2"
          />
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-gray-500">Longitude</p>
          <input
            type="number"
            value={form.lng ?? ""}
            onChange={(e) =>
              setForm((prev: any) => ({
                ...prev,
                lng: e.target.value === "" ? null : Number(e.target.value),
                isManualLocation: true,
              }))
            }
            className="w-full rounded-lg border p-2"
          />
        </div>
      </div>
    </div>
  );
}
