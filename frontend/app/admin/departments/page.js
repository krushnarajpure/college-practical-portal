'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchJson } from '../../../lib/api';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: '', code: '' });
  const [error, setError] = useState('');

  const loadData = () => {
    fetchJson('/api/departments')
      .then((data) => setDepartments(data))
      .catch(() => setDepartments([]));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchJson('/api/departments', { method: 'POST', body: JSON.stringify(form) });
      setForm({ name: '', code: '' });
      loadData();
    } catch (err) {
      setError(err.message || 'Unable to save department.');
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="text-3xl font-bold text-primary">Departments</h1>
          </div>
          <Link href="/admin" className="btn-secondary">Dashboard</Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <form onSubmit={handleSubmit} className="card p-5">
            <h2 className="mb-4 text-xl font-semibold text-primary">Add Department</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Department Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Department Code</label>
                <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" required />
              </div>
              {error && <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
              <button type="submit" className="btn-primary w-full">Save Department</button>
            </div>
          </form>

          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="text-xl font-semibold text-primary">Department List</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {departments.map((department) => (
                <div key={department._id} className="flex items-center justify-between px-5 py-4">
                  <div>
                    <div className="font-semibold text-slate-800">{department.name}</div>
                    <div className="text-sm text-slate-500">{department.code}</div>
                  </div>
                  <button type="button" className="btn-secondary text-xs">View</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
