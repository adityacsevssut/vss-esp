'use client';

import { Suspense } from 'react';
import ProfileContent from '@/components/profile/ProfileContent';

// useSearchParams must be wrapped inside a Suspense boundary in Next.js App Router
export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50/50" />}>
      <ProfileContent />
    </Suspense>
  );
}
