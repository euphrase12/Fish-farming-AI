import React from 'react';
import MetricCard from '../components/MetricCard';
import Button from '../components/Button';

export default function DashboardPage({ farmerName, location, metrics, loading, handleConnectSensor, setStep }) {
  return (
    <div className="w-full max-w-xl bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-200">Water Measurement Dashboard</h2>
          <p className="text-xs text-slate-400">Farmer: {farmerName} | {location}</p>
        </div>
        <button onClick={() => setStep('select')} className="text-xs text-amber-400 hover:underline">Back</button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <MetricCard title="Temperature" value={metrics ? metrics.temperature : null} unit="°C" />
        <MetricCard title="pH Level" value={metrics ? metrics.ph : null} />
        <MetricCard title="Dissolved Oxygen" value={metrics ? metrics.oxygen : null} unit="mg/L" />
        
        <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
          <span className="block text-xs text-slate-400 mb-1">Fish Health Status</span>
          <span className={`text-sm font-bold block mt-1 ${metrics ? 'text-amber-500' : 'text-slate-500'}`}>
            {metrics ? metrics.health : 'No connection yet'}
          </span>
        </div>
      </div>

      {loading && <p className="text-sm text-center text-amber-400 animate-pulse mb-4">⏳ Analyzing pond water telemetry...</p>}

      <Button onClick={handleConnectSensor}>
        Connect Sensor AI
      </Button>
    </div>
  );
}