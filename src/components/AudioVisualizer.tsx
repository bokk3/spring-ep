import { useEffect, useRef, useState } from 'react';
import styles from './AudioVisualizer.module.css';

interface AudioVisualizerProps {
  isPlaying: boolean;
  audioElementRef?: HTMLAudioElement | null;
}

export function AudioVisualizer({ isPlaying, audioElementRef }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const audioContextRef = useRef<AudioContext | undefined>(undefined);
  const analyserRef = useRef<AnalyserNode | undefined>(undefined);
  const sourceRef = useRef<MediaElementAudioSourceNode | undefined>(undefined);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(audioElementRef || null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Use provided audio element or find one
  useEffect(() => {
    if (audioElementRef) {
      setAudioElement(audioElementRef);
      return;
    }

    const findAudio = () => {
      const audio = document.querySelector('audio');
      if (audio && audio !== audioElement) {
        console.log('Audio element found:', audio);
        setAudioElement(audio);
      }
    };

    // Try immediately
    findAudio();
    
    // Keep trying every 500ms
    const interval = setInterval(findAudio, 500);
    
    // Also try after delays
    setTimeout(findAudio, 100);
    setTimeout(findAudio, 500);
    setTimeout(findAudio, 1000);
    
    return () => clearInterval(interval);
  }, [audioElement, audioElementRef]);

  // Set up audio context and analyser
  useEffect(() => {
    if (!audioElement || sourceRef.current || isInitialized) return;

    console.log('Setting up audio context...');

    const setupAudio = async () => {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContext();
        
        // Resume context on user interaction if needed
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512; // Increased for better frequency resolution
        analyser.smoothingTimeConstant = 0.75;

        // Try to create source
        try {
          const source = audioContext.createMediaElementSource(audioElement);
          source.connect(analyser);
          analyser.connect(audioContext.destination);
          
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
          sourceRef.current = source;
          setIsInitialized(true);
          
          console.log('Audio context initialized successfully with real audio');
        } catch (sourceError) {
          console.error('Error creating media source (might already be connected):', sourceError);
          // Still set up for potential future use
          audioContextRef.current = audioContext;
          analyserRef.current = analyser;
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Web Audio API error:', error);
      }
    };

    setupAudio();

    return () => {
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, [audioElement, isInitialized]);

  // Visualization loop
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let frameCount = 0;

    const draw = () => {
      frameCount++;
      
      // Clear with fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barCount = 80; // More bars for fuller effect
      const barWidth = canvas.width / barCount;
      const centerY = canvas.height / 2;

      // If we have analyser and audio is playing, use real data
      if (analyserRef.current && isPlaying && isInitialized) {
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Debug: Check if we're getting audio data
        const maxValue = Math.max(...Array.from(dataArray));
        if (frameCount % 60 === 0) {
          console.log('Audio data max value:', maxValue, 'Has data:', maxValue > 0);
        }

        for (let i = 0; i < barCount; i++) {
          const dataIndex = Math.floor((i / barCount) * bufferLength);
          const value = dataArray[dataIndex] / 255;
          const barHeight = value * (canvas.height * 0.8); // Taller bars

          // More vibrant rainbow colors
          const hue = (i / barCount) * 360 + (value * 90) + frameCount * 0.5;
          const saturation = 90 + (value * 10);
          const lightness = 55 + (value * 25);

          const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
          gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.9)`);
          gradient.addColorStop(0.5, `hsla(${hue + 40}, ${saturation}%, ${lightness + 10}%, 0.7)`);
          gradient.addColorStop(1, `hsla(${hue + 80}, ${saturation}%, ${lightness}%, 0.9)`);

          ctx.fillStyle = gradient;

          const x = i * barWidth;
          ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);

          // Enhanced glow effect
          if (value > 0.2) {
            ctx.shadowBlur = 30 + (value * 50);
            ctx.shadowColor = `hsla(${hue}, 100%, 70%, ${value * 0.8})`;
            ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
            ctx.shadowBlur = 0;
          }
        }

        // Add radial particles based on audio intensity
        const avgValue = dataArray.reduce((a, b) => a + b, 0) / bufferLength / 255;
        const particleCount = Math.floor(avgValue * 30);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * canvas.height * 0.4;
          const x = canvas.width / 2 + Math.cos(angle) * distance;
          const y = canvas.height / 2 + Math.sin(angle) * distance;
          const size = Math.random() * 4 + 2;
          const hue = Math.random() * 360;

          ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.7})`;
          ctx.shadowBlur = 15;
          ctx.shadowColor = `hsla(${hue}, 100%, 70%, 0.8)`;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      } else if (isPlaying) {
        // Fallback: more energetic animated bars when playing
        for (let i = 0; i < barCount; i++) {
          const value = Math.abs(Math.sin(frameCount * 0.08 + i * 0.15)) * 0.6 + 0.3;
          const barHeight = value * (canvas.height * 0.5);

          const hue = (i / barCount) * 360 + frameCount * 2;
          const gradient = ctx.createLinearGradient(0, centerY - barHeight / 2, 0, centerY + barHeight / 2);
          gradient.addColorStop(0, `hsla(${hue}, 85%, 65%, 0.7)`);
          gradient.addColorStop(1, `hsla(${hue + 60}, 85%, 65%, 0.7)`);

          ctx.fillStyle = gradient;
          const x = i * barWidth;
          ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
        }
      } else {
        // Idle state: more visible ambient bars
        for (let i = 0; i < barCount; i++) {
          const value = Math.abs(Math.sin(frameCount * 0.03 + i * 0.08)) * 0.3 + 0.1;
          const barHeight = value * (canvas.height * 0.25);

          const hue = (i / barCount) * 360 + frameCount;
          ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.4)`;
          
          const x = i * barWidth;
          ctx.fillRect(x, centerY - barHeight / 2, barWidth - 1, barHeight);
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, isInitialized]);

  return (
    <canvas
      ref={canvasRef}
      className={styles.visualizer}
      aria-hidden="true"
    />
  );
}
