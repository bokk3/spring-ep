import { useParallax, useMouseParallax } from '../hooks';
import { Container } from './Container';
import styles from './ParallaxHero.module.css';

interface ParallaxHeroProps {
  heroImage: string;
}

export function ParallaxHero({ heroImage }: ParallaxHeroProps) {
  const scrollY = useParallax();
  const mouse = useMouseParallax();

  return (
    <header className={styles.hero}>
      {/* Background layer - slowest */}
      <div 
        className={styles.bgLayer}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <img 
          src={heroImage} 
          alt="Hero background" 
          className={styles.heroImage}
        />
      </div>

      {/* Floating particles layer */}
      <div className={styles.particlesLayer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlays */}
      <div className={styles.gradientOverlay} />
      <div 
        className={styles.radialGlow}
        style={{
          transform: `translate(${mouse.x * 50}px, ${mouse.y * 50}px)`,
        }}
      />

      {/* Content layer - medium speed */}
      <div 
        className={styles.contentLayer}
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <Container>
          <div 
            className={styles.glassCard}
            style={{
              transform: `translate(${mouse.x * 10}px, ${mouse.y * 10}px)`,
            }}
          >
            <h1 className={styles.title}>Extrablyn</h1>
            <p className={styles.tagline}>Techno Artist & Producer</p>
            
            {/* Animated lines */}
            <div className={styles.decorativeLines}>
              <div className={styles.line} />
              <div className={styles.line} />
              <div className={styles.line} />
            </div>
          </div>
        </Container>
      </div>

      {/* Scroll indicator - fastest */}
      <div 
        className={styles.scrollIndicator}
        style={{
          opacity: Math.max(0, 1 - scrollY / 300),
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className={styles.scrollArrow} />
        <span className={styles.scrollText}>Scroll</span>
      </div>

      {/* Grid overlay for depth */}
      <div className={styles.gridOverlay} />
    </header>
  );
}
