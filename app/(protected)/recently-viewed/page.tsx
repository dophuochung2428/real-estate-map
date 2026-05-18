import MainHeader from "@/components/layout/header/main-header";

export default function RecentlyViewedPage() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <MainHeader />

      <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-4xl font-bold">Đã xem gần đây</h1>
      </div>
    </main>
  );
}
