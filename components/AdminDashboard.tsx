"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AdminDashboardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function AdminDashboard({ 
  title = "Admin Dashboard", 
  subtitle = "Manage your content",
  children 
}: AdminDashboardProps) {
  const router = useRouter();

  useEffect(() => {
    // Check authentication
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isAdmin') !== 'true') {
        router.push('/admin');
        return;
      }
    }
  }, [router]);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdmin');
    }
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 mt-8 pt-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && (
              <p className="text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}