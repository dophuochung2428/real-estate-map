"use client";

import { useMemo, useState } from "react";

export default function MortgageCalculator() {
  const [loan, setLoan] = useState(2000);
  const [years, setYears] = useState(20);

  const monthly = useMemo(() => {
    return Math.round(loan * 1000000 * 0.0085);
  }, [loan]);

  return (
    <div className="rounded-3xl bg-[var(--card)] border border-[var(--border)] p-8 shadow-sm">
      <h2 className="mb-8 text-2xl font-bold text-[var(--heading)]">Tính khoản vay</h2>

      {/* LOAN */}
      <div className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-[var(--foreground)]">Khoản vay</span>

          <span className="font-bold text-[var(--primary)]">{loan} triệu</span>
        </div>

        <input
          type="range"
          min={500}
          max={10000}
          value={loan}
          onChange={(e) => setLoan(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* YEARS */}
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold text-[var(--foreground)]">Thời hạn</span>

          <span className="font-bold text-[var(--primary)]">{years} năm</span>
        </div>

        <input
          type="range"
          min={1}
          max={35}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full"
        />
      </div>

      {/* RESULT */}
      <div className="rounded-3xl bg-[var(--primary)] p-6 text-[var(--primary-foreground)]">
        <p className="mb-2 text-[var(--primary-foreground)]/80">Thanh toán hàng tháng</p>

        <h3 className="text-4xl font-bold">{monthly.toLocaleString()}đ</h3>
      </div>
    </div>
  );
}
