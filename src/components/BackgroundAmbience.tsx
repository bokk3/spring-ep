import { useEffect, useState } from 'react';
import styles from './BackgroundAmbience.module.css';

interface Orb {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function BackgroundAmbience() {
  const [orbs, setOrbs] = useState<Orb[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Generate floating orbs
    const newOrbs: Orb[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 100 + Math.random() * 200,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setOrbs(newOrbs);

    // Track mouse for reactive lighting
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.ambience}>
      {/* Animated gradient mesh */}
      <div className={styles.gradientMesh} />
      
      {/* Mouse-reactive light */}
      <div 
        className={styles.mouseLight}
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />
      
      {/* Floating orbs */}
      {orbs.map(orb => (
        <div
          key={orb.id}
          className={styles.orb}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            animationDuration: `${orb.duration}s`,
            animationDelay: `${orb.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
