import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

interface NavigationSection {
  id: string;
  label: string;
  href: string;
}

interface NavigationProps {
  sections?: NavigationSection[];
}

const defaultSections: NavigationSection[] = [
  { id: 'music', label: 'Music', href: '#music' },
  { id: 'blog', label: 'Blog', href: '#blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const Navigation = ({ sections = defaultSections }: NavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={styles.navigation} role="navigation" aria-label="Main navigation">
      <div className={styles.navContainer}>
        <a href="#" className={styles.logo} onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Extrablyn
        </a>

        <button
          className={styles.hamburger}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        <ul className={`${styles.navList} ${isMobileMenuOpen ? styles.navListOpen : ''}`}>
          {sections.map((section) => (
            <li key={section.id} className={styles.navItem}>
              <a
                href={section.href}
                className={`${styles.navLink} ${activeSection === section.id ? styles.navLinkActive : ''}`}
                onClick={(e) => handleNavClick(e, section.href)}
              >
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
