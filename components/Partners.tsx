"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import PartnerCard from "./Cards";
import { PartnerProps } from "@/interfaces";
import 'swiper/css';
import 'swiper/css/autoplay';

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);

  useEffect(() => {
    fetch("/api/partners")
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setPartners(data))
      .catch((error) => console.error("Error fetching partner data:", error));
  }, []);

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

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={'auto'}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 1500,
            pauseOnMouseEnter: true,
            disableOnInteraction: false
          }}
          speed={800}
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
        >
          {partners.map((partner, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <PartnerCard
                name={partner.name}
                link={partner.link}
                brief={partner.brief}
                logo={partner.logo}
              />
            </SwiperSlide>
          ))}
          
          {/* Duplicate slides for seamless loop */}
          {partners.map((partner, index) => (
            <SwiperSlide key={`dup-${index}`} className="!h-auto">
              <PartnerCard
                name={partner.name}
                link={partner.link}
                brief={partner.brief}
                logo={partner.logo}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}