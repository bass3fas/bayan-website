"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import FileUploader from "./FileUploader";
import Image from "next/image";

export default function Contact() {
  const [fileLink, setFileLink] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [hasUnuploadedFile, setHasUnuploadedFile] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);

  const handleFileUpload = (uploadedFileLink: string) => {
    setFileLink(uploadedFileLink);
  };

  const handleFileStatusChange = (status: { hasUnuploadedFile: boolean; isUploading: boolean }) => {
    setHasUnuploadedFile(status.hasUnuploadedFile);
    setIsFileUploading(status.isUploading);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (hasUnuploadedFile) {
      setStatus({
        message: "Please upload the selected file before submitting the form.",
        type: "error",
      });
      return;
    }

    if (isFileUploading) {
      setStatus({
        message: "Please wait for the file upload to complete before submitting.",
        type: "error",
      });
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, file: fileLink }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setStatus({ message: result.message, type: "success" });
      setFormData({ name: "", email: "", message: "" });
      setFileLink(null);
    } catch (error) {
      setStatus({ message: "Failed to submit the form. Please try again.", type: "error" });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen"
      id="contact"
      style={{
        backgroundImage: "url('/assets/images/contact-bayan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:p-12">
        {/* Join Our Team Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Join Our Team
          </h1>
          <p className="text-blue-200 text-lg">
            Start your career journey with us
          </p>
        </div>

        {status ? (
          status.type === "success" ? (
            <div className="text-center py-8">
              <div className="bg-green-500/20 border border-green-400 rounded-lg p-6">
                <p className="text-xl text-green-300">{status.message}</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-400 bg-red-500/20 border border-red-400 rounded-lg p-4">
                {status.message}
              </p>
            </div>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto w-full">
            {/* Form Fields */}
            {["name", "email"].map((field) => (
              <div key={field} className="relative mb-4">
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-3 py-2 border-b-2 border-blue-400 bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white placeholder-transparent text-sm"
                  required
                />
                <label
                  htmlFor={field}
                  className="absolute left-3 top-2 text-blue-400 text-sm transition-all duration-300 transform -translate-y-3 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-400"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}

            {/* Message Field */}
            <div className="relative mb-4">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-3 py-2 border-b-2 border-blue-400 bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white placeholder-transparent resize-none text-sm"
                rows={3}
                maxLength={500}
                required
              />
              <label
                htmlFor="message"
                className="absolute left-3 top-2 text-blue-400 text-sm transition-all duration-300 transform -translate-y-3 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-400"
              >
                Message
              </label>
              <div className="text-right text-xs text-blue-200 mt-1">
                {formData.message.length}/500
              </div>
            </div>

            {/* Attach CV */}
            <div className="flex flex-col items-center py-4">
              <h3 className="text-white font-medium mb-4 text-sm">Attach your CV (Optional)</h3>
              <FileUploader
                onFileUpload={handleFileUpload}
                onFileStatusChange={handleFileStatusChange}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={hasUnuploadedFile || isFileUploading}
                className={`px-8 py-3 font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-[#03508C] transition-colors ${
                  hasUnuploadedFile || isFileUploading
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-white text-[#03508C] hover:bg-blue-100"
                }`}
              >
                {isFileUploading ? "Uploading..." : "Submit Application"}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Side - Contact Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-6 md:p-8 lg:p-12 text-white">
        {/* Icon and "GET IN TOUCH" */}
        <div className="flex items-center mb-6">
          <Image
            src="/assets/icons/atom.png"
            alt="Atom Icon"
            width={32}
            height={32}
            className="mr-3"
          />
          <h3 className="text-base font-light">GET IN TOUCH</h3>
        </div>

        {/* Main Heading */}
        <h2 className="text-2xl lg:text-3xl font-bold mb-6 leading-tight">
          Seamless Medical Distribution Starts Here, <br />
          Join the Future of Healthcare Today.
        </h2>

        {/* Location Section */}
        <div>
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-xl mr-3" />
            <h4 className="text-base font-light">OUR OFFICES</h4>
          </div>

          {/* First Location */}
          <div className="flex border-l-2 border-sky-300 items-start mb-4 ml-4 pl-4">
            <div>
              <p className="font-medium mb-1">
                <a
                  href="https://maps.app.goo.gl/kBGqbtJTVSRyxgVV6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  Emarat Atrium Building
                </a>
              </p>
              <p className="text-sm mb-1">
                <a
                  href="mailto:info@bayanmed.com"
                  className="text-blue-200 hover:underline"
                >
                  info@bayanmed.com
                </a>
              </p>
              <p className="text-sm text-blue-200">+971 4 296 5466</p>
            </div>
          </div>

          {/* Second Location */}
          <div className="flex border-l-2 border-sky-300 items-start ml-4 pl-4">
            <div>
              <p className="font-medium mb-1">Ras Al Khor Industrial 3</p>
              <p className="text-sm mb-1">
                <a
                  href="mailto:info@bayanmed.com"
                  className="text-blue-200 hover:underline"
                >
                  info@bayanmed.com
                </a>
              </p>
              <p className="text-sm text-blue-200">+971 4 346 8772</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
