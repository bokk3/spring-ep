import { useEffect, useState } from 'react';
import styles from './RainbowCursor.module.css';

export function RainbowCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let trailId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Add trail point
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailId++ }];
        return newTrail.slice(-15); // Keep last 15 points
      });
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Don't render on touch devices
  if ('ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className={styles.trailPoint}
          style={{
            left: point.x,
            top: point.y,
            opacity: (index / trail.length) * 0.5,
            transform: `scale(${(index / trail.length) * 0.5})`,
          }}
        />
      ))}
      
      {/* Main cursor */}
      {isVisible && (
        <div
          className={styles.cursor}
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <div className={styles.cursorGlow} />
        </div>
      )}
    </>
  );
}
