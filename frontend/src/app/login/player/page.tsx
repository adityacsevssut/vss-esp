import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthCard from '@/components/auth/AuthCard';

export const metadata: Metadata = {
  title: 'Player Login - VSSUT Esports',
  description: 'Log in to your VSSUT Esports player account to join matches, manage teams, and view tournament stats.',
};

export default function PlayerLoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 relative overflow-hidden">
      <Navbar />

      {/* Decorative background grid and soft green glows */}
      <div 
        className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0.4))] pointer-events-none"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%2316a34a' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E")` 
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

      <main className="flex-grow flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <AuthCard initialRole="player" />
      </main>

      <Footer />
    </div>
  );
}
