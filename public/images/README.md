# Images Directory

Place your 3 images here to complete the website design.

## Required Images

### 1. `hero.jpg` - Hero/Header Background
- **Purpose:** Background image for the main header section
- **Recommended size:** 1920x1080 or larger
- **Format:** JPG or PNG
- **Style:** Dark, atmospheric image that fits the techno aesthetic
- **Tips:** 
  - Will be displayed at 30% opacity with a gradient overlay
  - Should work well when darkened
  - Landscape orientation works best

### 2. `album-cover.jpg` - Spring EP Album Cover
- **Purpose:** Main album artwork displayed in the music section
- **Recommended size:** 1000x1000 or larger (square)
- **Format:** JPG or PNG
- **Style:** Your official Spring EP artwork
- **Tips:**
  - Will be displayed at 200x200px (160x160px on mobile)
  - Also used as fallback album art in the audio player
  - Should be square (1:1 aspect ratio)

### 3. `artist.jpg` - Artist Photo
- **Purpose:** Artist photo in the contact section
- **Recommended size:** 800x800 or larger
- **Format:** JPG or PNG
- **Style:** Professional artist photo or portrait
- **Tips:**
  - Will be displayed as a 200px circle (150px on mobile)
  - Works best with centered subject
  - Has a green accent border

## Optional

### 4. `favicon.png` - Website Icon (Optional)
- **Purpose:** Browser tab icon
- **Recommended size:** 512x512
- **Format:** PNG with transparency
- **Tips:**
  - Should be simple and recognizable at small sizes
  - Currently using default Vite icon

## Image Optimization Tips

- Use JPG for photos (smaller file size)
- Use PNG for graphics with transparency
- Compress images before uploading (aim for < 500KB each)
- Use tools like TinyPNG or ImageOptim

## After Adding Images

1. Place your images in this directory with the exact names above
2. Run `npm run build` to rebuild the site
3. The images will automatically be included in the deployment

## Fallback Behavior

If images are not found, the site will:
- Hero: Show solid background color
- Album cover: Show placeholder with music icon
- Artist photo: Show placeholder or hide section
