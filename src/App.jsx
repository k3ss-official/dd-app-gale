import { useMemo, useState } from 'react';
import {
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  Flag,
  Gauge,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageCircle,
  MoreHorizontal,
  Navigation,
  Phone,
  Plus,
  Route,
  Search,
  Send,
  Settings,
  Sparkles,
  Trash2,
  Truck,
  Users,
  X,
} from 'lucide-react';

const asset = (name) => `${import.meta.env.BASE_URL}brand/${name}`;

const INITIAL_JOBS = [
  {
    id: 'DD-2418',
    time: '8:30',
    meridiem: 'AM',
    window: '8:30–10:00 AM',
    customer: 'Maya Thompson',
    area: 'Powell',
    address: 'Demo address · Powell, OH',
    type: 'Garage cleanout',
    load: '¾ trailer',
    price: 460,
    status: 'Complete',
    crew: ['RG', 'MT'],
    truck: 'Truck 02',
    note: 'Back into the drive. Keep the blue storage tubs.',
    image: 'job-garage.png',
    travel: '18 min',
  },
  {
    id: 'DD-2419',
    time: '10:45',
    meridiem: 'AM',
    window: '10:45 AM–12:15 PM',
    customer: 'Elena Brooks',
    area: 'Clintonville',
    address: 'Demo address · Clintonville, OH',
    type: 'Sofa + mattress',
    load: '¼ trailer',
    price: 285,
    status: 'En route',
    crew: ['RG', 'MT'],
    truck: 'Truck 02',
    note: 'Text on arrival. Sofa is downstairs; narrow side door.',
    image: 'job-furniture.png',
    travel: '12 min',
  },
  {
    id: 'DD-2420',
    time: '1:30',
    meridiem: 'PM',
    window: '1:30–2:45 PM',
    customer: 'Sam Carter',
    area: 'Bexley',
    address: 'Demo address · Bexley, OH',
    type: 'Appliance removal',
    load: '¼ trailer',
    price: 340,
    status: 'Scheduled',
    crew: ['JP', 'TK'],
    truck: 'Truck 04',
    note: 'Fridge is disconnected. Add the garage freezer if space allows.',
    image: 'job-appliance.png',
    travel: '21 min',
  },
  {
    id: 'DD-2421',
    time: '3:45',
    meridiem: 'PM',
    window: '3:45–5:45 PM',
    customer: 'Jordan Lee',
    area: 'Hilliard',
    address: 'Demo address · Hilliard, OH',
    type: 'Renovation debris',
    load: 'Full trailer',
    price: 625,
    status: 'At risk',
    crew: ['JP', 'TK'],
    truck: 'Truck 04',
    note: 'Heavy tile and drywall. Confirm load weight before starting.',
    image: 'hero-truck.png',
    travel: '29 min',
  },
];

const STATUS_ORDER = ['Scheduled', 'En route', 'On site', 'Loading', 'Complete'];
const COMPLETION_STEPS = [
  'Before photos added',
  'Price approved by customer',
  'All agreed items loaded',
  'Area swept and after photos added',
  'Payment collected',
];

const NAV = [
  ['overview', LayoutDashboard, 'Overview'],
  ['schedule', CalendarDays, 'Schedule'],
  ['jobs', BriefcaseBusiness, 'All jobs'],
  ['crew', Users, 'Crew'],
];

function Brand({ compact = false }) {
  return (
    <div className={`brand ${compact ? 'brand-compact' : ''}`}>
      {compact ? (
        <img src={asset('logo-circle.png')} alt="Donkey Dumpster" />
      ) : (
        <img src={asset('donkey-dumpster-logo.avif')} alt="Donkey Dumpster" />
      )}
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={`status status-${status.toLowerCase().replaceAll(' ', '-')}`}><i />{status}</span>;
}

function Sidebar({ view, setView, open, setOpen }) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand"><Brand /><button aria-label="Close navigation" onClick={() => setOpen(false)}><X /></button></div>
        <div className="workspace-label"><span>Field operations</span><strong>Columbus, Ohio</strong></div>
        <nav aria-label="Operations navigation">
          {NAV.map(([id, Icon, label]) => (
            <button key={id} className={view === id ? 'active' : ''} onClick={() => { setView(id); setOpen(false); }}>
              <Icon /><span>{label}</span>{id === 'schedule' && <b>4</b>}
            </button>
          ))}
        </nav>
        <div className="sidebar-rule" />
        <button className="sidebar-utility"><MessageCircle /><span>Customer requests</span><b>7</b></button>
        <button className="sidebar-utility"><Settings /><span>Settings</span></button>
        <div className="sidebar-footer">
          <div className="avatar avatar-owner">RG</div>
          <div><strong>Ryan Gale</strong><span>Owner · Dispatch</span></div>
          <ChevronRight />
        </div>
      </aside>
    </>
  );
}

function Topbar({ title, onMenu, onNewJob }) {
  return (
    <header className="topbar">
      <button className="mobile-menu" aria-label="Open navigation" onClick={onMenu}><Menu /></button>
      <div className="page-title"><span>Tuesday, July 21</span><h1>{title}</h1></div>
      <div className="topbar-actions">
        <label className="searchbox"><Search /><input aria-label="Search jobs" placeholder="Search jobs" /></label>
        <button className="icon-action" aria-label="Notifications"><Bell /><i /></button>
        <button className="button button-primary" onClick={onNewJob}><Plus />New job</button>
      </div>
    </header>
  );
}

function Metric({ label, value, note, icon: Icon, tone = '' }) {
  return (
    <article className={`metric ${tone}`}>
      <span className="metric-icon"><Icon /></span>
      <div><p>{label}</p><strong>{value}</strong><small>{note}</small></div>
    </article>
  );
}

function JobRow({ job, selected, onSelect }) {
  return (
    <button className={`job-row ${selected ? 'selected' : ''}`} onClick={() => onSelect(job.id)}>
      <span className="job-time"><strong>{job.time}</strong><small>{job.meridiem}</small></span>
      <span className="route-marker" aria-hidden="true"><i /></span>
      <span className="job-summary"><strong>{job.type}</strong><small><MapPin />{job.area} · {job.customer}</small></span>
      <span className="job-load"><small>Est. load</small><strong>{job.load}</strong></span>
      <span className="job-crew">{job.crew.map((person) => <i key={person}>{person}</i>)}</span>
      <StatusPill status={job.status} />
      <ChevronRight className="row-chevron" />
    </button>
  );
}

function ScheduleBoard({ jobs, selectedId, onSelect }) {
  const [day, setDay] = useState('Today');
  return (
    <section className="panel schedule-panel">
      <div className="panel-head">
        <div><span className="section-kicker">Route board</span><h2>Tuesday’s run</h2></div>
        <div className="date-switcher" aria-label="Choose schedule day">
          {['Mon 20', 'Today', 'Wed 22'].map((item) => <button key={item} className={day === item ? 'active' : ''} onClick={() => setDay(item)}>{item}</button>)}
        </div>
      </div>
      {day === 'Today' ? (
        <div className="job-list">
          {jobs.map((job) => <JobRow key={job.id} job={job} selected={selectedId === job.id} onSelect={onSelect} />)}
        </div>
      ) : (
        <div className="empty-day"><CalendarDays /><strong>{day} is clear in this demo</strong><span>Use Today to explore the working route.</span></div>
      )}
      <footer className="route-summary">
        <span><Route />2 crews · 4 stops</span>
        <span><Gauge />73% route capacity</span>
        <button>Optimize route <ArrowRight /></button>
      </footer>
    </section>
  );
}

function JobDetail({ job, onAdvance, onComplete }) {
  if (!job) return null;
  const statusIndex = STATUS_ORDER.indexOf(job.status);
  const nextStatus = STATUS_ORDER[Math.min(statusIndex + 1, STATUS_ORDER.length - 1)];
  const action = job.status === 'Complete' ? 'View job proof' : job.status === 'Loading' ? 'Finish job' : `Mark ${nextStatus.toLowerCase()}`;
  return (
    <aside className="panel job-detail" aria-label={`Selected job ${job.id}`}>
      <div className="job-photo">
        <img src={asset(job.image)} alt="Donkey Dumpster branded job reference" />
        <div><span>{job.id}</span><StatusPill status={job.status} /></div>
      </div>
      <div className="job-detail-body">
        <div className="job-title-row"><div><span>{job.window}</span><h2>{job.type}</h2></div><button aria-label="More job actions"><MoreHorizontal /></button></div>
        <div className="customer-block">
          <div className="avatar">{job.customer.split(' ').map((part) => part[0]).join('')}</div>
          <div><strong>{job.customer}</strong><span>{job.address}</span></div>
          <a href="tel:+16145550100" aria-label={`Call ${job.customer}`}><Phone /></a>
          <button aria-label={`Message ${job.customer}`}><MessageCircle /></button>
        </div>
        <div className="job-note"><Flag /><div><strong>Crew note</strong><p>{job.note}</p></div></div>
        <dl className="job-facts">
          <div><dt>Truck</dt><dd><Truck />{job.truck}</dd></div>
          <div><dt>Estimated</dt><dd><Trash2 />{job.load}</dd></div>
          <div><dt>Drive</dt><dd><Navigation />{job.travel}</dd></div>
          <div><dt>Quoted</dt><dd><CircleDollarSign />${job.price}</dd></div>
        </dl>
        <div className="progress-label"><span>Job progress</span><strong>{Math.max(statusIndex, 0) + 1} / 5</strong></div>
        <div className="job-progress" aria-label={`${job.status}, step ${Math.max(statusIndex, 0) + 1} of 5`}>
          {STATUS_ORDER.map((status, index) => <i key={status} className={index <= statusIndex ? 'done' : ''} />)}
        </div>
        <button className="button button-primary button-full" onClick={() => job.status === 'Loading' || job.status === 'Complete' ? onComplete(job) : onAdvance(job.id)}>
          {job.status === 'Complete' ? <ClipboardCheck /> : <CheckCircle2 />}{action}<ArrowRight />
        </button>
        <button className="route-link"><Navigation />Open route to {job.area}<ExternalLink /></button>
      </div>
    </aside>
  );
}

function Overview({ jobs, selectedId, setSelectedId, onAdvance, onComplete }) {
  const selected = jobs.find((job) => job.id === selectedId) || jobs[0];
  return (
    <>
      <section className="dispatch-hero">
        <div className="dispatch-copy"><span><Sparkles />Tuesday dispatch</span><h2>Good morning, Ryan.</h2><p>Two crews are rolling. One late job needs a decision before 2 PM.</p></div>
        <div className="dispatch-alert"><span>Needs attention</span><strong>Hilliard may overfill Truck 04</strong><button onClick={() => setSelectedId('DD-2421')}>Review job <ArrowRight /></button></div>
      </section>
      <section className="metrics-grid" aria-label="Today’s performance">
        <Metric icon={CalendarDays} label="Jobs today" value="4" note="1 complete · 2 crews" />
        <Metric icon={CircleDollarSign} label="Booked value" value="$1,710" note="+$385 from Monday" />
        <Metric icon={Gauge} label="Route capacity" value="73%" note="Room for one small job" />
        <Metric icon={Clock3} label="At risk" value="1" note="Weight check needed" tone="metric-alert" />
      </section>
      <div className="operations-grid">
        <ScheduleBoard jobs={jobs} selectedId={selectedId} onSelect={setSelectedId} />
        <JobDetail job={selected} onAdvance={onAdvance} onComplete={onComplete} />
      </div>
    </>
  );
}

function ScheduleView({ jobs, selectedId, setSelectedId, onAdvance, onComplete }) {
  return (
    <div className="operations-grid single-view">
      <ScheduleBoard jobs={jobs} selectedId={selectedId} onSelect={setSelectedId} />
      <JobDetail job={jobs.find((job) => job.id === selectedId) || jobs[0]} onAdvance={onAdvance} onComplete={onComplete} />
    </div>
  );
}

function JobsView({ jobs, setSelectedId, setView }) {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? jobs : jobs.filter((job) => job.status === filter);
  return (
    <section className="panel jobs-table-panel">
      <div className="panel-head jobs-head"><div><span className="section-kicker">Demo pipeline</span><h2>All jobs</h2></div><div className="filter-row">{['All', 'Scheduled', 'En route', 'Complete'].map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
      <div className="jobs-table">
        <div className="jobs-table-header"><span>Job</span><span>Customer</span><span>Area</span><span>Value</span><span>Status</span><span /></div>
        {visible.map((job) => (
          <button key={job.id} onClick={() => { setSelectedId(job.id); setView('schedule'); }}>
            <span><strong>{job.id}</strong><small>{job.type}</small></span><span>{job.customer}</span><span>{job.area}</span><span>${job.price}</span><StatusPill status={job.status} /><ChevronRight />
          </button>
        ))}
      </div>
    </section>
  );
}

function CrewView() {
  const crews = [
    { name: 'Ryan + Marcus', initials: ['RG', 'MT'], truck: 'Truck 02', status: 'Driving to Clintonville', jobs: '1 of 2 complete', load: 38 },
    { name: 'Jalen + Theo', initials: ['JP', 'TK'], truck: 'Truck 04', status: 'Available until 1:30 PM', jobs: '0 of 2 complete', load: 0 },
  ];
  return (
    <section className="crew-layout">
      <div className="crew-intro"><span className="section-kicker">Live crew board</span><h2>Know who’s moving—and what they need next.</h2><p>No group-chat archaeology. Each crew sees its next stop, notes, route, and finish checklist in one place.</p></div>
      <div className="crew-grid">
        {crews.map((crew, index) => <article className="panel crew-card" key={crew.name}><div className="crew-card-top"><div className="crew-avatars">{crew.initials.map((item) => <i key={item}>{item}</i>)}</div><StatusPill status={index ? 'Scheduled' : 'En route'} /></div><h3>{crew.name}</h3><span><Truck />{crew.truck}</span><span><Navigation />{crew.status}</span><div className="capacity"><div><span>Trailer load</span><strong>{crew.load}%</strong></div><i><b style={{ width: `${crew.load}%` }} /></i></div><footer><span>{crew.jobs}</span><button>Message crew <MessageCircle /></button></footer></article>)}
      </div>
    </section>
  );
}

function CompletionSheet({ job, onClose, onFinish }) {
  const [checked, setChecked] = useState(() => job?.status === 'Complete' ? COMPLETION_STEPS : []);
  if (!job) return null;
  const complete = checked.length === COMPLETION_STEPS.length;
  function toggle(item) { setChecked((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]); }
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="completion-sheet" role="dialog" aria-modal="true" aria-labelledby="completion-title">
        <header><div><span>{job.id} · {job.customer}</span><h2 id="completion-title">Close the loop.</h2><p>Leave dispatch, the customer, and tomorrow-you with clean proof.</p></div><button className="round-button" aria-label="Close completion" onClick={onClose}><X /></button></header>
        <div className="completion-layout">
          <div>
            <span className="section-kicker">Completion checklist</span>
            <div className="checklist">
              {COMPLETION_STEPS.map((item, index) => <button key={item} className={checked.includes(item) ? 'checked' : ''} onClick={() => toggle(item)}><i>{checked.includes(item) ? <Check /> : index + 1}</i><span>{item}</span>{(index === 0 || index === 3) && <Camera />}</button>)}
            </div>
          </div>
          <aside className="proof-card">
            <img src={asset(job.image)} alt="Job reference" />
            <div><span>Job total</span><strong>${job.price}.00</strong></div>
            <dl><div><dt>Load</dt><dd>{job.load}</dd></div><div><dt>Crew</dt><dd>{job.crew.join(' + ')}</dd></div><div><dt>Payment</dt><dd>{checked.includes('Payment collected') ? 'Collected' : 'Pending'}</dd></div></dl>
            <p><CheckCircle2 />A completion text and receipt will be queued for the customer.</p>
          </aside>
        </div>
        <footer><span>{checked.length} of {COMPLETION_STEPS.length} checks done</span><button className="button button-primary" disabled={!complete} onClick={() => onFinish(job.id)}><ClipboardCheck />Complete job</button></footer>
      </section>
    </div>
  );
}

function NewJobModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ customer: '', area: '', type: '', time: '' });
  const valid = Object.values(form).every((value) => value.trim());
  return (
    <div className="modal-layer" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="new-job-modal" role="dialog" aria-modal="true" aria-labelledby="new-job-title">
        <header><div><span className="section-kicker">Quick dispatch entry</span><h2 id="new-job-title">Add a job</h2></div><button className="round-button" aria-label="Close new job" onClick={onClose}><X /></button></header>
        <div className="new-job-fields">
          <label>Customer name<input autoFocus value={form.customer} onChange={(e) => setForm({ ...form, customer: e.target.value })} placeholder="Customer name" /></label>
          <label>Columbus area<input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} placeholder="e.g. Worthington" /></label>
          <label>Job type<input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="e.g. Basement cleanout" /></label>
          <label>Arrival time<input value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} placeholder="e.g. 5:30 PM" /></label>
        </div>
        <div className="new-job-note"><Sparkles /><p><strong>Fast capture first.</strong> Photos, pricing, crew, and disposal notes can be added from the job card.</p></div>
        <footer><button className="text-button" onClick={onClose}>Cancel</button><button className="button button-primary" disabled={!valid} onClick={() => onAdd(form)}><Plus />Add to today</button></footer>
      </section>
    </div>
  );
}

function FeedbackDrawer({ onClose }) {
  const [rating, setRating] = useState(0);
  const [best, setBest] = useState('');
  const [missing, setMissing] = useState('');
  const [status, setStatus] = useState('');
  const message = `Donkey Dumpster V2 feedback\n\nOverall: ${rating || 'Not rated'}/5\nFeels most useful: ${best || '—'}\nStill missing or wrong: ${missing || '—'}`;
  async function send() {
    if (navigator.share) { try { await navigator.share({ title: 'Donkey Dumpster V2 feedback', text: message }); setStatus('Thanks — your share sheet is open.'); return; } catch { /* sharing was cancelled */ } }
    await navigator.clipboard.writeText(message); setStatus('Copied. Paste it into your chat with Tony.');
  }
  return (
    <div className="feedback-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="feedback-drawer" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
        <header><div><span className="section-kicker">Ryan, be blunt</span><h2 id="feedback-title">Is this closer?</h2></div><button className="round-button" onClick={onClose} aria-label="Close feedback"><X /></button></header>
        <p className="feedback-intro">This pass is about scheduling crews and getting every job properly finished. Tap around first, then tell us what does not match a real Donkey Dumpster workday.</p>
        <fieldset><legend>How close are we now?</legend><div className="rating-row">{[1, 2, 3, 4, 5].map((value) => <button key={value} className={rating === value ? 'active' : ''} onClick={() => setRating(value)}>{value}</button>)}</div><span className="rating-ends"><small>Way off</small><small>That’s it</small></span></fieldset>
        <label>What would you actually use?<textarea value={best} onChange={(e) => setBest(e.target.value)} placeholder="The schedule, crew view, completion checklist…" /></label>
        <label>What’s missing or wrong?<textarea value={missing} onChange={(e) => setMissing(e.target.value)} placeholder="Say it exactly how you’d say it on a busy day." /></label>
        <button className="button button-primary button-full" disabled={!rating} onClick={send}><Send />Send my feedback</button>
        {status && <p className="feedback-status"><CheckCircle2 />{status}</p>}
      </section>
    </div>
  );
}

function MobileNav({ view, setView }) {
  return <nav className="mobile-nav" aria-label="Mobile operations navigation">{NAV.slice(0, 4).map(([id, Icon, label]) => <button key={id} className={view === id ? 'active' : ''} onClick={() => setView(id)}><Icon /><span>{label === 'All jobs' ? 'Jobs' : label}</span></button>)}</nav>;
}

export default function App() {
  const [view, setView] = useState('overview');
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [selectedId, setSelectedId] = useState('DD-2419');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [completionJob, setCompletionJob] = useState(null);
  const [newJobOpen, setNewJobOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const pageTitle = useMemo(() => NAV.find(([id]) => id === view)?.[2] || 'Overview', [view]);

  function advanceJob(id) {
    setJobs((current) => current.map((job) => {
      if (job.id !== id) return job;
      const index = STATUS_ORDER.indexOf(job.status);
      return { ...job, status: STATUS_ORDER[Math.min(index + 1, STATUS_ORDER.length - 1)] };
    }));
  }

  function finishJob(id) {
    setJobs((current) => current.map((job) => job.id === id ? { ...job, status: 'Complete' } : job));
    setCompletionJob(null);
  }

  function addJob(form) {
    const next = {
      id: `DD-${2422 + jobs.length - INITIAL_JOBS.length}`,
      time: form.time.replace(/\s?(AM|PM)$/i, ''), meridiem: form.time.match(/(AM|PM)$/i)?.[1]?.toUpperCase() || '', window: form.time,
      customer: form.customer, area: form.area, address: `Demo address · ${form.area}, OH`, type: form.type,
      load: 'To confirm', price: 0, status: 'Scheduled', crew: ['—'], truck: 'Unassigned', note: 'New job — add access notes before dispatch.', image: 'hero-truck.png', travel: '—',
    };
    setJobs((current) => [...current, next]); setSelectedId(next.id); setNewJobOpen(false); setView('schedule');
  }

  return (
    <div className="operations-app">
      <Sidebar view={view} setView={setView} open={sidebarOpen} setOpen={setSidebarOpen} />
      <main className="workspace">
        <Topbar title={pageTitle} onMenu={() => setSidebarOpen(true)} onNewJob={() => setNewJobOpen(true)} />
        <div className="demo-notice"><span>Interactive V2 prototype</span><p>Sample jobs and customers · no live data is being sent</p></div>
        <div className="workspace-content">
          {view === 'overview' && <Overview jobs={jobs} selectedId={selectedId} setSelectedId={setSelectedId} onAdvance={advanceJob} onComplete={setCompletionJob} />}
          {view === 'schedule' && <ScheduleView jobs={jobs} selectedId={selectedId} setSelectedId={setSelectedId} onAdvance={advanceJob} onComplete={setCompletionJob} />}
          {view === 'jobs' && <JobsView jobs={jobs} setSelectedId={setSelectedId} setView={setView} />}
          {view === 'crew' && <CrewView />}
        </div>
      </main>
      <button className="feedback-trigger" onClick={() => setFeedbackOpen(true)}><MessageCircle /><span>Give feedback</span><small>Ryan, tap here</small></button>
      <MobileNav view={view} setView={setView} />
      {completionJob && <CompletionSheet job={completionJob} onClose={() => setCompletionJob(null)} onFinish={finishJob} />}
      {newJobOpen && <NewJobModal onClose={() => setNewJobOpen(false)} onAdd={addJob} />}
      {feedbackOpen && <FeedbackDrawer onClose={() => setFeedbackOpen(false)} />}
    </div>
  );
}
