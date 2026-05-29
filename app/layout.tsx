import "./globals.css";
import "leaflet/dist/leaflet.css";

import { Toaster } from "sonner";
import MobileBottomNav from "@/components/mobile/mobile-bottom-nav";
import Providers from "./providers";

export const metadata = {
  title: "NHADAT102 | Real Estate",
  description: "Tìm kiếm, quản lý và đăng bất động sản với NHADAT102.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="dark" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <Toaster richColors position="top-right" />

          {children}

          <MobileBottomNav />
        </Providers>
      </body>
    </html>
  );
}
