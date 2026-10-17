import { Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthCard from '@/components/auth/AuthCard';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <Suspense fallback={<div>Loading...</div>}>
          <AuthCard initialRole="player" initialMode="signup" />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
