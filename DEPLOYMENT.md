# Deployment Guide - Cloudflare Pages

This guide explains how to deploy the Artist Portfolio Website to Cloudflare Pages with automatic CI/CD.

## Prerequisites

- GitHub account with repository access
- Cloudflare account (free tier works)
- Git installed locally

## Initial Setup

### 1. Create Cloudflare Pages Project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** > **Pages**
3. Click **Create application** > **Pages**
4. Click **Connect to Git** (or skip for manual deployment)
5. Name your project: `artist-portfolio`

### 2. Get Cloudflare Credentials

#### Account ID
1. Go to your Cloudflare dashboard
2. Your Account ID is visible in the URL: `dash.cloudflare.com/<ACCOUNT_ID>/`
3. Or find it in **Workers & Pages** > **Overview** (right sidebar)

#### API Token
1. Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click **Create Token**
3. Use the **Edit Cloudflare Workers** template
4. Or create a custom token with these permissions:
   - Account > Cloudflare Pages > Edit
5. Click **Continue to summary** > **Create Token**
6. **Copy the token immediately** (you won't see it again)

### 3. Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Add these secrets:

   **CLOUDFLARE_API_TOKEN**
   - Value: The API token you created above

   **CLOUDFLARE_ACCOUNT_ID**
   - Value: Your Cloudflare account ID

## Automatic Deployment

Once configured, deployments happen automatically:

### Production Deployment
- Push to `main` branch
- GitHub Actions builds and deploys
- Available at: `https://artist-portfolio.pages.dev`

### Preview Deployment
- Create a pull request
- GitHub Actions creates a preview deployment
- Available at: `https://<branch-name>.artist-portfolio.pages.dev`

## Manual Deployment

If you prefer manual deployment:

### Using Wrangler CLI

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build the project
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy dist --project-name=artist-portfolio
```

### Using Cloudflare Dashboard

1. Build the project locally:
   ```bash
   npm run build
   ```

2. Go to your Cloudflare Pages project
3. Click **Create deployment**
4. Upload the `dist` folder
5. Click **Save and Deploy**

## Custom Domain Setup

To use a custom domain:

1. Go to your Cloudflare Pages project
2. Navigate to **Custom domains**
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `extrablyn.com`)
5. Follow the DNS configuration instructions
6. Wait for DNS propagation (usually < 5 minutes)

## Environment Variables

If you need environment variables:

1. Go to your Cloudflare Pages project
2. Navigate to **Settings** > **Environment variables**
3. Add variables for Production and/or Preview environments
4. Redeploy for changes to take effect

## Build Configuration

The project uses these build settings:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 20
- **Framework preset:** Vite

These are configured in:
- `.github/workflows/deploy.yml` (GitHub Actions)
- `wrangler.toml` (Wrangler CLI)

## Troubleshooting

### Build Fails

1. Check GitHub Actions logs for errors
2. Verify all dependencies are in `package.json`
3. Test build locally: `npm run build`
4. Check Node version matches (20+)

### Deployment Fails

1. Verify API token has correct permissions
2. Check Account ID is correct
3. Ensure project name matches in all configs
4. Check Cloudflare Pages dashboard for errors

### 404 Errors on Routes

- Ensure `public/_redirects` file exists
- Content should be: `/*    /index.html   200`
- This enables SPA routing

### Assets Not Loading

1. Check `public/_headers` file exists
2. Verify asset paths in code are correct
3. Check browser console for CORS errors
4. Ensure audio files are in `public/Spring EP/`

## Monitoring

### View Deployments

1. Go to Cloudflare Pages project
2. Click **View deployments**
3. See deployment history, logs, and status

### Analytics

1. Navigate to **Analytics** tab
2. View page views, bandwidth, and requests
3. Free tier includes basic analytics

## Rollback

To rollback to a previous deployment:

1. Go to **Deployments** tab
2. Find the working deployment
3. Click **...** > **Rollback to this deployment**
4. Confirm rollback

## Performance Optimization

The deployment includes:

- **Asset caching:** 1 year for static assets
- **Audio caching:** 1 year for audio files
- **HTML caching:** No cache (always fresh)
- **Security headers:** XSS protection, frame options, etc.
- **Compression:** Automatic Brotli/Gzip compression

## Cost

Cloudflare Pages free tier includes:

- Unlimited requests
- Unlimited bandwidth
- 500 builds per month
- 1 build at a time
- 20,000 files per deployment

This is more than sufficient for this project.

## Support

For issues:

- GitHub Actions: Check `.github/workflows/deploy.yml`
- Cloudflare: [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- Wrangler: [Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/)
