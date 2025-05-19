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

  const handleFileUpload = (uploadedFileLink: string) => {
    setFileLink(uploadedFileLink);
  };
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" } | null>(null);

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
      className="flex flex-col md:flex-row h-screen"
      id="contact"
      style={{
        backgroundImage: "url('/assets/images/contact-bayan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full md:w-1/2 flex flex-col justify-center p-10 md:p-20">
        {status ? (
          status.type === "success" ? (
            <div className="text-center p-20">
              <p className="text-2xl mb-4 text-green-300">{status.message}</p>
            </div>
          ) : (
            <p className={`text-center mt-10 text-red-500`}>{status.message}</p>
          )
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-20 mb-20">
            {/* Name and Email Fields */}
            {["name", "email"].map((field) => (
              <div key={field} className="relative mb-6">
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-3 py-2 border-b-2 border-blue-400 bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white placeholder-transparent"
                  required
                />
                <label
                  htmlFor={field}
                  className="absolute left-3 top-2 text-blue-400 text-l transition-all duration-300 transform -translate-y-3 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-400"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
              </div>
            ))}
  
            {/* Message Field */}
            <div className="relative mb-6">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                className="peer w-full px-3 py-2 border-b-2 border-blue-400 bg-transparent text-white focus:outline-none focus:ring-0 focus:border-white placeholder-transparent resize-none"
                rows={4}
                maxLength={500}
                required
              />
              <label
                htmlFor="message"
                className="absolute left-3 top-2 text-blue-400 text-l transition-all duration-300 transform -translate-y-3 scale-75 origin-left peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-white peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-400"
              >
                Message
              </label>
              <div className="text-right text-sm text-blue-200 mt-1">
                {formData.message.length}/500
              </div>
            </div>
  
            {/* Attach CV */}
            <div className="flex flex-col items-center px-3 mb-8">
              <h3 className="text-white font-bold mb-8">Attach your CV</h3>
              <FileUploader onFileUpload={handleFileUpload} />
            </div>
  
            {/* Submit Button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-white text-[#03508C] font-bold rounded-full hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-[#03508C]"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Right Side with Image and Contact Info */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-start p-10 md:p-20 text-white">
        {/* Icon and "GET IN TOUCH" */}
        <div className="flex items-center mb-6">
          <Image
            src="/assets/icons/atom.png"
            alt="Atom Icon"
            width={40}
            height={40}
            className="mr-4"
          />
          <h3 className="text-lg font-light">GET IN TOUCH</h3>
        </div>

        {/* Main Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold mb-8">
          Seamless Medical Distribution Starts Here, <br />
          Join the Future of Healthcare Today.
        </h2>

        {/* Location Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-white text-2xl mr-4" />
            <h4 className="text-lg font-light">OUR OFFICE</h4>
          </div>

          {/* First Location */}
          <div className="flex border-l-2 border-sky-300 items-start mb-6 ml-6">
            <div className="mr-4 h-full"></div>
            <div>
              <p>
                <a
                  href="https://maps.app.goo.gl/kBGqbtJTVSRyxgVV6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  Emarat Atrium Building
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@bayanmed.com"
                  className="text-white hover:underline"
                >
                  info@bayanmed.com
                </a>
              </p>
              <p>+971 4 296 5466</p>
            </div>
          </div>

          {/* Second Location */}
          <div className="flex border-l-2 border-sky-300 items-start mb-6 ml-6">
            <div className="mr-4 h-full"></div>
            <div>
              <p>Ras Al Khor Industrial 3</p>
              <p>
                <a
                  href="mailto:info@bayanmed.com"
                  className="text-white hover:underline"
                >
                  info@bayanmed.com
                </a>
              </p>
              <p>+971 4 346 8772</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
