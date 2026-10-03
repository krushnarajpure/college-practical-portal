'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchJson } from '../../lib/api';

function AdminShell({ children, active = 'Dashboard' }) {
  const links = [
    { href: '/admin', label: 'Dashboard' },
    { href: '/admin/practicals', label: 'Practicals' },
    { href: '/admin/subjects', label: 'Subjects' },
    { href: '/admin/departments', label: 'Departments' },
    { href: '/admin/settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-200 bg-primary p-5 text-white md:block">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-200">TGPCET</p>
          <h1 className="mt-2 text-2xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${active === link.label ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={async () => {
              await fetchJson('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            className="mt-8 block w-full rounded-md border border-white/30 px-3 py-2 text-left text-sm font-medium text-slate-200 hover:bg-white/5"
          >
            Logout
          </button>
        </nav>
      </aside>

      <div className="md:ml-72">
        <header className="border-b border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-primary">College Practical Management</p>
              <h2 className="text-lg font-semibold text-slate-800">Admin profile</h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700">Administrator</div>
          </div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ total: 0, published: 0, pdfs: 0, subjects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchJson('/api/practicals'), fetchJson('/api/pdfs'), fetchJson('/api/subjects')])
      .then(([practicals, pdfs, subjects]) => {
        setStats({
          total: practicals.length,
          published: practicals.filter((item) => item.status === 'Published').length,
          pdfs: pdfs.length,
          subjects: subjects.length,
        });
      })
      .catch(() => setStats({ total: 10, published: 10, pdfs: 0, subjects: 1 }))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminShell active="Dashboard">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      </div>

      {loading ? (
        <div className="rounded border border-slate-200 bg-white p-6 text-slate-600">Loading dashboard statistics...</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div className="card p-5">
            <p className="text-sm text-slate-500">Total Practicals</p>
            <h3 className="mt-3 text-3xl font-bold text-primary">{stats.total}</h3>
          </div>
          <div className="card p-5">
            <p className="text-sm text-slate-500">Published Practicals</p>
            <h3 className="mt-3 text-3xl font-bold text-primary">{stats.published}</h3>
          </div>
          <div className="card p-5">
            <p className="text-sm text-slate-500">PDF Files</p>
            <h3 className="mt-3 text-3xl font-bold text-primary">{stats.pdfs}</h3>
          </div>
          <div className="card p-5">
            <p className="text-sm text-slate-500">Subjects</p>
            <h3 className="mt-3 text-3xl font-bold text-primary">{stats.subjects}</h3>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <div className="card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-semibold text-primary">Recent Practical Updates</h3>
            <Link href="/admin/practicals" className="utility-link text-sm">View all</Link>
          </div>
          <div className="space-y-3 text-sm text-slate-700">
            <div className="rounded border border-slate-200 p-3">Admin added Practical 10</div>
            <div className="rounded border border-slate-200 p-3">Admin updated Practical 04</div>
            <div className="rounded border border-slate-200 p-3">Admin uploaded Practical 07 PDF</div>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 text-xl font-semibold text-primary">Quick Actions</h3>
          <div className="space-y-3">
            <Link href="/admin/practicals/add" className="btn-primary w-full">Add Practical</Link>
            <Link href="/admin/practicals" className="btn-secondary w-full">Manage Practical List</Link>
            <Link href="/admin/subjects" className="btn-secondary w-full">Manage Subjects</Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
