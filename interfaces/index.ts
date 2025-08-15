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