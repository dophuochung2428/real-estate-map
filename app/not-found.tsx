export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#08131d] text-white flex items-center justify-center px-4 py-12">
      <div className="max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-xl shadow-black/20">
        <h1 className="text-3xl font-black">Không tìm thấy trang</h1>
        <p className="mt-4 text-sm text-zinc-300">
          Trang bạn đang tìm không tồn tại hoặc đã được di chuyển.
        </p>
      </div>
    </div>
  );
}
