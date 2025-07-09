'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  Database, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  CheckCircle, 
  RefreshCw,
  ArrowLeft,
  Tag,
  BookOpen,
  FileText
} from 'lucide-react'

export default function DatabaseAdminPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const [stats, setStats] = useState({
    stories: 0,
    chapters: 0,
    tags: 0
  })

  const clearDatabase = async () => {
    setLoading(true)
    setMessage('Đang xóa database...')
    
    try {
      const response = await fetch('/api/admin/reset-database', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ ' + result.message)
        setStats({ stories: 0, chapters: 0, tags: 0 })
      } else {
        const error = await response.json()
        setMessage('❌ Lỗi: ' + (error.error || 'Không thể xóa database'))
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
      setShowConfirm(false)
    }
  }

  const createSampleTags = async () => {
    setLoading(true)
    setMessage('Đang tạo thể loại mẫu...')
    
    try {
      const response = await fetch('/api/admin/create-sample-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ ' + result.message)
        setStats(prev => ({ ...prev, tags: result.tags.length }))
      } else {
        const error = await response.json()
        setMessage('❌ Lỗi: ' + (error.error || 'Không thể tạo thể loại'))
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setLoading(false)
    }
  }

  const getStats = async () => {
    setLoading(true)
    try {
      const [storiesRes, tagsRes] = await Promise.all([
        fetch('/api/stories'),
        fetch('/api/tags')
      ])

      if (storiesRes.ok && tagsRes.ok) {
        const storiesData = await storiesRes.json()
        const tagsData = await tagsRes.json()
        
        const totalChapters = storiesData.stories?.reduce((sum: number, story: any) => sum + (story.chapterCount || 0), 0) || 0
        
        setStats({
          stories: storiesData.stories?.length || 0,
          chapters: totalChapters,
          tags: tagsData.tags?.length || 0
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Link href="/admin" className="mr-4 text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Database className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý Database
            </h1>
          </div>
          <p className="text-gray-600">
            Quản lý và reset dữ liệu hệ thống
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Truyện</p>
                <p className="text-2xl font-bold text-gray-900">{stats.stories}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Chương</p>
                <p className="text-2xl font-bold text-gray-900">{stats.chapters}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Tag className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Thể loại</p>
                <p className="text-2xl font-bold text-gray-900">{stats.tags}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Get Stats */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <RefreshCw className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Cập nhật thống kê
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Lấy thông tin mới nhất về số lượng truyện, chương, thể loại
            </p>
            <button
              onClick={getStats}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Đang tải...' : 'Cập nhật thống kê'}
            </button>
          </div>

          {/* Create Sample Tags */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center mb-4">
              <Plus className="h-6 w-6 text-green-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">
                Tạo thể loại mẫu
              </h2>
            </div>
            <p className="text-gray-600 mb-4">
              Tạo 50 thể loại truyện phong phú (Tiên hiệp, Huyền huyễn, Xuyên nhanh, Linh khí phục hồi...)
            </p>
            <button
              onClick={createSampleTags}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Đang tạo...' : 'Tạo thể loại mẫu'}
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Vùng nguy hiểm
            </h2>
          </div>
          <p className="text-gray-600 mb-4">
            <strong>Cảnh báo:</strong> Hành động này sẽ xóa toàn bộ dữ liệu (truyện, chương, thể loại) và không thể khôi phục.
          </p>
          
          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4 inline mr-2" />
              Xóa toàn bộ database
            </button>
          ) : (
            <div className="space-y-3">
              <p className="text-red-600 font-medium">
                Bạn có chắc chắn muốn xóa toàn bộ dữ liệu?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={clearDatabase}
                  disabled={loading}
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                >
                  {loading ? 'Đang xóa...' : 'Xác nhận xóa'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Message */}
        {message && (
          <div className={`mt-6 p-4 rounded-lg ${
            message.includes('✅') 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-center">
              {message.includes('✅') ? (
                <CheckCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertTriangle className="h-5 w-5 mr-2" />
              )}
              {message}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quy trình đề xuất
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                1
              </div>
              <div>
                <strong>Cập nhật thống kê</strong> để xem tình trạng hiện tại
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                2
              </div>
              <div>
                <strong>Xóa database</strong> nếu muốn bắt đầu lại từ đầu
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                3
              </div>
              <div>
                <strong>Tạo thể loại mẫu</strong> để có sẵn 35+ thể loại phổ biến
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5">
                4
              </div>
              <div>
                Vào <Link href="/admin" className="text-blue-600 hover:underline">trang admin chính</Link> để thêm truyện
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="inline-flex space-x-4">
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Quay lại Admin
            </Link>
            <Link
              href="/test-reader"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Test Reader
            </Link>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
