'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, RefreshCw } from 'lucide-react'

interface Stats {
  stories: number
  chapters: number
  tags: number
}

interface Story {
  _id: string
  title: string
  author: string
  description: string
  coverImage?: string
  viewCount: number
  chapterCount: number
  tags: string[]
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({ stories: 0, chapters: 0, tags: 0 })
  const [featuredStories, setFeaturedStories] = useState<Story[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchStatsAndFeaturedStories()
  }, [])

  const fetchStatsAndFeaturedStories = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/stats')
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.success) {
          setStats(data.stats)
          setFeaturedStories(data.featuredStories)
          setLastUpdated(new Date())
        } else {
          console.error('API returned success: false', data)
        }
      } else {
        const errorText = await response.text()
        console.error('Response not OK:', errorText)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chào mừng đến với Web Truyện
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Khám phá thế giới văn học với hàng ngàn truyện hay
          </p>
          
          {/* Author & Dedication Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-blue-600 font-semibold">✨ Được phát triển bởi:</span>
              <span className="text-purple-700 font-bold">Dr. Ngọ Minh Tú</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <span className="text-pink-600">💝 Dành tặng cho:</span>
              <span className="text-red-600 font-bold">Nguyễn Thu Hà</span>
              <span className="text-pink-500">💕</span>
            </div>
            <div className="mt-3 text-xs text-gray-500">
              © 2025 - Được tạo với ❤️ và Next.js
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Link href="/stories" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
              Đọc truyện ngay
            </Link>
            <Link href="/admin" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors">
              Thêm truyện mới
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Thống kê</h2>
            {lastUpdated && (
              <p className="text-sm text-gray-500 mt-1">
                Cập nhật lần cuối: {lastUpdated.toLocaleTimeString('vi-VN')}
              </p>
            )}
          </div>
          <button
            onClick={fetchStatsAndFeaturedStories}
            disabled={isLoading}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              isLoading 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
            title="Cập nhật dữ liệu"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Đang tải...' : 'Cập nhật'}</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900">
              {isLoading ? '...' : stats.stories}
            </h3>
            <p className="text-gray-600">Truyện</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold">Ch</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">
              {isLoading ? '...' : stats.chapters}
            </h3>
            <p className="text-gray-600">Chương</p>
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Truyện nổi bật</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              ))
            ) : featuredStories.length > 0 ? (
              featuredStories.map((story) => (
                <div key={story._id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                    {story.coverImage ? (
                      <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                      <BookOpen className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">{story.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">Tác giả: {story.author}</p>
                  <p className="text-gray-600 text-sm mb-4 h-10 overflow-hidden">{story.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{story.viewCount} lượt xem</span>
                    <span className="text-xs text-gray-500">{story.chapterCount} chương</span>
                  </div>
                  <Link 
                    href={`/stories/${story._id}`} 
                    className="inline-block mt-3 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Đọc truyện →
                  </Link>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có truyện nào</h3>
                <p className="text-gray-600 text-sm mb-4">Hãy thêm truyện đầu tiên để bắt đầu</p>
                <Link href="/admin" className="text-primary-600 hover:text-primary-700 font-medium">
                  Thêm truyện →
                </Link>
              </div>
            )}
          </div>
        </div>


      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center mb-4">
              <BookOpen className="h-6 w-6 mr-2" />
              <span className="text-lg font-semibold">Web Truyện</span>
            </div>
            <p className="text-gray-400 mb-4">
              Trang web đọc truyện với giao diện đẹp và dễ sử dụng
            </p>
            
            {/* Author & Copyright Info */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">👨‍💻 Phát triển bởi:</span>
                  <span className="text-white font-semibold">Dr. Ngọ Minh Tú</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-pink-400">💝 Dành tặng:</span>
                  <span className="text-pink-300 font-semibold">Nguyễn Thu Hà</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                © 2025 Web Truyện. Được tạo với ❤️ sử dụng Next.js & MongoDB
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Watermark */}
      <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200 z-50">
        <div className="text-xs text-gray-600">
          <div className="font-semibold text-blue-600">Dr. Ngọ Minh Tú</div>
          <div className="text-pink-600">💝 For Nguyễn Thu Hà</div>
        </div>
      </div>
    </div>
  )
}
