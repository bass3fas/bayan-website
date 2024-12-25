import Image from "next/image";
export default function About() {
  return (
    <div className="mb-4" id="about">
      <section className="relative w-1/2 h-screen bg-cover bg-center bg-no-repeat">
        <div className="relative z-10 flex items-center justify-center w-full h-full bg-gray-400 bg-opacity-30 p-6">
          <div className="text-center text-[#03508C] w-full p-30 m-20 ">
            <h1 className="text-3xl font-bold mb-10">About Bayan Medical</h1>
            <p className="text-m mb-40">Bayan Medical Company is committed to advancing healthcare by delivering world-class medical devices and innovative solutions. Partnering with leading global manufacturers, we aim to enhance patient outcomes and support healthcare professionals with cutting-edge technology.</p>
          </div>
          <div id="about-icons" className="mt-20 absolute bottom-20 w-full flex justify-center p-6">
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
    </div>
  );
}