"use client";
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import { FileUploaderProps } from '@/interfaces';

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

interface UploadResponse {
  link: string;
}

export default function FileUploader({ onFileUpload }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  async function handleFileUpload() {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent: ProgressEvent) => {
        const progress = progressEvent.total
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
          : 0;
        setUploadProgress(progress);
      },
    };

    try {
      const response = await axios.post<UploadResponse>('/api/upload', formData, config);

      if (response.data.link) {
        setStatus('success');
        onFileUpload(response.data.link); // Pass the file link to the parent
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        console.error('Error uploading file:', error.message);
      } else {
        console.error('Error uploading file:', error);
      }
      setStatus('error');
      setUploadProgress(0);
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" onChange={handleFileChange} />

      {file && (
        <div className="mb-4 text-sm">
          <p>
            {file.name} {(file.size / 1024).toFixed(2)} KB {file.type}
          </p>
        </div>
      )}

      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-600 transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600">{uploadProgress}% uploaded</p>
        </div>
      )}

      {file && status !== 'uploading' && (
        <button
          onClick={handleFileUpload}
          className="w-1/5 px-2 py-2 bg-green-400 text-white text-xs rounded-md shadow-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Upload
        </button>
      )}

      {status === 'success' && (
        <p className="text-sm text-green-600">File uploaded successfully!</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-600">Failed to upload file.</p>
      )}
    </div>
  );
}