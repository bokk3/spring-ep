import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TrackList } from './TrackList';
import type { Track } from '../types';

describe('TrackList', () => {
  const mockTracks: Track[] = [
    {
      id: 'track-001',
      title: 'Transient',
      trackNumber: 1,
      audioUrl: '/audio/track-001.m4a',
      duration: 300,
    },
    {
      id: 'track-002',
      title: 'Set-up',
      trackNumber: 2,
      audioUrl: '/audio/track-002.m4a',
      duration: 300,
    },
    {
      id: 'track-003',
      title: 'Explore',
      trackNumber: 3,
      audioUrl: '/audio/track-003.m4a',
      duration: 300,
    },
  ];

  it('displays all tracks with numbers and titles', () => {
    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={mockTracks}
        currentTrackId={null}
        onTrackSelect={onTrackSelect}
      />
    );

    expect(screen.getByText('Transient')).toBeInTheDocument();
    expect(screen.getByText('Set-up')).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('calls onTrackSelect with correct index when track is clicked', async () => {
    const user = userEvent.setup();
    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={mockTracks}
        currentTrackId={null}
        onTrackSelect={onTrackSelect}
      />
    );

    const secondTrack = screen.getByRole('button', { name: /Play track 2: Set-up/i });
    await user.click(secondTrack);

    expect(onTrackSelect).toHaveBeenCalledWith(1);
  });

  it('visually indicates the currently playing track', () => {
    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={mockTracks}
        currentTrackId="track-002"
        onTrackSelect={onTrackSelect}
      />
    );

    const activeTrack = screen.getByRole('button', { name: /Play track 2: Set-up/i });
    expect(activeTrack).toHaveAttribute('aria-current', 'true');
    expect(screen.getByLabelText('Currently playing')).toBeInTheDocument();
  });

  it('displays exactly 30 tracks when provided', () => {
    const thirtyTracks: Track[] = Array.from({ length: 30 }, (_, i) => ({
      id: `track-${String(i + 1).padStart(3, '0')}`,
      title: `Track ${i + 1}`,
      trackNumber: i + 1,
      audioUrl: `/audio/track-${String(i + 1).padStart(3, '0')}.m4a`,
      duration: 300,
    }));

    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={thirtyTracks}
        currentTrackId={null}
        onTrackSelect={onTrackSelect}
      />
    );

    const trackButtons = screen.getAllByRole('button');
    expect(trackButtons).toHaveLength(30);
  });

  it('renders track numbers with leading zeros', () => {
    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={mockTracks}
        currentTrackId={null}
        onTrackSelect={onTrackSelect}
      />
    );

    expect(screen.getByText('01')).toBeInTheDocument();
    expect(screen.getByText('02')).toBeInTheDocument();
    expect(screen.getByText('03')).toBeInTheDocument();
  });

  it('handles empty track list gracefully', () => {
    const onTrackSelect = vi.fn();
    render(
      <TrackList
        tracks={[]}
        currentTrackId={null}
        onTrackSelect={onTrackSelect}
      />
    );

    const trackButtons = screen.queryAllByRole('button');
    expect(trackButtons).toHaveLength(0);
  });
});
