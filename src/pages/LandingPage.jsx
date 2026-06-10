import React from "react";
import Button from '../components/Button.jsx';
import Card from '../components/Card.jsx';
import NavBar from '../components/NavBar.jsx';

export default function LandingPage({ onNavigate, onLanguageChange, language, onStart, onLearn }) {
  return (
    <div className="min-h-screen bg-[#063c25] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),transparent_30%)] pointer-events-none" />
      <NavBar onNavigate={onNavigate} onLanguageChange={onLanguageChange} language={language} view="landing" />

      <main className="relative z-10 mx-auto flex max-w-6xl flex-col gap-8 px-5 py-8">
        <Card>
          <div className="space-y-6">
            <p className="text-sm uppercase tracking-[0.35em] text-emerald-300/80">Smart Fish Farming AI</p>
            <h1 className="text-4xl font-black text-white md:text-6xl">Transforming Fish Farming with Real-Time AI Monitoring</h1>
            <p className="max-w-3xl text-lg text-emerald-100/85">Start monitoring pH, oxygen, temperature, and fish health instantly with a practical dashboard and easy payment workflow. Make smarter pond decisions from day one.</p>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onStart} variant="primary">Start</Button>
              <Button onClick={onLearn} variant="secondary">Learn More</Button>
            </div>
          </div>
        </Card>

        <div id="features" className="grid gap-4 md:grid-cols-3">
          <Card>
            <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300/80">Features</p>
            <h3 className="mt-2 text-xl font-black text-white">AI pond insights</h3>
            <p className="mt-2 text-sm text-emerald-100/80">Track pH, oxygen, temperature, and fish health in one live dashboard.</p>
          </Card>
          <Card id="pricing">
            <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300/80">Pricing</p>
            <h3 className="mt-2 text-xl font-black text-white">Simple access plans</h3>
            <p className="mt-2 text-sm text-emerald-100/80">A secure payment step unlocks the monitoring or learning experience you choose.</p>
          </Card>
          <Card id="testimonials">
            <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300/80">Testimonials</p>
            <h3 className="mt-2 text-xl font-black text-white">Trusted by pond managers</h3>
            <p className="mt-2 text-sm text-emerald-100/80">Farmers use the app to act faster on alerts, improve water stability, and save time in the field.</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
