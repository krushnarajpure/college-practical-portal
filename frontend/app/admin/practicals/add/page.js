'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { fetchJson } from '../../../../lib/api';

const initialState = {
  practicalNumber: '1',
  title: '',
  aim: '',
  objective: '',
  apparatus: '',
  theory: '',
  algorithm: '',
  program: '',
  procedure: '',
  sampleOutput: '',
  conclusion: '',
  semester: 'III',
  academicYear: '2025-26',
  status: 'Published',
  topics: 'Selection Sort, Insertion Sort, Time Complexity',
};

export default function AddPracticalPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');

    try {
      await fetchJson('/api/practicals', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          practicalNumber: Number(form.practicalNumber),
          topics: form.topics.split(',').map((topic) => topic.trim()).filter(Boolean),
        }),
      });
      router.push('/admin/practicals');
    } catch (err) {
      setError(err.message || 'Unable to save practical.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="text-3xl font-bold text-primary">Add Practical</h1>
          </div>
          <Link href="/admin/practicals" className="btn-secondary">Back</Link>
        </div>

        <form onSubmit={handleSubmit} className="card overflow-hidden">
          <div className="grid gap-5 border-b border-slate-200 bg-slate-50 p-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Practical Number</label>
              <input type="number" min="1" max="10" required value={form.practicalNumber} onChange={(e) => setForm({ ...form, practicalNumber: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Title</label>
              <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Aim</label>
              <textarea rows="3" required value={form.aim} onChange={(e) => setForm({ ...form, aim: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Objective</label>
              <textarea rows="3" value={form.objective} onChange={(e) => setForm({ ...form, objective: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Apparatus / Requirements</label>
              <textarea rows="3" value={form.apparatus} onChange={(e) => setForm({ ...form, apparatus: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Theory</label>
              <textarea rows="6" value={form.theory} onChange={(e) => setForm({ ...form, theory: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Algorithm</label>
              <textarea rows="5" value={form.algorithm} onChange={(e) => setForm({ ...form, algorithm: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Program</label>
              <textarea rows="8" value={form.program} onChange={(e) => setForm({ ...form, program: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Procedure</label>
              <textarea rows="5" value={form.procedure} onChange={(e) => setForm({ ...form, procedure: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Sample Output</label>
              <textarea rows="4" value={form.sampleOutput} onChange={(e) => setForm({ ...form, sampleOutput: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 font-mono text-xs" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Conclusion</label>
              <textarea rows="3" value={form.conclusion} onChange={(e) => setForm({ ...form, conclusion: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
              <input type="text" value="Data Structure & Algorithms Lab" readOnly className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
              <input type="text" value="Artificial Intelligence & Machine Learning" readOnly className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Semester</label>
              <input type="text" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Academic Year</label>
              <input type="text" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm">
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Topics</label>
              <input type="text" value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
            </div>
          </div>

          {error && <div className="border-t border-slate-200 bg-red-50 px-5 py-3 text-sm text-red-700">{error}</div>}

          <div className="flex justify-end gap-3 p-5">
            <Link href="/admin/practicals" className="btn-secondary">Cancel</Link>
            <button type="submit" disabled={saving} className="btn-primary">{saving ? 'Saving...' : 'Save Practical'}</button>
          </div>
        </form>
      </div>
    </main>
  );
}
