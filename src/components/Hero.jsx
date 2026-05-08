import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.png';
import santoriniImg from '../assets/santorini.png';
import maldivesImg from '../assets/maldives.png';
import './Hero.css';

const slides = [heroImg, santoriniImg, maldivesImg];

export default function Hero({ onPlayVideo }) {
  const [current, setCurrent] = useState(0);
  const statsRef = useRef();
  const [counted, setCounted] = useState(false);

  // Auto-slide
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Particles
  useEffect(() => {
    const el = document.getElementById('particles');
    if (!el) return;
    for (let i = 0; i < 20; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const s = Math.random() * 5 + 2;
      p.style.cssText = `width:${s}px;height:${s}px;left:${Math.random()*100}%;animation-duration:${Math.random()*12+8}s;animation-delay:${Math.random()*6}s;`;
      el.appendChild(p);
    }
  }, []);

  // Counter animation
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted) {
        setCounted(true);
        document.querySelectorAll('.stat-num').forEach(el => {
          const target = +el.dataset.target;
          let c = 0; const step = target / 60;
          const t = setInterval(() => { c = Math.min(c + step, target); el.textContent = Math.floor(c); if (c >= target) clearInterval(t); }, 25);
        });
      }
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [counted]);

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      const sy = window.scrollY;
      const el = document.querySelector('.hero-content');
      if (el && sy < window.innerHeight) {
        el.style.transform = `translateY(${sy * 0.25}px)`;
        el.style.opacity = 1 - sy / (window.innerHeight * 0.7);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        {slides.map((s, i) => (
          <div key={i} className={`hero-slide${i === current ? ' active' : ''}`} style={{ backgroundImage: `url(${s})` }} />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="particles" id="particles" />

      <div className="hero-content">
        <div className="hero-badge"><span className="badge-dot" />Premium Travel Experience</div>
        <h1 className="hero-title">
          <span className="title-line">Explore the</span>
          <span className="title-line gradient-text">World's Wonders</span>
        </h1>
        <p className="hero-subtitle">Curated journeys to the world's most extraordinary places.<br />Your next adventure begins with a single click.</p>

        <div className="hero-stats" ref={statsRef}>
          <div className="stat-item"><span className="stat-num" data-target="120">0</span><span className="stat-suffix">+</span><span className="stat-label">Destinations</span></div>
          <div className="stat-divider" />
          <div className="stat-item"><span className="stat-num" data-target="48">0</span><span className="stat-suffix">K</span><span className="stat-label">Happy Travelers</span></div>
          <div className="stat-divider" />
          <div className="stat-item"><span className="stat-num" data-target="15">0</span><span className="stat-suffix">yr</span><span className="stat-label">Experience</span></div>
        </div>

        <div className="hero-cta">
          <a href="#destinations" className="btn-hero-primary" onClick={e => smoothScroll(e, '#destinations')}>
            <span>Start Exploring</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <button className="btn-hero-ghost" onClick={onPlayVideo}>
            <span className="play-circle">▶</span><span>Watch Story</span>
          </button>
        </div>
      </div>

      <div className="hero-search-bar">
        <div className="search-field"><label>🗺 Destination</label><input type="text" placeholder="Where to?" id="destInput" /></div>
        <div className="search-divider" />
        <div className="search-field"><label>📅 Date</label><input type="date" /></div>
        <div className="search-divider" />
        <div className="search-field">
          <label>👥 Travelers</label>
          <select><option>1 Adult</option><option>2 Adults</option><option>Family (4)</option><option>Group (8+)</option></select>
        </div>
        <button className="search-btn" onClick={() => { const v = document.getElementById('destInput').value.trim(); if(v) alert(`🌍 Searching trips to "${v}"!`); }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>Search
        </button>
      </div>

      <div className="hero-dots">
        {slides.map((_, i) => <span key={i} className={`dot${i === current ? ' active' : ''}`} onClick={() => setCurrent(i)} />)}
      </div>
      <div className="scroll-indicator"><span>Scroll</span><div className="scroll-line" /></div>
    </section>
  );
}
