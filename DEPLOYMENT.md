# Deployment Guide

## Deploying to Vercel

### Prerequisites
1. GitHub account
2. Vercel account (sign up at vercel.com)
3. MongoDB Atlas account (for production database)

### Step 1: Push to GitHub

1. Initialize git repository:
```bash
git init
git add .
git commit -m "Initial commit: Startup Marketplace"
```

2. Create a new repository on GitHub
3. Push your code:
```bash
git remote add origin https://github.com/yourusername/startup-marketplace.git
git branch -M main
git push -u origin main
```

### Step 2: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier is fine for testing)
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for all IPs)
5. Get your connection string

### Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:

#### Required Environment Variables:
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/startup-marketplace
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here-make-it-different
STRIPE_SECRET_KEY=sk_live_your_live_stripe_key (or sk_test_ for testing)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
CLIENT_URL=https://your-vercel-domain.vercel.app
```

6. Deploy the project

### Step 4: Update CORS Settings

After deployment, update the CORS settings in `server/index.js` with your actual Vercel domain.

### Step 5: Set up Stripe Webhooks (Optional)

1. Go to Stripe Dashboard
2. Add webhook endpoint: `https://your-vercel-domain.vercel.app/api/payments/webhook`
3. Update the webhook secret in environment variables

## Local Development

To run locally:

1. Install dependencies:
```bash
npm run install-all
```

2. Set up environment variables (copy from .env.example)

3. Start the application:
```bash
npm run dev
```

## Environment Variables

### Development (.env files)
- `server/.env` - Backend environment variables
- `client/.env` - Frontend environment variables

### Production (Vercel Dashboard)
Set all environment variables in the Vercel project settings.

## Database Setup

### Local Development
- Install MongoDB locally or use MongoDB Atlas

### Production
- Use MongoDB Atlas (recommended)
- Ensure proper indexing for performance
- Set up database backups

## Security Considerations

1. Use strong JWT secrets
2. Enable HTTPS in production
3. Set up proper CORS origins
4. Use environment variables for all secrets
5. Enable MongoDB authentication
6. Set up rate limiting
7. Use Stripe in live mode for production

## Monitoring

1. Set up Vercel Analytics
2. Monitor MongoDB Atlas metrics
3. Set up error tracking (Sentry recommended)
4. Monitor API performance

## Scaling

1. Upgrade MongoDB Atlas tier as needed
2. Consider Vercel Pro for better performance
3. Implement caching strategies
4. Optimize database queries
5. Add CDN for static assets