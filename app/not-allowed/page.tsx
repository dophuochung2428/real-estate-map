export default function NotAllowed() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Không hỗ trợ thiết bị này</h1>
        <p className="text-gray-500 mt-2">
          Tài khoản admin/staff không được phép đăng nhập trên mobile
        </p>
      </div>
    </div>
  );
}
