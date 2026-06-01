import React from 'react';

export default function MetricCard({ title, value, unit = "", valueColor = "text-emerald-400" }) {
  return (
    <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl">
      <span className="block text-xs text-slate-400 mb-1">{title}</span>
      <span className={`text-xl font-bold ${valueColor}`}>
        {value ? `${value} ${unit}` : '--'}
      </span>
    </div>
  );
}