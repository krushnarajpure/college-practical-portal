import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="container py-12">
        <div className="card p-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary">Contact</p>
          <h1 className="text-3xl font-bold text-primary">College Information</h1>

          <div className="mt-6 space-y-4 text-slate-700">
            <p><strong>College:</strong> Tulsiramji Gaikwad-Patil College of Engineering and Technology</p>
            <p><strong>Department:</strong> Department of Artificial Intelligence & Machine Learning</p>
            <p><strong>Address:</strong> Wardha Road, Nagpur - 441108</p>
            <p><strong>Accreditation:</strong> Accredited with NAAC A+ Grade</p>
            <p><strong>Approval:</strong> Approved by AICTE, New Delhi, Government of Maharashtra</p>
            <p><strong>Affiliation:</strong> Autonomous Institution affiliated to RTM Nagpur University</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
