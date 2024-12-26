"use client";
import { useState, useEffect } from "react";
import PartnerCard from "./Cards";
import { PartnerProps } from "@/interfaces";

const partnersData: PartnerProps[] = [
  {
    name: "Partner One",
    link: "https://www.partnerone.com",
    brief: "Partner One is a leading provider of medical equipment and supplies.",
    logo: "/assets/logos/partnerone.png",
  },
  {
    name: "Partner Two",
    link: "https://www.partnertwo.com",
    brief: "Partner Two specializes in innovative healthcare solutions.",
    logo: "/assets/logos/partnertwo.png",
  },
  {
    name: "Partner Three",
    link: "https://www.partnerthree.com",
    brief: "Partner Three offers a wide range of medical devices and services.",
    logo: "/assets/logos/partnerthree.png",
  },
  {
    name: "Partner four",
    link: "https://www.partnerone.com",
    brief: "Partner One is a leading provider of medical equipment and supplies.",
    logo: "/assets/logos/partnerone.png",
  },
  {
    name: "Partner five",
    link: "https://www.partnertwo.com",
    brief: "Partner Two specializes in innovative healthcare solutions.",
    logo: "/assets/logos/partnertwo.png",
  },
  {
    name: "Partner siz",
    link: "https://www.partnerthree.com",
    brief: "Partner Three offers a wide range of medical devices and services.",
    logo: "/assets/logos/partnerthree.png",
  },
];

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);

  useEffect(() => {
    setPartners(partnersData);
  }, []);

  return (
    <div id="partners" className="cards-container">
      <div className="relative w-full h-screen overflow-hidden bg-gray-100">
        <div className="absolute flex space-x-10 animate-slide-loop">
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
