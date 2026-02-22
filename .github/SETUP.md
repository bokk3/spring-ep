# Quick Setup Guide

## Getting Started

1. **Clone and install:**
   ```bash
   git clone <your-repo-url>
   cd artist-portfolio
   npm install
   ```

2. **Run locally:**
   ```bash
   npm run dev
   ```
   Open http://localhost:5173

3. **Deploy to Cloudflare Pages:**
   - See [DEPLOYMENT.md](../DEPLOYMENT.md) for full instructions
   - Quick version:
     1. Create Cloudflare Pages project
     2. Add GitHub secrets (CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID)
     3. Push to main branch

## What's Included

✅ Responsive design (mobile, tablet, desktop)
✅ Audio player with 30 tracks
✅ Blog section
✅ Contact form with validation
✅ Automatic deployment via GitHub Actions
✅ Optimized caching and security headers
✅ SPA routing support

## Next Steps

- Customize content in `src/data/`
- Add your audio files to `public/Spring EP/`
- Update branding in `src/App.tsx`
- Configure custom domain in Cloudflare
