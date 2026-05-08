import { useState, useRef } from 'react';
import { sendBookingEmail } from '../utils/sendBookingEmail';
import './Newsletter.css';

const DESTINATIONS = ['Maldives','Santorini','Bali','Kyoto, Japan','Patagonia'];
const TOURS = ['Beach Bliss','Mountain Quest','Cultural Odyssey'];

export default function Newsletter() {
  const [status, setStatus] = useState('idle'); // idle | loading | done | error
  const [errorMsg, setErrorMsg] = useState('');
  const formRef = useRef(null);

  const onSubmit = async e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = {
      name:        fd.get('name'),
      email:       fd.get('email'),
      destination: fd.get('destination') || '',
      tour:        fd.get('tour') || '',
      travelDate:  fd.get('travelDate') || '',
      travelers:   fd.get('travelers') || '',
      travelStyle: fd.get('travelStyle') || '',
    };

    setStatus('loading');
    setErrorMsg('');

    try {
      await sendBookingEmail(data);
      setStatus('done');
      formRef.current?.reset();
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section className="newsletter section" id="contact">
      <div className="container">
        <div className="newsletter-inner">
          <div className="newsletter-content">
            <div className="section-tag">Book Your Adventure</div>
            <h2>Ready to <em>Explore?</em></h2>
            <p>Fill in your details and we'll get back to you within 24 hours with a personalised itinerary and exclusive pricing.</p>
            <ul className="booking-perks">
              <li>✈️ Free itinerary consultation</li>
              <li>🔒 Best price guarantee</li>
              <li>⚡ Reply within 24 hours</li>
              <li>💳 Flexible payment options</li>
            </ul>
          </div>

          {status === 'done' ? (
            <div className="booking-success">
              <div className="success-icon">🎉</div>
              <h3>Booking Received!</h3>
              <p>Thank you! We've received your booking request and you'll hear from us within 24 hours.</p>
              <button className="btn-newsletter" style={{marginTop:'16px'}} onClick={() => setStatus('idle')}>
                Book Another Trip
              </button>
            </div>
          ) : (
            <form className="newsletter-form" id="booking-form" onSubmit={onSubmit} ref={formRef}>
              {/* Row 1: Name + Email */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input name="name" type="text" placeholder="e.g. Kabir Ghamawala" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input name="email" type="email" placeholder="your@email.com" required />
                </div>
              </div>

              {/* Row 2: Destination + Tour */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <select name="destination" defaultValue="">
                    <option value="">Select a destination…</option>
                    {DESTINATIONS.map(d => <option key={d}>{d}</option>)}
                    <option value="Other">Other / Flexible</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Tour Package</label>
                  <select name="tour" defaultValue="">
                    <option value="">Select a package…</option>
                    {TOURS.map(t => <option key={t}>{t}</option>)}
                    <option value="Custom">Custom Package</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Date + Travelers */}
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Travel Date</label>
                  <input name="travelDate" type="date" min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Travelers</label>
                  <select name="travelers" defaultValue="">
                    <option value="">Select…</option>
                    {[1,2,3,4,5,'6+'].map(n => <option key={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              {/* Travel Style */}
              <div className="form-group">
                <label className="form-label">Preferred Travel Style</label>
                <select name="travelStyle" defaultValue="">
                  <option value="">Select a travel style…</option>
                  <option>Luxury &amp; Relaxation</option>
                  <option>Adventure &amp; Trekking</option>
                  <option>Cultural Exploration</option>
                  <option>Beach &amp; Island</option>
                  <option>Family Holiday</option>
                  <option>Honeymoon / Romantic</option>
                </select>
              </div>

              {status === 'error' && (
                <div className="form-error">⚠️ {errorMsg}</div>
              )}

              <button
                type="submit"
                id="booking-submit-btn"
                className="btn-newsletter"
                disabled={status === 'loading'}
              >
                {status === 'loading'
                  ? <><span className="btn-spinner" />Sending…</>
                  : <><span>Request Booking</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg></>
                }
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
