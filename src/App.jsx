import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import Destinations from './components/Destinations';
import WhyUs from './components/WhyUs';
import Tours from './components/Tours';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'
  const [modal, setModal] = useState(null); // 'settings' | 'profile' | null
  const [user, setUser] = useState({
    name: 'Kabir Ghamawala',
    tier: 'Gold Member',
    since: '2024',
    destinations: 12,
    upcoming: 4,
    points: 2800,
    avatar: '👤'
  });

  const accounts = [
    {
      name: 'Kabir Ghamawala',
      tier: 'Gold Member',
      since: '2024',
      destinations: 12,
      upcoming: 4,
      points: 2800,
      avatar: '👤'
    },
    {
      name: 'Guest Traveler',
      tier: 'Silver Member',
      since: '2025',
      destinations: 2,
      upcoming: 1,
      points: 450,
      avatar: '✈️'
    }
  ];

  const switchAccount = (acc) => {
    setUser(acc);
  };

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  // Sync theme to body class
  useEffect(() => {
    document.body.className = theme === 'light' ? 'theme-light' : '';
  }, [theme]);

  // Custom cursor
  useEffect(() => {
    const c = document.getElementById('cursor');
    const cf = document.getElementById('cursorFollower');
    let mx=0,my=0,fx=0,fy=0;
    const onMove = e => { mx=e.clientX; my=e.clientY; if(c){c.style.left=mx+'px';c.style.top=my+'px';} };
    document.addEventListener('mousemove', onMove);
    const anim = () => { fx+=(mx-fx)*.12; fy+=(my-fy)*.12; if(cf){cf.style.left=fx+'px';cf.style.top=fy+'px';} requestAnimationFrame(anim); };
    anim();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      {/* Cursor */}
      <div className="cursor" id="cursor" />
      <div className="cursor-follower" id="cursorFollower" />

      {/* Loader */}
      <div className={`loader${loading?'':' hidden'}`}>
        <div className="loader-inner">
          <div className="loader-plane">✈</div>
          <div className="loader-text">YATRIKA</div>
          <div className="loader-bar"><div className="loader-fill" /></div>
        </div>
      </div>

      <Sidebar onSettings={() => setModal('settings')} onProfile={() => setModal('profile')} />
      <Navbar />
      <Hero onPlayVideo={() => setVideoOpen(true)} />
      <Destinations />
      <WhyUs />
      <Tours />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ScrollToTop />

      {/* Settings Modal */}
      {modal === 'settings' && (
        <div className="modal open">
          <div className="modal-backdrop" onClick={() => setModal(null)} />
          <div className="modal-content settings-modal">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <h2 className="modal-title">Settings</h2>
            <div className="settings-item">
              <div className="settings-info">
                <h3>Appearance</h3>
                <p>Switch between light and dark mode</p>
              </div>
              <button 
                className={`theme-toggle-btn ${theme}`} 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                <span className="toggle-thumb">
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
              </button>
            </div>
            <div className="settings-item">
              <div className="settings-info">
                <h3>Currency</h3>
                <p>Display prices in your local currency</p>
              </div>
              <select className="settings-select">
                <option>INR (₹)</option>
                <option>USD ($)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {modal === 'profile' && (
        <div className="modal open">
          <div className="modal-backdrop" onClick={() => setModal(null)} />
          <div className="modal-content profile-modal">
            <button className="modal-close" onClick={() => setModal(null)}>✕</button>
            <div className="profile-header">
              <div className="profile-avatar">{user.avatar}</div>
              <div className="profile-info-main">
                <div className="profile-name-row">
                  <h2 className="modal-title" style={{marginBottom:0}}>{user.name}</h2>
                  <div className="account-dropdown-wrapper">
                    <button className="dropdown-toggle" onClick={() => document.getElementById('acc-dropdown').classList.toggle('show')}>
                      ▾
                    </button>
                    <div id="acc-dropdown" className="account-dropdown">
                      <p className="dropdown-label">Switch Account</p>
                      {accounts.map(acc => (
                        <button 
                          key={acc.name} 
                          className={`dropdown-item ${user.name === acc.name ? 'active' : ''}`}
                          onClick={() => { switchAccount(acc); document.getElementById('acc-dropdown').classList.remove('show'); }}
                        >
                          <span>{acc.avatar}</span> {acc.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-stats">
              <div className="stat-card"><span>🌍</span><strong>{user.destinations}</strong><small>Destinations</small></div>
              <div className="stat-card"><span>✈️</span><strong>{user.upcoming}</strong><small>Upcoming</small></div>
            </div>
            
            <div className="profile-actions">
              <button className="btn-primary" style={{flex:1}}>Manage Account</button>
              <button className="btn-danger" onClick={() => { setIsLoggedIn(false); setModal(null); }}>Logout</button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoOpen && (
        <div className="modal open">
          <div className="modal-backdrop" onClick={() => setVideoOpen(false)} />
          <div className="modal-content">
            <button className="modal-close" onClick={() => setVideoOpen(false)}>✕</button>
            <div className="video-placeholder">
              <div className="video-play-big">▶</div>
              <p>Your epic travel story video</p>
            </div>
          </div>
        </div>
      )}

      {/* Login Screen overlay */}
      {!isLoggedIn && (
        <div className="login-screen">
          <div className="login-content">
            <div className="nav-logo" style={{justifyContent:'center',marginBottom:30,display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontSize:22}}>✈</span>
              <span className="logo-text">YATRIKA</span>
            </div>
            <h2 style={{fontSize:32,marginBottom:10}}>Welcome Back</h2>
            <p style={{color:'var(--text2)',marginBottom:30}}>Please sign in to manage your journeys</p>
            <form className="login-form" style={{display:'flex',flexDirection:'column',gap:15}} 
              onSubmit={(e) => { 
                e.preventDefault(); 
                const name = e.target.elements.loginName.value;
                setUser({...user, name: name || 'Traveler'});
                setIsLoggedIn(true); 
              }}>
              <input name="loginName" type="text" placeholder="Your Full Name" required defaultValue={user.name} style={{background:'var(--bg3)',border:'1px solid var(--border)',padding:'15px',borderRadius:'12px',color:'#fff',outline:'none'}} />
              <input type="email" placeholder="Email" required defaultValue="traveler@yatrika.com" style={{background:'var(--bg3)',border:'1px solid var(--border)',padding:'15px',borderRadius:'12px',color:'#fff',outline:'none'}} />
              <button type="submit" className="btn-primary" style={{width:'100%',padding:'15px',marginTop:10}}>Sign In</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
