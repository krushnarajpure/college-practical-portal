'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import PracticalCard from '../../components/PracticalCard';
import { fetchJson } from '../../lib/api';

const filters = ['All Practicals', 'Sorting', 'Searching', 'Stack', 'Queue', 'Linked List', 'Tree', 'Graph', 'Hashing', 'Mini Project'];

export default function PracticalListPage() {
  const [practicals, setPracticals] = useState([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Practicals');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJson('/api/practicals')
      .then((data) => setPracticals(data))
      .catch(() => setPracticals([]))
      .finally(() => setLoading(false));
  }, []);

  const visiblePracticals = useMemo(() => {
    let result = [...practicals];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter((item) => {
        const searchableText = `${item.practicalNumber} ${item.title} ${(item.topics || []).join(' ')} ${item.algorithm || ''} ${item.theory || ''}`.toLowerCase();
        return searchableText.includes(query);
      });
    }

    if (activeFilter !== 'All Practicals') {
      result = result.filter((item) => {
        const combined = `${item.title} ${(item.topics || []).join(' ')}`.toLowerCase();
        const filterMap = {
          Sorting: 'selection sort',
          Searching: 'search',
          Stack: 'stack',
          Queue: 'queue',
          'Linked List': 'linked list',
          Tree: 'tree',
          Graph: 'graph',
          Hashing: 'hashing',
          'Mini Project': 'library management',
        };
        return combined.includes((filterMap[activeFilter] || activeFilter).toLowerCase());
      });
    }

    return result.sort((a, b) => Number(a.practicalNumber) - Number(b.practicalNumber));
  }, [practicals, search, activeFilter]);

  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Practical Index</p>
            <h1 className="section-title">Data Structure & Algorithms Lab</h1>
            <p className="mt-2 text-slate-600">B.Tech – Semester III</p>
          </div>
          <Link href="/" className="utility-link text-sm">← Back to home</Link>
        </div>

        <div className="card p-4 md:p-5">
          <div className="mb-4">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                type="button"
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-3 py-1.5 text-sm ${activeFilter === filter ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {loading ? (
            <div className="rounded border border-slate-200 bg-white p-6 text-slate-600">Loading practicals...</div>
          ) : visiblePracticals.length === 0 ? (
            <div className="rounded border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
              No practicals found for the current search or filter.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visiblePracticals.map((practical) => (
                <PracticalCard key={practical._id || practical.practicalNumber} practical={practical} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
