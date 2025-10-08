"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/interfaces';

export default function NewsBar() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Fetch latest news (limit to 3 most recent)
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('/api/news?category=all');
        if (response.ok) {
          const data = await response.json();
          setLatestNews(data.news.slice(0, 3)); // Get only 3 latest
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchLatestNews();
  }, []);

  // Auto-rotate news every 5 seconds
  useEffect(() => {
    if (latestNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % latestNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [latestNews.length]);

  if (!latestNews.length || !isVisible) return null;

  const currentNews = latestNews[currentIndex];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-600 text-white';
      case 'update': return 'bg-green-600 text-white';
      case 'partnership': return 'bg-purple-600 text-white';
      case 'achievement': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="relative bbg-gray-900 bg-opacity-5 text-white p-8 shadow-lg z-20 mt-6">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Close news bar"
      >
        <svg className="w-4 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* News Content */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          {/* Breaking News Label */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className=" px-2 py-1 rounded text-xs font-bold uppercase tracking-wide text-red-500">
              What&apos;s New?
            </div>
            <div className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(currentNews.category)}`}>
              {currentNews.category}
            </div>
          </div>

          {/* News Text */}
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base font-medium truncate">
              {currentNews.title}
            </p>
          </div>

          {/* Navigation Dots */}
          {latestNews.length > 1 && (
            <div className="flex space-x-1 flex-shrink-0">
              {latestNews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* View More Button */}
          <Link
            href="/news"
            className="flex items-center space-x-1 text-yellow-300 hover:text-yellow-100 transition-colors flex-shrink-0 text-sm font-medium"
          >
            <span>View More</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Animated Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-x-12 animate-pulse"></div>
      </div>
    </div>
  );
}