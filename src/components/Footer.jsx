import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo" style={{marginBottom:16,display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:22}}>✈</span>
              <span className="logo-text">YATRIKA</span>
            </div>
            <p>Turning travel dreams into extraordinary memories since 2009. Every journey is a story waiting to be written.</p>
            <div className="social-links">
              {['📸','🐦','📘','▶️'].map((s,i)=><a key={i} href="#" className="social-btn">{s}</a>)}
            </div>
          </div>
          {[
            { title:'Destinations', links:['Maldives','Santorini','Bali','Kyoto','Patagonia'] },
            { title:'Experiences', links:['Beach Escapes','Mountain Treks','Cultural Tours','Luxury Cruises','Safari Adventures'] },
            { title:'Company', links:['About Us','Careers','Press','Privacy Policy','Terms of Service'] },
          ].map(col=>(
            <div key={col.title} className="footer-col">
              <h4>{col.title}</h4>
              <ul>{col.links.map(l=><li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <p>© 2025 Yatrika Travel Co. All rights reserved. Crafted with ❤️ for Indian adventurers.</p>
          <div className="footer-certs"><span>🔒 SSL Secure</span><span>✅ IATA Certified</span><span>⭐ TripAdvisor Award</span></div>
        </div>
      </div>
    </footer>
  );
}
