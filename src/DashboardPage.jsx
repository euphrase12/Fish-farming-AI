import React, { useState } from 'react';

export default function FarmSmartApp() {
  const [view, setView] = useState('landing'); // 'landing' cyangwa 'dashboard'
  const [activeTab, setActiveTab] = useState('AI Chat');
  const [billingPeriod, setBillingPeriod] = useState('annually');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I am your Fish-farming-AI Assistant. How can I help you manage your fish ponds today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSendMessage = (textToSend) => {
    const currentText = textToSend || input;

    const newMessages = [...messages, { sender: 'user', text: currentText }];
    setMessages(newMessages);

    setTimeout(() => {
      setMessages([...newMessages, { 
        sender: 'ai', 
        text: "Based on your real-time pond analytics, your Water Temperature is optimal at 26°C and pH is stable at 7.2. Ensure the automated aerators remain active to maintain high Dissolved Oxygen levels." 
      }]);
    }, 1000);
  };

  // ----------------------------------------------------
  // 1. LANDING PAGE VIEW (Ifite ibiciro byo muli image_f13d16.png)
  // ----------------------------------------------------
  if (view === 'landing') {
    return (
      <div className="bg-slate-950 text-slate-100 min-h-screen font-sans overflow-x-hidden">
        {/* Navigation Bar */}
        <nav className="flex justify-between items-center p-6 border-b border-slate-900 bg-slate-950 sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-wider text-white">FarmSmart AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#testimonials" className="hover:text-white transition">Testimonials</a>
          </div>
          <button 
            onClick={() => setView('dashboard')} 
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold px-4 py-2 rounded-full transition"
          >
            Go to Dashboard
          </button>
        </nav>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center px-6 py-20 md:py-32 flex flex-col items-center relative">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Revolutionize <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">Agriculture with AI</span>
          </h1>
          <p className="mt-6 text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
            Harness autonomous AI agents to optimize farming, predict yields, and automate workflows—making agriculture smarter, faster, and sustainable.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button onClick={() => setView('dashboard')} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-6 py-3 rounded-full text-sm transition shadow-lg shadow-emerald-500/20">
              ✦ Get Started
            </button>
            <a href="#pricing" className="border border-slate-800 hover:border-slate-700 bg-slate-900/50 backdrop-blur text-slate-300 font-bold px-6 py-3 rounded-full text-sm transition">
              ✦ Learn More
            </a>
          </div>
        </header>

        {/* PRICING SECTION (Nk'uko biri muli image_f13d16.png) */}
        <section id="pricing" className="max-w-6xl mx-auto px-6 py-20 border-t border-slate-900">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-white">Pricing built for every Farmer</h2>
            <p className="text-slate-400 text-xs md:text-sm mt-3">
              From individual growers to agribusinesses—scale your farm with AI that fits your needs.
            </p>
            
            {/* Toggle Switch */}
            <div className="mt-8 inline-flex items-center bg-slate-900 border border-slate-800 p-1 rounded-full">
              <button 
                onClick={() => setBillingPeriod('annually')}
                className={}
              >
                Annually (Save 20%)
              </button>
              <button 
                onClick={() => setBillingPeriod('monthly')}
                className={}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {/* Starter Card */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-800 transition">
              <div>
                <h3 className="text-lg font-bold text-white">Starter</h3>
                <p className="text-slate-400 text-xs mt-2">Ideal for small farms getting started with AI.</p>
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">/bin/bash</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
              </div>
              <button onClick={() => setView('dashboard')} className="w-full border border-slate-800 hover:border-slate-700 bg-slate-950 py-3 rounded-xl text-xs font-bold text-slate-200 transition">
                Get Started
              </button>
            </div>

            {/* Professional Card (Most Popular) */}
            <div className="bg-slate-900/60 border-2 border-emerald-500/30 rounded-3xl p-8 flex flex-col justify-between relative shadow-xl shadow-emerald-950/20">
              <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full">
                Most Popular
              </span>
              <div>
                <h3 className="text-lg font-bold text-white">Professional</h3>
                <p className="text-slate-400 text-xs mt-2">Perfect for growing farms looking to optimize yield.</p>
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">
                    {billingPeriod === 'annually' ? '0' : '0'}
                  </span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                {billingPeriod === 'annually' && (
                  <p className="text-[11px] text-emerald-400/70 font-mono -mt-6 mb-6">billed annually (0/mo equivalent)</p>
                )}
                <ul className="space-y-3 border-t border-slate-800/60 pt-6 text-xs text-slate-300 font-medium">
                  <li className="flex items-center gap-2 text-slate-400">✓ Advanced crop and soil analysis</li>
                  <li className="flex items-center gap-2 text-slate-400">✓ Real-time automated sensor data</li>
                </ul>
              </div>
              <button onClick={() => setView('dashboard')} className="w-full bg-emerald-500 hover:bg-emerald-600 py-3 rounded-xl text-xs font-bold text-slate-950 transition mt-8 shadow-lg shadow-emerald-500/10">
                Join Now
              </button>
            </div>

            {/* Enterprise Card */}
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between hover:border-slate-800 transition">
              <div>
                <h3 className="text-lg font-bold text-white">Enterprise</h3>
                <p className="text-slate-400 text-xs mt-2">Tailored solutions for large agricultural businesses.</p>
                <div className="my-8 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">00</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                {billingPeriod === 'annually' && (
                  <p className="text-[11px] text-emerald-400/70 font-mono -mt-6 mb-6">billed annually (00/mo equivalent)</p>
                )}
              </div>
              <button onClick={() => alert('Contacting sales...')} className="w-full hover:bg-slate-900 border border-slate-800 py-3 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition">
                Talk to Sales
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ----------------------------------------------------
  // 2. DASHBOARD VIEW (Ifite Dashboard na AI Chat)
  // ----------------------------------------------------
  return (
    <div className="flex h-screen bg-[#070d0a] text-slate-100 font-sans overflow-hidden animate-fadeIn">
      {/* Sidebar Area */}
      <aside className="w-64 bg-[#0b1410] border-r border-[#162a20] flex flex-col justify-between p-4">
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <span className="text-xl font-black tracking-wider text-emerald-400">FishFarm AI</span>
            <button onClick={() => setView('landing')} className="text-xs bg-slate-900 text-slate-400 px-2 py-1 rounded border border-slate-800 hover:text-white">
              ◀ Home
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {[
              { name: 'Dashboard', icon: '📊' },
              { name: 'AI Chat', icon: '💬' },
              { name: 'Chat History', icon: '⏳' }
            ].map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={}
              >
                <span>{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>

          <div className="mt-8 px-2">
            <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">Recent Chats</span>
            <div className="mt-2 flex flex-col gap-2 text-xs text-slate-400 font-mono">
              <div className="hover:text-emerald-400 cursor-pointer truncate">❖ Water pH stability check</div>
              <div className="hover:text-emerald-400 cursor-pointer truncate">❖ Dissolved oxygen report</div>
              <div className="hover:text-emerald-400 cursor-pointer truncate">❖ Optimal feeding cycles</div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#162a20] pt-4 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">E</div>
            <div className="truncate max-w-[120px]">
              <h4 className="text-xs font-bold text-slate-200">Euphrasie M.</h4>
              <p className="text-[10px] text-slate-500 font-mono">Founder</p>
            </div>
          </div>
          <span className="text-xs text-slate-500">⚙️</span>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-[#070d0a] relative overflow-hidden">
        <header className="border-b border-[#162a20] bg-[#0b1410]/50 px-6 py-4 flex justify-between items-center">
          <h2 className="text-base font-bold text-slate-200">{activeTab} Portal</h2>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">● System Online</span>
        </header>

        {activeTab === 'Dashboard' ? (
          <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1410] border border-[#162a20] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-2xl">🌡️</span>
                <h3 className="text-slate-400 text-xs font-mono uppercase mt-2">Water Temperature</h3>
                <p className="text-3xl font-black text-white mt-1">26.4 °C</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mt-4 w-fit">✓ Optimal Range</span>
            </div>
            <div className="bg-[#0b1410] border border-[#162a20] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-2xl">🧪</span>
                <h3 className="text-slate-400 text-xs font-mono uppercase mt-2">pH Acidity Levels</h3>
                <p className="text-3xl font-black text-white mt-1">7.25 pH</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mt-4 w-fit">✓ Perfectly Neutral</span>
            </div>
            <div className="bg-[#0b1410] border border-[#162a20] p-6 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-2xl">💧</span>
                <h3 className="text-slate-400 text-xs font-mono uppercase mt-2">Dissolved Oxygen</h3>
                <p className="text-3xl font-black text-white mt-1">6.8 mg/L</p>
              </div>
              <span className="text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-1 rounded mt-4 w-fit">✓ Aerators On</span>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-between p-6 overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 flex flex-col justify-end pb-4">
              {messages.length === 1 && (
                <div className="text-center my-auto">
                  <h1 className="text-3xl font-black text-white bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">What can I help with?</h1>
                </div>
              )}
              <div className="space-y-4 overflow-y-auto max-h-[350px]">
                {messages.map((msg, idx) => (
                  <div key={idx} className={}>
                    <div className={}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full max-w-3xl mx-auto flex flex-col gap-3">
              <div className="flex flex-wrap gap-2 justify-center">
                {['Check pH Level', 'Water Temp Report', 'Oxygen Levels', 'Feeding Schedule'].map((tag) => (
                  <button key={tag} onClick={() => handleSendMessage(tag)} className="text-xs text-slate-400 bg-[#0b1410] border border-[#162a20] px-3 py-1.5 rounded-full hover:border-emerald-500/40 hover:text-white transition-all">
                    {tag}
                  </button>
                ))}
              </div>
              <div className="relative flex items-center bg-[#0b1410] border border-[#162a20] rounded-2xl p-2 focus-within:border-emerald-500/50 transition-all">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message FishFarm AI..."
                  className="flex-1 bg-transparent border-none text-sm text-slate-200 px-3 outline-none placeholder-slate-600"
                />
                <button onClick={() => handleSendMessage()} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 p-2.5 rounded-xl font-bold transition">➔</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
