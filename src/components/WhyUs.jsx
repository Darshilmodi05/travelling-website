import { useEffect } from 'react';
import baliImg from '../assets/bali.png';
import japanImg from '../assets/japan.png';
import santoriniImg from '../assets/santorini.png';
import './WhyUs.css';

const features = [
  { icon:'🌍', title:'Curated Destinations', desc:'Every location hand-picked and quality-verified by our travel experts' },
  { icon:'🛡', title:'100% Safety Guaranteed', desc:'24/7 support and full travel insurance coverage for your peace of mind' },
  { icon:'💎', title:'Luxury at Every Price', desc:'Premium experiences thoughtfully priced from budget to ultra-luxury' },
  { icon:'🎯', title:'Personalized Itineraries', desc:'Custom-built plans crafted around your passions, pace, and preferences' },
];

export default function WhyUs() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'),i*120); obs.unobserve(e.target); }});
    }, {threshold:0.1});
    document.querySelectorAll('.feature-item').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="why-us section" id="experiences">
      <div className="container">
        <div className="why-us-inner">
          <div className="why-us-left">
            <div className="section-tag">Why Yatrika</div>
            <h2 className="section-title">Travel Like <em>Never Before</em></h2>
            <p className="section-sub" style={{textAlign:'left'}}>We craft journeys that transcend the ordinary — blending luxury, authenticity, and adventure into one unforgettable experience.</p>
            <div className="features-list">
              {features.map(f => (
                <div key={f.title} className="feature-item reveal">
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-text"><h4>{f.title}</h4><p>{f.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div className="why-us-right">
            <div className="photo-collage">
              <div className="collage-img collage-big"><img src={baliImg} alt="Bali" /></div>
              <div className="collage-img collage-sm1"><img src={japanImg} alt="Japan" /></div>
              <div className="collage-img collage-sm2"><img src={santoriniImg} alt="Santorini" /></div>
              <div className="collage-badge"><span className="badge-number">48K+</span><span className="badge-label">Happy Travelers</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
