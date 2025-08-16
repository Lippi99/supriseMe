#!/bin/bash

# Cloudflare D1 Deployment Script for SurpriseMe

echo "🚀 Deploying SurpriseMe to Cloudflare Pages with D1..."

# Step 1: Generate Prisma client for production
echo "📦 Generating Prisma client..."
npx prisma generate

# Step 2: Apply migrations to D1 database
echo "🗄️ Applying database schema to D1..."
npx wrangler d1 execute surpriseme-db --file=./scripts/d1-setup.sql

# Step 3: Build the application
echo "🔨 Building application..."
npm run build

# Step 4: Deploy to Cloudflare Pages
echo "🚀 Deploying to Cloudflare Pages..."
npx wrangler pages deploy dist --project-name=surpriseme-app

echo "✅ Deployment complete!"
echo "📋 Don't forget to:"
echo "   1. Set environment variables in Cloudflare Dashboard"
echo "   2. Configure custom domain if needed"
echo "   3. Test the application"