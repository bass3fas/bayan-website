"use client";
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

  function handleFileUpload() {
    if (!file) return;

    setStatus('uploading');
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    // Set headers
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

    // Track upload progress
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded * 100) / event.total);
        setUploadProgress(progress);
      }
    };

    // Handle response
    xhr.onload = function () {
      if (xhr.status === 200) {
        try {
          const response: UploadResponse = JSON.parse(xhr.responseText);
          setStatus('success');
          onFileUpload(response.link);
        } catch (error) {
          console.error('Error parsing response:', error);
          setStatus('error');
        }
      } else {
        console.error('Upload failed:', xhr.statusText);
        setStatus('error');
      }
    };

    xhr.onerror = function () {
      console.error('Error uploading file');
      setStatus('error');
    };

    xhr.send(formData);
  }

  return (
    <div className="space-y-4">
      {/* Custom file input label */}
      <label className="flex flex-col items-center px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-dashed border-blue-300 cursor-pointer hover:bg-blue-50 transition-colors">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
          />
        </svg>
        <span className="text-sm font-medium">Choose file</span>
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="hidden" 
        />
      </label>

      {file && (
        <div className="mb-4 text-sm text-gray-300">
          <p>
            {file.name} {(file.size / 1024).toFixed(2)} KB
          </p>
        </div>
      )}

      {/* Upload Progress Section - Now properly included */}
      {status === 'uploading' && (
        <div className="space-y-2">
          <div className="h-2.5 w-full rounded-full bg-gray-200">
            <div
              className="h-2.5 rounded-full bg-blue-300 transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 text-center">
            {uploadProgress}% uploaded
          </p>
        </div>
      )}

      {/* Upload button */}
      {file && status !== 'uploading' && (
        <button
          onClick={handleFileUpload}
          className="w-full px-4 py-2 bg-blue-300 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Upload File
        </button>
      )}

      {status === 'success' && (
        <p className="text-sm text-green-300">File uploaded successfully!</p>
      )}

      {status === 'error' && (
        <p className="text-sm text-red-300">Failed to upload file.</p>
      )}
    </div>
  );
}
