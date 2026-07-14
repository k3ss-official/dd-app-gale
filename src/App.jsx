import { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Home,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Truck,
  X,
} from 'lucide-react';

const LOADS = [
  { id: 'single', name: 'Single item', note: 'A couch, fridge, or one bulky thing', price: 75, fill: 18 },
  { id: 'few', name: 'A few things', note: 'About a pickup truck load', price: 149, fill: 38 },
  { id: 'half', name: 'Half load', note: 'Garage corner or small cleanout', price: 299, fill: 66 },
  { id: 'full', name: 'Full load', note: 'Big cleanout or project debris', price: 449, fill: 96 },
];

const ITEMS = [
  ['Furniture', 'Sofas, tables, mattresses'],
  ['Appliances', 'Fridges, washers, grills'],
  ['Cleanout', 'Garage, attic, rental unit'],
  ['Yard + debris', 'Branches, drywall, project waste'],
];

const TIMES = ['8–10 AM', '10 AM–12 PM', '12–2 PM', '2–4 PM'];

function Logo({ compact = false }) {
  return (
    <button className="logo" aria-label="Donkey Dumpster home" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="logo-mark" aria-hidden="true">
        <span className="logo-ear logo-ear-left" />
        <span className="logo-ear logo-ear-right" />
        <span className="logo-face">D</span>
      </span>
      {!compact && <span className="logo-type"><b>DONKEY</b><small>DUMPSTER</small></span>}
    </button>
  );
}

function Header({ onBook }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Logo />
      <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        <a href="#how" onClick={() => setOpen(false)}>How it works</a>
        <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        <a href="#reviews" onClick={() => setOpen(false)}>Reviews</a>
      </nav>
      <div className="header-actions">
        <a className="phone-link" href="tel:+16144123799"><Phone size={17} /> <span>(614) 412-3799</span></a>
        <button className="btn btn-dark header-book" onClick={onBook}>Book a pickup <ArrowRight size={17} /></button>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function TruckMeter({ fill = 65 }) {
  return (
    <div className="truck-meter" aria-label={`Dumpster filled ${fill} percent`}>
      <div className="truck-cab"><span /><span /></div>
      <div className="truck-bin"><div style={{ transform: `scaleX(${fill / 100})` }} /></div>
      <div className="wheel wheel-a" /><div className="wheel wheel-b" />
    </div>
  );
}

function Hero({ onBook }) {
  return (
    <main className="hero">
      <section className="hero-copy">
        <div className="eyebrow"><MapPin size={15} /> Columbus, Ohio & nearby</div>
        <h1>Point to it.<br /><span>We hee-haul it.</span></h1>
        <p className="hero-lede">Junk removal without the runaround. You point, our friendly crew loads, sweeps up, and hauls it away.</p>
        <div className="hero-actions">
          <button className="btn btn-yellow btn-large" onClick={onBook}>Get my free estimate <ArrowRight size={19} /></button>
          <a className="text-link" href="tel:+16144123799"><Phone size={18} /> Call or text us</a>
        </div>
        <div className="trust-row">
          <span><ShieldCheck size={18} /> $2M insured</span>
          <span><Clock3 size={18} /> Same-day available</span>
          <span><Star size={18} fill="currentColor" /> 4.9 from Columbus</span>
        </div>
      </section>

      <section className="hero-visual" aria-label="Donkey Dumpster quick quote">
        <div className="sun-label">THE JUNK STOPS HERE</div>
        <div className="quote-card">
          <div className="quote-head">
            <span>Typical half-load</span>
            <span className="status-dot">Crew included</span>
          </div>
          <TruckMeter fill={68} />
          <div className="quote-price"><span>from</span><strong>$299</strong></div>
          <div className="quote-meta">
            <span><Check size={15} /> Loading labor</span>
            <span><Check size={15} /> Haul-away</span>
            <span><Check size={15} /> Sweep-up</span>
          </div>
          <button className="btn btn-dark btn-full" onClick={onBook}>See my price <ChevronRight size={18} /></button>
        </div>
        <div className="sticker sticker-one">NO SURPRISE<br />FEES</div>
        <div className="sticker sticker-two"><Sparkles size={18} /> EASY AS<br />HEE-HAW</div>
      </section>
    </main>
  );
}

function HowItWorks() {
  return (
    <section className="section how-section" id="how">
      <div className="section-heading">
        <div><span className="kicker">A cleaner space in three steps</span><h2>Heavy lifting? That’s our thing.</h2></div>
        <p>No vague windows. No mystery add-ons. Tell us what’s going, and we’ll handle the messy part.</p>
      </div>
      <div className="steps">
        <article><span className="step-number">01</span><Camera /><h3>Show us the junk</h3><p>Snap a few photos or describe what you need gone.</p></article>
        <article><span className="step-number">02</span><CalendarDays /><h3>Pick a good time</h3><p>Choose a two-hour arrival window that works for you.</p></article>
        <article><span className="step-number">03</span><Truck /><h3>Wave it goodbye</h3><p>We load, sweep up, and responsibly haul it away.</p></article>
      </div>
    </section>
  );
}

function Pricing({ onBook }) {
  return (
    <section className="pricing-section" id="pricing">
      <div className="pricing-copy">
        <span className="kicker">Simple volume pricing</span>
        <h2>Only pay for the space your stuff takes.</h2>
        <p>Your final price is confirmed before we lift a thing. Labor, haul-away, and disposal are included.</p>
        <button className="btn btn-yellow" onClick={onBook}>Build my estimate <ArrowRight size={18} /></button>
      </div>
      <div className="load-card">
        <div className="load-card-top"><span>Most popular</span><strong>Half load</strong><small>Garage corner, 2–3 rooms, or project pile</small></div>
        <TruckMeter fill={66} />
        <div className="load-card-bottom"><span>Typical starting price</span><strong>$299</strong></div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="section review-section" id="reviews">
      <div className="review-score"><strong>4.9</strong><div><span>★★★★★</span><p>79 Google reviews</p></div></div>
      <blockquote>“Fast, reliable trash hauling and truly friendly service. Every time we’ve worked with them, they’ve gone above and beyond.”</blockquote>
      <div className="reviewer"><span>MA</span><div><strong>Michael Anthony</strong><small>Local customer · Google review</small></div></div>
    </section>
  );
}

function BookingModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [load, setLoad] = useState('few');
  const [category, setCategory] = useState('Furniture');
  const [photos, setPhotos] = useState([]);
  const [date, setDate] = useState('Tomorrow');
  const [time, setTime] = useState('10 AM–12 PM');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const inputRef = useRef();
  const selectedLoad = useMemo(() => LOADS.find((item) => item.id === load), [load]);

  function addPhotos(event) {
    const next = [...event.target.files].slice(0, 3 - photos.length).map((file) => ({ file, url: URL.createObjectURL(file) }));
    setPhotos((current) => [...current, ...next].slice(0, 3));
  }

  function removePhoto(index) {
    setPhotos((current) => current.filter((_, i) => i !== index));
  }

  const canContinue = step !== 3 || address.trim().length > 4;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <div className="booking-topbar">
          <Logo />
          <div className="progress-wrap"><span>Step {Math.min(step, 3)} of 3</span><div className="progress"><i style={{ transform: `scaleX(${Math.min(step, 3) / 3})` }} /></div></div>
          <button className="icon-button" onClick={onClose} aria-label="Close booking"><X /></button>
        </div>

        {step === 1 && (
          <div className="booking-layout">
            <div className="booking-main">
              <span className="kicker">Let’s size it up</span>
              <h2 id="booking-title">How much are we hauling?</h2>
              <p className="booking-intro">A quick guess is perfect. We’ll confirm everything before work begins.</p>
              <div className="load-options">
                {LOADS.map((item) => (
                  <button key={item.id} className={load === item.id ? 'load-option selected' : 'load-option'} onClick={() => setLoad(item.id)}>
                    <span className="radio">{load === item.id && <i />}</span>
                    <span className="load-option-copy"><strong>{item.name}</strong><small>{item.note}</small></span>
                    <span className="load-price">from <b>${item.price}</b></span>
                  </button>
                ))}
              </div>
            </div>
            <aside className="estimate-panel"><span>Your rough estimate</span><TruckMeter fill={selectedLoad.fill} /><div className="estimate-price"><small>Starting around</small><strong>${selectedLoad.price}</strong></div><p><ShieldCheck size={16} /> Final price confirmed on-site</p></aside>
          </div>
        )}

        {step === 2 && (
          <div className="booking-main centered-step">
            <span className="kicker">A little more detail</span>
            <h2 id="booking-title">What’s getting the boot?</h2>
            <p className="booking-intro">Choose the closest match, then add photos if you have them.</p>
            <div className="category-grid">
              {ITEMS.map(([name, note]) => <button key={name} className={category === name ? 'category selected' : 'category'} onClick={() => setCategory(name)}><span>{name === 'Furniture' ? <Home /> : name === 'Appliances' ? <Sparkles /> : name === 'Cleanout' ? <Trash2 /> : <Truck />}</span><strong>{name}</strong><small>{note}</small><i>{category === name && <Check />}</i></button>)}
            </div>
            <div className="photo-row">
              {photos.map((photo, index) => <div className="photo-preview" key={photo.url}><img src={photo.url} alt={`Uploaded junk ${index + 1}`} /><button onClick={() => removePhoto(index)} aria-label="Remove photo"><X size={14} /></button></div>)}
              {photos.length < 3 && <button className="photo-button" onClick={() => inputRef.current.click()}><Camera /><span><strong>Add photos</strong><small>Up to 3 · optional</small></span></button>}
              <input ref={inputRef} type="file" accept="image/*" multiple hidden onChange={addPhotos} />
            </div>
            <label className="field-label">Anything we should know?<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Stairs, parking notes, especially heavy items…" /></label>
          </div>
        )}

        {step === 3 && (
          <div className="booking-layout schedule-layout">
            <div className="booking-main">
              <span className="kicker">Nearly there</span>
              <h2 id="booking-title">When should we swing by?</h2>
              <p className="booking-intro">Choose a preferred window. We’ll text to confirm availability.</p>
              <label className="field-label">Service address<div className="input-with-icon"><MapPin /><input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St, Columbus, OH" autoFocus /></div></label>
              <div className="date-options">{['Today', 'Tomorrow', 'Wed, Jul 16'].map((item) => <button key={item} className={date === item ? 'selected' : ''} onClick={() => setDate(item)}><CalendarDays /><span>{item}</span>{item === 'Tomorrow' && <small>Best availability</small>}</button>)}</div>
              <div className="time-grid">{TIMES.map((item) => <button key={item} className={time === item ? 'selected' : ''} onClick={() => setTime(item)}>{item}{time === item && <CheckCircle2 />}</button>)}</div>
            </div>
            <aside className="summary-panel"><span>Pickup summary</span><div><small>Load</small><strong>{selectedLoad.name}</strong></div><div><small>Stuff</small><strong>{category}</strong></div><div><small>When</small><strong>{date}, {time}</strong></div><div className="summary-total"><small>Estimate starts at</small><strong>${selectedLoad.price}</strong></div><p>No charge today. We confirm the final price before loading.</p></aside>
          </div>
        )}

        {step === 4 && (
          <div className="success-step">
            <div className="success-mark"><Check /></div>
            <span className="kicker">Request received</span>
            <h2 id="booking-title">We’ll be in touch faster than a donkey on dinner duty.</h2>
            <p>Your pickup request for <strong>{date}, {time}</strong> is ready. This prototype hasn’t sent it anywhere—production will connect this step to SMS and dispatch.</p>
            <div className="success-details"><span><MapPin />{address}</span><span><Truck />{selectedLoad.name} · from ${selectedLoad.price}</span></div>
            <button className="btn btn-dark" onClick={onClose}>Back to home</button>
          </div>
        )}

        {step < 4 && <div className="booking-footer"><button className="back-button" onClick={() => step === 1 ? onClose() : setStep(step - 1)}><ArrowLeft /> {step === 1 ? 'Cancel' : 'Back'}</button><button className="btn btn-yellow" disabled={!canContinue} onClick={() => setStep(step + 1)}>{step === 3 ? 'Request my pickup' : 'Continue'} <ArrowRight /></button></div>}
      </section>
    </div>
  );
}

function App() {
  const [booking, setBooking] = useState(false);
  return (
    <div className="app-shell">
      <Header onBook={() => setBooking(true)} />
      <Hero onBook={() => setBooking(true)} />
      <HowItWorks />
      <Pricing onBook={() => setBooking(true)} />
      <Reviews />
      <footer><Logo /><p>Columbus junk removal with a little more kick.</p><div><a href="tel:+16144123799"><Phone /> (614) 412-3799</a><button onClick={() => setBooking(true)}><MessageCircle /> Get an estimate</button></div></footer>
      {booking && <BookingModal onClose={() => setBooking(false)} />}
    </div>
  );
}

export default App;
