'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Eye, FileText } from 'lucide-react'

export default function ReaderTestPage() {
  const [stories, setStories] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchStories = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/stories')
      if (response.ok) {
        const data = await response.json()
        setStories(data.stories || [])
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <BookOpen className="h-16 w-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Test Trang Đọc Truyện
          </h1>
          <p className="text-gray-600">
            Kiểm tra tính năng đọc chương truyện
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Danh sách truyện
            </h2>
            <button
              onClick={fetchStories}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Đang tải...' : 'Tải truyện'}
            </button>
          </div>

          {stories.length > 0 ? (
            <div className="space-y-4">
              {stories.map((story) => (
                <div
                  key={story._id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {story.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Tác giả: {story.author}
                      </p>
                      <p className="text-sm text-gray-500 mb-3">
                        {story.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          {story.chapterCount} chương
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {story.viewCount} lượt xem
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      <Link
                        href={`/stories/${story._id}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm"
                      >
                        Xem truyện
                      </Link>
                      <Link
                        href={`/admin/stories/${story._id}/chapters`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-center text-sm"
                      >
                        Quản lý chương
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">
                Chưa có truyện nào hoặc chưa tải dữ liệu
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Thêm truyện
              </Link>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Hướng dẫn sử dụng
          </h2>
          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                1
              </div>
              <div>
                <strong>Thêm truyện:</strong> Vào trang <Link href="/admin" className="text-blue-600 hover:underline">Quản lý</Link> để thêm truyện mới
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                2
              </div>
              <div>
                <strong>Thêm chương:</strong> Sau khi thêm truyện, click "Quản lý chương" để thêm nội dung các chương
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                3
              </div>
              <div>
                <strong>Xem truyện:</strong> Click "Xem truyện" để xem danh sách chương và bắt đầu đọc
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                4
              </div>
              <div>
                <strong>Đọc chương:</strong> Click vào chương để mở trang đọc với đầy đủ tính năng
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Trang chủ
            </Link>
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Quản lý
            </Link>
            <Link
              href="/stories"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Danh sách truyện
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
