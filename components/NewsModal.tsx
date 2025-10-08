import Image from 'next/image';
import { NewsModalProps } from '@/interfaces';

export default function NewsModal({ news, isOpen, onClose }: NewsModalProps) {
  if (!isOpen || !news) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'announcement': return 'bg-blue-500';
      case 'update': return 'bg-green-500';
      case 'partnership': return 'bg-purple-500';
      case 'achievement': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 "
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-4xl max-h-[82vh] overflow-y-auto relative mt-6 ">
        {/* Header Image */}
        <div className="relative">
          <Image
            src={news.image}
            alt={news.title}
            width={800}
            height={400}
            className="w-full object-cover"
          />
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Category Badge */}
          <div className="absolute bottom-4 left-4">
            <span 
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(news.category)}`}
            >
              {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <span>
              {new Date(news.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            
          </div>
          
          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
            {news.title}
          </h2>

          {/* Excerpt */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-lg text-blue-800 italic">
              {news.excerpt}
            </p>
          </div>
          
          {/* Content */}
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />
          
          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Article #{news.id} • {news.category}
            </div>
            <div className="space-x-3">
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: news.title,
                      text: news.excerpt,
                      url: window.location.href
                    });
                  } else {
                    // Fallback: copy to clipboard
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}