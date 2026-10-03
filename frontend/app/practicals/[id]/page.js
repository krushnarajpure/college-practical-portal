'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import { fetchJson } from '../../../lib/api';

export default function PracticalDetailPage() {
  const params = useParams();
  const practicalId = Number(params.id || 1);
  const [practical, setPractical] = useState(null);
  const [allPracticals, setAllPracticals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchJson('/api/practicals'), fetchJson(`/api/practicals/${practicalId}`)])
      .then(([list, detail]) => {
        setAllPracticals(list);
        setPractical(detail);
      })
      .catch(() => {
        setAllPracticals([]);
        setPractical(null);
      })
      .finally(() => setLoading(false));
  }, [practicalId]);

  const currentIndex = useMemo(
    () => allPracticals.findIndex((item) => Number(item.practicalNumber) === Number(practicalId)),
    [allPracticals, practicalId]
  );

  const previousPractical = currentIndex > 0 ? allPracticals[currentIndex - 1] : null;
  const nextPractical = currentIndex >= 0 && currentIndex < allPracticals.length - 1 ? allPracticals[currentIndex + 1] : null;

  if (loading) {
    return (
      <>
        <Header />
        <main className="container py-12">
          <div className="card p-8 text-slate-600">Loading practical...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (!practical) {
    return (
      <>
        <Header />
        <main className="container py-12">
          <div className="card p-8">
            <h1 className="text-2xl font-bold text-primary">Practical not available</h1>
            <p className="mt-2 text-slate-600">This practical could not be loaded.</p>
            <Link href="/practicals" className="btn-primary mt-4">Back to all practicals</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const code = (practical.program || '').replace(/```(?:python|js|bash)?/g, '').trim();

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      alert('Code copied to clipboard.');
    } catch (error) {
      alert('Unable to copy code.');
    }
  };

  return (
    <>
      <Header />
      <main className="container py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="text-sm text-slate-600">Practical No. {String(practical.practicalNumber).padStart(2, '0')}</div>
          <Link href="/practicals" className="utility-link text-sm">Back to All Practicals</Link>
        </div>

        <article className="card overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Practical No. {String(practical.practicalNumber).padStart(2, '0')}</p>
            <h1 className="mt-3 text-3xl font-bold text-primary md:text-4xl">{practical.title}</h1>
          </div>

          <div className="p-6 md:p-8">
            <div className="mb-8 flex flex-wrap gap-3">
              {previousPractical && (
                <Link href={`/practicals/${previousPractical.practicalNumber}`} className="btn-secondary">
                  ← Previous Practical
                </Link>
              )}
              <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700">
                Practical {String(practical.practicalNumber).padStart(2, '0')} / {allPracticals.length || 10}
              </span>
              {nextPractical && (
                <Link href={`/practicals/${nextPractical.practicalNumber}`} className="btn-secondary">
                  Next Practical →
                </Link>
              )}
            </div>

            <div className="space-y-8 text-slate-800">
              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Aim</h2>
                <p>{practical.aim}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Objective</h2>
                <p>{practical.objective || 'To understand and implement the theory and practical application of this concept.'}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Apparatus / Requirements</h2>
                <p>{practical.apparatus || 'Academic laboratory environment and implementation tools.'}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Theory</h2>
                <p className="whitespace-pre-line">{practical.theory || 'No theory content was supplied for this practical.'}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Algorithm</h2>
                <p className="whitespace-pre-line">{practical.algorithm || 'No algorithm details supplied.'}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Program</h2>
                <div className="mb-3 flex justify-end">
                  <button type="button" onClick={copyCode} className="btn-secondary text-xs">
                    Copy Code
                  </button>
                </div>
                <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-950 p-4 text-sm text-slate-100"><code>{code}</code></pre>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Procedure</h2>
                <p className="whitespace-pre-line">{practical.procedure || 'No procedure content was supplied.'}</p>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Sample Output</h2>
                <pre className="overflow-x-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800"><code>{practical.sampleOutput || 'No sample output available.'}</code></pre>
              </section>

              <section>
                <h2 className="mb-2 text-xl font-bold text-primary">Conclusion</h2>
                <p>{practical.conclusion || 'No conclusion provided for this practical.'}</p>
              </section>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
