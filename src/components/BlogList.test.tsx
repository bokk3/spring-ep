import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogList } from './BlogList';
import type { BlogPost } from '../types';

describe('BlogList', () => {
  const mockPosts: BlogPost[] = [
    {
      id: 'post-1',
      title: 'First Post',
      date: new Date('2024-03-15'),
      preview: 'This is the first post preview',
      content: '<p>Content</p>',
      slug: 'first-post'
    },
    {
      id: 'post-2',
      title: 'Second Post',
      date: new Date('2024-02-10'),
      preview: 'This is the second post preview',
      content: '<p>Content</p>',
      slug: 'second-post'
    },
    {
      id: 'post-3',
      title: 'Third Post',
      date: new Date('2024-04-01'),
      preview: 'This is the third post preview',
      content: '<p>Content</p>',
      slug: 'third-post'
    }
  ];

  it('displays all blog posts', () => {
    const onPostSelect = vi.fn();
    render(<BlogList posts={mockPosts} onPostSelect={onPostSelect} />);

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('Second Post')).toBeInTheDocument();
    expect(screen.getByText('Third Post')).toBeInTheDocument();
  });

  it('displays posts in reverse chronological order', () => {
    const onPostSelect = vi.fn();
    render(<BlogList posts={mockPosts} onPostSelect={onPostSelect} />);

    const articles = screen.getAllByRole('button');
    expect(articles[0]).toHaveTextContent('Third Post'); // April 1
    expect(articles[1]).toHaveTextContent('First Post'); // March 15
    expect(articles[2]).toHaveTextContent('Second Post'); // Feb 10
  });

  it('displays title, date, and preview for each post', () => {
    const onPostSelect = vi.fn();
    render(<BlogList posts={mockPosts} onPostSelect={onPostSelect} />);

    expect(screen.getByText('First Post')).toBeInTheDocument();
    expect(screen.getByText('March 15, 2024')).toBeInTheDocument();
    expect(screen.getByText('This is the first post preview')).toBeInTheDocument();
  });

  it('calls onPostSelect when a post is clicked', () => {
    const onPostSelect = vi.fn();
    render(<BlogList posts={mockPosts} onPostSelect={onPostSelect} />);

    const firstPost = screen.getByText('First Post');
    firstPost.click();

    expect(onPostSelect).toHaveBeenCalledWith('post-1');
  });
});
