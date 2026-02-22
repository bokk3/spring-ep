/**
 * Utility to extract album art from audio file metadata
 */

/**
 * Extract album art from an audio file using the MediaMetadata API
 * @param audioUrl - URL to the audio file
 * @returns Promise that resolves to the album art URL or null
 */
export async function extractAlbumArt(audioUrl: string): Promise<string | null> {
  try {
    // Create an audio element to load the file
    const audio = new Audio(audioUrl);
    
    // Wait for metadata to load
    await new Promise<void>((resolve, reject) => {
      audio.addEventListener('loadedmetadata', () => resolve());
      audio.addEventListener('error', () => reject(new Error('Failed to load audio')));
      audio.load();
    });

    // Try to get metadata using the MediaSession API if available
    if ('mediaSession' in navigator && audio.src) {
      // For m4a files, we need to fetch and parse the file
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      
      // Look for album art in m4a metadata (covr atom)
      const albumArtUrl = await extractM4AAlbumArt(arrayBuffer);
      
      return albumArtUrl;
    }

    return null;
  } catch (error) {
    console.warn('Failed to extract album art:', error);
    return null;
  }
}

/**
 * Extract album art from M4A file format
 * @param arrayBuffer - The audio file as ArrayBuffer
 * @returns Album art as data URL or null
 */
async function extractM4AAlbumArt(arrayBuffer: ArrayBuffer): Promise<string | null> {
  try {
    const view = new DataView(arrayBuffer);
    
    // Find the 'moov' atom which contains metadata
    const moovOffset = findAtom(view, 'moov', 0);
    if (moovOffset === -1) return null;
    
    // Find the 'udta' atom (user data) within moov
    const udtaOffset = findAtom(view, 'udta', moovOffset);
    if (udtaOffset === -1) return null;
    
    // Find the 'meta' atom within udta
    const metaOffset = findAtom(view, 'meta', udtaOffset);
    if (metaOffset === -1) return null;
    
    // Find the 'ilst' atom (item list) within meta
    const ilstOffset = findAtom(view, 'ilst', metaOffset + 4); // +4 to skip version/flags
    if (ilstOffset === -1) return null;
    
    // Find the 'covr' atom (cover art) within ilst
    const covrOffset = findAtom(view, 'covr', ilstOffset);
    if (covrOffset === -1) return null;
    
    // Read the cover art data
    const dataOffset = covrOffset + 8; // Skip size and type
    
    // Find the 'data' atom within covr
    const dataAtomOffset = findAtom(view, 'data', dataOffset);
    if (dataAtomOffset === -1) return null;
    
    // Skip data atom header (8 bytes) and flags (8 bytes)
    const imageDataOffset = dataAtomOffset + 16;
    const imageDataSize = view.getUint32(dataAtomOffset) - 16;
    
    // Extract the image data
    const imageData = new Uint8Array(arrayBuffer, imageDataOffset, imageDataSize);
    
    // Determine image type (usually JPEG or PNG)
    const imageType = imageData[0] === 0xFF && imageData[1] === 0xD8 ? 'image/jpeg' : 'image/png';
    
    // Convert to blob and create object URL
    const blob = new Blob([imageData], { type: imageType });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.warn('Failed to parse M4A album art:', error);
    return null;
  }
}

/**
 * Find an atom in an MP4/M4A file
 * @param view - DataView of the file
 * @param atomName - 4-character atom name
 * @param startOffset - Offset to start searching from
 * @returns Offset of the atom or -1 if not found
 */
function findAtom(view: DataView, atomName: string, startOffset: number): number {
  const atomBytes = new TextEncoder().encode(atomName);
  const maxOffset = view.byteLength - 8;
  
  for (let i = startOffset; i < maxOffset; i++) {
    // Check if we found the atom name
    let match = true;
    for (let j = 0; j < 4; j++) {
      if (view.getUint8(i + 4 + j) !== atomBytes[j]) {
        match = false;
        break;
      }
    }
    
    if (match) {
      return i;
    }
  }
  
  return -1;
}

/**
 * Cache for extracted album art to avoid re-extracting
 */
const albumArtCache = new Map<string, string | null>();

/**
 * Get album art with caching
 * @param audioUrl - URL to the audio file
 * @returns Promise that resolves to the album art URL or null
 */
export async function getAlbumArt(audioUrl: string): Promise<string | null> {
  if (albumArtCache.has(audioUrl)) {
    return albumArtCache.get(audioUrl) || null;
  }
  
  const albumArt = await extractAlbumArt(audioUrl);
  albumArtCache.set(audioUrl, albumArt);
  
  return albumArt;
}
