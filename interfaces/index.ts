export interface PartnerProps {
    name: string;
    link: string;
    brief: string;
    logo: string;
}

export interface FileUploaderProps {
  onFileUpload: (fileLink: string) => void;
  onFileStatusChange?: (status: {
    hasUnuploadedFile: boolean;
    isUploading: boolean;
  }) => void;
}


export interface NewsDetailProps {
  params: Promise<{ id: string }>; // Changed from slug to id, and made it a Promise
}

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  category: 'announcement' | 'update' | 'partnership' | 'achievement';
}

export interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}