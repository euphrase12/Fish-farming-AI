 import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AuthForm({ onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState(''); // Amazina
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Terefone yo kwakiraho alerts
  const [password, setPassword] = useState(''); // Create new password
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm new password
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage('');

    if (isSignUp && password !== confirmPassword) {
      setError('Password zanditse ntizihuye! Ongera ugerageze.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Kwiyandikisha (Register) + Kubika amakuru ya Alerts muri Metadata
        const { data, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              display_name: displayName,
              phone_alert: phone, // Inomero izajya ihamagarwaho/yoherezwaho SMS
              alert_status: true  // Kwemera kwakira alerts kuri Temperature, pH, na Oxygen
            }
          }
        });
        if (signUpError) throw signUpError;
        setMessage('Kuriha no kwiyandikisha byagenze neza! Ubu ushobora kwinjira.');
        setIsSignUp(false);
        setPassword('');
        setConfirmPassword('');
      } else {
        // Kwinjira (Sign In)
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInError) throw signInError;
        
        if (data?.session) {
          onAuthSuccess(data.session);
        }
      }
    } catch (err) {
      setError(err.message || 'Havutse ikibazo, ongera ugerageze.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '30px auto', padding: '25px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#10b981', marginBottom: '20px' }}>
        {isSignUp ? '📝 Register (Kora Konti Nshya)' : '🔑 Injira muri Fish-Farming-AI'}
      </h2>

      {error && <div style={{ color: 'red', backgroundColor: '#fee2e2', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>{error}</div>}
      {message && <div style={{ color: 'green', backgroundColor: '#d1fae5', padding: '10px', borderRadius: '4px', marginBottom: '15px', fontSize: '14px' }}>{message}</div>}

      <form onSubmit={handleAuth}>
        
        {/* === IYANDIKISHA (REGISTER) ONLY FIELDS === */}
        {isSignUp && (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Amazina yawe (Full Name):</label>
              <input 
                type="text" 
                value={displayName} 
                onChange={(e) => setDisplayName(e.target.value)} 
                required 
                placeholder="Urugero: Mukandayishimiye Euphrasie"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Inomero y'Itelefone (Alert Phone):</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
                placeholder="Urugero: +250788000000"
                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
              />
              <small style={{ color: '#6b7280', display: 'block', marginTop: '4px' }}>
                ⚠️ Iyi nomero ni yo izajya yakiriraho *Alerts* igihe sensor ibonye Temperature, pH, cyangwa Oxygen idahagije mu mazi!
              </small>
            </div>
          </>
        )}

        {/* === SHARED FIELDS (LOGIN & REGISTER) === */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email yawe:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="urugero@gmail.com"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            {isSignUp ? 'Create New Password:' : 'Password:'}
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="******"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
        </div>

        {isSignUp && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Confirm New Password:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
              placeholder="******"
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            />
          </div>
        )}

        <button 
          type="submit" 
          disabled={loading}
          style={{ width: '100%', padding: '10px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
        >
          {loading ? 'Tegereza...' : isSignUp ? 'Register (Kora Konti)' : 'Injira'}
        </button>
      </form>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button 
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
            setMessage('');
          }} 
          style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', textDecoration: 'underline' }}
        >
          {isSignUp ? 'Ese ufite konti? Injira hano' : 'Nta konti ufite? Iyandikishe hano'}
        </button>
      </div>
    </div>
  );
}