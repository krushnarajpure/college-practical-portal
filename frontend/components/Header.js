import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/practicals', label: 'Practicals' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/admin/login', label: 'Admin' },
];

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">TGPCET</span>
          <span className="text-sm font-medium text-slate-700">Department of AI & ML</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-700 transition hover:text-primary">
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="/admin/login" className="btn-primary hidden md:inline-flex">
          Admin Login
        </Link>
      </div>
    </header>
  );
}
