"use client";

import Image from "next/image";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export default function MainFooter() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]">
      {/* TOP */}
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 md:grid-cols-2 lg:grid-cols-[380px_1fr_1fr]">
        {/* BRAND */}
        <div>
          {/* LOGO */}
          <div className="w-full max-w-[300px]">
            <Image
              src="/logos/logo_footer.jpg"
              alt="VCVN Logo"
              width={500}
              height={150}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* TEXT */}
          <div className="mt-5">
            <h3 className="text-xl font-semibold leading-tight text-[var(--foreground)]">
              Chi nhánh Long Xuyên - An Giang
            </h3>

            {/* <p className="mt-2 text-sm tracking-wide text-slate-400">
              VCVN Valuation System
            </p> */}

            <div className="mt-5 inline-flex items-center rounded-full border border-cyan-600/20 bg-cyan-50 px-4 py-2 text-xs font-medium text-cyan-700">
              Dữ liệu khu vực Tây Nam Bộ
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h4 className="text-base font-semibold text-[var(--foreground)]">Về hệ thống</h4>

          <p className="mt-6 text-sm leading-8 text-[var(--muted-foreground)]">
            Hệ thống hỗ trợ phân tích dữ liệu và định giá bất động sản phục vụ
            nghiệp vụ thẩm định giá, tra cứu thị trường và quản lý tài sản khu
            vực An Giang và Tây Nam Bộ.
          </p>

          <p className="mt-5 text-sm leading-7 text-slate-600">
            Giải pháp hỗ trợ nghiệp vụ thẩm định giá nội bộ, dữ liệu thị trường
            và quản lý tài sản khu vực Tây Nam Bộ.
          </p>
        </div>

        {/* SERVICES */}
        {/* <div>
          <h4 className="text-base font-semibold text-white">Dịch vụ</h4>

          <ul className="mt-6 space-y-4 text-sm text-slate-400">
            {[
              "Định giá bất động sản",
              "Phân tích dữ liệu thị trường",
              "Bản đồ bất động sản",
              "Tra cứu khu vực",
              "Hỗ trợ thẩm định giá",
            ].map((item) => (
              <li
                key={item}
                className="transition-colors duration-200 hover:text-white"
              >
                {item}
              </li>
            ))}
          </ul>
        </div> */}

        {/* CONTACT */}
        <div>
          <h4 className="text-base font-semibold text-[var(--foreground)]">Liên hệ</h4>

          <div className="mt-6 space-y-6 text-sm text-[var(--muted-foreground)]">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-cyan-700" />

              <p className="leading-6">
                181 Lý Công Uẩn, Bình Khánh 7, Bình Đức, An Giang
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-cyan-700" />

              <p>0913 527 002</p>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-cyan-700" />

              <p>vcvnag@gmail.com</p>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="mt-1 h-4 w-4 shrink-0 text-cyan-700" />

              <div>
                <p className="font-medium leading-6 text-[var(--foreground)]">
                  Công ty TNHH Thẩm định giá
                  <br />
                  Real Asset Value Việt Nam
                </p>

                <p className="mt-1 text-slate-500">Đơn vị vận hành hệ thống</p>
              </div>
            </div>

            {/* MANAGER */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Phụ trách chi nhánh
              </p>

              <p className="mt-3 text-base font-semibold text-[var(--foreground)]">
                Trần Văn Toản
              </p>

              <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                Giám đốc Chi nhánh{" "}
                <span className="whitespace-nowrap">Long Xuyên</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-[var(--border)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-slate-500 md:flex-row">
          <div>
            <p>© 2026 VCVN Valuation System. All rights reserved.</p>

            <p className="mt-1 text-xs text-slate-600">
              Dữ liệu phục vụ nghiệp vụ thẩm định giá và tham khảo thị trường
              nội bộ.
            </p>
          </div>
          Designed & Developed by Hung.dev
        </div>
      </div>
    </footer>
  );
}
