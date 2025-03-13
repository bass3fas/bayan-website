"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FileUploader from './FileUploader';

const ViolationReport = () => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [fileLink, setFileLink] = useState<string | null>(null); // Add state for the file link
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCheckboxChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleFileUpload = (uploadedFileLink: string) => {
    setFileLink(uploadedFileLink);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
      file: fileLink, // Use the uploaded file link
      anonymous: isAnonymous,
    };

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
      console.error('Failed to submit report');
    }
  };

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <section className="relative p-5 mt-5" id="violation-report" style={{ backgroundImage: "url('/assets/images/violation.jpeg')" }}>
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
            At Bayan Medical, we are dedicated to maintaining the highest standards of integrity across all our business practices 
            and interactions. We believe that ethical behavior and transparency are the cornerstones of our success and reputation. 
            Our commitment to integrity means that we expect all employees, partners, and stakeholders to adhere to the highest ethical 
            standards and to report any violations or concerns without fear of retaliation. 
            Your report is crucial in helping us uphold these values 
            and ensure that we continue to operate with honesty and integrity in everything we do.
            </p>

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
              <FileUploader onFileUpload={handleFileUpload} />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
            </form>
          </>
        )}
      </div>
    </section>
  );
};

export default dynamic(() => Promise.resolve(ViolationReport), { ssr: false });
