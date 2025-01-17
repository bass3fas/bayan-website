"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FileUploader from './FileUploader'

export default function ViolationReport() {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [fileLink, setFileLink] = useState<string | null>(null); // Add state for the file link
  const router = useRouter();

  const handleCheckboxChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
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
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);

      const timeout = setTimeout(() => {
        router.push('/');
        setIsSubmitted(false);
        setCountdown(5);
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isSubmitted, router]);

  const handleFileUpload = (fileUrl: string) => {
    setFileLink(fileUrl); // Set the file link when the file is uploaded
  };

  return (
    <section className="relative p-20" id="violation-report" style={{ backgroundImage: "url('/assets/images/violation.jpeg')" }}>
      <div className="bg-gray-100 shadow-lg p-10 max-w-3xl mx-auto mt-10 rounded-3xl">
        {isSubmitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Thank you for your report</h2>
            <p className="text-gray-700">You will be redirected to the home page in {countdown} seconds.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Report</h2>
            <p className="text-gray-700 mb-4">
              At Bayan Medical, we are dedicated to maintaining the highest standards of integrity across all our business practices and interactions...
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
}
