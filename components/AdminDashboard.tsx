"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminDashboardProps } from '@/interfaces';
import NewsControl from '@/components/NewsControl';
import PartnersControl from '@/components/PartnersControl';

export default function AdminDashboardPage({ 
  title = "Admin Dashboard", 
  subtitle = "Manage your content",
  children 
}: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('news');

  const tabs = [
    { id: 'news', label: 'News Management', component: <NewsControl /> },
    { id: 'partners', label: 'Partners Management', component: <PartnersControl /> },
  ];

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

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Active Tab Content */}
        <div>
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      </div>
    </div>
  );
}