'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    collegeName: 'Tulsiramji Gaikwad-Patil College of Engineering and Technology',
    department: 'Department of Artificial Intelligence & Machine Learning',
    subject: 'Data Structure & Algorithms Lab',
    semester: 'B.Tech – Semester III',
    academicYear: '2025-26',
    adminName: 'College Administrator',
    adminEmail: 'admin@tgpcet.edu.in',
  });

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-primary">Admin</p>
            <h1 className="text-3xl font-bold text-primary">Settings</h1>
          </div>
          <Link href="/admin" className="btn-secondary">Dashboard</Link>
        </div>

        <div className="card p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">College Name</label>
              <input value={settings.collegeName} onChange={(e) => setSettings({ ...settings, collegeName: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Department</label>
              <input value={settings.department} onChange={(e) => setSettings({ ...settings, department: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Subject</label>
              <input value={settings.subject} onChange={(e) => setSettings({ ...settings, subject: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Semester</label>
              <input value={settings.semester} onChange={(e) => setSettings({ ...settings, semester: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Academic Year</label>
              <input value={settings.academicYear} onChange={(e) => setSettings({ ...settings, academicYear: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Admin Name</label>
              <input value={settings.adminName} onChange={(e) => setSettings({ ...settings, adminName: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="mb-1 block text-sm font-medium text-slate-700">Admin Email</label>
              <input value={settings.adminEmail} onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })} className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm" />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="button" className="btn-primary">Save Settings</button>
          </div>
        </div>
      </div>
    </main>
  );
}
