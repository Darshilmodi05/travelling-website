import { useState } from 'react';
import './Testimonials.css';

const reviews = [
  { id:0, text:'"Yatrika completely transformed how I experience travel. The Maldives trip was beyond anything I could have imagined — every detail was flawless."', name:'Sarah L.', loc:'New York, USA · Maldives Trip', initials:'SL', bg:'linear-gradient(135deg,#ff6b35,#f7c59f)' },
  { id:1, text:'"The Patagonia expedition was the adventure of a lifetime. The guides were world-class, the scenery was jaw-dropping. Already planning my next Yatrika trip!"', name:'Marcus K.', loc:'London, UK · Patagonia Trek', initials:'MK', bg:'linear-gradient(135deg,#a8edea,#fed6e3)' },
  { id:2, text:'"Kyoto in cherry blossom season, perfectly timed by Yatrika. The itinerary balanced culture, nature, and downtime beautifully. Absolutely magical."', name:'Anika Y.', loc:'Sydney, AU · Japan Odyssey', initials:'AY', bg:'linear-gradient(135deg,#c2e9fb,#a1c4fd)' },
  { id:3, text:'"Santorini sunset from our private terrace — absolutely unforgettable. Yatrika showed me what a real vacation feels like."', name:'James R.', loc:'Dubai, UAE · Santorini Package', initials:'JR', bg:'linear-gradient(135deg,#fccb90,#d57eeb)' },
];

export default function Testimonials() {
  const [cur, setCur] = useState(0);
  const go = n => setCur((n + reviews.length) % reviews.length);
  const r = reviews[cur];

  return (
    <section className="testimonials section" id="testimonials">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Reviews</div>
          <h2 className="section-title">What Travelers <em>Say</em></h2>
        </div>
        <div className="testi-card" key={cur}>
          <div className="testi-stars">★★★★★</div>
          <p className="testi-text">{r.text}</p>
          <div className="testi-author">
            <div className="testi-avatar" style={{background:r.bg}}>{r.initials}</div>
            <div><strong>{r.name}</strong><span>{r.loc}</span></div>
          </div>
        </div>
        <div className="testi-nav">
          <button className="testi-prev" onClick={() => go(cur-1)}>←</button>
          <div className="testi-dots">
            {reviews.map((_,i) => <span key={i} className={`tdot${i===cur?' active':''}`} onClick={() => go(i)} />)}
          </div>
          <button className="testi-next" onClick={() => go(cur+1)}>→</button>
        </div>
      </div>
    </section>
  );
}
