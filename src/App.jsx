import React, { useState } from 'react';

export default function App() {
  const [problem, setProblem] = useState('');
  const [s1Resonate, setS1Resonate] = useState('');
  const [s1Aspects, setS1Aspects] = useState('');
  const [s1Questions, setS1Questions] = useState('');
  const [s1Missing, setS1Missing] = useState('');
  const [s2Resonate, setS2Resonate] = useState('');
  const [s2Aspects, setS2Aspects] = useState('');
  const [s2Questions, setS2Questions] = useState('');
  const [s2Missing, setS2Missing] = useState('');
  const [entries, setEntries] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!problem.trim()) return;

    const entry = {
      id: Date.now(),
      problem: problem.trim(),
      stakeholder1: {
        resonate: s1Resonate.trim(),
        aspects: s1Aspects.trim(),
        questions: s1Questions.trim(),
        missing: s1Missing.trim(),
      },
      stakeholder2: {
        resonate: s2Resonate.trim(),
        aspects: s2Aspects.trim(),
        questions: s2Questions.trim(),
        missing: s2Missing.trim(),
      },
    };

    setEntries([entry, ...entries]);
    setProblem('');
    setS1Resonate('');
    setS1Aspects('');
    setS1Questions('');
    setS1Missing('');
    setS2Resonate('');
    setS2Aspects('');
    setS2Questions('');
    setS2Missing('');
  };

  const renderStakeholderSection = (
    title,
    resonate,
    setResonate,
    aspects,
    setAspects,
    questions,
    setQuestions,
    missing,
    setMissing,
  ) => (
    <div className="space-y-4 rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">{title}</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700">Does this problem resonate with them?</label>
        <textarea
          value={resonate}
          onChange={(e) => setResonate(e.target.value)}
          rows="3"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">What aspects do they think matter most?</label>
        <textarea
          value={aspects}
          onChange={(e) => setAspects(e.target.value)}
          rows="3"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">What questions or concerns come to mind?</label>
        <textarea
          value={questions}
          onChange={(e) => setQuestions(e.target.value)}
          rows="3"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">What are you missing about this problem?</label>
        <textarea
          value={missing}
          onChange={(e) => setMissing(e.target.value)}
          rows="3"
          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4">
      <div className="mx-auto w-full max-w-5xl rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">AI Founders Toolkit</h1>
          <p className="mt-3 text-sm text-slate-600">Start to collect feedback on my problem.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label className="block text-sm font-medium text-slate-700">Problem</label>
            <textarea
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              rows="4"
              placeholder="Describe the business problem you want to tackle"
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-slate-900 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {renderStakeholderSection(
              'Stakeholder 1',
              s1Resonate,
              setS1Resonate,
              s1Aspects,
              setS1Aspects,
              s1Questions,
              setS1Questions,
              s1Missing,
              setS1Missing,
            )}
            {renderStakeholderSection(
              'Stakeholder 2',
              s2Resonate,
              setS2Resonate,
              s2Aspects,
              setS2Aspects,
              s2Questions,
              setS2Questions,
              s2Missing,
              setS2Missing,
            )}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full rounded-3xl bg-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              Save Problem and Feedback
            </button>
          </div>
        </form>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-xl font-semibold text-slate-900">Collected Feedback</h2>

          {entries.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">No problem saved yet. Once you save, the problem and stakeholder feedback will appear here.</p>
          ) : (
            <div className="mt-6 space-y-6">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div>
                    <p className="text-sm text-slate-500">Problem</p>
                    <p className="mt-2 text-base font-medium text-slate-900">{entry.problem}</p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Stakeholder 1</p>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Resonate?</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder1.resonate || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Key aspects</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder1.aspects || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Questions / concerns</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder1.questions || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Missing</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder1.missing || '—'}</p>
                      </div>
                    </div>

                    <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-semibold text-slate-900">Stakeholder 2</p>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Resonate?</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder2.resonate || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Key aspects</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder2.aspects || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Questions / concerns</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder2.questions || '—'}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Missing</p>
                        <p className="mt-1 text-slate-800">{entry.stakeholder2.missing || '—'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
