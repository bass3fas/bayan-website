"use client";
import { useState, useEffect } from "react";
import PartnerCard from "./Cards";
import { PartnerProps } from "@/interfaces";

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);

  useEffect(() => {
    // Fetch the partner data from the API
    fetch("/api/partners")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partner data:", error));
  }, []);

  return (
    <div id="partners" className="cards-container pb-6 pt-2">
      <div
        className="relative w-full h-screen overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/images/partnership.jpg')" }}
      >
        <div className="text-center mb-10 pt-5">
          <h2 className="text-3xl font-bold text-white mb-6">Meet Our Trusted Partners</h2>
          <p className="text-gray-100 text-md mx-auto max-w-md">
            We are proud to collaborate with industry-leading partners who share our vision for excellence.
            Together, we deliver innovative solutions and drive success in every endeavor.
          </p>
        </div>
        <div className="absolute flex space-x-10 animate-slide-loop p-6">
          {partners.map((partner) => (
            <PartnerCard
              key={partner.name}
              name={partner.name}
              link={partner.link}
              brief={partner.brief}
              logo={partner.logo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
