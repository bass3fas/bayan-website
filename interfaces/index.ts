export interface Partner {
  id: number;
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

export interface AdminDashboardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}