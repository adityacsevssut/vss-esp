'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegistrationModal from './RegistrationModal';

interface RegisterButtonProps {
  tournamentTitle: string;
  entryFee: string;
  remainingSlots: number;
}

export default function RegisterButton({ tournamentTitle, entryFee, remainingSlots }: RegisterButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showIncomplete, setShowIncomplete] = useState(false);

  const isProfileComplete = Boolean(user?.phone && user?.regNumber);

  const handleClick = () => {
    // Not logged in → go to login
    if (!isAuthenticated || !user) {
      router.push(`/login/player?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    // Profile incomplete → show inline notice, then go to profile
    if (!isProfileComplete) {
      setShowIncomplete(true);
      setTimeout(() => {
        router.push(`/profile?returnTo=${encodeURIComponent(pathname)}`);
      }, 1200);
      return;
    }

    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <button
          onClick={handleClick}
          className="w-full bg-white hover:bg-gray-50 text-green-600 hover:text-green-700 font-black py-4 px-6 rounded-full transition-all duration-300 border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md hover:-translate-y-0.5 uppercase tracking-widest text-center"
        >
          Register Now
        </button>

        {/* Inline profile-incomplete notice */}
        {showIncomplete && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 font-medium leading-relaxed animate-in fade-in duration-200">
            <span className="font-bold block mb-0.5">Profile incomplete</span>
            Taking you to your profile to finish setup — you&apos;ll be redirected back here automatically.
          </div>
        )}

        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Hurry! Only {remainingSlots} slots left.
        </p>
      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        tournamentTitle={tournamentTitle}
        entryFee={entryFee}
      />
    </>
  );
}
