import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-primary text-white">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">Tulsiramji Gaikwad-Patil College of Engineering and Technology</h3>
            <p className="text-sm text-slate-200">Department of Artificial Intelligence & Machine Learning</p>
            <p className="mt-2 text-sm text-slate-200">Wardha Road, Nagpur - 441108</p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">Quick Links</h4>
            <div className="flex flex-col gap-2 text-sm text-slate-200">
              <Link href="/">Home</Link>
              <Link href="/practicals">Practicals</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/admin/login">Admin</Link>
            </div>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.15em] text-slate-200">Academic</h4>
            <p className="text-sm text-slate-200">Data Structure & Algorithms Lab</p>
            <p className="text-sm text-slate-200">B.Tech – Semester III</p>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-600 pt-4 text-sm text-slate-200">
          © {currentYear} TGPCET – Practical Management Portal
        </div>
      </div>
    </footer>
  );
}
