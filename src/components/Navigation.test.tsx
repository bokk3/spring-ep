import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from './Navigation';

describe('Navigation Component', () => {
  it('renders navigation with default sections', () => {
    render(<Navigation />);
    
    expect(screen.getByText('Extrablyn')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders navigation with custom sections', () => {
    const customSections = [
      { id: 'about', label: 'About', href: '#about' },
      { id: 'work', label: 'Work', href: '#work' },
    ];
    
    render(<Navigation sections={customSections} />);
    
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  it('toggles mobile menu when hamburger is clicked', () => {
    render(<Navigation />);
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    
    fireEvent.click(hamburger);
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles smooth scroll to section', () => {
    const mockScrollIntoView = vi.fn();
    
    // Mock getElementById
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    render(<Navigation />);
    
    const musicLink = screen.getByText('Music');
    fireEvent.click(musicLink);
    
    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('closes mobile menu after clicking a link', () => {
    const mockScrollIntoView = vi.fn();
    const mockElement = {
      scrollIntoView: mockScrollIntoView,
    };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockElement as any);
    
    render(<Navigation />);
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    fireEvent.click(hamburger);
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    
    const musicLink = screen.getByText('Music');
    fireEvent.click(musicLink);
    
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('has proper ARIA attributes', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    expect(hamburger).toHaveAttribute('aria-expanded');
  });
});
