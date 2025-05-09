import React from 'react';
import Image from "next/image";

const About = () => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      id="about"
      style={{ backgroundImage: "url('/assets/images/about.png')" }}
    >
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Section (Empty) */}
        <section className="relative w-full lg:w-1/2 h-auto"></section>

        {/* Right Section (Who We Are) */}
        <section className="relative w-full lg:w-1/2 h-auto bg-no-repeat bg-cover flex flex-col justify-center p-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-10">
            <div className="flex items-center mb-6">
              <Image src="/assets/icons/atom.png" alt="atom icon" width={20} height={20} />
              <h2 className="ml-4 text-lg text-white font-light">WHO WE ARE</h2>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mr-4">
              Bayan Medical Company is a leading healthcare solutions provider in the UAE, partnering with world-class suppliers to offer cutting-edge medical devices and services.
            </h1>
          </div>

          {/* Flex Section with 3 Columns */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            {/* Left Column */}
            <div className="flex-1 border-r border-sky-200 pr-6">
              <h2 className="text-xl lg:text-2xl font-bold text-sky-200 mb-2">70+ <br /> Hospitals and Clinics</h2>
              <p className="text-sm lg:text-base text-white">
                Partnering with leading hospitals across UAE to deliver cutting-edge medical solutions.
              </p>
            </div>

            {/* Middle Column */}
            <div className="flex-1 border-r border-sky-200 pr-6">
              <h2 className="text-xl lg:text-2xl font-bold text-sky-200 mb-2">20+ <br /> Global Partnerships</h2>
              <p className="text-sm lg:text-base text-white">
                Collaborating with international manufacturers to bring innovative technologies to the region.
              </p>
            </div>

            {/* Right Column */}
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-sky-200 mb-2">100+ <br /> Trusted <br /> Clients</h2>
              <p className="text-sm lg:text-base text-white">
                Building long-term relationships with clients by providing exceptional service and reliable solutions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;