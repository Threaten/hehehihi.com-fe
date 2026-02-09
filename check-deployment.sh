#!/bin/bash

# Frontend Deployment Helper Script
# This script helps verify your environment setup before deploying

echo "🔍 Frontend Deployment Pre-flight Check"
echo "========================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found"
    echo "   Run: cp .env.example .env.local"
    echo ""
else
    echo "✅ .env.local exists"
fi

# Check if environment variables are set
if [ -f .env.local ]; then
    source .env.local
    
    if [ -z "$NEXT_PUBLIC_API_URL" ]; then
        echo "❌ NEXT_PUBLIC_API_URL is not set in .env.local"
    else
        echo "✅ NEXT_PUBLIC_API_URL: $NEXT_PUBLIC_API_URL"
    fi
    
    if [ -z "$NEXT_PUBLIC_GRAPHQL_ENDPOINT" ]; then
        echo "❌ NEXT_PUBLIC_GRAPHQL_ENDPOINT is not set in .env.local"
    else
        echo "✅ NEXT_PUBLIC_GRAPHQL_ENDPOINT: $NEXT_PUBLIC_GRAPHQL_ENDPOINT"
    fi
fi

echo ""
echo "📋 Deployment Checklist:"
echo "   1. Backend is deployed and accessible"
echo "   2. Backend URL added to environment variables"
echo "   3. CORS configured in backend"
echo "   4. Environment variables set in deployment platform"
echo ""
echo "For detailed instructions, see:"
echo "   - DEPLOYMENT.md"
echo "   - DEPLOYMENT_CHECKLIST.md"
echo ""
