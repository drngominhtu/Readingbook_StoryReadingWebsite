import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Chapter, Story } from '@/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; chapterId: string } }
) {
  try {
    await connectDB()
    
    const { id: storyId, chapterId } = params
    
    // Lấy thông tin chương
    const chapter = await Chapter.findOne({
      _id: chapterId,
      storyId: storyId
    })
    
    if (!chapter) {
      return NextResponse.json(
        { error: 'Không tìm thấy chương' },
        { status: 404 }
      )
    }
    
    // Lấy thông tin truyện
    const story = await Story.findById(storyId).populate('tags')
    
    if (!story) {
      return NextResponse.json(
        { error: 'Không tìm thấy truyện' },
        { status: 404 }
      )
    }
    
    // Lấy danh sách tất cả chương để navigation
    const allChapters = await Chapter.find({ storyId })
      .sort({ chapterNumber: 1 })
      .select('_id title chapterNumber')
    
    // Tìm chương trước và sau
    const currentIndex = allChapters.findIndex(ch => ch._id.toString() === chapterId)
    const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null
    
    // Tăng lượt xem cho chương
    await Chapter.findByIdAndUpdate(chapterId, {
      $inc: { viewCount: 1 }
    })
    
    return NextResponse.json({
      chapter,
      story,
      navigation: {
        previous: previousChapter,
        next: nextChapter,
        current: currentIndex + 1,
        total: allChapters.length
      }
    })
    
  } catch (error) {
    console.error('Error fetching chapter:', error)
    return NextResponse.json(
      { error: 'Lỗi server' },
      { status: 500 }
    )
  }
}
