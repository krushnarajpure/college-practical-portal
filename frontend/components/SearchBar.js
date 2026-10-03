export default function SearchBar({ value, onChange, placeholder = 'Search practicals...' }) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type="search"
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 pr-10 text-sm text-slate-800 outline-none ring-0 transition focus:border-primary"
        placeholder={placeholder}
        aria-label="Search practicals"
      />
      <span className="pointer-events-none absolute right-3 top-3 text-slate-400">⌕</span>
    </div>
  );
}
