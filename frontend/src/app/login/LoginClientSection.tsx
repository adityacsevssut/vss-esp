'use client';

import { useSearchParams } from 'next/navigation';
import AuthCard, { AuthRole } from '@/components/auth/AuthCard';

export default function LoginClientSection() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const role: AuthRole = roleParam === 'partner' ? 'partner' : 'player';

  return (
    <div className="w-full">
      <AuthCard initialRole={role} />
    </div>
  );
}
