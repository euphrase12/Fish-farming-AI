export default function Card({ children, className = '' }) {
  return (
    <article className={`rounded-[1.75rem] border border-emerald-900/60 bg-[#042819]/90 p-6 shadow-2xl shadow-emerald-950/30 ${className}`}>
      {children}
    </article>
  );
}
