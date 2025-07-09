'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { BookOpen, User, Eye, Calendar, ChevronRight } from 'lucide-react'

interface Story {
  _id: string
  title: string
  author: string
  description: string
  coverImage: string
  status: 'ongoing' | 'completed' | 'hiatus'
  viewCount: number
  chapterCount: number
  tags: Array<{ _id: string; name: string; color: string }>
  createdAt: string
  updatedAt: string
}

interface Chapter {
  _id: string
  title: string
  chapterNumber: number
  createdAt: string
}

export default function StoryDetailPage() {
  const params = useParams()
  const storyId = params.id as string
  
  const [story, setStory] = useState<Story | null>(null)
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [loading, setLoading] = useState(true)

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
      }
    } catch (error) {
      console.error('Error fetching story:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành'
      case 'ongoing': return 'Đang ra'
      case 'hiatus': return 'Tạm dừng'
      default: return status
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'ongoing': return 'bg-blue-100 text-blue-800'
      case 'hiatus': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Không tìm thấy truyện</h1>
          <Link href="/stories" className="text-blue-600 hover:text-blue-800">
            ← Quay lại danh sách truyện
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <Link href="/" className="ml-2 text-xl font-bold text-gray-900">
                Web Truyện
              </Link>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Trang chủ
              </Link>
              <Link href="/stories" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Truyện
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                Quản lý
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li><Link href="/" className="hover:text-blue-600">Trang chủ</Link></li>
            <li><ChevronRight className="h-4 w-4" /></li>
            <li><Link href="/stories" className="hover:text-blue-600">Truyện</Link></li>
            <li><ChevronRight className="h-4 w-4" /></li>
            <li className="text-gray-900">{story.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Story Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              {/* Cover Image */}
              <div className="mb-4">
                {story.coverImage ? (
                  <img
                    src={story.coverImage}
                    alt={story.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{story.title}</h1>
              
              {/* Author */}
              <div className="flex items-center text-gray-600 mb-4">
                <User className="h-4 w-4 mr-1" />
                <span>{story.author}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {story.tags.map((tag) => (
                  <span
                    key={tag._id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: tag.color }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* Status */}
              <div className="mb-4">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(story.status)}`}>
                  {getStatusText(story.status)}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{story.chapterCount}</div>
                  <div className="text-sm text-gray-500">Chương</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{story.viewCount}</div>
                  <div className="text-sm text-gray-500">Lượt xem</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mô tả</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{story.description}</p>
              </div>

              {/* Quick Actions */}
              {chapters.length > 0 && (
                <div className="space-y-2">
                  <Link
                    href={`/stories/${storyId}/chapters/${chapters[0]._id}`}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block"
                  >
                    Đọc từ chương đầu
                  </Link>
                  <Link
                    href={`/stories/${storyId}/chapters/${chapters[chapters.length - 1]._id}`}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors text-center block"
                  >
                    Đọc chương mới nhất
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Chapters List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">
                  Danh sách chương ({chapters.length})
                </h2>
              </div>
              
              {chapters.length > 0 ? (
                <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                  {chapters.map((chapter) => (
                    <Link
                      key={chapter._id}
                      href={`/stories/${storyId}/chapters/${chapter._id}`}
                      className="block px-6 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Chương {chapter.chapterNumber}: {chapter.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 inline mr-1" />
                            {new Date(chapter.createdAt).toLocaleDateString('vi-VN')}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-8 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Chưa có chương nào</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
