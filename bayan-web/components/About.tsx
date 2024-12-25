import Image from "next/image";
export default function About() {
  return (
    <div className="mb-4" id="about">
      <div className="flex w-full h-screen">
        <section className="relative w-1/2 h-full  bg-no-repeat" style={{ backgroundImage: "url('/assets/images/about.png')" }}>
          <div className="relative z-10 flex items-center justify-center w-full h-full bg-gray-400 bg-opacity-30 p-6">
            <div className="text-center text-[#03508C] w-full p-20">
              <h1 className="text-3xl font-bold mb-4">About Bayan Medical</h1>
              <p className="text-m">Bayan Medical Company is committed to advancing healthcare by delivering world-class medical devices and innovative solutions. Partnering with leading global manufacturers, we aim to enhance patient outcomes and support healthcare professionals with cutting-edge technology.</p>
            </div>
            <div id="about-icons" className="absolute bottom-20 w-full flex justify-center p-6">
              <section id="1" className="flex flex-col items-center w-1/3 justify-center">
                <Image className="mx-10" src="/assets/icons/cup.png" alt="cup" width={70} height={55} />
                <h2 className="text-m font-bold mt-2 text-[#DF7C19]">10+</h2>
                <h3 className="text-s text-[#DF7C19]">Years of Experience</h3>
              </section>
              <section id="2" className="flex flex-col items-center w-1/3 justify-center">
                <Image className="mx-10" src="/assets/icons/hands.png" alt="hands" width={70} height={70} />
                <h2 className="text-m font-bold mt-2 text-[#DF7C19]">100+</h2>
                <h3 className="text-s text-[#DF7C19]">Trusted Clients</h3>
              </section>
              <section id="3" className="flex flex-col items-center w-1/3 justify-center">
                <Image className="mx-10" src="/assets/icons/globe.png" alt="globe" width={90} height={30} />
                <h2 className="text-m font-bold mt-2 text-[#DF7C19]">20+</h2>
                <h3 className="text-s text-[#DF7C19]">Global Partnership</h3>
              </section>
            </div>
          </div>
        </section>
        <section className="relative w-1/2 h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/assets/images/bg.png')" }}>
          <div className="relative flex flex-col items-center justify-center w-full h-full p-6">
            <h1 className="text-3xl text-[#03508C] m-20">Our Core Values</h1>
            <div className="flex flex-row items-center justify-center w-full">
              <div id="innovation" className="text-center text-white bg-[#4A4A4A] w-1/3 rounded-3xl p-6 m-2">
                <h3 className="text-l font-bold mb-10">Innovation</h3>
                <p className="text-s m-4">Leading the way with advanced medical technologies</p>
                <Image className="mx-auto" src="/assets/icons/lamp.png" alt="innovation" width={70} height={70} />
              </div>
              <div id="quality" className="text-center text-white bg-[#2593D1] w-1/3 rounded-3xl p-3 m-2">
                <h3 className="text-l font-bold mb-10">Quality</h3>
                <p className="text-s m-4">Ensuring top-notch products and services for healthcare excellence</p>
                <Image className="mx-auto" src="/assets/icons/badge.png" alt="innovation" width={70} height={70} />
              </div>
              <div id="commitment" className="text-center text-white bg-[#03508C] w-1/3 rounded-3xl p-6 m-2">
                <h3 className="text-l font-bold mb-10">Commitment</h3>
                <p className="text-s m-4">Dedicated to enhancing lives through superior solutions</p>
                <Image className="mx-auto" src="/assets/icons/shake.png" alt="innovation" width={70} height={70} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}