'use client';

import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchJson } from '../../../../../lib/api';

export default function EditPracticalPage() {
  const router = useRouter();
  const params = useParams();
  const practicalId = params.id;
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson(`/api/practicals/${practicalId}`)
      .then((data) => {
        setForm({
          ...data,
          topics: Array.isArray(data.topics) ? data.topics.join(', ') : '',
        });
      })
      .catch(() => setForm({}))
      .finally(() => setLoading(false));
  }, [practicalId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetchJson(`/api/practicals/${practicalId}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...form,
        practicalNumber: Number(form.practicalNumber),
        topics: form.topics.split(',').map((topic) => topic.trim()).filter(Boolean),
      }),
    });
    router.push('/admin/practicals');
  };

  if (loading) {
    return <main className="min-h-screen bg-slate-100 p-6 text-slate-600">Loading practical...</main>;
  }

  if (!form || !form.title) {
    return <main className="min-h-screen bg-slate-100 p-6"><div className="card p-6 text-slate-600">Practical not found.</div></main>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="text-3xl font-bold text-primary">Edit Practical</h1>
          </div>
          <Link href="/admin/practicals" className="btn-secondary">Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="card overflow-hidden">
          <div className="grid gap-5 border-b border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Practical Number</label>
              <input type="number" value={form.practicalNumber || ''} onChange={(e) => setForm({ ...form, practicalNumber: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input type="text" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Aim</label>
              <textarea rows="3" value={form.aim || ''} onChange={(e) => setForm({ ...form, aim: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Objective</label>
              <textarea rows="3" value={form.objective || ''} onChange={(e) => setForm({ ...form, objective: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Theory</label>
              <textarea rows="5" value={form.theory || ''} onChange={(e) => setForm({ ...form, theory: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Algorithm</label>
              <textarea rows="4" value={form.algorithm || ''} onChange={(e) => setForm({ ...form, algorithm: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Program</label>
              <textarea rows="8" value={form.program || ''} onChange={(e) => setForm({ ...form, program: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Procedure</label>
              <textarea rows="5" value={form.procedure || ''} onChange={(e) => setForm({ ...form, procedure: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Sample Output</label>
              <textarea rows="4" value={form.sampleOutput || ''} onChange={(e) => setForm({ ...form, sampleOutput: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Conclusion</label>
              <textarea rows="3" value={form.conclusion || ''} onChange={(e) => setForm({ ...form, conclusion: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Topics</label>
              <input type="text" value={form.topics || ''} onChange={(e) => setForm({ ...form, topics: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="flex justify-end gap-3 p-5">
            <Link href="/admin/practicals" className="btn-secondary">Cancel</Link>
            <button type="submit" className="btn-primary">Save Changes</button>
          </div>
        </form>
      </div>
    </main>
  );
}
