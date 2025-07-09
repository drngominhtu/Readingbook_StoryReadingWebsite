<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Web Truyện - Copilot Instructions

## Project Overview
This is a Next.js web application for reading stories/novels with the following features:
- Story management (CRUD operations)
- Chapter management for each story
- Tag system for categorization
- Search and filtering capabilities
- Responsive design with Tailwind CSS
- MongoDB Atlas database

## Architecture
- **Frontend**: Next.js 14 with App Router, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: MongoDB with Mongoose ODM
- **UI Components**: Lucide React icons
- **Styling**: Tailwind CSS with custom utilities

## Code Style Guidelines
- Use TypeScript for type safety
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling (avoid inline styles)
- Implement proper error handling
- Use async/await for database operations
- Follow REST API conventions

## Database Models
- **Story**: title, author, description, coverImage, tags, status, viewCount, chapterCount
- **Chapter**: title, content, chapterNumber, storyId, viewCount
- **Tag**: name, description, color

## Common Patterns
- Use server-side rendering where appropriate
- Implement proper pagination for large datasets
- Use proper TypeScript interfaces for data structures
- Handle loading states and error states in UI
- Use semantic HTML and accessibility features

## API Routes
- `/api/stories` - Story CRUD operations
- `/api/stories/[id]` - Individual story operations
- `/api/stories/[id]/chapters` - Chapter operations
- `/api/tags` - Tag operations

## When generating code:
1. Always use TypeScript
2. Include proper error handling
3. Use Tailwind CSS for styling
4. Implement responsive design
5. Add proper accessibility attributes
6. Use Next.js best practices
7. Include loading states and error states
8. Use proper database indexes for performance
