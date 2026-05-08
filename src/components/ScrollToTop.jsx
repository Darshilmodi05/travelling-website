import { useState, useEffect } from 'react';
import './ScrollToTop.css';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // SVG circle for progress ring
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <button
      className={`scroll-top-btn${visible ? ' visible' : ''}`}
      onClick={scrollTop}
      aria-label="Scroll to top"
      title="Back to top"
    >
      {/* Progress ring */}
      <svg className="progress-ring" width="52" height="52" viewBox="0 0 52 52">
        <circle className="progress-ring-bg" cx="26" cy="26" r={radius} />
        <circle
          className="progress-ring-fill"
          cx="26" cy="26" r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {/* Arrow icon */}
      <span className="scroll-top-arrow">↑</span>
    </button>
  );
}
