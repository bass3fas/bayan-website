export interface PartnerProps {
    name: string;
    link: string;
    brief: string;
    logo: string;
}

export interface FileUploaderProps {
    onFileUpload: (filePath: string) => void;
}