import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Story, Chapter } from '@/models'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const story = await Story.findById(params.id)
      .populate('tags')
      .select('-__v')
    
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }
    
    // Get chapters for this story
    const chapters = await Chapter.find({ storyId: params.id })
      .sort({ chapterNumber: 1 })
      .select('title chapterNumber createdAt')
    
    return NextResponse.json({
      story,
      chapters,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch story' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, author, description, coverImage, tags, status } = body
    
    const story = await Story.findByIdAndUpdate(
      params.id,
      {
        title,
        author,
        description,
        coverImage,
        tags,
        status,
        updatedAt: new Date(),
      },
      { new: true }
    ).populate('tags')
    
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(story)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update story' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    const story = await Story.findByIdAndDelete(params.id)
    
    if (!story) {
      return NextResponse.json(
        { error: 'Story not found' },
        { status: 404 }
      )
    }
    
    // Also delete all chapters of this story
    await Chapter.deleteMany({ storyId: params.id })
    
    return NextResponse.json({ message: 'Story deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete story' },
      { status: 500 }
    )
  }
}
