import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [data, setData] = useState({ oxygen: 5.5, ph: 7.2, temp: 25.4, detected: true });

  // Iyi function ifasha dashboard kwivugurura buri masegonda 5
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('https://fish-farming-ai.vercel.app/api/live-sensors');
        const result = await res.json();
        setData(result);
      } catch (err) { console.error("Error fetching:", err); }
    };
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-800">FarmSmart AI Dashboard</h1>
        <p className="text-gray-600">Real-time monitoring for your Nyamasheke farm.</p>
      </header>

      {/* Sensor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-2xl shadow-sm border-l-4 ${data.oxygen < 4 ? 'border-red-500 bg-red-50' : 'border-green-500 bg-white'}`}>
          <h3 className="text-sm text-gray-500 font-bold uppercase">Oxygen</h3>
          <p className="text-4xl font-black mt-2">{data.oxygen} <span className="text-lg text-gray-400">mg/L</span></p>
        </div>
        
        <div className="p-6 bg-white rounded-2xl shadow-sm border-l-4 border-blue-500">
          <h3 className="text-sm text-gray-500 font-bold uppercase">pH Level</h3>
          <p className="text-4xl font-black mt-2">{data.ph}</p>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-sm border-l-4 border-yellow-500">
          <h3 className="text-sm text-gray-500 font-bold uppercase">Temperature</h3>
          <p className="text-4xl font-black mt-2">{data.temp} °C</p>
        </div>
      </div>

      {/* AI Advice Section */}
      <div className="mt-8 p-6 bg-white rounded-2xl shadow-md border border-green-100">
        <h2 className="text-xl font-bold text-green-900 mb-4">🤖 AI Insights</h2>
        <div className="text-gray-700">
          {data.oxygen < 4 ? 
            <p className="text-red-600 font-bold">⚠️ CRITICAL: Oxygen level is too low. Activate aerators immediately!</p> : 
            <p>✅ Water quality is optimal. Continue normal feeding schedule.</p>}
        </div>
      </div>
    </div>
  );
}