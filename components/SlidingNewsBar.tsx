"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { NewsItem } from '@/interfaces';

export default function SlidingNewsBar() {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch('/api/news?category=all');
        if (response.ok) {
          const data = await response.json();
          setLatestNews(data.news.slice(0, 5)); // Get 5 latest for continuous scroll
        }
      } catch (error) {
        console.error('Error fetching latest news:', error);
      }
    };

    fetchLatestNews();
  }, []);

  if (!latestNews.length || !isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-indigo-900 via-blue-900 to-indigo-900 text-white py-2 overflow-hidden shadow-lg z-20">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-2 text-white hover:text-gray-300 transition-colors z-10"
        aria-label="Close news bar"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex items-center">
        {/* Static Label */}
        <div className="bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wide flex-shrink-0 mr-4">
          Breaking News
        </div>

        {/* Scrolling Content */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {latestNews.concat(latestNews).map((news, index) => (
              <span key={`${news.id}-${index}`} className="inline-block mr-12">
                <span className="text-yellow-300 font-medium mr-2">
                  [{news.category.toUpperCase()}]
                </span>
                <span className="text-sm md:text-base">
                  {news.title}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <Link
          href="/news"
          className="flex items-center space-x-1 text-yellow-300 hover:text-yellow-100 transition-colors flex-shrink-0 text-sm font-medium ml-4"
        >
          <span>More</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}