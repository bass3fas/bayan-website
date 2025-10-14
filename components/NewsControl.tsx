"use client";
import { useState, useEffect } from 'react';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: string;
}

export default function NewsControl() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '/assets/images/news/1.png',
    category: 'announcement'
  });

  useEffect(() => {
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

  const deleteNews = async (id: number) => {
    if (confirm('Are you sure you want to delete this news item?')) {
      try {
        const response = await fetch(`/api/news?id=${id}`, {
          method: 'DELETE'
        });
        
        if (response.ok) {
          setNewsItems(newsItems.filter(item => item.id !== id));
        } else {
          alert('Failed to delete news item');
        }
      } catch (error) {
        console.error('Error deleting news:', error);
        alert('Error deleting news item');
      }
    }
  };

  const openAddModal = () => {
    setEditingNews(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      image: '/assets/images/news/1.png',
      category: 'announcement'
    });
    setShowModal(true);
  };

  const openEditModal = (news: NewsItem) => {
    setEditingNews(news);
    setFormData({
      title: news.title,
      excerpt: news.excerpt,
      content: news.content,
      image: news.image,
      category: news.category
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingNews) {
        // Update existing news
        const response = await fetch('/api/news', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, id: editingNews.id })
        });
        
        if (response.ok) {
          fetchNews();
          setShowModal(false);
        } else {
          alert('Failed to update news item');
        }
      } else {
        // Add new news
        const response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          fetchNews();
          setShowModal(false);
        } else {
          alert('Failed to add news item');
        }
      }
    } catch (error) {
      console.error('Error saving news:', error);
      alert('Error saving news item');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* News Management */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">News Management ({newsItems.length} items)</h2>
          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add News</span>
          </button>
        </div>
        
        {newsItems.length === 0 ? (
          <p className="text-gray-500">No news items found.</p>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Category: <span className="capitalize">{item.category}</span> • Date: {item.date}
                    </p>
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="ml-4 flex space-x-2">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-800 px-3 py-1 border border-blue-600 rounded hover:bg-blue-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => deleteNews(item.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 border border-red-600 rounded hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">
                {editingNews ? 'Edit News Item' : 'Add New News Item'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="update">Update</option>
                    <option value="partnership">Partnership</option>
                    <option value="achievement">Achievement</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Excerpt
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={8}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Image Path
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="/assets/images/news/1.png"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {editingNews ? 'Update' : 'Add'} News
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}