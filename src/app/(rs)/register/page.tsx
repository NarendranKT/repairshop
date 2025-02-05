'use client';
import { RegisterForm } from '@/components/register-form';

export default function Page() {
  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log('data before registering ==> ', data);
        const user = await response.json();
        console.log('response data ==> ', user);
        window.location.href = '/login';
      } else if (response.status === 400) {
        console.error('User already registered');
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm onRegister={onSubmit} />
      </div>
    </div>
  );
}
