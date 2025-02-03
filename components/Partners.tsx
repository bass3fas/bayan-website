"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import PartnerCard from "./Cards";
import { PartnerProps } from "@/interfaces";

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);
  const controls = useAnimation();

  useEffect(() => {
    fetch("/api/partners")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partner data:", error));
  }, []);

  return (
    <div id="partners" className="relative overflow-hidden w-full h-full py-10 bg-gray-900 mb-6">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-white mb-2 mt-10">Meet Our Trusted Partners</h2>
        <p className="text-gray-300 text-md mx-auto max-w-md mb-10">
        We are proud to collaborate with industry-leading partners who share our vision for excellence. Together, we deliver innovative solutions and drive success in every endeavor.
        </p>
      </div>

      {/* Animated Scrolling Section */}
      <div className="relative flex items-center w-full overflow-hidden">
        {/* Gradient Fade Effect */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent z-10" />

        {/* Infinite Scrolling Cards */}
        <motion.div
          className="flex space-x-6"
          animate={controls}
          initial={{ x: 0 }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          onMouseEnter={() => controls.stop()} // Stops animation on hover
          onMouseLeave={() =>
            controls.start({ x: "-50%", transition: { ease: "linear", duration: 10, repeat: Infinity } })
          } // Resumes animation when mouse leaves
        >
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex space-x-6">
              {partners.map((partner) => (
                <PartnerCard
                  key={`${partner.name}-${index}`}
                  name={partner.name}
                  link={partner.link}
                  brief={partner.brief}
                  logo={partner.logo}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
