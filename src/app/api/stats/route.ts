import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Story, Chapter, Tag } from '@/models'

export async function GET() {
  try {
    await connectToDatabase()

    // Get counts efficiently
    const [storiesCount, chaptersCount, tagsCount] = await Promise.all([
      Story.countDocuments(),
      Chapter.countDocuments(),
      Tag.countDocuments()
    ])

    // Get featured stories (top 3 by view count)
    const featuredStories = await Story.find({})
      .sort({ viewCount: -1 })
      .limit(3)
      .select('title author description coverImage viewCount chapterCount tags')
      .lean()

    return NextResponse.json({
      success: true,
      stats: {
        stories: storiesCount,
        chapters: chaptersCount,
        tags: tagsCount
      },
      featuredStories: featuredStories.map(story => ({
        ...story,
        _id: story._id.toString()
      }))
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch stats',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
