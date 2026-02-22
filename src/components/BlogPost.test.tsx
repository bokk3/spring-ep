import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BlogPost } from './BlogPost';
import type { BlogPost as BlogPostType } from '../types';

describe('BlogPost', () => {
  const mockPost: BlogPostType = {
    id: 'post-1',
    title: 'Test Blog Post',
    date: new Date('2024-03-15'),
    preview: 'Preview text',
    content: '<h2>Heading</h2><p>This is a paragraph with <a href="#">a link</a>.</p>',
    slug: 'test-blog-post'
  };

  it('displays post title and date', () => {
    const onBack = vi.fn();
    render(<BlogPost post={mockPost} onBack={onBack} />);

    expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    expect(screen.getByText('March 15, 2024')).toBeInTheDocument();
  });

  it('renders HTML content correctly', () => {
    const onBack = vi.fn();
    render(<BlogPost post={mockPost} onBack={onBack} />);

    expect(screen.getByText('Heading')).toBeInTheDocument();
    expect(screen.getByText(/This is a paragraph/)).toBeInTheDocument();
    expect(screen.getByText('a link')).toBeInTheDocument();
  });

  it('displays back button', () => {
    const onBack = vi.fn();
    render(<BlogPost post={mockPost} onBack={onBack} />);

    const backButton = screen.getByRole('button', { name: /back to blog list/i });
    expect(backButton).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', () => {
    const onBack = vi.fn();
    render(<BlogPost post={mockPost} onBack={onBack} />);

    const backButton = screen.getByRole('button', { name: /back to blog list/i });
    backButton.click();

    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
