/**
 * Mock data for development
 */

import type { Track, BlogPost } from '../types/models';
import tracksJson from './tracks.json';
import blogPostsJson from './blogPosts.json';

/**
 * Mock tracks data - 30 tracks from the album
 */
export const mockTracks: Track[] = tracksJson as Track[];

/**
 * Mock blog posts data with Date objects properly instantiated
 */
export const mockBlogPosts: BlogPost[] = blogPostsJson.map(post => ({
  ...post,
  date: new Date(post.date)
})) as BlogPost[];

/**
 * Get a track by ID
 */
export function getTrackById(id: string): Track | undefined {
  return mockTracks.find(track => track.id === id);
}

/**
 * Get a track by track number
 */
export function getTrackByNumber(trackNumber: number): Track | undefined {
  return mockTracks.find(track => track.trackNumber === trackNumber);
}

/**
 * Get a blog post by ID
 */
export function getBlogPostById(id: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.id === id);
}

/**
 * Get a blog post by slug
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find(post => post.slug === slug);
}

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getBlogPostsSorted(): BlogPost[] {
  return [...mockBlogPosts].sort((a, b) => b.date.getTime() - a.date.getTime());
}
