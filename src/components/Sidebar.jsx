import { useState } from 'react';
import './Sidebar.css';

const items = [
  { icon: '🗺', label: 'Explorer', href: '#home' },
  { icon: '🔍', label: 'Search', href: '#destinations' },
  { icon: '✈', label: 'Tours', href: '#tours' },
  { icon: '🌟', label: 'Reviews', href: '#testimonials' },
  { icon: '📩', label: 'Contact', href: '#contact' },
];

const bottom = [
  { icon: '⚙', label: 'Settings' },
  { icon: '👤', label: 'Profile' },
];

export default function Sidebar({ onSettings, onProfile }) {
  const [active, setActive] = useState(0);
  const [tooltip, setTooltip] = useState(null);

  const smoothScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="ide-sidebar">
      {/* Logo pill */}
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">✈</span>
      </div>

      <div className="sidebar-divider" />

      {/* Main nav icons */}
      <nav className="sidebar-nav">
        {items.map((item, i) => (
          <button
            key={i}
            className={`sidebar-item${active === i ? ' active' : ''}`}
            onClick={() => { setActive(i); smoothScroll(item.href); }}
            onMouseEnter={() => setTooltip(i)}
            onMouseLeave={() => setTooltip(null)}
            aria-label={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {tooltip === i && (
              <span className="sidebar-tooltip">{item.label}</span>
            )}
            {active === i && <span className="sidebar-active-bar" />}
          </button>
        ))}
      </nav>

      {/* Spacer */}
      <div className="sidebar-spacer" />

      {/* Bottom icons */}
      <div className="sidebar-bottom">
        <div className="sidebar-divider" />
        {bottom.map((item, i) => (
          <button
            key={i}
            className="sidebar-item"
            onClick={item.label === 'Settings' ? onSettings : onProfile}
            onMouseEnter={() => setTooltip(`b${i}`)}
            onMouseLeave={() => setTooltip(null)}
            aria-label={item.label}
          >
            <span className="sidebar-icon">{item.icon}</span>
            {tooltip === `b${i}` && (
              <span className="sidebar-tooltip">{item.label}</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}
