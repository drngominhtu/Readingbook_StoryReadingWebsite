'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function TestTagPage() {
  const [tagData, setTagData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  })
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Đang thêm thể loại...')
    
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagData),
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ Thêm thể loại thành công!')
        setTagData({
          name: '',
          description: '',
          color: '#3B82F6'
        })
        console.log('Tag created:', result)
      } else {
        const error = await response.json()
        console.error('Server error:', error)
        setMessage('❌ Lỗi: ' + (error.error || 'Không thể thêm thể loại'))
        if (error.details) {
          console.error('Error details:', error.details)
        }
      }
    } catch (error) {
      console.error('Network error:', error)
      setMessage('❌ Lỗi kết nối: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Test Thêm Thể Loại</h1>
        
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên thể loại
              </label>
              <input
                type="text"
                required
                value={tagData.name}
                onChange={(e) => setTagData({...tagData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Ví dụ: Tiên hiệp, Huyền huyễn..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả (tùy chọn)
              </label>
              <textarea
                rows={3}
                value={tagData.description}
                onChange={(e) => setTagData({...tagData, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                placeholder="Mô tả về thể loại này..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Màu sắc
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={tagData.color}
                  onChange={(e) => setTagData({...tagData, color: e.target.value})}
                  className="w-12 h-10 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  value={tagData.color}
                  onChange={(e) => setTagData({...tagData, color: e.target.value})}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="#3B82F6"
                />
              </div>
              
              {/* Preview */}
              <div className="mt-2 p-2 rounded-md" style={{ backgroundColor: tagData.color }}>
                <span className="text-white font-medium text-sm">
                  Preview: {tagData.name || 'Tên thể loại'}
                </span>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Thêm Thể Loại
            </button>
          </form>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center space-x-4">
          <Link href="/test" className="text-blue-600 hover:text-blue-800">
            ← Quay lại Test
          </Link>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            Admin Chính
          </Link>
          <Link href="/api/debug-db" className="text-red-600 hover:text-red-800">
            Debug Database
          </Link>
        </div>
      </div>
    </div>
  )
}
