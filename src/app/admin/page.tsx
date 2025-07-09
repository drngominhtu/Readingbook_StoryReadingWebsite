'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BookOpen, Plus, Edit, Trash2, Eye, User } from 'lucide-react'

interface Story {
  _id: string
  title: string
  author: string
  description: string
  status: 'ongoing' | 'completed' | 'hiatus'
  viewCount: number
  chapterCount: number
  tags: Array<{ _id: string; name: string; color: string }>
  createdAt: string
}

interface Tag {
  _id: string
  name: string
  color: string
  description?: string
}

export default function AdminPage() {
  const [stories, setStories] = useState<Story[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showTagForm, setShowTagForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    coverImage: '',
    tags: [] as string[],
    status: 'ongoing' as 'ongoing' | 'completed' | 'hiatus'
  })
  const [tagFormData, setTagFormData] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  })

  useEffect(() => {
    fetchStories()
    fetchTags()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories')
      if (response.ok) {
        const data = await response.json()
        setStories(data.stories)
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags')
      if (response.ok) {
        const data = await response.json()
        setTags(data)
      }
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowAddForm(false)
        setFormData({
          title: '',
          author: '',
          description: '',
          coverImage: '',
          tags: [],
          status: 'ongoing'
        })
        fetchStories()
      }
    } catch (error) {
      console.error('Error creating story:', error)
    }
  }

  const handleTagSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tagFormData),
      })

      if (response.ok) {
        alert('Thêm thể loại thành công!')
        setShowTagForm(false)
        setTagFormData({
          name: '',
          description: '',
          color: '#3B82F6'
        })
        fetchTags()
      } else {
        const error = await response.json()
        alert('Lỗi: ' + (error.error || 'Không thể thêm thể loại'))
      }
    } catch (error) {
      console.error('Error creating tag:', error)
      alert('Lỗi kết nối: Không thể thêm thể loại')
    }
  }

  const deleteStory = async (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa truyện này?')) {
      try {
        const response = await fetch(`/api/stories/${id}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          fetchStories()
        }
      } catch (error) {
        console.error('Error deleting story:', error)
      }
    }
  }

  const handleTagToggle = (tagId: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tagId)
        ? prev.tags.filter(id => id !== tagId)
        : [...prev.tags, tagId]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-spin" />
          <p className="text-gray-600">Đang tải...</p>
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
              <BookOpen className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Quản lý truyện</span>
            </div>
            <nav className="flex space-x-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Trang chủ
              </Link>
              <Link href="/stories" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                Xem truyện
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Quản lý truyện</h1>
          <div className="flex space-x-4">
            <Link
              href="/admin/database"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Quản lý Database
            </Link>
            <button
              onClick={() => setShowTagForm(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm thể loại
            </button>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm truyện mới
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="h-12 w-12 text-primary-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tổng số truyện</p>
                <p className="text-2xl font-bold text-gray-900">{stories.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">Ch</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Tổng số chương</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stories.reduce((sum, story) => sum + story.chapterCount, 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">#</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Thể loại</p>
                <p className="text-2xl font-bold text-gray-900">{tags.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Danh sách truyện</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Truyện
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tác giả
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Chương
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lượt xem
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stories.map((story) => (
                  <tr key={story._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{story.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">{story.description}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
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
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {story.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        story.status === 'completed' 
                          ? 'bg-green-100 text-green-800'
                          : story.status === 'ongoing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {story.status === 'completed' ? 'Hoàn thành' : 
                         story.status === 'ongoing' ? 'Đang ra' : 'Tạm dừng'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {story.chapterCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {story.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          href={`/stories/${story._id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/stories/${story._id}/chapters`}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Quản lý chương"
                        >
                          <BookOpen className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => deleteStory(story._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {stories.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Chưa có truyện nào. Hãy thêm truyện đầu tiên!</p>
            </div>
          )}
        </div>
      </main>

      {/* Add Story Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Thêm truyện mới</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên truyện
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ảnh bìa (URL)
                </label>
                <input
                  type="url"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Trạng thái
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="ongoing">Đang ra</option>
                  <option value="completed">Hoàn thành</option>
                  <option value="hiatus">Tạm dừng</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thể loại
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {tags.map((tag) => (
                    <label key={tag._id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.tags.includes(tag._id)}
                        onChange={() => handleTagToggle(tag._id)}
                        className="mr-2"
                      />
                      <span
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white mr-2"
                        style={{ backgroundColor: tag.color }}
                      >
                        {tag.name}
                      </span>
                    </label>
                  ))}
                </div>
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
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Thêm truyện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Tag Modal */}
      {showTagForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Thêm thể loại mới</h2>
            <form onSubmit={handleTagSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tên thể loại
                </label>
                <input
                  type="text"
                  required
                  value={tagFormData.name}
                  onChange={(e) => setTagFormData({...tagFormData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                  placeholder="Ví dụ: Tiên hiệp, Huyền huyễn..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả
                </label>
                <textarea
                  rows={3}
                  value={tagFormData.description}
                  onChange={(e) => setTagFormData({...tagFormData, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
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
                    value={tagFormData.color}
                    onChange={(e) => setTagFormData({...tagFormData, color: e.target.value})}
                    className="w-12 h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="text"
                    value={tagFormData.color}
                    onChange={(e) => setTagFormData({...tagFormData, color: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-900 bg-white"
                    placeholder="#3B82F6"
                  />
                </div>
                <div className="mt-2 p-2 rounded" style={{ backgroundColor: tagFormData.color }}>
                  <span className="text-white font-medium">Preview: {tagFormData.name || 'Tên thể loại'}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowTagForm(false)}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Thêm thể loại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
