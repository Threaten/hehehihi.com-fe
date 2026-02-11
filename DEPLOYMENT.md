# Frontend - Multi-Tenant Restaurant Application

This is the frontend for the multi-tenant restaurant management system, built with Next.js 16.

## Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Backend API running (see `../be` folder)

## Environment Setup

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.example .env.local
```

### 2. Configure Backend Connection

Edit `.env.local` and set your backend URL:

```env
# For local development
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql
```

**For production deployment**, set these environment variables in your hosting platform:

```env
# Replace with your actual deployed backend URL
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-backend-domain.com/api/graphql
```

## Getting Started

### Development

1. Install dependencies:

```bash
pnpm install
```

2. Run the development server:

```bash
pnpm dev
```

3. Open [http://localhost:3001](http://localhost:3001) in your browser

### Production Build

```bash
pnpm build
pnpm start
```

## Deployment

### Environment Variables Required

When deploying to any platform (Vercel, Netlify, etc.), you **MUST** set these environment variables:

- `NEXT_PUBLIC_API_URL` - Your backend API base URL
- `NEXT_PUBLIC_GRAPHQL_ENDPOINT` - Your backend GraphQL endpoint URL

### Deployment Platforms

#### Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Project Settings → Environment Variables
4. Deploy

#### Netlify

1. Push your code to GitHub
2. Import project in Netlify
3. Add environment variables in Site Settings → Environment Variables
4. Deploy

#### Other Platforms

Make sure to:

1. Set the environment variables listed above
2. Run `pnpm build` as the build command
3. Set `pnpm start` as the start command
4. Ensure Node.js 18+ is available

## Common Issues

### "Cannot fetch data" or empty pages

**Problem**: Frontend can't connect to backend
**Solution**:

1. Check that `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GRAPHQL_ENDPOINT` are set correctly
2. Verify backend is deployed and accessible
3. Check CORS settings in backend allow requests from your frontend domain

### Images not loading

**Problem**: Image URLs not resolving correctly
**Solution**: Ensure `NEXT_PUBLIC_API_URL` is set to your backend URL without trailing slash

### GraphQL errors

**Problem**: GraphQL queries failing
**Solution**:

1. Verify `NEXT_PUBLIC_GRAPHQL_ENDPOINT` points to `/api/graphql` on your backend
2. Check backend logs for errors
3. Test the GraphQL endpoint directly in browser or Postman

## Project Structure

```
fe/
├── api/              # Apollo Client & GraphQL queries
├── app/              # Next.js app directory
│   ├── (main)/      # Main application routes
│   ├── components/  # Reusable components
│   └── tenant/      # Tenant-specific routes
└── public/          # Static assets
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [Project Architecture](../ARCHITECTURE.md)
