import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-[var(--border)] bg-[var(--card)] p-5">
        <h1 className="mb-8 text-2xl font-bold">Admin Panel</h1>

        <nav className="flex flex-col gap-2">
          <Link
            href="/admin"
            className="rounded-xl px-4 py-3 transition hover:bg-[var(--muted)]"
          >
            Dashboard
          </Link>

          <Link
            href="/admin/properties"
            className="rounded-xl px-4 py-3 transition hover:bg-[var(--muted)]"
          >
            Quản lý bài đăng
          </Link>

          <Link
            href="/admin/users"
            className="rounded-xl px-4 py-3 transition hover:bg-[var(--muted)]"
          >
            Quản lý người dùng
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
