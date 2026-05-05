"use client";

interface Props {
  onToggleSearch: () => void;
}

export default function Header({ onToggleSearch }: Props) {
  return (
    <header className="sticky top-0 z-50 h-16 bg-[#2f3e4e] flex items-center justify-between px-6">
      <div className="text-white font-semibold text-lg">
        🏠 nhadat102.vn
      </div>

      <div className="flex gap-4">
        <button
          onClick={onToggleSearch}
          className="bg-yellow-400 px-5 py-2 rounded-full"
        >
          🔍 Tìm kiếm BĐS
        </button>

        <button className="border border-white text-white px-5 py-2 rounded-full">
          + Đăng BĐS
        </button>
      </div>
    </header>
  );
}