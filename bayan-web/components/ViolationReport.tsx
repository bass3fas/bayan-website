"use client";
import { useState } from 'react';

export default function ViolationReport() {
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleCheckboxChange = () => {
    setIsAnonymous(!isAnonymous);
  };

  return (
    <section className="relative p-20" style={{ backgroundImage: "url('/assets/images/vr.jpg')" }}>
      <div className="bg-gray-100 shadow-lg p-10 max-w-3xl mx-auto mt-10 rounded-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Violation Report</h2>
        <p className="text-gray-700 mb-4">
          At Bayan Medical, we are dedicated to maintaining the highest standards of integrity across all our business practices and interactions. Every employee, regardless of their role, is expected to align their conduct with our core values, ethical guidelines, company policies, and the legal framework surrounding bribery and corruption.
        </p>
        <p className="text-gray-700 mb-4">
          <strong>Report a Concern</strong>
          <br />
          If you become aware of or suspect any unethical behavior, misconduct, or violation of Bayan Medical’s values—such as integrity issues, bribery, or corruption—you are encouraged to report it. This reporting channel is available to employees, business partners, and external stakeholders, including vendors and service providers.
        </p>
        
        <form className="space-y-4">
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
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            ></textarea>
          </label>
          <label htmlFor="file" className="block text-sm font-medium text-gray-700">
            File
            <input
              type="file"
              id="file"
              name="file"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2"
            />
          </label>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Submit</button>
        </form>
      </div>
    </section>
  );
}
