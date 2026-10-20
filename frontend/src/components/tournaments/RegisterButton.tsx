'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RegistrationModal from './RegistrationModal';
import AlreadyRegisteredModal from './AlreadyRegisteredModal';
import TournamentHubModal, { HubTab } from './TournamentHubModal';

interface RegisterButtonProps {
  tournamentTitle: string;
  entryFee: string;
  remainingSlots: number;
  format?: string;
}

export default function RegisterButton({
  tournamentTitle,
  entryFee,
  remainingSlots,
  format = 'Battle Royale Classic',
}: RegisterButtonProps) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // BR Classic check (not Clash Squad)
  const isBRClassic = format
    ? (format.toLowerCase().includes('battle royale') || format.toLowerCase().includes('classic')) &&
      !format.toLowerCase().includes('clash squad')
    : true;

  // Bypassed for BR Classic with dummy data as requested
  const [isRegistered, setIsRegistered] = useState<boolean>(isBRClassic);

  // Modals
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isAlreadyRegisteredModalOpen, setIsAlreadyRegisteredModalOpen] = useState(false);
  const [isHubModalOpen, setIsHubModalOpen] = useState(false);
  const [activeHubTab, setActiveHubTab] = useState<HubTab>('fixtures');
  const [showIncomplete, setShowIncomplete] = useState(false);

  const isProfileComplete = Boolean(user?.phone && user?.regNumber);

  const handleRegisterClick = () => {
    if (isRegistered) {
      setIsAlreadyRegisteredModalOpen(true);
      return;
    }

    if (!isAuthenticated || !user) {
      router.push(`/login/player?returnTo=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!isProfileComplete) {
      setShowIncomplete(true);
      setTimeout(() => {
        router.push(`/profile?returnTo=${encodeURIComponent(pathname)}`);
      }, 1200);
      return;
    }

    setIsRegistrationModalOpen(true);
  };

  const openHubModal = (tab: HubTab) => {
    setActiveHubTab(tab);
    setIsHubModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main Register / Registered Button */}
        {isRegistered ? (
          <button
            type="button"
            onClick={handleRegisterClick}
            className="w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white font-black py-4 px-6 rounded-full transition-all uppercase tracking-widest text-center cursor-pointer shadow-sm hover:shadow-md"
          >
            Registered
          </button>
        ) : (
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="w-full bg-white hover:bg-gray-50 text-green-600 hover:text-green-700 font-black py-4 px-6 rounded-full transition-all border border-gray-300 hover:border-gray-400 shadow-sm uppercase tracking-widest text-center cursor-pointer"
            >
              Register Now
            </button>
            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Hurry! Only {remainingSlots} slots left.
            </p>
          </div>
        )}

        {/* Profile incomplete notice */}
        {showIncomplete && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-700 font-medium">
            <span className="font-bold block mb-0.5">Profile incomplete</span>
            Redirecting to your profile to complete setup...
          </div>
        )}

        {/* Section Just Below Registered Button */}
        {isRegistered && isBRClassic && (
          <div className="pt-3 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => openHubModal('fixtures')}
                className="py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors cursor-pointer border border-gray-200"
              >
                Fixtures
              </button>

              <button
                type="button"
                onClick={() => openHubModal('points')}
                className="py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors cursor-pointer border border-gray-200"
              >
                Points Table
              </button>

              <button
                type="button"
                onClick={() => openHubModal('finale')}
                className="py-3 px-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors cursor-pointer border border-gray-200"
              >
                Grand Finale
              </button>

              <button
                type="button"
                onClick={() => openHubModal('winner')}
                className="py-3 px-3 bg-gray-900 hover:bg-black text-white font-bold rounded-xl text-xs uppercase tracking-wider text-center transition-colors cursor-pointer"
              >
                Winner
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        tournamentTitle={tournamentTitle}
        entryFee={entryFee}
        onSuccess={() => setIsRegistered(true)}
      />

      {/* Already Registered Modal */}
      <AlreadyRegisteredModal
        isOpen={isAlreadyRegisteredModalOpen}
        onClose={() => setIsAlreadyRegisteredModalOpen(false)}
      />

      {/* Tournament Hub Modal */}
      <TournamentHubModal
        isOpen={isHubModalOpen}
        onClose={() => setIsHubModalOpen(false)}
        tournamentTitle={tournamentTitle}
        defaultTab={activeHubTab}
      />
    </>
  );
}
