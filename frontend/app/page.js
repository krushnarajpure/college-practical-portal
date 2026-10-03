'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PracticalCard from '../components/PracticalCard';
import { fetchJson } from '../lib/api';

export default function HomePage() {
  const [practicals, setPracticals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/api/practicals')
      .then((data) => setPracticals(data))
      .catch(() => setPracticals([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="border-b border-slate-200 bg-white">
          <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">College Practical Management Portal</p>
              <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl">Data Structure & Algorithms Lab</h1>
              <p className="mt-4 text-lg text-slate-600">Department of Artificial Intelligence & Machine Learning</p>
              <p className="mt-6 max-w-xl text-base text-slate-600">
                A centralized academic resource for practical experiments, algorithms, programs, procedures and laboratory reference material.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/practicals" className="btn-primary">View Practicals</Link>
                <Link href="/admin/login" className="btn-secondary">Admin Login</Link>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-soft">
              <div className="mb-4 border-l-4 border-primary pl-4">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Academic Portal</p>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Practical resources</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li>• 10 practicals curated for Data Structures and Algorithms</li>
                <li>• Search by practical number, title, topic or algorithm</li>
                <li>• Academic, code-first content for laboratory work</li>
                <li>• Admin-controlled content and PDF management</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="container py-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Quick access</p>
              <h2 className="section-title">Latest practical list</h2>
            </div>
            <Link href="/practicals" className="utility-link text-sm">Browse all practicals →</Link>
          </div>

          {loading ? (
            <p className="rounded border border-slate-200 bg-white p-5 text-slate-600">Loading practicals...</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {practicals.slice(0, 6).map((practical) => (
                <PracticalCard key={practical._id || practical.practicalNumber} practical={practical} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
