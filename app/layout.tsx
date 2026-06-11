import "./globals.css";
import "leaflet/dist/leaflet.css";

import { Toaster } from "sonner";
import MobileBottomNav from "@/components/mobile/mobile-bottom-nav";
import Providers from "./providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata = {
  title: "REAL ASSET VALUE | Real Estate Platform",
  description: "Tìm kiếm, quản lý và đăng bất động sản với REAL ASSET VAL.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={cn("dark h-full", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="h-full bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <Toaster richColors position="top-right" />

          {children}

          {/* <MobileBottomNav /> */}
        </Providers>
      </body>
    </html>
  );
}
