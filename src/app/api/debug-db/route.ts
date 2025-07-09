import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import mongoose from 'mongoose'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    // Test basic connection
    await connectDB()
    console.log('Database connected successfully')
    
    // Check mongoose connection state
    const connectionState = mongoose.connection.readyState
    const states = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    }
    
    console.log('Connection state:', states[connectionState])
    
    // Test creating a simple document
    const TestSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    })
    
    const TestModel = mongoose.models.Test || mongoose.model('Test', TestSchema)
    
    const testDoc = new TestModel({
      name: 'Connection test'
    })
    
    const savedDoc = await testDoc.save()
    console.log('Test document saved:', savedDoc)
    
    // Clean up test document
    await TestModel.deleteOne({ _id: savedDoc._id })
    console.log('Test document cleaned up')
    
    return NextResponse.json({
      success: true,
      message: 'Database connection working perfectly!',
      connectionState: states[connectionState],
      mongooseVersion: mongoose.version,
      testResult: 'Document created and deleted successfully'
    })
    
  } catch (error) {
    console.error('Database test failed:', error)
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      mongoUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
      connectionState: mongoose.connection.readyState
    }, { status: 500 })
  }
}
