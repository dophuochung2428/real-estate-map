"use client";

import { useMemo, useState } from "react";

export default function MortgageCalculator({ property }: { property: any }) {
  const [years, setYears] = useState(20);

  const [interest, setInterest] = useState(8);

  const monthly = useMemo(() => {
    const principal = property.price;

    const monthlyRate = interest / 100 / 12;

    const totalMonths = years * 12;

    return Math.round(
      (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths)),
    );
  }, [property.price, years, interest]);

  return (
    <div className="rounded-3xl bg-[var(--card)] p-6 shadow-sm">
      <h2 className="text-2xl font-bold">Ước tính vay</h2>

      <div className="mt-6 space-y-5">
        {/* YEARS */}
        <div>
          <label className="mb-2 block font-medium">Số năm vay</label>

          <input
            type="range"
            min={5}
            max={30}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full"
          />

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{years} năm</p>
        </div>

        {/* INTEREST */}
        <div>
          <label className="mb-2 block font-medium">Lãi suất</label>

          <input
            type="range"
            min={1}
            max={15}
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full"
          />

          <p className="mt-1 text-sm text-[var(--muted-foreground)]">{interest}%</p>
        </div>

        {/* RESULT */}
        <div className="rounded-2xl bg-[var(--accent)]/10 p-5">
          <p className="text-sm text-[var(--muted-foreground)]">Thanh toán hàng tháng</p>

          <h3 className="mt-2 text-3xl font-bold text-[var(--accent)]">
            {monthly.toLocaleString()}đ
          </h3>
        </div>
      </div>
    </div>
  );
}
