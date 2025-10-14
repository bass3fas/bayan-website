"use client";
import { useState } from 'react';

interface LoginBoxProps {
  title: string;
  subtitle?: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  loading?: boolean;
  error?: string;
  usernameLabel?: string;
  passwordLabel?: string;
  submitButtonText?: string;
  loadingText?: string;
}

export default function LoginBox({
  title,
  subtitle,
  onSubmit,
  loading = false,
  error,
  usernameLabel = "Username",
  passwordLabel = "Password",
  submitButtonText = "Login",
  loadingText = "Logging in..."
}: LoginBoxProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-gray-600 mt-2">{subtitle}</p>
          )}
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {usernameLabel}
            </label>
            <input
              type="text"
              placeholder={`Enter ${usernameLabel.toLowerCase()}`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              {passwordLabel}
            </label>
            <input
              type="password"
              placeholder={`Enter ${passwordLabel.toLowerCase()}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {loading ? loadingText : submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}