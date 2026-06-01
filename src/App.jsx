import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';

function App() {
  const [view, setView] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [view]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#060b08] flex flex-col items-center justify-center text-white font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
          <span className="absolute text-xl">🐟</span>
        </div>
        <h2 className="text-emerald-400 font-black tracking-widest text-xs uppercase mt-6 animate-pulse">
          Fish-farming-AI
        </h2>
        <p className="text-slate-500 text-[11px] mt-1 font-mono">Loading telemetry agents...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#060b08] text-white font-sans flex flex-col">
      <nav className="flex justify-between items-center p-6 border-b border-emerald-950/30 bg-[#060b08]/90 backdrop-blur sticky top-0 z-50">
        <span className="text-xl font-black text-emerald-400 tracking-wider">🏠 Fish-farming-AI</span>
        <div className="flex gap-6 items-center">
          <button onClick={() => { setIsLoading(true); setView('landing'); }} className="text-xs text-slate-400 hover:text-white transition">Home</button>
          <button onClick={() => { setIsLoading(true); setView('dashboard'); }} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition">Dashboard</button>
        </div>
      </nav>

      <main className="flex-1">
        {view === 'landing' && <LandingPage setView={setView} />}
        
        {view === 'dashboard' && (
          <div className="p-8 max-w-6xl mx-auto">
            <h2 className="text-xl font-black text-white mb-6">Live Pond Diagnostics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/50">
                <h3 className="text-slate-400 text-xs font-mono uppercase">Water Temp</h3>
                <p className="text-3xl font-black text-white mt-2">26.4 °C</p>
              </div>
              <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/50">
                <h3 className="text-slate-400 text-xs font-mono uppercase">pH Acidity</h3>
                <p className="text-3xl font-black text-white mt-2">7.25 pH</p>
              </div>
              <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/50">
                <h3 className="text-slate-400 text-xs font-mono uppercase">Oxygen Level</h3>
                <p className="text-3xl font-black text-white mt-2">6.8 mg/L</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;