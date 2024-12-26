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
];

export default function Partners() {
  const [partners, setPartners] = useState<PartnerProps[]>([]);

  useEffect(() => {
    setPartners(partnersData);
    console.log("Partners data:", partnersData);
  }, []);

  return (
    <div id="partners" className="cards-container">
      <div className="flex flex-row items-center w-full h-screen bg-gray-100">
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
  );
}