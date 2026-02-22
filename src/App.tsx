import { Navigation, Container, Section, AudioPlayer, TrackList, ContactForm, BlogSection } from './components';
import { mockTracks, mockBlogPosts } from './data';
import { useAudioPlayer } from './hooks';
import type { ContactMessage } from './types';
import './App.css';

// Import images directly
const heroImage = '/images/hero.jpg';
const albumCoverImage = '/images/album-cover.jpg';
const artistImage = '/images/artist.jpg';

function App() {
  const audioPlayerState = useAudioPlayer(mockTracks);
  const currentTrack = mockTracks[audioPlayerState.currentTrackIndex];

  // Debug: Log image paths
  console.log('Hero image:', heroImage);
  console.log('Album cover:', albumCoverImage);
  console.log('Artist image:', artistImage);

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
        <div className="hero-background">
          <img 
            src={heroImage} 
            alt="Hero background" 
            className="hero-image"
            onError={(e) => {
              console.error('Failed to load hero image:', heroImage);
            }}
          />
        </div>
        <Container>
          <h1 className="artist-name">Extrablyn</h1>
          <p className="artist-tagline">Techno Artist & Producer</p>
        </Container>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </header>

      <main>
        <Section id="music">
          <Container>
            <h2>Music</h2>
            <div className="music-content">
              <div className="album-showcase">
                <img 
                  src={albumCoverImage} 
                  alt="Spring EP Album Cover" 
                  className="album-cover-large"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load album cover:', albumCoverImage);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="album-info">
                  <h3>Spring EP</h3>
                  <p>29 Tracks • 2024</p>
                </div>
              </div>
              <TrackList
                tracks={mockTracks}
                currentTrackId={currentTrack?.id || null}
                onTrackSelect={audioPlayerState.loadTrack}
              />
            </div>
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
            <div className="contact-content">
              <div className="contact-intro">
                <img 
                  src={artistImage} 
                  alt="Extrablyn" 
                  className="artist-image"
                  loading="lazy"
                  onError={(e) => {
                    console.error('Failed to load artist image:', artistImage);
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <p>
                  Get in touch for bookings, collaborations, or just to say hello.
                </p>
              </div>
              <ContactForm onSubmit={handleContactSubmit} />
            </div>
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
