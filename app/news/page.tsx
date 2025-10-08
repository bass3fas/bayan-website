import { Suspense } from 'react';
import News from '@/components/News';

export const metadata = {
  title: 'News & Updates - Bayan Medical',
  description: 'Stay updated with the latest news, announcements, and updates from Bayan Medical.',
  keywords: 'Bayan Medical news, updates, announcements, partnerships, achievements'
};

function NewsContent() {
  return <News />;
}

export default function NewsPage() {
  return (
    <div className="news-page mt-7">
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading news...</p>
            </div>
          </div>
        </div>
      }>
        <NewsContent />
      </Suspense>
    </div>
  );
}