/**
 * Data models for the artist portfolio website
 */

/**
 * Represents an audio track from the album
 */
export interface Track {
  id: string;              // Unique identifier
  title: string;           // Track title
  trackNumber: number;     // Position in album (1-30)
  audioUrl: string;        // URL to audio file
  duration: number;        // Duration in seconds
}

/**
 * Represents a blog post
 */
export interface BlogPost {
  id: string;              // Unique identifier
  title: string;           // Post title
  date: Date;              // Publication date
  preview: string;         // Short preview text (150-200 chars)
  content: string;         // Full post content (HTML or Markdown)
  slug: string;            // URL-friendly identifier
}

/**
 * Represents a contact form message
 */
export interface ContactMessage {
  name: string;            // Sender name
  email: string;           // Sender email
  message: string;         // Message content
  timestamp: Date;         // Submission time
  userAgent?: string;      // Browser info (optional)
}

/**
 * Type guard to validate if an object is a valid Track
 */
export function isTrack(obj: unknown): obj is Track {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const track = obj as Record<string, unknown>;

  return (
    typeof track.id === 'string' &&
    track.id.length > 0 &&
    typeof track.title === 'string' &&
    track.title.length > 0 &&
    typeof track.trackNumber === 'number' &&
    track.trackNumber >= 1 &&
    track.trackNumber <= 30 &&
    typeof track.audioUrl === 'string' &&
    track.audioUrl.length > 0 &&
    typeof track.duration === 'number' &&
    track.duration > 0
  );
}

/**
 * Type guard to validate if an object is a valid BlogPost
 */
export function isBlogPost(obj: unknown): obj is BlogPost {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const post = obj as Record<string, unknown>;

  return (
    typeof post.id === 'string' &&
    post.id.length > 0 &&
    typeof post.title === 'string' &&
    post.title.length > 0 &&
    post.date instanceof Date &&
    !isNaN(post.date.getTime()) &&
    typeof post.preview === 'string' &&
    post.preview.length > 0 &&
    typeof post.content === 'string' &&
    post.content.length > 0 &&
    typeof post.slug === 'string' &&
    post.slug.length > 0
  );
}

/**
 * Type guard to validate if an object is a valid ContactMessage
 */
export function isContactMessage(obj: unknown): obj is ContactMessage {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const message = obj as Record<string, unknown>;

  // Email validation regex (RFC 5322 simplified)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    typeof message.name === 'string' &&
    message.name.trim().length >= 2 &&
    typeof message.email === 'string' &&
    emailRegex.test(message.email) &&
    typeof message.message === 'string' &&
    message.message.trim().length >= 10 &&
    message.timestamp instanceof Date &&
    !isNaN(message.timestamp.getTime()) &&
    (message.userAgent === undefined || typeof message.userAgent === 'string')
  );
}
