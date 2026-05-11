const notifications = [
  {
    title: "Tin đăng của bạn đã được duyệt",
    time: "5 phút trước",
  },

  {
    title: "Có khách hàng quan tâm đến tin đăng",
    time: "10 phút trước",
  },
];

export default function NotificationsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Thông báo</h1>

        <p className="text-gray-500">Cập nhật mới nhất</p>
      </div>

      <div className="space-y-5">
        {notifications.map((item) => (
          <div key={item.title} className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-bold">{item.title}</h2>

            <p className="text-gray-500">{item.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
