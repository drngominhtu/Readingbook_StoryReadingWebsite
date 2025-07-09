'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TestPage() {
  const [dbStatus, setDbStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: ''
  })

  const testDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      setDbStatus(data.success ? 'Database hoạt động OK!' : 'Database lỗi: ' + data.error)
    } catch (error) {
      setDbStatus('Lỗi kết nối: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const addSimpleStory = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          author: formData.author,
          description: formData.description,
          tags: [],
          status: 'ongoing'
        })
      })
      
      if (response.ok) {
        alert('Thêm truyện thành công!')
        setFormData({ title: '', author: '', description: '' })
      } else {
        alert('Lỗi thêm truyện')
      }
    } catch (error) {
      alert('Lỗi: ' + error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Web Truyện</h1>
        
        {/* Database Test */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Kiểm tra Database</h2>
          <button
            onClick={testDatabase}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang kiểm tra...' : 'Test Database'}
          </button>
          {dbStatus && (
            <div className={`mt-4 p-3 rounded ${dbStatus.includes('OK') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {dbStatus}
            </div>
          )}
        </div>

        {/* Add Story Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">2. Thêm Truyện Đơn Giản</h2>
          <form onSubmit={addSimpleStory} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên truyện
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Nhập tên truyện..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tác giả
              </label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Nhập tên tác giả..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Nhập mô tả truyện..."
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Thêm Truyện
            </button>
          </form>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mr-4">
            Về Trang Chủ
          </Link>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800 mr-4">
            Admin Chính
          </Link>
          <Link href="/stories" className="text-blue-600 hover:text-blue-800">
            Xem Truyện
          </Link>
        </div>
      </div>
    </div>
  )
}
