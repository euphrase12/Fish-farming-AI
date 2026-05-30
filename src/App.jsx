import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Amakuru yawe y'ukuri ya Supabase twavanye kuri ecran yawe
const supabaseUrl = "https://tmpyhgahaktullkfrgtm.supabase.co";
const supabaseAnonKey = "sb_publishable_2g13AFP7w84gv1kqfdYq-w_VPr_5C0d"; 
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function App() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage('');
      
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });
      
      if (error) throw error;
      setMessage('Itegereze imeri yawe! Supabase ikohereje link yo kwinjira (Magic Link).');
    } catch (error) {
      setMessage(`Ikibazo: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      padding: '40px', 
      textAlign: 'center', 
      fontFamily: 'sans-serif', 
      maxWidth: '400px', 
      margin: '60px auto',
      backgroundColor: '#111827',
      color: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
    }}>
      <h2 style={{ color: '#38bdf8' }}>Aquaculture Intelligence Platform 🐟</h2>
      <p style={{ color: '#9ca3af' }}>Yinjize imeri yawe hano ngo uhawe link yo kwinjira kuri Dashboard:</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
        <input 
          type="email" 
          placeholder="Andika imeri yawe (e.g. name@gmail.com)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ 
            padding: '12px', 
            borderRadius: '6px', 
            border: '1px solid #374151', 
            fontSize: '16px',
            backgroundColor: '#1f2937',
            color: 'white'
          }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#0284c7',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            transition: 'background-color 0.2s'
          }}
        >
          {loading ? 'Irimo koherereza...' : 'Nkoherereza Link yo Kwinjira'}
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#34d399' }}>{message}</p>}
    </div>
  );
}
