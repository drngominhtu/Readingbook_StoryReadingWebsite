import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Chapter, Story } from '@/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    
    const skip = (page - 1) * limit
    
    const chapters = await Chapter.find({ storyId: params.id })
      .sort({ chapterNumber: 1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
    
    const total = await Chapter.countDocuments({ storyId: params.id })
    
    return NextResponse.json({
      chapters,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch chapters' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, content, chapterNumber } = body
    
    // Validate required fields
    if (!title || !content || !chapterNumber) {
      return NextResponse.json(
        { error: 'Title, content, and chapter number are required' },
        { status: 400 }
      )
    }
    
    // Check if story exists
    const story = await Story.findById(params.id)
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }
    
    // Check if chapter number already exists
    const existingChapter = await Chapter.findOne({
      storyId: params.id,
      chapterNumber,
    })
    
    if (existingChapter) {
      return NextResponse.json(
        { error: 'Chapter number already exists' },
        { status: 400 }
      )
    }
    
    // Create new chapter
    const chapter = new Chapter({
      title,
      content,
      chapterNumber,
      storyId: params.id,
    })
    
    await chapter.save()
    
    // Update story's chapter count
    await Story.findByIdAndUpdate(params.id, {
      $inc: { chapterCount: 1 },
      updatedAt: new Date(),
    })
    
    return NextResponse.json(chapter, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create chapter' },
      { status: 500 }
    )
  }
}
