import Link from 'next/link';

export default function PracticalCard({ practical }) {
  return (
    <div className="card p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">Practical {String(practical.practicalNumber).padStart(2, '0')}</span>
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-medium uppercase text-slate-600">
          {practical.status || 'Published'}
        </span>
      </div>

      <h3 className="mb-2 text-xl font-semibold text-slate-800">{practical.title}</h3>

      <div className="mb-4 flex flex-wrap gap-2">
        {(practical.topics || []).slice(0, 3).map((topic) => (
          <span key={topic} className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600">
            {topic}
          </span>
        ))}
      </div>

      <Link href={`/practicals/${practical.practicalNumber}`} className="btn-primary w-full">
        View Practical
      </Link>
    </div>
  );
}
