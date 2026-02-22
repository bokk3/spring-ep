import { useState, useEffect } from 'react';
import type { Track } from '../types';
import { getAlbumArt } from '../utils/albumArtExtractor';
import styles from './AudioPlayer.module.css';

interface AudioPlayerProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLoading: boolean;
  error: string | null;
  onPlay: () => void;
  onPause: () => void;
  onSeek: (time: number) => void;
  onNext: () => void;
  onPrevious: () => void;
  onVolumeChange: (level: number) => void;
  onToggleMute: () => void;
}

export function AudioPlayer({
  tracks,
  currentTrackIndex,
  isPlaying,
  currentTime,
  duration,
  volume,
  isMuted,
  isLoading,
  error,
  onPlay,
  onPause,
  onSeek,
  onNext,
  onPrevious,
  onVolumeChange,
  onToggleMute,
}: AudioPlayerProps) {
  const currentTrack = tracks[currentTrackIndex];
  const [albumArt, setAlbumArt] = useState<string | null>(null);

  // Extract album art when track changes
  useEffect(() => {
    if (currentTrack?.albumArt) {
      setAlbumArt(currentTrack.albumArt);
    } else if (currentTrack?.audioUrl) {
      setAlbumArt(null);
      getAlbumArt(currentTrack.audioUrl).then(setAlbumArt);
    }
  }, [currentTrack?.audioUrl, currentTrack?.albumArt]);

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSeekBarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onSeek(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay();
    }
  };

  // Calculate progress percentage for the visual progress bar
  // The progress bar needs to account for the padding in the wrapper (10px on each side)
  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.audioPlayer}>
      {error && <div className={styles.error}>{error}</div>}
      
      <div className={styles.playerHeader}>
        {albumArt ? (
          <div className={styles.albumArt}>
            <img src={albumArt} alt={`${currentTrack?.title} album art`} />
          </div>
        ) : (
          <div className={styles.albumArt}>
            <div className={styles.albumArtPlaceholder}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
          </div>
        )}
        <div className={styles.trackInfo}>
          <div className={styles.trackNumber}>
            {currentTrack?.trackNumber || 0}
          </div>
          <div className={styles.trackTitle}>
            {isLoading ? 'Loading...' : currentTrack?.title || 'No track'}
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={onPrevious}
          disabled={currentTrackIndex === 0}
          aria-label="Previous track"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M19 20L9 12l10-8v16z" />
            <path d="M5 19V5" strokeWidth="2" />
          </svg>
        </button>

        <button
          className={`${styles.controlButton} ${styles.playButton}`}
          onClick={handlePlayPause}
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className={styles.controlButton}
          onClick={onNext}
          disabled={currentTrackIndex === tracks.length - 1}
          aria-label="Next track"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 4l10 8-10 8V4z" />
            <path d="M19 5v14" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className={styles.seekBar}>
        <span className={styles.time}>{formatTime(currentTime)}</span>
        <div className={styles.sliderWrapper}>
          <div className={styles.sliderTrack} />
          <div 
            className={styles.sliderProgress} 
            style={{ width: `${progressPercentage}%` }}
          />
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeekBarChange}
            className={styles.slider}
            aria-label="Seek"
          />
        </div>
        <span className={styles.time}>{formatTime(duration)}</span>
      </div>

      <div className={styles.volumeControl}>
        <button
          className={styles.volumeButton}
          onClick={onToggleMute}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" strokeWidth="2" />
              <line x1="17" y1="9" x2="23" y2="15" strokeWidth="2" />
            </svg>
          ) : volume < 0.5 ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
            </svg>
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className={`${styles.slider} ${styles.volumeSlider}`}
          aria-label="Volume"
        />
      </div>
    </div>
  );
}
