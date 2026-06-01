import React from 'react';

export default function FarmSmartLanding() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen font-sans">
      <nav className="flex justify-between items-center p-6 border-b border-slate-900 bg-slate-950 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-wider text-white">FarmSmart AI</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
        </div>
        <button className="bg-white hover:bg-slate-200 text-slate-950 font-bold text-xs px-4 py-2 rounded-full transition">
          Try for Free
        </button>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 py-20 flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-3xl">
          Revolutionize Agriculture with AI
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          Harness autonomous AI agents to optimize farming, predict yields, and automate workflows—making agriculture smarter, faster, and sustainable.
        </p>
        <div className="flex gap-4 mt-2">
          <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-xl transition">
            ✧ Get Started
          </button>
          <button className="border border-slate-800 hover:bg-slate-900 text-slate-300 font-bold px-6 py-3 rounded-xl transition">
            Learn More
          </button>
        </div>
        <div className="mt-12 text-xs text-slate-500 uppercase tracking-widest">
          Trusted by innovators — Powering the future of agriculture
        </div>
      </section>

      <section id="features" className="max-w-6xl mx-auto px-6 py-16 border-t border-slate-900">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-4">Empower Your Farm with AI</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Monitor crops, manage resources efficiently, and get actionable insights to optimize your farm operations with FarmSmart AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">🌱</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Crop Health Monitoring</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Detect diseases early and track growth with AI-powered satellite & drone insights.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-emerald-400">NDVI Health Map</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">📡</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Real-time Farm Previews</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Access live field maps, weather overlays, and operational dashboards.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-blue-400">Live Satellite Feed</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">💧</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Smart Irrigation Systems</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Reduce water waste by 40% with AI-driven soil moisture optimization.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-teal-400">Auto Watering</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">🧪</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Soil Analysis & Recommendations</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Get real-time nutrient levels and custom fertilizer plans.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-purple-400">Nutrient Profile</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">🤖</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Parallel Farm Agents</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Run AI models for pest control, yield prediction, and logistics—simultaneously.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-amber-400">AI Agents Sync</span>
          </div>

          <div className="bg-slate-900/50 border border-slate-900 p-6 rounded-2xl">
            <div className="text-2xl mb-4">🚜</div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Easy Deployment & Integration</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">Go from sign-up to full operation in under 24 hours—no hardware needed.</p>
            <span className="text-[10px] font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">✓ Plug & Play</span>
          </div>
        </div>
      </section>

      <section id="testimonials" className="border-t border-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto bg-slate-900/40 border border-slate-900 p-8 rounded-3xl text-center flex flex-col items-center gap-6">
          <p className="text-lg text-slate-300 italic leading-relaxed max-w-2xl">
            "FarmSmart AI transformed how we monitor crops. Real-time insights helped us reduce water usage by 35% and increase yield significantly—without adding field staff."
          </p>
          <div>
            <h4 className="text-white font-bold">Ahmed Khan</h4>
            <p className="text-xs text-slate-500 font-mono mt-1">CEO, Green Fields Farm</p>
          </div>
        </div>
      </section>
    </div>
  );
}
