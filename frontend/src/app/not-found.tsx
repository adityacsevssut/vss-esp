import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-50 text-brand-primary mb-6 border border-green-100">
            <span className="text-4xl font-black">404</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-text-main uppercase tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-text-secondary text-base mb-8 leading-relaxed">
            The tournament, game, or page you are looking for does not exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-white rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md shadow-brand-primary/20"
            >
              Back to Home
            </Link>
            <Link
              href="/games/free-fire"
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm tracking-wider uppercase transition-all"
            >
              Browse Games
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
