import Button from './Button.jsx';

export default function NavBar({ onNavigate, onLanguageChange, language, view }) {
  return (
    <header className="relative z-10 max-w-7xl mx-auto px-5 py-5 border-b border-emerald-900/50">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Smart Fish Farming AI</p>
          <h1 className="text-xl font-black text-white">Vugurura Ubworozi Bw’amafi Ukoresheje AI</h1>
        </div>
        <nav className="flex flex-wrap items-center gap-3">
          <button onClick={() => onNavigate('landing')} className={`rounded-full px-4 py-2 text-sm ${view === 'landing' ? 'bg-emerald-400 text-[#063c25]' : 'bg-emerald-900/70 text-white hover:bg-emerald-700'}`}>Features</button>
          <button onClick={() => onNavigate('payment')} className={`rounded-full px-4 py-2 text-sm ${view === 'payment' ? 'bg-emerald-400 text-[#063c25]' : 'bg-emerald-900/70 text-white hover:bg-emerald-700'}`}>Pricing</button>
          <button onClick={() => onNavigate('dashboard')} className={`rounded-full px-4 py-2 text-sm ${view === 'dashboard' ? 'bg-emerald-400 text-[#063c25]' : 'bg-emerald-900/70 text-white hover:bg-emerald-700'}`}>Testimonials</button>
          <button onClick={() => onNavigate('login')} className={`rounded-full px-4 py-2 text-sm ${view === 'login' ? 'bg-emerald-400 text-[#063c25]' : 'bg-emerald-900/70 text-white hover:bg-emerald-700'}`}>Login</button>
          <button onClick={() => onNavigate('payment')} className={`rounded-full px-4 py-2 text-sm ${view === 'payment' ? 'bg-emerald-400 text-[#063c25]' : 'bg-emerald-900/70 text-white hover:bg-emerald-700'}`}>Payment</button>
          <select value={language} onChange={(e) => onLanguageChange(e.target.value)} className="rounded-2xl border border-emerald-700 bg-[#0e3621] px-3 py-2 text-sm text-white outline-none">
            <option value="rw">Kinyarwanda</option>
            <option value="en">English</option>
          </select>
          <Button onClick={() => onNavigate('login')} variant="primary">Sign In</Button>
        </nav>
      </div>
    </header>
  );
}
