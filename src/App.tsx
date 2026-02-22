import { Navigation, Container, Section, AudioPlayer, TrackList, ContactForm, BlogSection } from './components';
import { mockTracks, mockBlogPosts } from './data';
import { useAudioPlayer } from './hooks';
import type { ContactMessage } from './types';
import './App.css';

function App() {
  const audioPlayerState = useAudioPlayer(mockTracks);
  const currentTrack = mockTracks[audioPlayerState.currentTrackIndex];

  const handleContactSubmit = async (data: ContactMessage) => {
    // In a real application, this would send the data to a backend API
    console.log('Contact form submitted:', data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For now, just log the data
    // In production, you would send this to your backend:
    // await fetch('/api/contact', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });
  };

  return (
    <div className="app">
      <Navigation />
      
      <header className="app-header">
        <Container>
          <h1 className="artist-name">Extrablyn</h1>
          <p className="artist-tagline">Techno Artist & Producer</p>
        </Container>
      </header>

      <main>
        <Section id="music">
          <Container>
            <h2>Music</h2>
            <TrackList
              tracks={mockTracks}
              currentTrackId={currentTrack?.id || null}
              onTrackSelect={audioPlayerState.loadTrack}
            />
          </Container>
        </Section>
        
        <Section id="blog">
          <Container>
            <h2>Blog</h2>
            <BlogSection posts={mockBlogPosts} />
          </Container>
        </Section>
        
        <Section id="contact">
          <Container>
            <h2>Contact</h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
              Get in touch for bookings, collaborations, or just to say hello.
            </p>
            <ContactForm onSubmit={handleContactSubmit} />
          </Container>
        </Section>
      </main>

      <footer className="app-footer">
        <Container>
          <p>&copy; {new Date().getFullYear()} Extrablyn. All rights reserved.</p>
        </Container>
      </footer>

      {/* Floating Audio Player */}
      <AudioPlayer
        tracks={mockTracks}
        currentTrackIndex={audioPlayerState.currentTrackIndex}
        isPlaying={audioPlayerState.isPlaying}
        currentTime={audioPlayerState.currentTime}
        duration={audioPlayerState.duration}
        volume={audioPlayerState.volume}
        isMuted={audioPlayerState.isMuted}
        isLoading={audioPlayerState.isLoading}
        error={audioPlayerState.error}
        onPlay={audioPlayerState.play}
        onPause={audioPlayerState.pause}
        onSeek={audioPlayerState.seekTo}
        onNext={audioPlayerState.nextTrack}
        onPrevious={audioPlayerState.previousTrack}
        onVolumeChange={audioPlayerState.setVolume}
        onToggleMute={audioPlayerState.toggleMute}
      />
    </div>
  );
}

export default App;
