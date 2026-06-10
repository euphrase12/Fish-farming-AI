import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';

export default function FeedbackAnalyzer() {
  const STORAGE_KEY = 'feedback_records';
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      setRecords(raw ? JSON.parse(raw) : []);
    } catch (e) {
      setRecords([]);
    }
  }, []);

  const handleAnalyze = async () => {
    setError(null);
    setResult('');
    setLoading(true);
    try {
      const resp = await fetch('/api/feedback-analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackRecords: records }),
      });
      if (!resp.ok) throw new Error(`Server error: ${resp.status}`);
      const data = await resp.json();
      setResult(data.text || JSON.stringify(data));
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white">Feedback Analyzer</h3>
        <div className="text-sm text-slate-300">Records: {records.length}</div>
      </div>

      <Card>
        <div className="space-y-4">
          <p className="text-sm text-slate-300">This tool sends collected stakeholder feedback to Gemini for analysis.</p>

          <div className="flex gap-3">
            <button
              onClick={handleAnalyze}
              disabled={loading || records.length === 0}
              className={`rounded-xl px-4 py-2 font-semibold ${loading || records.length === 0 ? 'bg-slate-700 text-slate-400' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
            >
              {loading ? 'Analyzing…' : 'Analyze with Gemini AI'}
            </button>
            <button
              onClick={() => { setResult(''); setError(null); }}
              className="rounded-xl px-4 py-2 bg-gray-800 text-white"
            >
              Clear
            </button>
          </div>

          {loading && (
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <svg className="w-5 h-5 animate-spin text-emerald-300" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.2" />
                <path d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
              <span>Waiting for AI response…</span>
            </div>
          )}

          {error && (
            <div className="rounded-xl border border-red-600 bg-red-900/20 p-3 text-sm text-red-300">{error}</div>
          )}

          {result && (
            <div className="mt-2">
              <h4 className="text-sm font-semibold text-white mb-2">Analysis Result</h4>
              <div className="whitespace-pre-wrap text-sm text-slate-200 bg-[#042819] p-4 rounded-lg border border-emerald-900/40 shadow-inner">
                {result}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
