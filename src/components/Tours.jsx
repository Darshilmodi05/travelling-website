import './Tours.css';

const tours = [
  { id:1, icon:'🏖', title:'Beach Bliss', desc:'Sun-kissed shores, crystal waters, and total relaxation in paradise islands.', includes:['7 Nights Hotel','Return Flights','Daily Breakfast','Island Hopping'], price:'₹1,08,000' },
  { id:2, icon:'🏔', title:'Mountain Quest', desc:'Trek through dramatic peaks, glaciers, and breathtaking alpine landscapes.', includes:['10 Nights Lodges','Return Flights','Full Board Meals','Expert Guide'], price:'₹1,58,000', featured:true },
  { id:3, icon:'🏛', title:'Cultural Odyssey', desc:'Immerse yourself in ancient civilizations, temples, and living traditions.', includes:['8 Nights Hotel','Return Flights','City Tours','Museum Access'], price:'₹91,999' },
];

export default function Tours() {
  return (
    <section className="tours section" id="tours">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Tour Packages</div>
          <h2 className="section-title">Curated <em>Experiences</em></h2>
          <p className="section-sub">All-inclusive packages crafted to perfection</p>
        </div>
        <div className="tours-grid">
          {tours.map(t => (
            <div key={t.id} className={`tour-card${t.featured?' featured':''}`}>
              {t.featured && <div className="tour-tag">Most Popular</div>}
              <div className="tour-icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <ul className="tour-includes">{t.includes.map(i=><li key={i}>✓ {i}</li>)}</ul>
              <div className="tour-footer">
                <span className="tour-price">{t.price}<small>/person</small></span>
                <a href="#contact" className="btn-sm">Book</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
