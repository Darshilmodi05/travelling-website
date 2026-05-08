import { useEffect, useRef, useState } from 'react';
import './Navbar.css';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#destinations', label: 'Destinations' },
  { href: '#experiences', label: 'Experiences' },
  { href: '#tours', label: 'Tours' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef();

  useEffect(() => {
    const onScroll = () => navRef.current?.classList.toggle('scrolled', window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`navbar${isOpen ? ' menu-open' : ''}`} ref={navRef}>
      <div className="nav-container container">
        <a href="#home" className="nav-logo" onClick={e => smoothScroll(e, '#home')}>
          <span className="logo-icon">✈</span>
          <span className="logo-text">YATRIKA</span>
        </a>
        
        {/* Desktop Links */}
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="nav-link" onClick={e => smoothScroll(e, l.href)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <a href="#destinations" className="btn-ghost desktop-only" onClick={e => smoothScroll(e, '#destinations')}>🔍 Explore</a>
          <a href="#contact" className="btn-primary" onClick={e => smoothScroll(e, '#contact')}>Book Now</a>
          
          {/* Hamburger Toggle */}
          <button 
            className={`nav-toggle${isOpen ? ' active' : ''}`} 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu${isOpen ? ' open' : ''}`}>
        <ul className="mobile-links">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} className="mobile-link" onClick={e => smoothScroll(e, l.href)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
