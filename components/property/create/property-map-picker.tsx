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
    if (!form.lat || !form.lng) return;

    map.setView([form.lat, form.lng], 16);
  }, [form.lat, form.lng]);

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
  if (!form.lat || !form.lng) return null;

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
  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold">Vị trí bản đồ</h2>

      <div className="overflow-hidden rounded-3xl">
        <MapContainer
          center={[form.lat || 10.0452, form.lng || 105.7469]}
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
          <p className="font-semibold">{form.lat}</p>
        </div>

        <div className="rounded-2xl border p-4">
          <p className="text-sm text-gray-500">Longitude</p>
          <p className="font-semibold">{form.lng}</p>
        </div>
      </div>
    </div>
  );
}
