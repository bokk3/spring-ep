import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AudioPlayer } from './AudioPlayer';
import type { Track } from '../types';

describe('AudioPlayer', () => {
  const mockTracks: Track[] = [
    {
      id: 'track-1',
      title: 'First Track',
      trackNumber: 1,
      audioUrl: '/audio/track1.mp3',
      duration: 300
    },
    {
      id: 'track-2',
      title: 'Second Track',
      trackNumber: 2,
      audioUrl: '/audio/track2.mp3',
      duration: 300
    },
    {
      id: 'track-3',
      title: 'Third Track',
      trackNumber: 3,
      audioUrl: '/audio/track3.mp3',
      duration: 300
    }
  ];

  const defaultProps = {
    tracks: mockTracks,
    currentTrackIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 300,
    volume: 1,
    isMuted: false,
    isLoading: false,
    error: null,
    onPlay: vi.fn(),
    onPause: vi.fn(),
    onSeek: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    onVolumeChange: vi.fn(),
    onToggleMute: vi.fn(),
  };

  it('displays current track metadata', () => {
    render(<AudioPlayer {...defaultProps} />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('First Track')).toBeInTheDocument();
  });

  it('displays playback controls', () => {
    render(<AudioPlayer {...defaultProps} />);
    
    expect(screen.getByLabelText('Previous track')).toBeInTheDocument();
    expect(screen.getByLabelText('Play')).toBeInTheDocument();
    expect(screen.getByLabelText('Next track')).toBeInTheDocument();
  });

  it('displays seekbar and time', () => {
    render(<AudioPlayer {...defaultProps} />);
    
    expect(screen.getByLabelText('Seek')).toBeInTheDocument();
    expect(screen.getByText('0:00')).toBeInTheDocument();
  });

  it('displays volume controls', () => {
    render(<AudioPlayer {...defaultProps} />);
    
    expect(screen.getByLabelText('Mute')).toBeInTheDocument();
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('disables previous button on first track', () => {
    render(<AudioPlayer {...defaultProps} currentTrackIndex={0} />);
    
    const prevButton = screen.getByLabelText('Previous track');
    expect(prevButton).toBeDisabled();
  });

  it('enables next button when not on last track', () => {
    render(<AudioPlayer {...defaultProps} currentTrackIndex={0} />);
    
    const nextButton = screen.getByLabelText('Next track');
    expect(nextButton).not.toBeDisabled();
  });

  it('disables next button on last track', () => {
    render(<AudioPlayer {...defaultProps} currentTrackIndex={2} />);
    
    const nextButton = screen.getByLabelText('Next track');
    expect(nextButton).toBeDisabled();
  });

  it('shows pause button when playing', () => {
    render(<AudioPlayer {...defaultProps} isPlaying={true} />);
    
    expect(screen.getByLabelText('Pause')).toBeInTheDocument();
  });

  it('shows play button when paused', () => {
    render(<AudioPlayer {...defaultProps} isPlaying={false} />);
    
    expect(screen.getByLabelText('Play')).toBeInTheDocument();
  });
});
