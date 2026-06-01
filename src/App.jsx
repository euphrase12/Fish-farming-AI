import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Utwongerera kodi twawe tw'ukuri twa Supabase twavuye ku ishusho image_2312f9.png
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
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Aquaculture Intelligence Platform 🐟</h2>
      <p>Yinjize imeri yawe hano ngo uhawe link yo kwinjira:</p>
      
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Andika imeri yawe (e.g. name@gmail.com)" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button 
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: '#008080',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px'
          }}
        >
          {loading ? 'Irimo koherereza...' : 'Nkoherereza Link yo Kwinjira'}
        </button>
      </form>
      {message && <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#333' }}>{message}</p>}
    </div>
  );
}