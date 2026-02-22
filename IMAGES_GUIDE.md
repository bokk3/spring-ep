# Image Integration Guide

Your website is now set up to use 3 custom images to complete the visual design!

## Quick Start

1. **Place your 3 images** in the `public/images/` directory with these exact names:
   - `hero.jpg` - Header background
   - `album-cover.jpg` - Album artwork
   - `artist.jpg` - Artist photo

2. **Rebuild the site:**
   ```bash
   npm run build
   ```

3. **Done!** Your images will automatically appear on the site.

## Image Specifications

### 1. Hero Background (`hero.jpg`)
**Location:** Header section at the top of the page  
**Display:** Full-width background at 30% opacity with gradient overlay  
**Recommended Size:** 1920x1080 or larger  
**Format:** JPG or PNG  
**Style Tips:**
- Dark, atmospheric images work best
- Will be dimmed, so high contrast is good
- Landscape orientation
- Techno/electronic music aesthetic

**Example subjects:**
- Studio equipment
- Abstract patterns
- Dark urban scenes
- Concert/performance shots

---

### 2. Album Cover (`album-cover.jpg`)
**Location:** Music section, prominently displayed above track list  
**Display:** 200x200px (160x160px on mobile)  
**Recommended Size:** 1000x1000 or larger (square)  
**Format:** JPG or PNG  
**Style Tips:**
- Your official Spring EP artwork
- Must be square (1:1 aspect ratio)
- High resolution for crisp display
- Also used as fallback in audio player

**Usage:**
- Main album showcase
- Fallback album art for tracks without embedded art
- Visual anchor for the music section

---

### 3. Artist Photo (`artist.jpg`)
**Location:** Contact section  
**Display:** 200px circular image (150px on mobile)  
**Recommended Size:** 800x800 or larger  
**Format:** JPG or PNG  
**Style Tips:**
- Professional artist photo or portrait
- Subject should be centered (will be cropped to circle)
- Good lighting and contrast
- Has a green accent border

**Example styles:**
- Professional headshot
- Performance photo
- Artistic portrait
- Studio shot

---

## File Size Optimization

To keep your site fast:

- **Target size:** < 500KB per image
- **Hero:** Can be larger (< 1MB) since it's important
- **Album cover:** Aim for 200-300KB
- **Artist photo:** Aim for 200-300KB

### Recommended Tools:
- [TinyPNG](https://tinypng.com/) - Online compression
- [ImageOptim](https://imageoptim.com/) - Mac app
- [Squoosh](https://squoosh.app/) - Google's web app
- Photoshop: "Save for Web" at 80-85% quality

## Image Formats

- **JPG:** Best for photos (smaller file size)
- **PNG:** Best for graphics with transparency
- **WebP:** Modern format (optional, for advanced users)

## Customization

Want to change where images appear? Edit `src/config/images.ts`:

```typescript
export const images = {
  hero: '/images/your-hero.jpg',
  albumCover: '/images/your-album.jpg',
  artist: '/images/your-photo.jpg',
};
```

## Fallback Behavior

If images aren't found, the site gracefully handles it:
- **Hero:** Shows solid dark background
- **Album cover:** Shows placeholder with music icon
- **Artist photo:** Section still displays but without image

## Testing

After adding images:

1. **Development:**
   ```bash
   npm run dev
   ```
   Visit http://localhost:5173

2. **Production build:**
   ```bash
   npm run build
   npm run preview
   ```

3. **Check all breakpoints:**
   - Desktop (> 1024px)
   - Tablet (768px - 1024px)
   - Mobile (< 768px)

## Deployment

Images are automatically included when you deploy:

```bash
npm run build
# Deploy the 'dist' folder to Cloudflare Pages
```

The images will be in `dist/images/` after build.

## Advanced: Adding More Images

Want to add more images? 

1. Add them to `public/images/`
2. Reference in `src/config/images.ts`
3. Use in components via `import { images } from './config/images'`

Example:
```typescript
<img src={images.yourNewImage} alt="Description" />
```

## Troubleshooting

**Images not showing?**
- Check file names match exactly (case-sensitive)
- Verify files are in `public/images/`
- Clear browser cache
- Rebuild: `npm run build`

**Images look blurry?**
- Use higher resolution source images
- Ensure images are at least 2x the display size
- Check compression quality (use 85%+)

**Site loads slowly?**
- Compress images more
- Use JPG instead of PNG for photos
- Consider WebP format

## Need Help?

Check the detailed README in `public/images/README.md` for more information.
