import type { Track } from '../types';

/**
 * AudioManager class for managing audio playback using HTML5 Audio API
 * Handles track loading, playback controls, and state management
 */
export class AudioManager {
  private audio: HTMLAudioElement;
  private tracks: Track[];
  private currentIndex: number;
  private onStateChange?: () => void;
  private audioContext?: AudioContext;
  private analyser?: AnalyserNode;
  private source?: MediaElementAudioSourceNode;

  constructor(tracks: Track[], onStateChange?: () => void) {
    this.audio = new Audio();
    this.tracks = tracks;
    this.currentIndex = 0;
    this.onStateChange = onStateChange;
    this.setupEventListeners();
    this.setupAudioContext();
  }

  /**
   * Set up Web Audio API context for visualization
   */
  private setupAudioContext(): void {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256; // Frequency resolution
      this.analyser.smoothingTimeConstant = 0.8;
      
      this.source = this.audioContext.createMediaElementSource(this.audio);
      this.source.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Get analyser node for visualization
   */
  getAnalyser(): AnalyserNode | undefined {
    return this.analyser;
  }

  /**
   * Get audio context
   */
  getAudioContext(): AudioContext | undefined {
    return this.audioContext;
  }

  /**
   * Set up event listeners for audio element
   */
  private setupEventListeners(): void {
    this.audio.addEventListener('canplay', this.handleCanPlay);
    this.audio.addEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.addEventListener('ended', this.handleEnded);
    this.audio.addEventListener('error', this.handleError);
    this.audio.addEventListener('loadstart', this.handleLoadStart);
  }

  /**
   * Event handler for when audio can play
   */
  private handleCanPlay = (): void => {
    this.notifyStateChange();
  };

  /**
   * Event handler for time updates during playback
   */
  private handleTimeUpdate = (): void => {
    this.notifyStateChange();
  };

  /**
   * Event handler for when track ends
   * Auto-advances to next track if not the last track
   */
  private handleEnded = (): void => {
    // Auto-advance to next track if not the last track
    if (this.currentIndex < this.tracks.length - 1) {
      this.nextTrack();
    } else {
      this.notifyStateChange();
    }
  };

  /**
   * Event handler for audio loading errors
   */
  private handleError = (): void => {
    this.notifyStateChange();
  };

  /**
   * Event handler for when audio starts loading
   */
  private handleLoadStart = (): void => {
    this.notifyStateChange();
  };

  /**
   * Notify state change callback
   */
  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange();
    }
  }

  /**
   * Load a track by index
   */
  loadTrack(index: number): void {
    if (index >= 0 && index < this.tracks.length) {
      this.currentIndex = index;
      this.audio.src = this.tracks[index].audioUrl;
      this.audio.load();
    }
  }

  /**
   * Start or resume playback
   */
  play(): Promise<void> {
    return this.audio.play();
  }

  /**
   * Pause playback
   */
  pause(): void {
    this.audio.pause();
  }

  /**
   * Seek to a specific time position
   */
  seekTo(time: number): void {
    if (time >= 0 && time <= this.audio.duration) {
      this.audio.currentTime = time;
    }
  }

  /**
   * Advance to next track
   */
  nextTrack(): void {
    if (this.currentIndex < this.tracks.length - 1) {
      const nextIndex = this.currentIndex + 1;
      this.loadTrack(nextIndex);
      this.play().catch(() => {
        // Handle play error silently
      });
    }
  }

  /**
   * Go to previous track
   */
  previousTrack(): void {
    if (this.currentIndex > 0) {
      const prevIndex = this.currentIndex - 1;
      this.loadTrack(prevIndex);
      this.play().catch(() => {
        // Handle play error silently
      });
    }
  }

  /**
   * Set volume level (0-1)
   */
  setVolume(level: number): void {
    const clampedLevel = Math.max(0, Math.min(1, level));
    this.audio.volume = clampedLevel;
  }

  /**
   * Toggle mute state
   */
  toggleMute(): void {
    this.audio.muted = !this.audio.muted;
  }

  /**
   * Get current track index
   */
  getCurrentTrackIndex(): number {
    return this.currentIndex;
  }

  /**
   * Get current track
   */
  getCurrentTrack(): Track | null {
    return this.tracks[this.currentIndex] || null;
  }

  /**
   * Get current playback time
   */
  getCurrentTime(): number {
    return this.audio.currentTime;
  }

  /**
   * Get track duration
   */
  getDuration(): number {
    return this.audio.duration;
  }

  /**
   * Get playing state
   */
  isPlaying(): boolean {
    return !this.audio.paused;
  }

  /**
   * Get volume level
   */
  getVolume(): number {
    return this.audio.volume;
  }

  /**
   * Get mute state
   */
  isMuted(): boolean {
    return this.audio.muted;
  }

  /**
   * Get loading state
   */
  isLoading(): boolean {
    return this.audio.readyState < 3; // HAVE_FUTURE_DATA
  }

  /**
   * Get error state
   */
  hasError(): boolean {
    return this.audio.error !== null;
  }

  /**
   * Get error message
   */
  getErrorMessage(): string | null {
    if (this.audio.error) {
      switch (this.audio.error.code) {
        case MediaError.MEDIA_ERR_ABORTED:
          return 'Playback aborted';
        case MediaError.MEDIA_ERR_NETWORK:
          return 'Network error';
        case MediaError.MEDIA_ERR_DECODE:
          return 'Decode error';
        case MediaError.MEDIA_ERR_SRC_NOT_SUPPORTED:
          return 'Audio format not supported';
        default:
          return 'Unknown error';
      }
    }
    return null;
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.audio.removeEventListener('canplay', this.handleCanPlay);
    this.audio.removeEventListener('timeupdate', this.handleTimeUpdate);
    this.audio.removeEventListener('ended', this.handleEnded);
    this.audio.removeEventListener('error', this.handleError);
    this.audio.removeEventListener('loadstart', this.handleLoadStart);
    this.audio.pause();
    this.audio.src = '';
    
    // Clean up audio context
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}
