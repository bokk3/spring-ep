# Artist Portfolio Website

A minimal, responsive portfolio website for techno artist Extrablyn, built with React, TypeScript, and Vite.

## Features

- 🎵 Audio player with 30 tracks
- 📱 Fully responsive design (mobile, tablet, desktop)
- 📝 Blog section with post list and detail views
- 📧 Contact form with validation
- ⚡ Fast performance with Vite
- 🎨 Minimal, modern design aesthetic
- ♿ Accessibility-focused implementation

## Development

### Prerequisites

- Node.js 20 or higher
- npm or yarn

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test:run

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Cloudflare Pages

This project is configured for automatic deployment to Cloudflare Pages via GitHub Actions.

### Setup Instructions

1. **Create a Cloudflare Pages project:**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages
   - Create a new project named `artist-portfolio`

2. **Get your Cloudflare credentials:**
   - Account ID: Found in your Cloudflare dashboard URL or account settings
   - API Token: Create one at [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
     - Use the "Edit Cloudflare Workers" template
     - Or create a custom token with "Cloudflare Pages:Edit" permissions

3. **Add secrets to GitHub:**
   - Go to your GitHub repository settings
   - Navigate to Secrets and variables > Actions
   - Add the following secrets:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

4. **Deploy:**
   - Push to the `main` branch to trigger automatic deployment
   - Pull requests will create preview deployments

### Manual Deployment

You can also deploy manually using Wrangler:

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
npm run build
wrangler pages deploy dist --project-name=artist-portfolio
```

## Project Structure

```
src/
├── components/       # React components
│   ├── AudioPlayer.tsx
│   ├── TrackList.tsx
│   ├── BlogList.tsx
│   ├── BlogPost.tsx
│   ├── ContactForm.tsx
│   └── Navigation.tsx
├── hooks/           # Custom React hooks
│   └── useAudioPlayer.ts
├── utils/           # Utility functions
│   └── AudioManager.ts
├── types/           # TypeScript type definitions
│   └── models.ts
├── data/            # Mock data and JSON files
│   ├── tracks.json
│   └── blogPosts.json
├── styles/          # Global styles and CSS variables
│   └── variables.css
└── App.tsx          # Main application component
```

## Technology Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite
- **Testing:** Vitest + React Testing Library + fast-check (PBT)
- **Styling:** CSS Modules with CSS Variables
- **Deployment:** Cloudflare Pages
- **CI/CD:** GitHub Actions

## Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## License

All rights reserved.
