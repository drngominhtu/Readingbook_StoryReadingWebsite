import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Story, Tag } from '@/models'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const search = searchParams.get('search') || ''
    const tag = searchParams.get('tag') || ''
    const status = searchParams.get('status') || ''
    
    const skip = (page - 1) * limit
    
    // Build query
    let query: any = {}
    
    if (search) {
      query.$text = { $search: search }
    }
    
    if (tag) {
      query.tags = tag
    }
    
    if (status) {
      query.status = status
    }
    
    // Get stories with pagination
    const stories = await Story.find(query)
      .populate('tags')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-__v')
    
    // Get total count for pagination
    const total = await Story.countDocuments(query)
    
    return NextResponse.json({
      stories,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const { title, author, description, coverImage, tags, status } = body
    
    // Validate required fields
    if (!title || !author || !description) {
      return NextResponse.json(
        { error: 'Title, author, and description are required' },
        { status: 400 }
      )
    }
    
    // Create new story
    const story = new Story({
      title,
      author,
      description,
      coverImage,
      tags: tags || [],
      status: status || 'ongoing',
    })
    
    await story.save()
    await story.populate('tags')
    
    return NextResponse.json(story, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create story' },
      { status: 500 }
    )
  }
}
