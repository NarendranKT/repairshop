'use client';

import { LoginForm } from '@/components/login-form';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { data: session } = useSession();

  if (session?.user) {
    redirect('/home');
  }
  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
