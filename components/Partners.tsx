"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import PartnerCard from "./Cards";
import { PartnerProps } from "@/interfaces";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/free-mode';

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setPartners(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching partner data:", error);
        setIsLoading(false);
      });
  }, []);

  // Double the partners array for seamless infinite loop
  const duplicatedPartners = [...partners, ...partners];

  return (
    <div id="partners" className="relative overflow-hidden w-full min-h-screen py-10 bg-gradient-to-b from-[#03508C] to-black mb-2 mt-5 pt-20">
      <div className="text-center mb-10 mt-10">
        <h2 className="text-3xl font-bold text-white mb-10">Meet Our Trusted Partners</h2>
        <p className="text-gray-300 text-md mx-auto max-w-md mb-10 mt-5">
          We are proud to collaborate with industry-leading partners who share our vision for excellence. Together, we deliver innovative solutions and drive success in every endeavor.
        </p>
      </div>

      <div className="relative w-full px-4">
        {/* Gradient Fade Effect */}
        <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-gray-900 to-transparent z-20" />
        <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-gray-900 to-transparent z-20" />

        {isLoading ? (
          <div className="text-center text-white">Loading partners...</div>
        ) : (
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={30}
            slidesPerView={'auto'}
            centeredSlides={true}
            loop={true}
            freeMode={{
              momentum: true,
              momentumBounce: false,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true,
            }}
            speed={1000}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 50
              }
            }}
            className="!overflow-visible"
            // Force reinitialization when partners load
            key={partners.length}
          >
            {duplicatedPartners.map((partner, index) => (
              <SwiperSlide key={`${partner.name}-${index}`} className="!h-auto !flex !items-center !justify-center">
                <div className="w-[300px]"> {/* Fixed width for consistent sizing */}
                  <PartnerCard
                    name={partner.name}
                    link={partner.link}
                    brief={partner.brief}
                    logo={partner.logo}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}