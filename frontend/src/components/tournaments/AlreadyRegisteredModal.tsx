'use client';

interface AlreadyRegisteredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlreadyRegisteredModal({
  isOpen,
  onClose,
}: AlreadyRegisteredModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Already Registered</h3>
        <p className="text-sm text-gray-600 mb-5">
          You have already registered for this tournament.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
        >
          OK
        </button>
      </div>
    </div>
  );
}
