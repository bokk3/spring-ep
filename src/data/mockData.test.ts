import { describe, it, expect } from 'vitest';
import { 
  mockTracks, 
  mockBlogPosts, 
  getTrackById, 
  getTrackByNumber,
  getBlogPostById,
  getBlogPostBySlug,
  getBlogPostsSorted
} from './mockData';

describe('Mock Data', () => {
  describe('mockTracks', () => {
    it('contains exactly 30 tracks', () => {
      expect(mockTracks).toHaveLength(30);
    });

    it('has tracks numbered from 1 to 30', () => {
      const trackNumbers = mockTracks.map(t => t.trackNumber).sort((a, b) => a - b);
      expect(trackNumbers).toEqual(Array.from({ length: 30 }, (_, i) => i + 1));
    });

    it('has unique track IDs', () => {
      const ids = mockTracks.map(t => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(30);
    });

    it('all tracks have valid durations', () => {
      mockTracks.forEach(track => {
        expect(track.duration).toBeGreaterThan(0);
      });
    });

    it('all tracks have audio URLs', () => {
      mockTracks.forEach(track => {
        expect(track.audioUrl).toMatch(/^\/audio\/track-\d{3}\.mp3$/);
      });
    });
  });

  describe('mockBlogPosts', () => {
    it('contains blog posts', () => {
      expect(mockBlogPosts.length).toBeGreaterThan(0);
    });

    it('all posts have Date objects', () => {
      mockBlogPosts.forEach(post => {
        expect(post.date).toBeInstanceOf(Date);
        expect(post.date.getTime()).not.toBeNaN();
      });
    });

    it('all posts have unique IDs', () => {
      const ids = mockBlogPosts.map(p => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(mockBlogPosts.length);
    });

    it('all posts have unique slugs', () => {
      const slugs = mockBlogPosts.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(mockBlogPosts.length);
    });
  });

  describe('getTrackById', () => {
    it('returns track when ID exists', () => {
      const track = getTrackById('track-001');
      expect(track).toBeDefined();
      expect(track?.id).toBe('track-001');
    });

    it('returns undefined when ID does not exist', () => {
      const track = getTrackById('nonexistent');
      expect(track).toBeUndefined();
    });
  });

  describe('getTrackByNumber', () => {
    it('returns track when number exists', () => {
      const track = getTrackByNumber(1);
      expect(track).toBeDefined();
      expect(track?.trackNumber).toBe(1);
    });

    it('returns undefined when number does not exist', () => {
      const track = getTrackByNumber(999);
      expect(track).toBeUndefined();
    });
  });

  describe('getBlogPostById', () => {
    it('returns post when ID exists', () => {
      const post = getBlogPostById('post-001');
      expect(post).toBeDefined();
      expect(post?.id).toBe('post-001');
    });

    it('returns undefined when ID does not exist', () => {
      const post = getBlogPostById('nonexistent');
      expect(post).toBeUndefined();
    });
  });

  describe('getBlogPostBySlug', () => {
    it('returns post when slug exists', () => {
      const post = getBlogPostBySlug('making-of-opening-sequence');
      expect(post).toBeDefined();
      expect(post?.slug).toBe('making-of-opening-sequence');
    });

    it('returns undefined when slug does not exist', () => {
      const post = getBlogPostBySlug('nonexistent');
      expect(post).toBeUndefined();
    });
  });

  describe('getBlogPostsSorted', () => {
    it('returns posts in reverse chronological order', () => {
      const sorted = getBlogPostsSorted();
      
      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].date.getTime()).toBeGreaterThanOrEqual(sorted[i + 1].date.getTime());
      }
    });

    it('does not mutate original array', () => {
      const originalOrder = [...mockBlogPosts];
      getBlogPostsSorted();
      expect(mockBlogPosts).toEqual(originalOrder);
    });
  });
});
