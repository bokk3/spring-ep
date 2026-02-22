import type { Track } from '../types';
import styles from './TrackList.module.css';

interface TrackListProps {
  tracks: Track[];
  currentTrackId: string | null;
  onTrackSelect: (trackIndex: number) => void;
}

export function TrackList({ tracks, currentTrackId, onTrackSelect }: TrackListProps) {
  return (
    <div className={styles.trackList}>
      <ul className={styles.list} role="list">
        {tracks.map((track, index) => (
          <li key={track.id} className={styles.listItem}>
            <button
              className={`${styles.trackButton} ${
                track.id === currentTrackId ? styles.active : ''
              }`}
              onClick={() => onTrackSelect(index)}
              aria-label={`Play track ${track.trackNumber}: ${track.title}`}
              aria-current={track.id === currentTrackId ? 'true' : 'false'}
            >
              <span className={styles.trackNumber}>
                {track.trackNumber.toString().padStart(2, '0')}
              </span>
              <span className={styles.trackTitle}>{track.title}</span>
              {track.id === currentTrackId && (
                <span className={styles.playingIndicator} aria-label="Currently playing">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="2" y="2" width="3" height="12" />
                    <rect x="7" y="2" width="3" height="12" />
                    <rect x="12" y="2" width="3" height="12" />
                  </svg>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
