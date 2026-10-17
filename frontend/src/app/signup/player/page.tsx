import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthCard from '@/components/auth/AuthCard';

export const metadata: Metadata = {
  title: 'Player Sign Up - VSSUT Esports',
  description: 'Sign up for a player account to join tournaments, scrims, and esports teams.',
};

export default function PlayerSignUpPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
      <Navbar />

      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6">
        <AuthCard initialRole="player" initialMode="signup" />
      </main>

      <Footer />
    </div>
  );
}
