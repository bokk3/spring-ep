import { useEffect, useState } from 'react';
import styles from './ScrollProgress.module.css';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      setProgress(Math.min(progress, 100));
      setIsVisible(scrolled > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`${styles.scrollProgress} ${isVisible ? styles.visible : ''}`}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${progress}%` }}
      />
      <div className={styles.glow} style={{ left: `${progress}%` }} />
    </div>
  );
}
