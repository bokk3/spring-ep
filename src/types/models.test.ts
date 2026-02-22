import { describe, it, expect } from 'vitest';
import { isTrack, isBlogPost, isContactMessage } from './models';
import type { Track, BlogPost, ContactMessage } from './models';

describe('Type Guards', () => {
  describe('isTrack', () => {
    it('validates a valid track', () => {
      const validTrack: Track = {
        id: 'track-001',
        title: 'Test Track',
        trackNumber: 1,
        audioUrl: '/audio/test.mp3',
        duration: 180
      };

      expect(isTrack(validTrack)).toBe(true);
    });

    it('rejects invalid track with missing fields', () => {
      const invalidTrack = {
        id: 'track-001',
        title: 'Test Track'
      };

      expect(isTrack(invalidTrack)).toBe(false);
    });

    it('rejects track with invalid track number', () => {
      const invalidTrack = {
        id: 'track-001',
        title: 'Test Track',
        trackNumber: 0,
        audioUrl: '/audio/test.mp3',
        duration: 180
      };

      expect(isTrack(invalidTrack)).toBe(false);
    });

    it('rejects track with track number > 30', () => {
      const invalidTrack = {
        id: 'track-001',
        title: 'Test Track',
        trackNumber: 31,
        audioUrl: '/audio/test.mp3',
        duration: 180
      };

      expect(isTrack(invalidTrack)).toBe(false);
    });
  });

  describe('isBlogPost', () => {
    it('validates a valid blog post', () => {
      const validPost: BlogPost = {
        id: 'post-001',
        title: 'Test Post',
        date: new Date('2024-01-01'),
        preview: 'This is a preview',
        content: 'This is the full content',
        slug: 'test-post'
      };

      expect(isBlogPost(validPost)).toBe(true);
    });

    it('rejects invalid blog post with missing fields', () => {
      const invalidPost = {
        id: 'post-001',
        title: 'Test Post'
      };

      expect(isBlogPost(invalidPost)).toBe(false);
    });

    it('rejects blog post with invalid date', () => {
      const invalidPost = {
        id: 'post-001',
        title: 'Test Post',
        date: 'not a date',
        preview: 'This is a preview',
        content: 'This is the full content',
        slug: 'test-post'
      };

      expect(isBlogPost(invalidPost)).toBe(false);
    });
  });

  describe('isContactMessage', () => {
    it('validates a valid contact message', () => {
      const validMessage: ContactMessage = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
        timestamp: new Date()
      };

      expect(isContactMessage(validMessage)).toBe(true);
    });

    it('rejects message with invalid email', () => {
      const invalidMessage = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'This is a test message',
        timestamp: new Date()
      };

      expect(isContactMessage(invalidMessage)).toBe(false);
    });

    it('rejects message with short name', () => {
      const invalidMessage = {
        name: 'J',
        email: 'john@example.com',
        message: 'This is a test message',
        timestamp: new Date()
      };

      expect(isContactMessage(invalidMessage)).toBe(false);
    });

    it('rejects message with short message', () => {
      const invalidMessage = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Short',
        timestamp: new Date()
      };

      expect(isContactMessage(invalidMessage)).toBe(false);
    });

    it('accepts message with optional userAgent', () => {
      const validMessage: ContactMessage = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'This is a test message',
        timestamp: new Date(),
        userAgent: 'Mozilla/5.0'
      };

      expect(isContactMessage(validMessage)).toBe(true);
    });
  });
});
