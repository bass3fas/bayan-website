import React from 'react';
import Image from "next/image";

const About = () => {
  return (
    <div className="mb-4" id="about">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen">
        {/* Left Section (About Bayan Medical Company) */}
        <section className="relative w-full lg:w-1/2 h-auto  bg-no-repeat bg-cover" >
          <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-gray-400 bg-opacity-30 p-6">
            {/* About Text */}
            <div className="text-center text-[#03508C] w-full p-4 lg:p-10 lg:mb-20">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">About Bayan Medical Company</h1>
              <p className="text-sm lg:text-base">
                Bayan Medical Company is committed to advancing healthcare by delivering world-class medical devices and innovative solutions. Partnering with leading global manufacturers, we aim to enhance patient outcomes and support healthcare professionals with cutting-edge technology.
              </p>
            </div>

            {/* Icons Section */}
            <div id="about-icons" className="relative bottom-10 lg:bottom-20 w-full flex flex-col lg:flex-row justify-center p-2 mt-10">
              <section id="1" className="flex flex-col items-center w-full lg:w-1/3 justify-center mb-4 lg:mb-0">
                <Image  src="/assets/icons/cup.png" alt="cup" width={70} height={55} />
                <h2 className="text-sm lg:text-base font-bold mt-2 text-[#DF7C19]">10+</h2>
                <h3 className="text-xs lg:text-sm text-[#DF7C19]">Years of Experience</h3>
              </section>
              <section id="2" className="flex flex-col items-center w-full lg:w-1/3 justify-center mb-4 lg:mb-0">
                <Image src="/assets/icons/hands.png" alt="hands" width={70} height={70} />
                <h2 className="text-sm lg:text-base font-bold mt-2 text-[#DF7C19]">100+</h2>
                <h3 className="text-xs lg:text-sm text-[#DF7C19]">Trusted Clients</h3>
              </section>
              <section id="3" className="flex flex-col items-center w-full lg:w-1/3 justify-center">
                <Image src="/assets/icons/globe.png" alt="globe" width={90} height={30} />
                <h2 className="text-sm lg:text-base font-bold mt-2 text-[#DF7C19]">20+</h2>
                <h3 className="text-xs lg:text-sm text-[#DF7C19]">Global Partnership</h3>
              </section>
            </div>
          </div>
        </section>

        {/* Right Section (Core Values) */}
        <section className="relative w-full lg:w-1/2 h-auto  bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/bg.png')" }}>
          <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
            {/* Core Values Heading */}
            <h1 className="text-2xl lg:text-3xl text-[#03508C] mt-10 lg:mt-20 mb-6 lg:mb-20">Our Core Values</h1>

            {/* Core Values Cards */}
            <div className="flex flex-col lg:flex-row items-center justify-center w-full">
              <div id="innovation" className="text-center text-white bg-[#4A4A4A] w-full lg:w-1/3 rounded-3xl p-4 lg:p-6 m-2">
                <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-10">Innovation</h3>
                <p className="text-xs lg:text-sm m-2 lg:m-4">Leading the way with advanced medical technologies</p>
                <Image className="mx-auto" src="/assets/icons/lamp.png" alt="innovation" width={50} height={50} />
              </div>
              <div id="quality" className="text-center text-white bg-[#2593D1] w-full lg:w-1/3 rounded-3xl p-4 lg:p-6 m-2">
                <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-10">Quality</h3>
                <p className="text-xs lg:text-sm m-2 lg:m-4">Ensuring top products and services for healthcare excellence</p>
                <Image className="mx-auto" src="/assets/icons/badge.png" alt="quality" width={50} height={50} />
              </div>
              <div id="commitment" className="text-center text-white bg-[#03508C] w-full lg:w-1/3 rounded-3xl p-4 lg:p-6 m-2">
                <h3 className="text-base lg:text-lg font-bold mb-4 lg:mb-10">Commitment</h3>
                <p className="text-xs lg:text-sm m-2 lg:m-4">Dedicated to enhancing lives through superior solutions</p>
                <Image className="mx-auto" src="/assets/icons/shake.png" alt="commitment" width={50} height={50} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;