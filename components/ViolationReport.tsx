"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FileUploader from './FileUploader';

const ViolationReport = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Add file upload validation states
  const [hasUnuploadedFile, setHasUnuploadedFile] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckboxChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleFileUpload = (uploadedFileLink: string) => {
    setFileLink(uploadedFileLink);
  };

  const handleFileStatusChange = (status: { hasUnuploadedFile: boolean; isUploading: boolean }) => {
    setHasUnuploadedFile(status.hasUnuploadedFile);
    setIsFileUploading(status.isUploading);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    // Check if there's an unuploaded file
    if (hasUnuploadedFile) {
      setStatus({ 
        message: "Please upload the selected file before submitting the report.", 
        type: "error" 
      });
      return;
    }

    // Check if file is currently uploading
    if (isFileUploading) {
      setStatus({ 
        message: "Please wait for the file upload to complete before submitting.", 
        type: "error" 
      });
      return;
    }

    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      file: fileLink,
      anonymous: isAnonymous,
    };

    try {
      const response = await fetch('/api/submit-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setCountdown(5);
        const countdownInterval = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown === 1) {
              clearInterval(countdownInterval);
              if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            }
            return prevCountdown - 1;
          });
        }, 1000);
      } else {
        setStatus({ 
          message: "Failed to submit report. Please try again.", 
          type: "error" 
        });
      }
    } catch (error) {
      setStatus({ 
        message: "Failed to submit report. Please try again.", 
        type: "error" 
      });
      console.error('Error submitting report:', error);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <section className="relative p-5" id="violation-report" style={{ backgroundImage: "url('/assets/images/violation.jpeg')" }}>
      <div className="bg-gray-100 shadow-lg p-8 max-w-3xl mx-auto mt-5 rounded-3xl">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thank you for your report</h2>
            <p className="text-gray-700">You will be redirected to the home page in {countdown} seconds.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Report</h2>
            <p className="text-gray-700 mb-4">
              At Bayan Medical, we uphold the highest standards of integrity in all our practices, 
              valuing ethical behavior and transparency as key to our success. 
              We encourage employees, partners, 
              and stakeholders to report any concerns without fear of retaliation, 
              helping us maintain honesty and integrity in all we do.
            </p>

            {/* Error/Success Messages */}
            {status && (
              <div className={`mb-4 p-4 rounded-md ${
                status.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}>
                {status.message}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <label htmlFor="anonymous" className="block text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  className="mr-2"
                  checked={isAnonymous}
                  onChange={handleCheckboxChange}
                />
                Report Anonymously
              </label>
              
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-9 p-2"
                  disabled={isAnonymous}
                />
              </label>
              
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm h-9 p-2"
                  disabled={isAnonymous}
                />
              </label>
              
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
                ></textarea>
              </label>
              
              {/* File Uploader with Status Change Handler */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Evidence (Optional)
                </label>
                <FileUploader 
                  onFileUpload={handleFileUpload}
                  onFileStatusChange={handleFileStatusChange}
                />
              </div>
              
              {/* Submit Button with Validation */}
              <button 
                type="submit" 
                disabled={hasUnuploadedFile || isFileUploading}
                className={`w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                  hasUnuploadedFile || isFileUploading
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {isFileUploading ? 'Uploading...' : 'Submit Report'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(ViolationReport), { ssr: false });
