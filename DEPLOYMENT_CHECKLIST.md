# Frontend Deployment Checklist

## ✅ Before Deploying

### 1. Environment Variables Setup

- [ ] Backend is deployed and accessible
- [ ] You have the backend URL (e.g., `https://api.yourdomain.com`)
- [ ] Backend has CORS configured to allow your frontend domain

### 2. Configure Deployment Platform

Set these environment variables in your deployment platform:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-url.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://your-backend-url.com/api/graphql
```

**Important Notes:**

- Do NOT include trailing slashes
- Use HTTPS in production
- Both variables are required

### 3. Platform-Specific Steps

#### Vercel

1. Go to Project Settings → Environment Variables
2. Add both variables
3. Select Production, Preview, Development as needed
4. Redeploy

#### Netlify

1. Go to Site Settings → Environment Variables
2. Add both variables
3. Trigger a new deploy

#### Railway/Render/Other

1. Navigate to environment variables section
2. Add both variables
3. Redeploy the service

## 🧪 Testing After Deployment

Test these after deploying:

- [ ] Homepage loads without errors
- [ ] Tenant subdomains work (e.g., `tenant-name.yourdomain.com`)
- [ ] Data from backend displays correctly
- [ ] Images load properly
- [ ] Menu items display
- [ ] Contact/reservation forms work

## 🐛 Troubleshooting

### Data Not Loading

1. **Check browser console** for errors
2. **Verify environment variables** are set in deployment platform
3. **Test backend directly**: Visit `https://your-backend-url.com/api/graphql` in browser
4. **Check CORS**: Backend must allow requests from your frontend domain

### Commands to Check

```bash
# Test GraphQL endpoint
curl https://your-backend-url.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typename }"}'

# Should return: {"data":{"__typename":"Query"}}
```

### Common Fixes

1. **Environment variables not working**
   - Redeploy after adding variables
   - Check variable names are exactly: `NEXT_PUBLIC_API_URL` and `NEXT_PUBLIC_GRAPHQL_ENDPOINT`
   - Ensure no trailing slashes

2. **CORS errors**
   - Update backend CORS settings to include your frontend domain
   - Check backend logs

3. **Images not loading**
   - Verify `NEXT_PUBLIC_API_URL` is correct
   - Check image URLs in network tab

## 📝 Quick Reference

### Local Development

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:3000/api/graphql
```

### Production

```bash
# Set in deployment platform
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://api.yourdomain.com/api/graphql
```

## 🔗 Additional Resources

- [Backend Deployment Guide](../be/README.md)
- [Architecture Overview](../ARCHITECTURE.md)
- [Full Documentation](./DEPLOYMENT.md)
