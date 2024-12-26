"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear status when user starts typing again
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
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setStatus({ message: result.message, type: 'success' });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ message: "Failed to submit the form. Please try again.", type: 'error' });
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex h-screen pb-6">
      <div className="w-1/2 flex flex-col justify-center p-6 bg-white rounded-lg shadow-md" id="contact">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#03508C]">Contact Us</h2>
        {status && (
          <p className={`text-center mb-4 ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
            {status.message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03508C]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03508C]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#03508C]"
              rows={5}
              required
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-[#03508C] text-white font-bold rounded-lg hover:bg-[#023e6b] focus:outline-none focus:ring-2 focus:ring-[#03508C]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 bg-cover bg-center flex flex-col justify-center items-center p-6" style={{ backgroundImage: "url('/assets/images/contact.jpg')" }}>
        <div className="mb-4">
          <FontAwesomeIcon icon={faEnvelope} className="text-[#03508C] text-2xl" />
          <a href="mailto:info@bayanmed.com" className="ml-2 text-lg text-[#03508C] hover:underline">
            info@bayanmed.com
          </a>
        </div>
        <div className="mb-4">
          <FontAwesomeIcon icon={faPhone} className="text-[#03508C] text-2xl" />
          <a href="tel:+97142965466" className="ml-2 text-lg text-[#03508C] hover:underline">
            +971 4 296 5466
          </a>
        </div>
        <div className="mb-4">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-[#03508C] text-2xl" />
          <a
            href="https://www.google.com/maps/place/Emarat+Atrium+Building/@25.1895137,55.2563361,15z/data=!4m5!3m4!1s0x0:0xcda36166d6eb82cc!8m2!3d25.1895137!4d55.2563361"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-lg text-[#03508C] hover:underline"
          >
            Dubai Office
          </a>
        </div>
      </div>
    </div>
  );
}
