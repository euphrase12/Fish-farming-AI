import React, { useState } from 'react';

// DICTIONARY FOR FULL TRANSLATIONS (INCLUDING LMS & PAYMENTS)
const translations = {
  rw: {
    logo: "🐟 FarmSmart AI",
    home: "Ahabanza",
    learn: "Amasomo (LMS)",
    dashboardTab: "Dashboard Yawe",
    signOut: "Sohoka (Sign Out)",
    signIn: "Injira (Sign In)",
    loginTitle: "Ikaze Garuka",
    loginSub: "Injira urebe ibyome byawe, imirire, n'ubworozi",
    signupTitle: "Kora Konti Nshya",
    signupSub: "Yandikishe itungo n'ubworozi bwawe ku bwonko bwa AI",
    heroTitle: "Vugurura Ubworozi Bw'amafi Ukokesheje AI",
    heroSub: "Cunga ubuzima bw'amafi, umwuka (Oxygen) n'urwego rwa pH mu byome byawe binyuze ku bwonko bw'ikoranabuhanga rya Serverless.",
    btnStarted: "✨ Tangira Utishyura",
    btnLearn: "Inyigisho n'Amasomo",
    authAlert: "⚠️ Mwajya muri gahunda? Byaba byiza mbanje kwinjira (Login) cyangwa gukora konti kugira ngo mubone uburenganzira bwa AI n'amasomo!",
    paywallAlert: "🔒 Uburenganzira bwasabwaga: Nyabunha banza ukore ubwishyu bwa gahunda yawe ($40/Ukwezi) kugira ngo ubone uburenganzira bwo kwiga cyangwa gu-monitor-inga amazi.",
    pricingTitle: "Hitamo Gahunda y'Imafaranga (Subscription Plans)",
    pricingSub: "Ubu winjiye neza! Banza wishyure gahunda imwe kugira ngo ukomeze.",
    standardPlan: "Gahunda Isanzwe (Standard Plan)",
    proceedDashboard: "Komeza ku Bwishyu",
    payTitle: "Uburyo bwo Kwishyura bwa Afurika (African Payment Gateway)",
    paySub: "Hitamo uburyo bwo kwishyura bwegereye Afurika y'Iburasirazuba:",
    momoTab: "Mobile Money (MTN / Airtel)",
    cardTab: "Ikarita (Visa / Mastercard)",
    momoLabel: "Numero ya Terefoni ya MoMo izakiraho amafaranga:",
    cardLabel: "Imyirondoro y'Ikarita ya Banki:",
    payBtnText: "Ishyura ubu",
    payProcessing: "Ubwishyu buri gutunganywa... Banza wemeze kuri terefoni yawe (PIN)",
    paySuccess: "✅ Ubwishyu bwawe bwakiriwe! Ubu ufite uburenganzira bwa Dashboard n'Amasomo.",
    dashTitle: "Aquaculture IoT Dashboard",
    dashSub: "Amakuru aturutse mu byome by'amafi ako kanya binyuze kuri AI.",
    btnSimulateFound: "⚡ Connect (Simulate Found)",
    btnSimulateNotFound: "⚠️ Connect (Simulate Not Found)",
    statusScanning: "🔍 AI iri gushaka sensor...",
    statusConnected: "🟢 Connected (Kanda ngo uhagarike)",
    statusNotFound: "🔴 Sensor Not Detected (Kanda ugerageze nshya)",
    phLabel: "🧪 URWEGO RWA pH",
    phDesc: "Acidic: Urwego ruri hasi.",
    tempLabel: "🌡️ UBUSHYUHE BW'AMAZI",
    tempDesc: "Ubushyuhe buratunganye.",
    oxygenLabel: "💨 OXYGEN MU MAZI",
    oxygenDesc: "Umwuka uri ku kigero cyiza.",
    healthLabel: "🐟 UBUZIMA BW'AMAFI",
    healthDesc: "Amafi akeneye kwitwararika.",
    noSensor: "Nta input ya sensor",
    notifyTitle: "🔔 REAL-TIME NOTIFICATION ALERT SETTINGS",
    notifyDesc: "Hitamo uburyo wifuza kwakiraho amakuru (Email cyangwa Terefoni), andika imyirondoro yawe hasi ubanze ukande **Save Settings** kugira ngo AI izagutureho amamenyesha mugihe cy'amakuba.",
    chkEmail: "Yakira kuri Email (Email Alerts)",
    placeholderEmail: "Andika imeri yawe hano... (you@farm.com)",
    chkPhone: "Yakira SMS kuri Terefoni (Phone Alerts)",
    placeholderPhone: "Andika numero ya terefoni y'umworozi... (+25078...)",
    btnSaveConfig: "💾 Save Alert Configuration",
    saveSuccess: "✓ Imyirondoro yawe yaguzwe neza kuri AI!",
    aiAlertMessage: "🚨 AMAMENYESHA YA AI: Twabonye ikibazo mu cyome! Amakuru yoherejwe kuri: ",
    noFormFilled: " (Nta fomu yujuje, andika imeri hasi!)",
    lmsTitle: "🎓 Learning Management System (LMS) - AI Course Generator",
    lmsSub: "Urubuga ruzana Amasomo yateguwe kandi ashakishwa na AI ako kanya binyuze mu rurimi wahisemo.",
    lmsInputLabel: "💡 Tegeka AI gushaka no gutegura Isomo rishya:",
    lmsInputDesc: "Andika umutwe w'isomo ushaka (Urugero: 'Ubworozi bwa Crayfish', 'Kugaburira amafi') maze AI ihite irigushakira.",
    lmsPlaceholder: "Andika umutwe w'isomo ushaka...",
    lmsBtnGenerate: "Gura Isomo rishya",
    lmsBtnGenerating: "AI iri gutegura...",
    btnGoBack: "← Garuka Ahabanza",
    lesson1Title: "Isomo rya 1: Gucunga pH n'Umwuka mu mazi y'amafi",
    lesson1Content: "Ubu buhanga bukwereka uko ibipimo biba bihagaze iyo sensor ivuze ko hari ikibazo, n'uko ugomba gufata ingamba ako kanya binyuze kuri cloud dashboards.",
    lesson2Title: "Isomo rya 2: Ubworozi bwa Crayfish n'ibiryo bikungahaye kuri Poroteyine",
    lesson2Content: "Ubu bumenyi ufasha aborozi kumenya uko batunganya crayfish nka mvaruganda z'ibiryo by'amatungo mu kugabanya ibiciro by'ibiryo bituruka hanze.",
    aiGenCourse: "Isomo ryateguwe na AI kuri",
    aiGenDesc: "Iri somo ryateguwe n'ubwonko bwa AI (Automated Course Builder) rikurikije ibyo wasabye. Ririmo uburyo bugezweho bwo gukurikirana ubu bwoko bw'ubworozi mu buryo bw'umwuga n'ikoranabuhanga."
  },
  en: {
    logo: "🐟 FarmSmart AI",
    home: "Home",
    learn: "Lessons (LMS)",
    dashboardTab: "Your Dashboard",
    signOut: "Sign Out",
    signIn: "Sign In",
    loginTitle: "Welcome Back",
    loginSub: "Access your ponds, data, and aquaculture agents",
    signupTitle: "Create an Account",
    signupSub: "Register your farm to start using our smart AI infrastructure",
    heroTitle: "Revolutionize Aquaculture Production With AI",
    heroSub: "Monitor fish health, dissolved oxygen, and pH levels in your ponds seamlessly using cloud-native serverless architecture.",
    btnStarted: "✨ Get Started Free",
    btnLearn: "Learn More & Courses",
    authAlert: "⚠️ Authentication Required! Please Log In or Create an Account to unlock AI tools and premium lessons.",
    paywallAlert: "🔒 Access Restricted: Please complete payment for your subscription plan ($40/month) to unlock the live water monitoring dashboard and LMS modules.",
    pricingTitle: "Select a Farm Management Plan",
    pricingSub: "You are successfully logged in! Please complete checkout to unlock full features.",
    standardPlan: "Standard Plan",
    proceedDashboard: "Proceed to Checkout",
    payTitle: "African Local Payment Gateway",
    paySub: "Select a secure local transaction portal for East Africa:",
    momoTab: "Mobile Money (MTN / Airtel)",
    cardTab: "Card (Visa / Mastercard)",
    momoLabel: "MoMo Destination Number for Funds:",
    cardLabel: "Enter Card Credentials:",
    payBtnText: "Pay Now",
    payProcessing: "Processing payment gateway transaction... Please authorize on your phone via prompt.",
    paySuccess: "✅ Payment Verified Successfully! Your access to Dashboard and LMS is now active.",
    dashTitle: "Aquaculture IoT Dashboard",
    dashSub: "Real-time water metrics directly from your fish ponds via AI telemetry.",
    btnSimulateFound: "⚡ Connect (Simulate Found)",
    btnSimulateNotFound: "⚠️ Connect (Simulate Not Found)",
    statusScanning: "🔍 AI is scanning for sensors...",
    statusConnected: "🟢 Connected (Click to Disconnect)",
    statusNotFound: "🔴 Sensor Not Detected (Click to Retry)",
    phLabel: "🧪 WATER pH LEVEL",
    phDesc: "Acidic: Level is too low.",
    tempLabel: "🌡️ WATER TEMPERATURE",
    tempDesc: "Temperature is optimal.",
    oxygenLabel: "💨 DISSOLVED OXYGEN",
    oxygenDesc: "Oxygen is at a healthy level.",
    healthLabel: "🐟 FISH HEALTH STATUS",
    healthDesc: "Fish require observation and care.",
    noSensor: "No sensor input available",
    notifyTitle: "🔔 REAL-TIME NOTIFICATION ALERT SETTINGS",
    notifyDesc: "Select your preferred notification method (Email or Phone), input your details below, and click **Save Settings** to receive automated AI alerts during emergencies.",
    chkEmail: "Receive via Email (Email Alerts)",
    placeholderEmail: "Enter your email address... (you@farm.com)",
    chkPhone: "Receive SMS on Phone (Phone Alerts)",
    placeholderPhone: "Enter farmer phone number... (+25078...)",
    btnSaveConfig: "💾 Save Alert Configuration",
    saveSuccess: "✓ Configurations successfully saved to AI system!",
    aiAlertMessage: "🚨 AI AUTOMATED ALERT: Critical pond issue detected! Data dispatched to: ",
    noFormFilled: " (No configuration filled, please input your info below!)",
    lmsTitle: "🎓 Learning Management System (LMS) - AI Course Generator",
    lmsSub: "Access personalized courses generated and compiled instantly by AI in your selected language.",
    lmsEngineStatus: "AI Engine: ONLINE",
    lmsInputLabel: "💡 Command AI to Search & Prepare a New Lesson:",
    lmsInputDesc: "Type any aquaculture topic (e.g., 'Crayfish farming', 'Fish feeding techniques') and AI will instantly generate a structured lesson.",
    lmsPlaceholder: "Enter the topic you want AI to generate...",
    lmsBtnGenerate: "Generate New Lesson",
    lmsBtnGenerating: "AI is composing course...",
    btnGoBack: "← Go Back Home",
    lesson1Title: "Lesson 1: Managing pH and Dissolved Oxygen in Fish Ponds",
    lesson1Content: "This module teaches you how to interpret automated sensor parameters during critical stress periods and deploy direct ecological remedies via cloud dashboards.",
    lesson2Title: "Lesson 2: Crayfish Aquaculture & High-Protein Local Feed Production",
    lesson2Content: "Advanced methodologies guiding local farmers on transforming crayfish biomass into affordable animal meal alternatives to reduce dependency on imported feed.",
    aiGenCourse: "AI Generated Course on",
    aiGenDesc: "This customized curriculum was compiled dynamically by the AI Automated Course Builder based on your exact search criteria. It features modern data-driven methodologies."
  }
};

export default function App() {
  const [language, setLanguage] = useState('rw'); 
  const [currentView, setCurrentView] = useState('landing'); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasPaid, setHasPaid] = useState(false); 
  const [authWarning, setAuthWarning] = useState('');
  
  // Login flow state tracking
  const [loginEmail, setLoginEmail] = useState('');

  // TARGET WALLET / ADMIN WALLET FOR RECEIVING SUBSCRIPTION FUNDS
  const TARGET_MOMO_NUMBER = "0789697077";

  // AUTOMATED AI EXCHANGE RATE CONVERSION SYSTEM (USD TO RWF)
  const usdPrice = 40;
  const exchangeRateRwf = 1450; 
  const rwfPrice = usdPrice * exchangeRateRwf; 

  // Payment Selection States
  const [paymentMethod, setPaymentMethod] = useState('momo');
  const [payPhoneNumber, setPayPhoneNumber] = useState(TARGET_MOMO_NUMBER);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Notification Configuration States
  const [emailAlertEnabled, setEmailAlertEnabled] = useState(true);
  const [phoneAlertEnabled, setPhoneAlertEnabled] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState(''); 
  const [isConfigSaved, setIsConfigSaved] = useState(false);
  const [isAlertTriggered, setIsAlertTriggered] = useState(false);

  // Cloud IoT Telemetry Sensor States
  const [sensorStatus, setSensorStatus] = useState('disconnected'); 
  
  // Active Translation Mapper
  const activeTranslation = translations[language] || translations['rw'];

  // AI LMS Generation Architecture
  const [aiLessons, setAiLessons] = useState([]);
  const [searchTopic, setSearchTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const defaultLessons = [
    { id: 1, title: activeTranslation.lesson1Title, content: activeTranslation.lesson1Content, tag: "Water Quality" },
    { id: 2, title: activeTranslation.lesson2Title, content: activeTranslation.lesson2Content, tag: "Nutrition" }
  ];

  const handleFeatureAccess = (targetView) => {
    if (!isLoggedIn) {
      setAuthWarning(activeTranslation.authAlert);
      setCurrentView('login');
      return;
    }
    if (!hasPaid) {
      setAuthWarning(activeTranslation.paywallAlert);
      setCurrentView('payment');
      return;
    }
    setAuthWarning('');
    setCurrentView(targetView);
  };

  const handleFakeLogin = () => {
    setIsLoggedIn(true);
    setAuthWarning('');
    const adminEmails = ['admin@farm.com', 'euphrasie@farm.com', 'admin'];
    if (adminEmails.includes(loginEmail.trim().toLowerCase())) {
      setHasPaid(true); 
      setCurrentView('dashboard');
    } else {
      if (!hasPaid) {
        setCurrentView('payment'); 
      } else {
        setCurrentView('dashboard');
      }
    }
  };

  const handleAfricanPaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setHasPaid(true); 
      setAuthWarning('');
      setCurrentView('dashboard'); 
    }, 3000);
  };

  const handleSensorScanSimulation = (shouldFind) => {
    setSensorStatus('scanning');
    setIsAlertTriggered(false);
    setTimeout(() => {
      if (shouldFind) {
        setSensorStatus('connected');
        setTimeout(() => {
          setIsAlertTriggered(true);
        }, 1200);
      } else {
        setSensorStatus('not_found');
      }
    }, 2000); 
  };

  const handleAiGenerateLesson = (e) => {
    e.preventDefault();
    if (!searchTopic) return;
    setIsGenerating(true);
    setTimeout(() => {
      const newLesson = {
        id: Date.now(),
        title: `${activeTranslation.aiGenCourse} "${searchTopic}"`,
        content: `${activeTranslation.aiGenDesc} [Topic: ${searchTopic}]`,
        tag: "AI Custom"
      };
      setAiLessons([newLesson, ...aiLessons]);
      setSearchTopic('');
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#063c25] text-white font-sans relative overflow-hidden">
      
      {/* Background blur styling blocks */}
      <div className="absolute top-[-10%] left-[-5%] w-[300px] h-[300px] bg-emerald-600/20 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] bg-teal-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      {/* NAVBAR */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 py-4 flex justify-between items-center border-b border-emerald-900/40">
        <div onClick={() => setCurrentView('landing')} className="text-xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2">
          {activeTranslation.logo}
        </div>
        
        <div className="flex items-center gap-6">
          <button onClick={() => setCurrentView('landing')} className="text-sm font-medium hover:text-emerald-400 text-emerald-100/80">{activeTranslation.home}</button>
          <button onClick={() => handleFeatureAccess('lms')} className="text-sm font-medium hover:text-emerald-400 text-emerald-100/80">{activeTranslation.learn}</button>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <button onClick={() => handleFeatureAccess('dashboard')} className="text-xs font-bold bg-emerald-800/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-300">{activeTranslation.dashboardTab}</button>
              <button onClick={() => { setIsLoggedIn(false); setHasPaid(false); setCurrentView('landing'); setSensorStatus('disconnected'); setIsAlertTriggered(false); setLoginEmail(''); }} className="text-xs font-bold bg-red-900/40 border border-red-700 px-3 py-1.5 rounded-lg">{activeTranslation.signOut}</button>
            </div>
          ) : (
            <button onClick={() => setCurrentView('login')} className="text-xs font-bold bg-emerald-500 text-[#063c25] px-4 py-2 rounded-full hover:bg-emerald-400">{activeTranslation.signIn}</button>
          )}

          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-emerald-900/60 border border-emerald-700 text-white text-xs rounded-lg px-2 py-1 focus:outline-none cursor-pointer">
            <option value="rw">Kinyarwanda</option>
            <option value="en">English</option>
          </select>
        </div>
      </nav>

      {/* EMERGENCY CRITICAL BANNER */}
      {isAlertTriggered && (sensorStatus === 'connected') && (
        <div className="bg-red-600 text-white font-bold text-center py-2 px-4 text-xs animate-bounce relative z-50 flex justify-center items-center gap-2 shadow-lg">
          {activeTranslation.aiAlertMessage} 
          {emailAlertEnabled && userEmail ? ` [Email: ${userEmail}]` : ''} 
          {phoneAlertEnabled && userPhone ? ` [Phone: ${userPhone}]` : ''} 
          {(!userEmail && !userPhone) ? activeTranslation.noFormFilled : ''}
        </div>
      )}

      {/* GATEWAY LOCK WARNING BANNER */}
      {authWarning && (
        <div className="max-w-4xl mx-auto px-6 mt-4 relative z-50">
          <div className="p-4 bg-amber-950/90 border border-amber-500 text-amber-200 text-xs rounded-xl shadow-lg">
            {authWarning}
          </div>
        </div>
      )}

      {/* MAIN CONTENT PORTAL */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        
        {/* ================= VIEW 1: LANDING HERO ================= */}
        {currentView === 'landing' && (
          <div className="text-center flex flex-col items-center justify-center pt-8">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
              {activeTranslation.heroTitle}
            </h1>
            <p className="mt-6 text-base sm:text-lg text-emerald-100/70 max-w-3xl font-light">
              {activeTranslation.heroSub}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center w-full sm:w-auto">
              <button onClick={() => handleFeatureAccess('dashboard')} className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-400 to-teal-400 text-[#063c25] font-bold rounded-full shadow-lg transform hover:scale-105 transition-all">
                {activeTranslation.btnStarted}
              </button>
              <button onClick={() => handleFeatureAccess('lms')} className="w-full sm:w-auto px-8 py-3.5 bg-emerald-800/40 text-emerald-300 font-semibold rounded-full border border-emerald-500/30 hover:bg-emerald-800/60 transition-all">
                {activeTranslation.btnLearn}
              </button>
            </div>
          </div>
        )}

        {/* ================= VIEW 2: AUTHENTICATION LOGIN ================= */}
        {currentView === 'login' && (
          <div className="max-w-md mx-auto bg-white text-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-100 mt-6">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3"><span className="text-xl">🐟</span></div>
              <h2 className="text-2xl font-black text-slate-800">{activeTranslation.loginTitle}</h2>
              <p className="text-xs text-slate-500 mt-1">{activeTranslation.loginSub}</p>
              <p className="text-[10px] bg-emerald-50 text-emerald-700 p-2 rounded-lg mt-2 font-mono">💡 Admin Tip: Use <b>admin@farm.com</b> to log in for FREE bypass.</p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email*</label>
                <input 
                  type="text" 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="admin@farm.com or client@farm.com" 
                  className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Password*</label>
                <input type="password" placeholder="••••••••" className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm focus:outline-none" />
              </div>
              <button onClick={handleFakeLogin} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-lg shadow-md">{activeTranslation.signIn}</button>
            </div>
          </div>
        )}

        {/* ================= VIEW 3: AFRICAN GATEWAY CHECKOUT ================= */}
        {currentView === 'payment' && (
          <div className="max-w-xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-black text-white">{activeTranslation.pricingTitle}</h2>
              <p className="text-xs text-emerald-300/70 mt-1">{activeTranslation.pricingSub}</p>
            </div>
            <div className="bg-[#05301d] border-2 border-emerald-500/50 rounded-2xl p-6 shadow-xl">
              
              {/* DYNAMIC EXCHANGE RATE DISPLAY PANEL */}
              <div className="flex justify-between items-center bg-emerald-950/80 p-4 rounded-xl border border-emerald-800 mb-6">
                <div>
                  <h4 className="font-bold text-base text-white">{activeTranslation.standardPlan}</h4>
                  <p className="text-[11px] text-emerald-400">IoT Hardware Sync + AI Assistant Access</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-300">
                    {paymentMethod === 'momo' ? `${rwfPrice.toLocaleString()} RWF` : `$${usdPrice} USD`}
                  </div>
                  <p className="text-[10px] text-white/50">
                    {paymentMethod === 'momo' ? `AI Auto-Convert ($${usdPrice} @ ${exchangeRateRwf})` : 'Card Direct USD Gateway'}
                  </p>
                </div>
              </div>

              <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">{activeTranslation.payTitle}</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button type="button" onClick={() => setPaymentMethod('momo')} className={`py-2 text-xs font-bold rounded-lg border transition-all ${paymentMethod === 'momo' ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-emerald-900/40 border-emerald-800 text-white'}`}>
                  📱 {activeTranslation.momoTab}
                </button>
                <button type="button" onClick={() => setPaymentMethod('card')} className={`py-2 text-xs font-bold rounded-lg border transition-all ${paymentMethod === 'card' ? 'bg-emerald-500 text-slate-900 border-amber-400' : 'bg-emerald-900/40 border-emerald-800 text-white'}`}>
                  💳 {activeTranslation.cardTab}
                </button>
              </div>

              <form onSubmit={handleAfricanPaymentSubmit} className="space-y-4">
                {paymentMethod === 'momo' ? (
                  <div>
                    <label className="block text-xs font-semibold text-emerald-200 mb-1">{activeTranslation.momoLabel}</label>
                    <input type="tel" value={payPhoneNumber} className="w-full bg-[#042819] border border-emerald-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-400 font-mono text-emerald-300" readOnly />
                    <p className="text-[10px] text-amber-400 mt-1">💰 Ubwishyu buhita buya kuri Konti ya Admin mu Manyarwanda.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input type="text" placeholder="Card Number (4000 1234 5678 9010)" className="w-full bg-[#042819] border border-emerald-700 rounded-lg px-3 py-2 text-sm focus:outline-none" required />
                  </div>
                )}
                
                <button type="submit" disabled={isProcessingPayment} className="w-full py-3 bg-emerald-400 hover:bg-emerald-300 text-[#063c25] font-black rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50">
                  {isProcessingPayment ? activeTranslation.payProcessing : `${activeTranslation.payBtnText} ${paymentMethod === 'momo' ? rwfPrice.toLocaleString() + ' RWF' : '$' + usdPrice}`}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= VIEW 4: SECURED CLOUD IOT DASHBOARD ================= */}
        {currentView === 'dashboard' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-emerald-900/40 pb-4 gap-4">
              <div>
                <h2 className="text-2xl font-black text-white">{activeTranslation.dashTitle}</h2>
                <p className="text-xs text-emerald-300/60">{activeTranslation.dashSub}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {sensorStatus === 'disconnected' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleSensorScanSimulation(true)} className="px-4 py-2 bg-emerald-500 text-[#063c25] font-bold text-xs rounded-lg shadow-md">
                      {activeTranslation.btnSimulateFound}
                    </button>
                    <button onClick={() => handleSensorScanSimulation(false)} className="px-4 py-2 bg-amber-600 text-white font-bold text-xs rounded-lg shadow-md">
                      {activeTranslation.btnSimulateNotFound}
                    </button>
                  </div>
                )}
                {sensorStatus === 'scanning' && (
                  <button className="px-4 py-2 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-md animate-pulse cursor-not-allowed">
                    {activeTranslation.statusScanning}
                  </button>
                )}
                {sensorStatus === 'connected' && (
                  <button onClick={() => setSensorStatus('disconnected')} className="px-4 py-2 bg-emerald-500 text-[#063c25] font-bold text-xs rounded-lg shadow-md">
                    {activeTranslation.statusConnected}
                  </button>
                )}
                {sensorStatus === 'not_found' && (
                  <button onClick={() => setSensorStatus('disconnected')} className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-md">
                    {activeTranslation.statusNotFound}
                  </button>
                )}
              </div>
            </div>

            {/* POND REAL-TIME TELEMETRY METRICS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-amber-950/30 border border-amber-500/40 rounded-xl">
                <span className="text-xs text-amber-400 font-bold block">{activeTranslation.phLabel}</span>
                <p className="text-4xl font-black mt-2 text-white">{sensorStatus === 'connected' ? '6.2' : '--'}</p>
                <p className="text-[11px] text-amber-200/60 mt-1">{sensorStatus === 'connected' ? activeTranslation.phDesc : activeTranslation.noSensor}</p>
              </div>
              <div className="p-5 bg-blue-950/30 border border-blue-500/40 rounded-xl">
                <span className="text-xs text-blue-400 font-bold block">{activeTranslation.tempLabel}</span>
                <p className="text-4xl font-black mt-2 text-white">{sensorStatus === 'connected' ? '26.8 °C' : '--'}</p>
                <p className="text-[11px] text-blue-200/60 mt-1">{sensorStatus === 'connected' ? activeTranslation.tempDesc : activeTranslation.noSensor}</p>
              </div>
              <div className="p-5 bg-teal-950/30 border border-teal-500/40 rounded-xl">
                <span className="text-xs text-teal-400 font-bold block">{activeTranslation.oxygenLabel}</span>
                <p className="text-4xl font-black mt-2 text-white">{sensorStatus === 'connected' ? '5.5 mg/L' : '--'}</p>
                <p className="text-[11px] text-teal-200/60 mt-1">{sensorStatus === 'connected' ? activeTranslation.oxygenDesc : activeTranslation.noSensor}</p>
              </div>
              <div className="p-5 bg-rose-950/30 border border-rose-500/40 rounded-xl">
                <span className="text-xs text-rose-400 font-bold block">{activeTranslation.healthLabel}</span>
                <p className="text-xl font-black mt-3 text-white">{sensorStatus === 'connected' ? (language === 'rw' ? 'Stress (Low pH) - Amafi afite ikibazo' : 'Stress (Low pH)') : '--'}</p>
                <p className="text-[11px] text-rose-200/60 mt-1">{sensorStatus === 'connected' ? activeTranslation.healthDesc : activeTranslation.noSensor}</p>
              </div>
            </div>

            {/* CUSTOM LOCALIZED NOTIFICATION SETTINGS FORM */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 p-6 rounded-2xl">
              <h3 className="text-sm font-bold uppercase text-emerald-400 mb-2">{activeTranslation.notifyTitle}</h3>
              <p className="text-xs text-emerald-100/70 mb-4">{activeTranslation.notifyDesc}</p>
              <form onSubmit={(e) => { e.preventDefault(); setIsConfigSaved(true); setTimeout(() => setIsConfigSaved(false), 3000); }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#042819] p-4 rounded-xl border border-emerald-900/60 flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-emerald-300">
                      <input type="checkbox" checked={emailAlertEnabled} onChange={() => setEmailAlertEnabled(!emailAlertEnabled)} className="w-4 h-4 text-emerald-500" />
                      <span>{activeTranslation.chkEmail}</span>
                    </label>
                    <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder={activeTranslation.placeholderEmail} className="w-full bg-emerald-900/30 border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" disabled={!emailAlertEnabled} />
                  </div>
                  <div className="bg-[#042819] p-4 rounded-xl border border-emerald-900/60 flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer text-sm font-bold text-emerald-300">
                      <input type="checkbox" checked={phoneAlertEnabled} onChange={() => setPhoneAlertEnabled(!phoneAlertEnabled)} className="w-4 h-4 text-emerald-500" />
                      <span>{activeTranslation.chkPhone}</span>
                    </label>
                    <input type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder={activeTranslation.placeholderPhone} className="w-full bg-emerald-900/30 border border-emerald-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none" disabled={!phoneAlertEnabled} />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-[#063c25] font-black px-6 py-2 rounded-xl text-xs">{activeTranslation.btnSaveConfig}</button>
                  {isConfigSaved && <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-lg">{activeTranslation.saveSuccess}</span>}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ================= VIEW 5: SECURED AI LMS ACADEMY ================= */}
        {currentView === 'lms' && (
          <div className="bg-emerald-950/30 border border-emerald-900/60 p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto animate-fadeIn">
            <div className="border-b border-emerald-800/60 pb-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-black text-emerald-400">{activeTranslation.lmsTitle}</h2>
                <p className="text-xs text-emerald-100/60 mt-1">{activeTranslation.lmsSub}</p>
              </div>
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full font-mono">{activeTranslation.lmsEngineStatus}</span>
            </div>

            <div className="bg-[#042819] p-5 rounded-xl border border-emerald-900 mb-8">
              <h3 className="text-sm font-bold text-emerald-400 mb-2">{activeTranslation.lmsInputLabel}</h3>
              <p className="text-xs text-emerald-100/50 mb-4">{activeTranslation.lmsInputDesc}</p>
              <form onSubmit={handleAiGenerateLesson} className="flex gap-2">
                <input type="text" value={searchTopic} onChange={(e) => setSearchTopic(e.target.value)} placeholder={activeTranslation.lmsPlaceholder} className="flex-1 bg-emerald-900/40 border border-emerald-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none" disabled={isGenerating} />
                <button type="submit" className="bg-emerald-500 hover:bg-emerald-400 text-[#063c25] font-black px-6 py-2.5 rounded-xl text-sm whitespace-nowrap" disabled={isGenerating}>
                  {isGenerating ? activeTranslation.lmsBtnGenerating : activeTranslation.lmsBtnGenerate}
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {aiLessons.map((lesson) => (
                <div key={lesson.id} className="p-5 bg-[#05301d] border-l-4 border-teal-400 rounded-r-xl shadow-md">
                  <h4 className="font-bold text-base text-white">{lesson.title}</h4>
                  <p className="text-xs text-emerald-100/70 mt-2 leading-relaxed">{lesson.content}</p>
                </div>
              ))}
              {defaultLessons.map((lesson) => (
                <div key={lesson.id} className="p-5 bg-[#05301d] border-l-4 border-emerald-500 rounded-r-xl shadow-md">
                  <h4 className="font-bold text-base text-white">{lesson.title}</h4>
                  <p className="text-xs text-emerald-100/70 mt-2 leading-relaxed">{lesson.content}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setCurrentView('landing')} className="mt-8 text-xs font-bold uppercase tracking-wider bg-emerald-800/50 border border-emerald-700 text-emerald-300 px-5 py-2.5 rounded-full">{activeTranslation.btnGoBack}</button>
          </div>
        )}

      </div>
    </div>
  );
}