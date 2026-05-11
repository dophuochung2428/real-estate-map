import "./globals.css";
import "leaflet/dist/leaflet.css";
import { Toaster } from "sonner";

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
    <html lang="vi">
      <body>
        <Toaster richColors position="top-right" />
        {children}
      </body>
    </html>
  );
}
