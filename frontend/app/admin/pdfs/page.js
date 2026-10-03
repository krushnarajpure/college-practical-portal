'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { fetchJson } from '../../../lib/api';

export default function PdfManagementPage() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', practicalNumber: '1', subject: 'Data Structure & Algorithms Lab' });
  const [file, setFile] = useState(null);

  const loadData = () => {
    fetchJson('/api/pdfs')
      .then((data) => setPdfs(data))
      .catch(() => setPdfs([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('name', form.name || file.name);
    formData.append('practicalNumber', form.practicalNumber);
    formData.append('subject', form.subject);
    formData.append('file', file);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/pdfs`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    if (!response.ok) {
      alert('Failed to upload PDF.');
      return;
    }

    setFile(null);
    setForm({ name: '', practicalNumber: '1', subject: 'Data Structure & Algorithms Lab' });
    loadData();
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this PDF?')) return;
    await fetchJson(`/api/pdfs/${id}`, { method: 'DELETE' });
    loadData();
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="text-3xl font-bold text-primary">PDF Management</h1>
          </div>
          <Link href="/admin" className="btn-secondary">Dashboard</Link>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1fr_1.5fr]">
          <form onSubmit={handleSubmit} className="card p-5">
            <h2 className="mb-4 text-xl font-semibold text-primary">Upload PDF</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">PDF Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Practical Number</label>
                <input type="number" min="1" max="10" value={form.practicalNumber} onChange={(e) => setForm({ ...form, practicalNumber: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Select PDF</label>
                <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm" />
              </div>
              <button type="submit" className="btn-primary w-full">Upload PDF</button>
            </div>
          </form>

          <div className="card overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <h2 className="text-xl font-semibold text-primary">PDF Library</h2>
            </div>

            {loading ? (
              <div className="p-5 text-slate-600">Loading PDF list...</div>
            ) : (
              <div className="divide-y divide-slate-200">
                {pdfs.length === 0 ? (
                  <div className="p-5 text-slate-600">No PDFs uploaded yet.</div>
                ) : (
                  pdfs.map((item) => (
                    <div key={item._id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <div className="font-semibold text-slate-800">{item.name}</div>
                        <div className="text-sm text-slate-500">Practical {item.practicalNumber} • {item.subject}</div>
                      </div>
                      <div className="flex gap-2">
                        <a href={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/pdfs/${item._id}/download`} target="_blank" rel="noreferrer" className="btn-secondary text-xs">Download</a>
                        <button type="button" onClick={() => handleDelete(item._id)} className="rounded border border-red-200 bg-red-50 px-2 py-1 text-xs text-red-700">Delete</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
