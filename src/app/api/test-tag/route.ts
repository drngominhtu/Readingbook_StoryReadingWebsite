import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    console.log('Testing database connection...')
    await connectDB()
    
    return NextResponse.json({
      success: true,
      message: 'Database connected successfully!',
      uri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    })
  } catch (error) {
    console.error('Database connection failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      uri: process.env.MONGODB_URI ? 'Set' : 'Not set'
    }, { status: 500 })
  }
}

export async function POST() {
  try {
    console.log('Testing tag creation...')
    await connectDB()
    
    // Import model dynamically
    const { Tag } = await import('@/models')
    
    // Create test tag
    const testTag = new Tag({
      name: 'Test Tag',
      description: 'This is a test tag',
      color: '#FF0000'
    })
    
    const saved = await testTag.save()
    console.log('Test tag created:', saved)
    
    // Delete test tag
    await Tag.deleteOne({ _id: saved._id })
    console.log('Test tag deleted')
    
    return NextResponse.json({
      success: true,
      message: 'Tag creation test successful!',
      testData: saved
    })
  } catch (error) {
    console.error('Tag creation test failed:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack'
    }, { status: 500 })
  }
}
