'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface Story {
  _id: string
  title: string
  author: string
  description: string
  chapterCount: number
}

interface Chapter {
  _id: string
  title: string
  chapterNumber: number
  createdAt: string
}

export default function StoryChaptersPage() {
  const params = useParams()
  const storyId = params.id as string
  
  const [story, setStory] = useState<Story | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [message, setMessage] = useState('')
  const [chapterData, setChapterData] = useState({
    title: '',
    content: '',
    chapterNumber: 1
  })

  useEffect(() => {
    if (storyId) {
      fetchStoryData()
    }
  }, [storyId])

  const fetchStoryData = async () => {
    try {
      const response = await fetch(`/api/stories/${storyId}`)
      if (response.ok) {
        const data = await response.json()
        setStory(data.story)
        setChapters(data.chapters || [])
        
        // Set next chapter number
        const nextChapterNumber = (data.chapters || []).length + 1
        setChapterData(prev => ({ ...prev, chapterNumber: nextChapterNumber }))
      }
    } catch (error) {
      console.error('Error fetching story:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Đang thêm chương...')
    
    try {
      const response = await fetch(`/api/stories/${storyId}/chapters`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chapterData),
      })

      if (response.ok) {
        setMessage('✅ Thêm chương thành công!')
        setShowAddForm(false)
        setChapterData({
          title: '',
          content: '',
          chapterNumber: chapters.length + 2
        })
        fetchStoryData() // Refresh data
      } else {
        const error = await response.json()
        setMessage('❌ Lỗi: ' + (error.error || 'Không thể thêm chương'))
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy truyện</h1>
          <Link href="/admin" className="text-blue-600 hover:text-blue-800">
            ← Quay lại Admin
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{story.title}</h1>
              <p className="text-gray-600 mt-2">Tác giả: {story.author}</p>
              <p className="text-gray-600">Số chương: {story.chapterCount}</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Thêm chương mới
            </button>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Chapters List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Danh sách chương</h2>
          </div>
          
          {chapters.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {chapters.map((chapter) => (
                <div key={chapter._id} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Chương {chapter.chapterNumber}: {chapter.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/stories/${storyId}/chapters/${chapter._id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Xem
                      </Link>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">Chưa có chương nào</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Thêm chương đầu tiên
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <Link href="/admin" className="text-blue-600 hover:text-blue-800 mr-4">
            ← Quay lại Admin
          </Link>
          <Link href={`/stories/${storyId}`} className="text-blue-600 hover:text-blue-800">
            Xem truyện
          </Link>
        </div>
      </div>

      {/* Add Chapter Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm chương mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số chương
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={chapterData.chapterNumber}
                  onChange={(e) => setChapterData({...chapterData, chapterNumber: parseInt(e.target.value) || 1})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tiêu đề chương
                </label>
                <input
                  type="text"
                  required
                  value={chapterData.title}
                  onChange={(e) => setChapterData({...chapterData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Ví dụ: Khởi đầu của hành trình"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nội dung chương
                </label>
                <textarea
                  required
                  rows={20}
                  value={chapterData.content}
                  onChange={(e) => setChapterData({...chapterData, content: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="Nhập nội dung chương tại đây...&#10;&#10;Bạn có thể viết nhiều đoạn văn, mỗi đoạn cách nhau bởi dòng trống.&#10;&#10;Ví dụ:&#10;Đoạn văn thứ nhất...&#10;&#10;Đoạn văn thứ hai..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Thêm chương
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
