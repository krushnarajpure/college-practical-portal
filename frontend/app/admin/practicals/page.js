'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchJson } from '../../../lib/api';

function AdminShell({ children, active = 'Practicals' }) {
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
            <Link key={link.href} href={link.href} className={`block rounded-md px-3 py-2 text-sm font-medium ${active === link.label ? 'bg-white/10 text-white' : 'text-slate-200 hover:bg-white/5'}`}>
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="md:ml-72">
        <header className="border-b border-slate-200 bg-white px-5 py-4"><div className="flex items-center justify-between"><p className="text-xs uppercase tracking-[0.2em] text-primary">College Practical Management</p><div className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm text-slate-700">Administrator</div></div></header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminPracticalsPage() {
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    fetchJson('/api/practicals')
      .then((data) => setPracticals(data))
      .catch(() => setPracticals([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this practical?')) return;
    await fetchJson(`/api/practicals/${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <AdminShell active="Practicals">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary">Manage</p>
          <h1 className="text-3xl font-bold text-primary">Practical List</h1>
        </div>
        <Link href="/admin/practicals/add" className="btn-primary">Add Practical</Link>
      </div>

      {loading ? (
        <div className="rounded border border-slate-200 bg-white p-6 text-slate-600">Loading practicals...</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th className="px-4 py-3">No.</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {practicals.map((item) => (
                <tr key={item._id || item.practicalNumber} className="border-t border-slate-200">
                  <td className="px-4 py-3">{item.practicalNumber}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{item.title}</td>
                  <td className="px-4 py-3">{item.status || 'Published'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link href={`/admin/practicals/${item.practicalNumber}/edit`} className="btn-secondary text-xs">Edit</Link>
                      <button type="button" onClick={() => handleDelete(item.practicalNumber)} className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
