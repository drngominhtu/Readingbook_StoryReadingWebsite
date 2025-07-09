import mongoose from 'mongoose'

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#3B82F6',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const ChapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  storyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true,
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: '',
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'hiatus'],
    default: 'ongoing',
  },
  viewCount: {
    type: Number,
    default: 0,
  },
  chapterCount: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  ratingCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Indexes for better performance
StorySchema.index({ title: 'text', description: 'text', author: 'text' })
StorySchema.index({ tags: 1 })
StorySchema.index({ status: 1 })
StorySchema.index({ createdAt: -1 })
StorySchema.index({ viewCount: -1 })

ChapterSchema.index({ storyId: 1, chapterNumber: 1 })
ChapterSchema.index({ createdAt: -1 })

export const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema)
export const Story = mongoose.models.Story || mongoose.model('Story', StorySchema)
export const Chapter = mongoose.models.Chapter || mongoose.model('Chapter', ChapterSchema)
