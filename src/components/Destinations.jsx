import { useState } from 'react';
import maldivesImg from '../assets/maldives.png';
import santoriniImg from '../assets/santorini.png';
import baliImg from '../assets/bali.png';
import japanImg from '../assets/japan.png';
import patagoniaImg from '../assets/patagonia.png';
import './Destinations.css';

const dests = [
  { id:1, img:maldivesImg, cat:'ocean', badge:'🏆 #1 Luxury', region:'🌊 Indian Ocean', name:'Maldives', desc:'Overwater villas above the crystal lagoon', rating:'4.9', price:'₹1,08,000', large:true },
  { id:2, img:santoriniImg, cat:'europe', badge:'🌅 Most Romantic', region:'🏛 Europe', name:'Santorini', desc:'White-washed cliffs above the Aegean Sea', rating:'4.8', price:'₹74,999' },
  { id:3, img:baliImg, cat:'asia', badge:'🌿 Nature Escape', region:'🌏 Asia', name:'Bali', desc:'Mystical temples among emerald rice terraces', rating:'4.7', price:'₹58,999' },
  { id:4, img:japanImg, cat:'asia', badge:'🌸 Cultural Gem', region:'🏯 Asia', name:'Kyoto, Japan', desc:'Ancient temples beneath cherry blossom skies', rating:'4.9', price:'₹91,999' },
  { id:5, img:patagoniaImg, cat:'adventure', badge:'⛰ Wild Adventure', region:'🌎 South America', name:'Patagonia', desc:'Towering granite peaks above glacial lakes', rating:'4.8', price:'₹1,24,999', large:true },
];

const tabs = ['all','asia','europe','ocean','adventure'];

export default function Destinations() {
  const [filter, setFilter] = useState('all');

  const onMouseMove = (e, card) => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * -10;
    card.style.transform = `translateY(-6px) rotateY(${x}deg) rotateX(${y}deg)`;
  };
  const onMouseLeave = card => { card.style.transform = ''; };

  return (
    <section className="destinations section" id="destinations">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Top Picks</div>
          <h2 className="section-title">Extraordinary <em>Destinations</em></h2>
          <p className="section-sub">Handcrafted travel experiences to the most awe-inspiring places on Earth</p>
        </div>
        <div className="filter-tabs">
          {tabs.map(t => (
            <button key={t} className={`filter-tab${filter===t?' active':''}`} onClick={() => setFilter(t)}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <div className="destinations-grid">
          {dests.map(d => {
            const visible = filter==='all' || d.cat===filter;
            return (
              <div key={d.id} className={`dest-card${d.large?' large':''}`}
                style={{ opacity: visible?1:0.2, transform: visible?'':'scale(0.95)', pointerEvents: visible?'':'none', transition:'all 0.4s' }}
                onMouseMove={e => onMouseMove(e, e.currentTarget)}
                onMouseLeave={e => onMouseLeave(e.currentTarget)}>
                <div className="dest-img-wrap"><img src={d.img} alt={d.name} loading="lazy" /><div className="dest-overlay" /></div>
                <div className="dest-badge">{d.badge}</div>
                <div className="dest-info">
                  <span className="dest-region">{d.region}</span>
                  <h3>{d.name}</h3>
                  <p>{d.desc}</p>
                  <div className="dest-meta">
                    <span className="dest-rating">⭐ {d.rating}</span>
                    <span className="dest-price">From {d.price}</span>
                  </div>
                  <a href="#contact" className="dest-btn">Explore</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
