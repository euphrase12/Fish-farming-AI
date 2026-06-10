import React, { useState } from 'react';
import { WaterTelemetryDashboard } from '../features/WaterTelemetry/index.js';

export default function DashboardPage({ sensorData, refreshSensors, onAnalyze, aiAdvice, onLogout }) {
  const [showLegacy, setShowLegacy] = useState(false);

  return (
    <div className="min-h-screen bg-[#060b08] text-slate-100 font-sans">
      {/* Top Navigation */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
        <div className="flex justify-between items-center p-4 md:p-6">
          <h1 className="text-2xl font-black text-emerald-400">Smart Fish Farming AI</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowLegacy(!showLegacy)}
              className="text-xs bg-purple-900/30 text-purple-400 px-3 py-2 rounded-full border border-purple-900/50 hover:bg-purple-900/50 transition-colors"
              title="Toggle legacy dashboard view"
            >
              {showLegacy ? '📊 New Dashboard' : '📈 Legacy View'}
            </button>
            <button
              onClick={onLogout}
              className="text-xs bg-red-900/20 text-red-400 px-4 py-2 rounded-full border border-red-900/30 hover:bg-red-900/40 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {showLegacy ? (
        /* Legacy Dashboard View */
        <div className="p-6">
          {/* Sensor Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <SensorCard title="Water Temp" value={`${sensorData.temp}°C`} icon="🌡️" color="border-yellow-500" />
            <SensorCard title="pH Level" value={sensorData.ph} icon="🧪" color="border-blue-500" />
            <SensorCard title="Oxygen" value={`${sensorData.oxygen} mg/L`} icon="💨" color="border-emerald-500" />
            <SensorCard title="Fish Health" value={sensorData.fishHealth} icon="🐟" color="border-purple-500" />
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-10">
            <button onClick={refreshSensors} className="bg-emerald-600 px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-emerald-500 transition-colors">
              Refresh Telemetry
            </button>
            <button onClick={onAnalyze} className="bg-slate-800 px-6 py-3 rounded-xl font-bold text-xs uppercase hover:bg-slate-700 transition-colors">
              Get AI Advice
            </button>
          </div>

          {/* Advice Section */}
          <div className="bg-[#0b140f] p-8 rounded-2xl border border-emerald-900/40">
            <h2 className="text-lg font-bold text-white mb-4">🤖 AI Operational Insights</h2>
            <p className="text-slate-300 text-sm leading-relaxed">{aiAdvice}</p>
          </div>
        </div>
      ) : (
        /* New Water Telemetry Dashboard */
        <WaterTelemetryDashboard pondId="default" autoRefresh={true} />
      )}
    </div>
  );
}

function SensorCard({ title, value, icon, color }) {
  return (
    <div className={`bg-[#0b140f] p-6 rounded-2xl border-l-4 ${color} border border-emerald-950/40`}>
      <span className="text-2xl mb-2 block">{icon}</span>
      <h3 className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-2xl font-black mt-1">{value}</p>
    </div>
  );
}