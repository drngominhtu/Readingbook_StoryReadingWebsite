'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  List, 
  Settings,
  Moon,
  Sun,
  Type
} from 'lucide-react'

interface Story {
  _id: string
  title: string
  author: string
  tags: Array<{ _id: string; name: string; color: string }>
}

interface Chapter {
  _id: string
  title: string
  content: string
  chapterNumber: number
  viewCount: number
  createdAt: string
}

interface Navigation {
  previous: { _id: string; title: string; chapterNumber: number } | null
  next: { _id: string; title: string; chapterNumber: number } | null
  current: number
  total: number
}

export default function ChapterReaderPage() {
  const params = useParams()
  const router = useRouter()
  const storyId = params.id as string
  const chapterId = params.chapterId as string
  
  const [story, setStory] = useState<Story | null>(null)
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [navigation, setNavigation] = useState<Navigation | null>(null)
  const [loading, setLoading] = useState(true)
  
  // Reading settings
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (storyId && chapterId) {
      fetchChapterData()
    }
  }, [storyId, chapterId])

  useEffect(() => {
    // Load saved settings
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    const savedFontSize = parseInt(localStorage.getItem('fontSize') || '16')
    setDarkMode(savedDarkMode)
    setFontSize(savedFontSize)
  }, [])

  const fetchChapterData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/stories/${storyId}/chapters/${chapterId}`)
      if (response.ok) {
        const data = await response.json()
        setStory(data.story)
        setChapter(data.chapter)
        setNavigation(data.navigation)
      } else {
        router.push(`/stories/${storyId}`)
      }
    } catch (error) {
      console.error('Error fetching chapter:', error)
      router.push(`/stories/${storyId}`)
    } finally {
      setLoading(false)
    }
  }

  const handlePrevious = () => {
    if (navigation?.previous) {
      router.push(`/stories/${storyId}/chapters/${navigation.previous._id}`)
    }
  }

  const handleNext = () => {
    if (navigation?.next) {
      router.push(`/stories/${storyId}/chapters/${navigation.next._id}`)
    }
  }

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevious()
    if (e.key === 'ArrowRight') handleNext()
  }

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
  }

  const changeFontSize = (delta: number) => {
    const newSize = Math.max(12, Math.min(24, fontSize + delta))
    setFontSize(newSize)
    localStorage.setItem('fontSize', newSize.toString())
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [navigation])

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Đang tải...</p>
        </div>
      </div>
    )
  }

  if (!story || !chapter) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-gray-100' : 'text-gray-900'
          }`}>
            Không tìm thấy chương
          </h1>
          <Link 
            href={`/stories/${storyId}`} 
            className="text-blue-600 hover:text-blue-800"
          >
            ← Quay lại trang truyện
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors ${
      darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b transition-colors ${
        darkMode 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <Link href={`/stories/${storyId}`} className="text-blue-600 hover:text-blue-800">
                <ChevronLeft className="h-5 w-5" />
              </Link>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium truncate max-w-48">
                  {story.title}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {navigation?.current}/{navigation?.total}
              </span>
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Cài đặt đọc"
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`border-b transition-colors ${
          darkMode 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <span className="text-sm">Cỡ chữ:</span>
                  <button
                    onClick={() => changeFontSize(-2)}
                    className={`px-2 py-1 rounded text-sm transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    A-
                  </button>
                  <span className="text-sm">{fontSize}px</span>
                  <button
                    onClick={() => changeFontSize(2)}
                    className={`px-2 py-1 rounded text-sm transition-colors ${
                      darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    A+
                  </button>
                </div>
                
                <button
                  onClick={toggleDarkMode}
                  className={`flex items-center space-x-2 px-3 py-1 rounded transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="text-sm">
                    {darkMode ? 'Sáng' : 'Tối'}
                  </span>
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link
                  href="/"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4" />
                </Link>
                <Link
                  href={`/stories/${storyId}`}
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'hover:bg-gray-700' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Chapter Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">
            Chương {chapter.chapterNumber}: {chapter.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>Tác giả: {story.author}</span>
            <span>•</span>
            <span>{chapter.viewCount} lượt xem</span>
            <span>•</span>
            <span>{new Date(chapter.createdAt).toLocaleDateString('vi-VN')}</span>
          </div>
        </div>

        {/* Chapter Content */}
        <div className={`prose max-w-none mb-12 ${
          darkMode ? 'prose-invert' : ''
        }`}>
          <div 
            className={`leading-loose ${
              fontSize === 12 ? 'text-xs' :
              fontSize === 14 ? 'text-sm' :
              fontSize === 16 ? 'text-base' :
              fontSize === 18 ? 'text-lg' :
              fontSize === 20 ? 'text-xl' :
              fontSize === 22 ? 'text-2xl' :
              fontSize === 24 ? 'text-3xl' :
              'text-base'
            }`}
          >
            {chapter.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={!navigation?.previous}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              navigation?.previous
                ? darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Chương trước</span>
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              Chương {navigation?.current} / {navigation?.total}
            </div>
            <Link
              href={`/stories/${storyId}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Danh sách chương
            </Link>
          </div>

          <button
            onClick={handleNext}
            disabled={!navigation?.next}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              navigation?.next
                ? darkMode
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>Chương sau</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Next/Previous Chapter Info */}
        {(navigation?.previous || navigation?.next) && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {navigation?.previous && (
              <div className={`p-4 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="text-sm text-gray-500 mb-1">Chương trước</div>
                <Link
                  href={`/stories/${storyId}/chapters/${navigation.previous._id}`}
                  className={`block font-medium hover:text-blue-600 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Chương {navigation.previous.chapterNumber}: {navigation.previous.title}
                </Link>
              </div>
            )}
            
            {navigation?.next && (
              <div className={`p-4 rounded-lg border transition-colors ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700' 
                  : 'bg-white border-gray-200'
              }`}>
                <div className="text-sm text-gray-500 mb-1">Chương sau</div>
                <Link
                  href={`/stories/${storyId}/chapters/${navigation.next._id}`}
                  className={`block font-medium hover:text-blue-600 ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                >
                  Chương {navigation.next.chapterNumber}: {navigation.next.title}
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
