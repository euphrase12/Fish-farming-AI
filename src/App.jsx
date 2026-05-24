import React, { useState } from 'react';

function App() {
  const [problem, setProblem] = useState('ubushyuhe bwamazi bunganiki');
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    localStorage.setItem('core_problem', problem);
    alert('Problem saved in localStorage!');
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setResults('Groq AI (Llama 3.3) iri gusesengura amakuru, tegereza gake...');
    
    try {
      const response = await fetch('http://localhost:3000/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem })
      });
      
      const data = await response.json();
      if (data.error) {
        setResults(`🚨 Ikosa: ${data.error}`);
      } else {
        setResults(data.text);
      }
    } catch (err) {
      setResults(`🚨 Ikosa ry'ikoranabuhanga: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px', fontFamily: 'Arial', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#0d6efd' }}>Feedback Analyzer</h2>
      <p style={{ textAlign: 'center', color: 'gray', fontStyle: 'italic' }}>Find patterns across all your feedback</p>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '8px' }}>Enter the Core Problem Statement:</label>
        <textarea 
          style={{ width: '100%', padding: '12px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
          rows="4" 
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
        />
      </div>

      <button onClick={handleSave} style={{ width: '100%', padding: '12px', background: '#ffc107', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer', marginBottom: '10px' }}>Save Problem</button>
      <button onClick={handleAnalyze} disabled={loading} style={{ width: '100%', padding: '12px', background: '#198754', color: 'white', fontWeight: 'bold', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        {loading ? 'Analyzing...' : 'Analyze All Feedback'}
      </button>

      <h3 style={{ marginTop: '25px' }}>AI Analysis Results:</h3>
      <div style={{ background: '#f8f9fa', padding: '15px', borderLeft: '4px solid #198754', whiteSpace: 'pre-wrap' }}>{results}</div>
    </div>
  );
}

export default App;