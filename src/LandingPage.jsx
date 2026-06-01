import React, { useState } from 'react';

export default function LandingPage({ setView }) {
  const [billing, setBilling] = useState('annual');
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#060b08] text-slate-100 min-h-screen font-sans antialiased">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-5xl mx-auto pt-24 pb-20 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 font-mono text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-500/20 mb-6">
          <span>✧</span> Powering the future of aquaculture <span>✧</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none max-w-4xl mx-auto">
          Revolutionize Aquaculture with <span className="text-emerald-400">AI</span>
        </h1>
        <p className="mt-6 text-slate-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Harness autonomous AI agents to optimize pond telemetry, predict fish growth yields, and automate water quality workflows—making fish farming smarter, faster, and sustainable.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button 
            onClick={() => setView('dashboard')} 
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-8 py-4 rounded-full text-xs uppercase tracking-widest transition shadow-lg shadow-emerald-500/20"
          >
            🚀 Get Started / Open Dashboard
          </button>
          <a href="#features" className="border border-emerald-950/60 hover:bg-emerald-950/30 text-white font-bold px-8 py-4 rounded-full text-xs transition flex items-center">
            Learn More
          </a>
        </div>
        <p className="text-[11px] text-slate-500 font-mono mt-12 uppercase tracking-wider">Trusted by modern innovators & fish farmers</p>
      </section>

      {/* 2. FEATURES SECTION */}
      <section id="features" className="max-w-5xl mx-auto py-20 px-6 border-t border-emerald-950/20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Empower Your Pond with AI</h2>
          <p className="text-xs text-slate-400 mt-2">Monitor aquatic environments, manage feeding resources efficiently, and get actionable insights to optimize your fish farm operations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/40 relative overflow-hidden group">
            <span className="text-2xl bg-emerald-500/10 p-3 rounded-xl block w-fit text-emerald-400">🐟</span>
            <h3 className="text-sm font-bold text-white mt-4">Water Health Monitoring</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Track pH acidity, water temperature, and dissolved oxygen levels in real-time with satellite & IoT intelligence.</p>
            <div className="text-[10px] font-mono text-emerald-500 mt-4">⚡ Live Telemetry Map</div>
          </div>
          {/* Feature 2 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/40 relative overflow-hidden group">
            <span className="text-2xl bg-emerald-500/10 p-3 rounded-xl block w-fit text-emerald-400">💧</span>
            <h3 className="text-sm font-bold text-white mt-4">Smart Aeration & Flow</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Reduce water and pump energy waste by 40% with AI-driven automatic oxygen regulation systems.</p>
            <div className="text-[10px] font-mono text-emerald-500 mt-4">⚙️ Auto Oxygen Control</div>
          </div>
          {/* Feature 3 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/40 relative overflow-hidden group">
            <span className="text-2xl bg-emerald-500/10 p-3 rounded-xl block w-fit text-emerald-400">📊</span>
            <h3 className="text-sm font-bold text-white mt-4">Biomass & Feed Optimizers</h3>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">Get custom feeding schedules and exact nutrient predictions based on current fish density and fish growth metrics.</p>
            <div className="text-[10px] font-mono text-emerald-500 mt-4">📈 Nutrient Profile Sync</div>
          </div>
        </div>

        {/* Highlight Quote */}
        <div className="mt-12 bg-emerald-950/10 p-8 rounded-2xl border border-emerald-950/30 max-w-3xl mx-auto text-center md:text-left md:flex items-center gap-6">
          <div className="text-3xl text-emerald-400 mb-4 md:mb-0">“</div>
          <p className="text-xs text-slate-300 italic leading-relaxed flex-1">
            "Fish-farming-AI transformed how we monitor our tilapia ponds. Real-time water diagnostics helped us reduce fingerling mortality rates by 35% and increase biomass weight significantly—without adding field technicians."
          </p>
          <div className="mt-4 md:mt-0 whitespace-nowrap text-xs">
            <h4 className="font-bold text-white">Karisa Gaston</h4>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">CEO, Kivu Aquaculture</p>
          </div>
        </div>
      </section>

      {/* 3. PRICING SECTION */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-emerald-950/20 text-center">
        <h2 className="text-2xl md:text-3xl font-black text-white">Pricing built for every Fish Farmer</h2>
        <p className="text-xs text-slate-400 mt-2">From individual growers with a single pond to industrial agribusinesses—scale with AI that fits your needs.</p>
        
        <div className="mt-8 flex justify-center gap-2 bg-[#0b140f] p-1 rounded-full w-fit mx-auto border border-emerald-950/40">
          <button onClick={() => setBilling('annual')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition ${billing === 'annual' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>Annually (Save 20%)</button>
          <button onClick={() => setBilling('monthly')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition ${billing === 'monthly' ? 'bg-emerald-500 text-slate-950' : 'text-slate-400'}`}>Monthly</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
          {/* Tier 1 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/40 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-300">Starter</h3>
              <p className="text-slate-500 text-[11px] mt-1">Ideal for small ponds getting started with AI.</p>
              <p className="text-4xl font-black text-white mt-4">$0 <span className="text-xs font-normal text-slate-500">/month</span></p>
              <ul className="mt-6 space-y-3 text-xs text-slate-400 border-t border-emerald-950/20 pt-4">
                <li>✓ Basic telemetry dashboard</li>
                <li>✓ Water temperature alerts</li>
                <li>✓ Daily pH guidelines</li>
                <li>✓ Up to 1 active pond agent</li>
              </ul>
            </div>
            <button onClick={() => setView('dashboard')} className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-3 rounded-xl text-xs mt-8 transition border border-emerald-500/20 text-center">Get Started</button>
          </div>

          {/* Tier 2 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border-2 border-emerald-500 shadow-2xl shadow-emerald-500/5 relative flex flex-col justify-between">
            <span className="absolute -top-3 right-4 bg-emerald-500 text-slate-950 text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">Most Popular</span>
            <div>
              <h3 className="text-sm font-bold text-white">Professional</h3>
              <p className="text-slate-400 text-[11px] mt-1">Perfect for growing farms looking to optimize yield.</p>
              <p className="text-4xl font-black text-white mt-4">{billing === 'annual' ? '$40' : '$50'} <span className="text-xs font-normal text-slate-500">/month</span></p>
              <p className="text-[10px] text-emerald-400/70 font-mono mt-1">{billing === 'annual' ? 'billed annually ($480/yr)' : 'billed monthly'}</p>
              <ul className="mt-6 space-y-3 text-xs text-slate-300 border-t border-emerald-950/20 pt-4">
                <li>✓ Advanced oxygen & pH diagnostics</li>
                <li>✓ Multiple pond sync & integrations</li>
                <li>✓ Up to 10 AI farm agents running simultaneously</li>
                <li>✓ Automated aeration Recommendations</li>
                <li>✓ Priority developer support</li>
              </ul>
            </div>
            <button onClick={() => setView('dashboard')} className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black py-3 rounded-xl text-xs mt-8 transition text-center shadow-lg shadow-emerald-500/10">Join Now</button>
          </div>

          {/* Tier 3 */}
          <div className="bg-[#0b140f] p-6 rounded-2xl border border-emerald-950/40 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-300">Enterprise</h3>
              <p className="text-slate-500 text-[11px] mt-1">Tailored solutions for commercial operations.</p>
              <p className="text-4xl font-black text-white mt-4">{billing === 'annual' ? '$400' : '$500'} <span className="text-xs font-normal text-slate-500">/month</span></p>
              <p className="text-[10px] text-slate-500 font-mono mt-1">{billing === 'annual' ? 'billed annually' : 'billed monthly'}</p>
              <ul className="mt-6 space-y-3 text-xs text-slate-400 border-t border-emerald-950/20 pt-4">
                <li>✓ Custom multi-site pond dashboards</li>
                <li>✓ Unlimited AI telemetry agents</li>
                <li>✓ Full API & IoT hardware integration</li>
                <li>✓ Enterprise-grade biometric security</li>
                <li>✓ Dedicated aquaculture account manager</li>
              </ul>
            </div>
            <button className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold py-3 rounded-xl text-xs mt-8 transition border border-emerald-500/20 text-center">Talk to Sales</button>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section className="max-w-5xl mx-auto py-20 px-6 border-t border-emerald-950/20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-white">Farming Made Effortless</h2>
          <p className="text-xs text-slate-400 mt-2">Hear from professional fish farmers and cooperatives who transformed their production scales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0b140f] p-6 rounded-xl border border-emerald-950/30 text-xs">
            <p className="text-slate-300 leading-relaxed">"Fish-farming-AI helped us optimize our harvest schedule predictions. The automated telemetry allowed us to plan pond oxygen adjustments without manual oversight."</p>
            <h4 className="text-white font-bold mt-4 font-mono text-[11px]">- Mukandayishimiye E., Smart Agri Co.</h4>
          </div>
          <div className="bg-[#0b140f] p-6 rounded-xl border border-emerald-950/30 text-xs">
            <p className="text-slate-300 leading-relaxed">"Integrating AI into our telemetry made tracking fish pond levels effortless. Real-time insights reduced water wastage and raised health metrics across all operations."</p>
            <h4 className="text-white font-bold mt-4 font-mono text-[11px]">- Niyonkuru J., Rubavu Hatchery</h4>
          </div>
          <div className="bg-[#0b140f] p-6 rounded-xl border border-emerald-950/30 text-xs">
            <p className="text-slate-300 leading-relaxed">"The water pH analysis feature is an absolute game-changer. We can now catch chemical fluctuations early and stabilize the environment before fingerlings are affected."</p>
            <h4 className="text-white font-bold mt-4 font-mono text-[11px]">- Uwase Aline, Nile Tilapia Hub</h4>
          </div>
        </div>
      </section>

      {/* 5. FAQs SECTION */}
      <section className="max-w-3xl mx-auto py-20 px-6 border-t border-emerald-950/20">
        <h2 className="text-2xl font-black text-center text-white mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              q: "What is Fish-farming-AI and who is it for?",
              a: "Fish-farming-AI is an intelligent management architecture built for fish farmers, aquaculture specialists, and enterprises. It automatically tracks pond metrics (pH, Temperature, Oxygen) and runs parallel AI models to secure maximum biometric yield."
            },
            {
              q: "How does the AI monitor water health?",
              a: "Our system streams environmental data from cloud-connected sensors or localized entries. The telemetry agents instantly analyze current data spikes against deep historical biology standards to deliver proactive maintenance recommendations."
            },
            {
              q: "Can I integrate it with local hardware pumps?",
              a: "Yes! Fish-farming-AI features ready-built IoT bridges to automate active water pumps, mechanical aerators, and scheduled food dispensers directly via customized triggers on our Enterprise dashboard."
            },
            {
              q: "Is my aquaculture data protected?",
              a: "Absolutely. Every telemetry stream and commercial pond ledger is fortified using complete end-to-end cloud encryption, ensuring your production volumes remain entirely under your secure control."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0b140f] rounded-xl border border-emerald-950/40 overflow-hidden">
              <button 
                onClick={() => toggleFaq(idx)} 
                className="w-full text-left p-5 font-bold text-xs md:text-sm text-white flex justify-between items-center hover:bg-emerald-950/10 transition"
              >
                <span>{item.q}</span>
                <span className="text-emerald-400 text-xs">{openFaq === idx ? '▲' : '▼'}</span>
              </button>
              {openFaq === idx && (
                <div className="p-5 pt-0 text-xs text-slate-400 border-t border-emerald-950/10 leading-relaxed bg-[#080e0a]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA HERO */}
      <section className="max-w-4xl mx-auto py-16 px-6 mb-20 text-center bg-gradient-to-b from-[#0b140f] to-transparent rounded-3xl border border-emerald-950/40">
        <h2 className="text-2xl font-black text-white">Fish-farming-AI: Aquaculture Made Simple</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto">Optimize telemetry agents, protect fingerlings in real time, and scale your sales with data built for modern growers.</p>
        <button onClick={() => setView('dashboard')} className="mt-6 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black px-6 py-3 rounded-full text-xs uppercase tracking-widest transition">
          Sign Up / Access Dashboard
        </button>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-emerald-950/20 py-8 text-center text-xs text-slate-600">
        <p>© 2026 FishAgri Group. All rights reserved. Cultivating intelligence for sustainable waters.</p>
      </footer>
    </div>
  );
}