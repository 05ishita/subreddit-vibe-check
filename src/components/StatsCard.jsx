function StatsCard({ title, value, emoji }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <div className="text-2xl">{emoji}</div>
      <p className="mt-3 text-sm text-slate-400">{title}</p>
      <p className="mt-1 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

export default StatsCard;