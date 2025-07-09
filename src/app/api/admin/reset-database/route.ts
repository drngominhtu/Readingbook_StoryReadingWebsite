import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Story, Chapter, Tag } from '@/models'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    // Xóa tất cả dữ liệu
    await Promise.all([
      Story.deleteMany({}),
      Chapter.deleteMany({}),
      Tag.deleteMany({})
    ])
    
    console.log('Database cleared successfully')
    
    return NextResponse.json({
      success: true,
      message: 'Đã xóa tất cả dữ liệu trong database'
    })
    
  } catch (error) {
    console.error('Error clearing database:', error)
    return NextResponse.json(
      { 
        error: 'Lỗi khi xóa database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
