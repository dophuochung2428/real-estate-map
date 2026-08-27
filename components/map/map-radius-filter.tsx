"use client";

import { LocateFixed, X } from "lucide-react";

type Props = {
  enabled: boolean;
  radius: number;
  showPanel: boolean;

  onLocateUser: () => void;

  onRadiusChange: (radius: number) => void;

  onHidePanel: () => void;
};

const radiusOptions = [
  {
    label: "500m",
    value: 500,
  },
  {
    label: "1km",
    value: 1000,
  },
  {
    label: "3km",
    value: 3000,
  },
  {
    label: "5km",
    value: 5000,
  },
];

export default function MapRadiusFilter({
  enabled,
  radius,
  showPanel,
  onLocateUser,
  onRadiusChange,
  onHidePanel,
}: Props) {
  return (
    <div className="pointer-events-auto absolute right-2 top-26 z-[9999] flex flex-col items-end gap-2">
      {/* LOCATION BUTTON */}
      <button
        onClick={onLocateUser}
        className={`
  inline-flex h-12 w-12 items-center justify-center
  rounded-2xl
  border border-[var(--border)]
  shadow-2xl
  backdrop-blur
  transition-all duration-200
  hover:-translate-y-0.5
  hover:bg-[var(--hover)]
  hover:shadow-slate-900/10
  ${
    enabled
      ? "bg-blue-600 text-white ring-4 ring-blue-400/20"
      : "bg-[var(--card)] text-[var(--foreground)]"
  }
`}
      >
        <LocateFixed size={20} />
      </button>

      {/* RADIUS OPTIONS */}
      {enabled && showPanel && (
        <div
          className="
  flex items-center gap-2
  rounded-2xl
  border border-[var(--border)]
  bg-[var(--card)]
  p-2
  shadow-2xl
  backdrop-blur
"
        >
          <button
            onClick={onHidePanel}
            className="
    flex h-10 w-10 items-center justify-center
    rounded-xl
    text-[var(--muted-foreground)]
    transition-all duration-200
    hover:bg-[var(--hover)]
    hover:text-[var(--foreground)]
  "
          >
            <X size={16} />
          </button>
          {radiusOptions.map((option) => {
            const active = radius === option.value;

            return (
              <button
                key={option.value}
                onClick={() => onRadiusChange(option.value)}
                className={`
                  rounded-xl px-4 py-2 text-sm font-semibold
                  transition-all duration-200
                  ${
                    active
                      ? "bg-white text-slate-900 shadow-lg"
                      : "text-slate-700 hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
