import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    // Test database connection
    await connectDB()
    
    // Test creating a simple document
    const testData = {
      message: 'Database connection successful!',
      timestamp: new Date().toISOString(),
      status: 'connected'
    }
    
    return NextResponse.json({
      success: true,
      data: testData,
      message: 'MongoDB Atlas connection working!'
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: error.message,
      message: 'Database connection failed'
    }, { status: 500 })
  }
}
