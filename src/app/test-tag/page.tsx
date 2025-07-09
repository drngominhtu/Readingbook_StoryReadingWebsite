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
  const [isCreatingSampleTags, setIsCreatingSampleTags] = useState(false)

  // Tạo 50 tag mẫu trực tiếp vào database
  const create50SampleTags = async () => {
    setIsCreatingSampleTags(true)
    setMessage('🔄 Đang tạo 50 tag mẫu...')
    
    try {
      const response = await fetch('/api/admin/create-sample-tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const result = await response.json()
        setMessage('✅ Đã tạo thành công 50 tag mẫu!')
        console.log('Sample tags created:', result)
      } else {
        const error = await response.json()
        console.error('Server error:', error)
        setMessage('❌ Lỗi tạo tag mẫu: ' + (error.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Network error:', error)
      setMessage('❌ Lỗi kết nối: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsCreatingSampleTags(false)
    }
  }

  const createSampleTags = async () => {
    setMessage('Đang tạo thể loại mẫu...')
    
    const sampleTags = [
      { name: 'Tiên hiệp', description: 'Thể loại về tu tiên, tu luyện thành tiên', color: '#8B5CF6' },
      { name: 'Huyền huyễn', description: 'Thể loại fantasy, ma pháp, phép thuật', color: '#3B82F6' },
      { name: 'Đô thị', description: 'Thể loại hiện đại, cuộc sống thành thị', color: '#10B981' },
      { name: 'Khoa học viễn tưởng', description: 'Thể loại sci-fi, tương lai', color: '#F59E0B' },
      { name: 'Võ hiệp', description: 'Thể loại võ thuật cổ điển', color: '#EF4444' },
      { name: 'Lịch sử', description: 'Thể loại dựa trên bối cảnh lịch sử', color: '#8B4513' },
      { name: 'Lãng mạn', description: 'Thể loại tình cảm, lãng mạn', color: '#EC4899' },
      { name: 'Kinh dị', description: 'Thể loại ma quái, kinh dị', color: '#1F2937' },
      { name: 'Hài hước', description: 'Thể loại hài hước, vui nhộn', color: '#FBBF24' },
      { name: 'Phiêu lưu', description: 'Thể loại phiêu lưu mạo hiểm', color: '#059669' }
    ]

    try {
      let successCount = 0
      let errorCount = 0
      
      for (const tag of sampleTags) {
        try {
          const response = await fetch('/api/tags', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(tag),
          })
          
          if (response.ok) {
            successCount++
          } else {
            errorCount++
            console.error(`Failed to create tag: ${tag.name}`)
          }
        } catch (error) {
          errorCount++
          console.error(`Error creating tag ${tag.name}:`, error)
        }
      }
      
      setMessage(`✅ Đã tạo ${successCount} thể loại mẫu thành công! ${errorCount > 0 ? `(${errorCount} lỗi)` : ''}`)
    } catch (error) {
      console.error('Error creating sample tags:', error)
      setMessage('❌ Lỗi khi tạo thể loại mẫu: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

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
                  title="Chọn màu sắc"
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
              <div 
                className="mt-2 p-2 rounded-md bg-current"
                style={{'--tw-bg-opacity': '1', backgroundColor: tagData.color} as React.CSSProperties}
              >
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
          
          {/* Các nút tạo dữ liệu mẫu */}
          <div className="mt-6 space-y-3">
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Tạo Dữ Liệu Mẫu</h3>
              
              <button
                onClick={createSampleTags}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
              >
                Tạo 10 Tag Mẫu (Cơ Bản)
              </button>
              
              <button
                onClick={create50SampleTags}
                disabled={isCreatingSampleTags}
                className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 ${
                  isCreatingSampleTags
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500'
                } text-white`}
              >
                {isCreatingSampleTags ? '🔄 Đang tạo...' : '✨ Tạo 50 Tag Mẫu (Đầy Đủ)'}
              </button>
            </div>
          </div>
          
          {message && (
            <div className={`mt-4 p-3 rounded-md text-sm ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
        
        <div className="mt-6 text-center space-x-4">
          <button
            onClick={createSampleTags}
            className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Tạo 10 Tag (Cách cũ)
          </button>
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
