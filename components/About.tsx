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
        <section className="relative w-full lg:w-1/2 h-auto bg-no-repeat bg-cover flex items-center justify-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-6 mr-4">
            <div className="flex items-center mb-6">
              <Image src="/assets/icons/atom.png" alt="atom icon" width={20} height={20} />
              <h2 className="ml-4 text-lg text-white font-light">WHO WE ARE</h2>
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mr-4">
              Bayan Medical Company is a leading healthcare solutions provider in the UAE, partnering with world-class suppliers to offer cutting-edge medical devices and services.
            </h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;