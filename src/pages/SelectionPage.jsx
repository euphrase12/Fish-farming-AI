import React from 'react';

export default function SelectionPage({ farmerName, location, selectedRoute, setSelectedRoute, handleStart }) {
  return (
    <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl text-center">
      <h2 className="text-xl font-bold text-slate-200 mb-2">Muraho neza, {farmerName}!</h2>
      <p className="text-xs text-emerald-400 mb-6">📍 Authorized for location: {location}</p>
      
      <div className="space-y-4 mb-6 text-left">
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">Choose Venture Path</label>
        <select 
          value={selectedRoute}
          onChange={(e) => setSelectedRoute(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="dashboard">Water Measurement Dashboard</option>
          <option value="lessons">Proceed AI Ventures Lessons (Syllabus)</option>
        </select>
      </div>

      <button onClick={handleStart} className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all">
        Start Venture
      </button>
    </div>
  );
}