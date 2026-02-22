/**
 * Image configuration for the website
 * Place your images in public/images/ and reference them here
 */

export const images = {
  // Hero/Header background image
  // Suggested: A dark, atmospheric image that fits the techno aesthetic
  // Recommended size: 1920x1080 or larger
  hero: '/images/hero.jpg',
  
  // Album cover for Spring EP
  // This will be used as fallback album art and in the music section
  // Recommended size: 1000x1000 or larger (square)
  albumCover: '/images/album-cover.jpg',
  
  // Artist photo or additional visual element
  // Can be used in about section, contact section, or as accent
  // Recommended size: 800x800 or larger
  artist: '/images/artist.jpg',
  
  // Favicon (optional - if you want to replace vite.svg)
  // Recommended size: 512x512 PNG with transparency
  favicon: '/images/favicon.png',
};

/**
 * Check if an image exists (for graceful fallbacks)
 */
export function hasImage(imagePath: string): boolean {
  // In production, images will be bundled
  // This is mainly for development
  return true; // Assume images exist, browser will handle 404s gracefully
}

/**
 * Image optimization settings
 */
export const imageSettings = {
  // Enable lazy loading for images
  lazyLoad: true,
  
  // Image quality (for future optimization)
  quality: 85,
  
  // Fallback colors for loading states
  fallbackColors: {
    hero: '#0a0a0a',
    albumCover: '#1a1a1a',
    artist: '#0a0a0a',
  },
};
