"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('isAdmin') !== 'true') {
        router.push('/admin');
        return;
      }
    }
    
    // Fetch news
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      const data = await response.json();
      setNewsItems(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAdmin');
    }
    router.push('/admin');
  };

  const deleteNews = async (id: number) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      // For now, just remove from local state
      // TODO: Implement actual deletion API
      setNewsItems(newsItems.filter((item: any) => item.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">News Management ({newsItems.length} items)</h2>
          
          {newsItems.length === 0 ? (
            <p className="text-gray-500">No news items found.</p>
          ) : (
            <div className="space-y-3">
              {newsItems.map((item: any) => (
                <div key={item.id} className="border-b pb-3 flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: {item.category} • Date: {item.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 truncate">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button 
                      onClick={() => deleteNews(item.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}