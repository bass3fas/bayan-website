import Image from 'next/image';
import { NewsItem } from '@/interfaces';

interface NewsCardProps {
  news: NewsItem;
  onClick: (news: NewsItem) => void;
}

export default function NewsCard({ news, onClick }: NewsCardProps) {
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
    <article
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
      onClick={() => onClick(news)}
    >
      <div className="relative h-48">
        <Image
          src={news.image}
          alt={news.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getCategoryColor(news.category)}`}
          >
            {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-2">
          {new Date(news.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {news.title}
        </h3>
        
        <p className="text-gray-600 line-clamp-3 mb-4">
          {news.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium group-hover:text-blue-800 transition-colors">
            Read more →
          </span>
          
        </div>
      </div>
    </article>
  );
}