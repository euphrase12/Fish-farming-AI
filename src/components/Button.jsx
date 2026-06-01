import React from 'react';

export default function Button({ children, onClick, type = "button", variant = "primary", className = "" }) {
  const baseStyle = "w-full font-bold py-3 px-4 rounded-xl transition-all shadow-lg";
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-emerald-500/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700"
  };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}