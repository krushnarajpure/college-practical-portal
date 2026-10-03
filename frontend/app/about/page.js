import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="card p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">About the Department</p>
          <h1 className="text-3xl font-bold text-primary">College Practical Management Portal</h1>

          <div className="mt-6 space-y-4 text-slate-700">
            <p>
              <strong>Tulsiramji Gaikwad-Patil College of Engineering and Technology</strong> is a recognized academic institution with a focus on innovative technical education and practical learning.
            </p>
            <p>
              The Department of Artificial Intelligence & Machine Learning maintains a structured academic environment designed to support laboratory practice, implementation-based learning, and algorithmic understanding.
            </p>
            <p>
              This portal supports the <strong>Data Structure & Algorithms Lab</strong> for <strong>B.Tech – Semester III</strong> with subject code <strong>BAI12303</strong>.
            </p>
            <p>
              It was created to organize practical experiments, provide easy access to laboratory material, and make algorithmic learning more accessible to students, faculty, and academic administrators.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
