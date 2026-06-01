import React, { useState } from 'react';

export default function RegistrationPage({ farmerName, setFarmerName, location, setLocation, handleAuthorize }) {
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(true); // Guhinduranya Log In na Sign Up

  const onSubmit = (e) => {
    e.preventDefault();
    if (!password.trim()) {
      alert("Wibuke gushyiramo Password rwose!");
      return;
    }
    handleAuthorize(e, password, isRegistering);
  };

  return (
    <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 p-6 rounded-2xl shadow-xl backdrop-blur-sm">
      <h2 className="text-xl font-bold text-slate-200 mb-2 text-center">
        {isRegistering ? "Create Farmer Account" : "Farmer Log In"}
      </h2>
      <p className="text-xs text-slate-400 text-center mb-6">Secure Access to Fish-Farming-AI</p>
      
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Farmer Name (Username)</label>
          <input 
            type="text" 
            value={farmerName}
            onChange={(e) => setFarmerName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="Manirafasha Patrick"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Location</label>
          <input 
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="Huye District"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Password</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all shadow-lg">
          {isRegistering ? "Register & Save Account" : "Verify & Log In"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsRegistering(!isRegistering)} 
          className="text-xs text-emerald-400 hover:underline"
        >
          {isRegistering ? "Ufite konti se? Log In hano" : "Ntabwo uriyandikisha? Kora Account hano"}
        </button>
      </div>
    </div>
  );
}