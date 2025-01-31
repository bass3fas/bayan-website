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
