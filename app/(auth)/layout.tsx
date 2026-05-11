import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen">
      {/* LEFT */}
      <div className="hidden flex-1 bg-gradient-to-br from-red-600 to-red-500 lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div>
          <h1 className="text-4xl font-bold text-white">BatDongSan Platform</h1>
        </div>

        <div className="max-w-lg">
          <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
            Nền tảng bất động sản hiện đại
          </h2>

          <p className="text-lg text-white/80">
            Tìm kiếm, đầu tư và quản lý bất động sản dễ dàng hơn bao giờ hết.
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center bg-[#f8f8f8] p-6">
        {children}
      </div>
    </main>
  );
}
