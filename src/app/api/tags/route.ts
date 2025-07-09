import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Tag } from '@/models'

export async function GET() {
  try {
    await connectDB()
    
    const tags = await Tag.find({})
      .sort({ name: 1 })
      .select('-__v')
    
    return NextResponse.json(tags)
  } catch (error) {
    console.error('Error fetching tags:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tags', details: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('Creating tag...')
    await connectDB()
    console.log('Database connected')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    const { name, description, color } = body
    
    // Validate required fields
    if (!name || name.trim() === '') {
      console.log('Validation failed: name is required')
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      )
    }
    
    // Check if tag already exists
    const existingTag = await Tag.findOne({ name: name.trim() })
    if (existingTag) {
      console.log('Tag already exists:', name)
      return NextResponse.json(
        { error: 'Tag already exists' },
        { status: 400 }
      )
    }
    
    // Create new tag
    const tagData = {
      name: name.trim(),
      description: description ? description.trim() : '',
      color: color || '#3B82F6',
    }
    
    console.log('Creating tag with data:', tagData)
    const tag = new Tag(tagData)
    
    const savedTag = await tag.save()
    console.log('Tag saved successfully:', savedTag)
    
    return NextResponse.json(savedTag, { status: 201 })
  } catch (error) {
    console.error('Error creating tag:', error)
    return NextResponse.json(
      { error: 'Failed to create tag', details: error.message },
      { status: 500 }
    )
  }
}
