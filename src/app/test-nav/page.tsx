export default function TestNavPage() {
  return (
    <div className="min-h-screen py-8">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Navigation</h1>
          <p className="text-gray-600 mb-6">
            Trang này để kiểm tra navigation hoạt động đúng chưa.
          </p>
          
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Đã hoàn thành:</h3>
              <ul className="text-green-700 space-y-1">
                <li>• Gỡ bỏ icon Search và User khỏi header</li>
                <li>• Tạo navigation cố định (sticky) ở đầu trang</li>
                <li>• Thêm trạng thái active cho navigation</li>
                <li>• Navigation hiển thị trên tất cả các trang</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">🔗 Navigation Links:</h3>
              <ul className="text-blue-700 space-y-1">
                <li>• <strong>Trang chủ</strong> - Trạng thái active khi ở trang chủ</li>
                <li>• <strong>Truyện</strong> - Trạng thái active khi ở trang /stories</li>
                <li>• <strong>Quản lý</strong> - Trạng thái active khi ở trang /admin</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
