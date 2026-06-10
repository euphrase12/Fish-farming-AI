export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }) {
  const base = 'rounded-full px-5 py-3 text-sm font-semibold shadow-lg transition focus:outline-none focus:ring-2 focus:ring-emerald-400';
  const variants = {
    primary: 'bg-emerald-400 text-[#063c25] hover:bg-emerald-300 shadow-emerald-500/20',
    secondary: 'border border-emerald-700 bg-emerald-900/50 text-white hover:bg-emerald-800',
    ghost: 'border border-emerald-700 bg-transparent text-emerald-100 hover:bg-emerald-900/60',
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
