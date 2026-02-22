import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

export const Section = ({ children, id, className = '' }: SectionProps) => {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      {children}
    </section>
  );
};
