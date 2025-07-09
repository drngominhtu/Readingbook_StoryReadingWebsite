#!/bin/bash

# Deployment script for Web Truyen
echo "🚀 Deploying Web Truyen..."

# 1. Build the project
echo "📦 Building project..."
npm run build

# 2. Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# 3. Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "🎉 Deployment complete!"
