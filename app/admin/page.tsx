"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginBox from '@/components/LoginBox';

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // Check if already logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isAdmin') === 'true') {
        router.push('/admin/dashboard');
      }
    }
  }, [router]);

  const handleLogin = async (username: string, password: string) => {
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('isAdmin', 'true');
        }
        router.push('/admin/dashboard');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginBox
      title="Admin Login"
      subtitle="Bayan Medical Admin Panel"
      onSubmit={handleLogin}
      loading={loading}
      error={error}
      usernameLabel="Username"
      passwordLabel="Password"
      submitButtonText="Login"
      loadingText="Logging in..."
    />
  );
}