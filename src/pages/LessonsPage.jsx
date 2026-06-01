import React from 'react';

export default function LessonsPage({ setStep }) {
  return (
    <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-200">AI Ventures Lesson Repository</h2>
          <p className="text-xs text-slate-400">14-Lesson Interactive Aquaculture Syllabus</p>
        </div>
        <button onClick={() => setStep('select')} className="text-xs text-amber-400 hover:underline">Back</button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {Array.from({ length: 14 }, (_, i) => (
          <div 
            key={i} 
            onClick={() => alert(`Iyi ni Lesson ${i + 1} - Placeholder mu gihe tutari gushyiramo AI!`)}
            className="bg-slate-950 border border-slate-800 hover:border-emerald-500/50 p-4 rounded-xl text-center cursor-pointer transition-all"
          >
            <span className="block text-xs text-emerald-400 font-bold mb-1">Lesson {i + 1}</span>
            <span className="text-[10px] text-slate-500 block">Aquaculture Unit</span>
          </div>
        ))}
      </div>
    </div>
  );
}