export default function MessagesPage() {
  return (
    <div className="grid h-[calc(100vh-48px)] overflow-hidden rounded-[32px] bg-white shadow-sm lg:grid-cols-[320px_1fr]">
      {/* SIDEBAR */}
      <div className="border-r">
        <div className="border-b p-5">
          <h1 className="text-2xl font-bold">Tin nhắn</h1>
        </div>

        <div className="space-y-2 p-3">
          {[1, 2, 3].map((item) => (
            <button
              key={item}
              className="flex w-full items-center gap-3 rounded-2xl p-4 transition hover:bg-gray-100"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-red-100 font-bold text-red-600">
                H
              </div>

              <div className="text-left">
                <h3 className="font-bold">Khách hàng {item}</h3>

                <p className="text-sm text-gray-500">Xin chào...</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* CHAT */}
      <div className="flex flex-col">
        {/* HEADER */}
        <div className="border-b p-5">
          <h2 className="text-xl font-bold">Khách hàng</h2>
        </div>

        {/* MESSAGES */}
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          <div className="flex justify-start">
            <div className="rounded-2xl bg-gray-100 px-5 py-3">
              Căn hộ còn không anh?
            </div>
          </div>

          <div className="flex justify-end">
            <div className="rounded-2xl bg-red-600 px-5 py-3 text-white">
              Dạ còn ạ
            </div>
          </div>
        </div>

        {/* INPUT */}
        <div className="border-t p-5">
          <div className="flex gap-3">
            <input
              placeholder="Nhập tin nhắn..."
              className="h-14 flex-1 rounded-2xl border px-5 outline-none"
            />

            <button className="rounded-2xl bg-red-600 px-6 font-semibold text-white">
              Gửi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
