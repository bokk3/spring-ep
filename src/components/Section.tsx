import type { ReactNode } from 'react';
import { useInView } from '../hooks';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className = '' }: SectionProps) => {
  const { ref, isInView } = useInView();

  return (
    <section 
      id={id} 
      className={`${styles.section} ${isInView ? styles.visible : ''} ${className}`}
      ref={ref as React.RefObject<HTMLElement>}
    >
      {children}
    </section>
  );
};
