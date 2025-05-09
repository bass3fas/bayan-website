import Image from "next/image";
import { PartnerProps } from "@/interfaces";

const Card: React.FC<PartnerProps> = ({ name, brief, logo, link }) => (
  <div className="card group m-auto w-80 bg-white rounded-lg overflow-hidden transform transition-transform duration-500 hover:scale-105">
    {/* Logo Section */}
    <div className="relative flex flex-col items-center justify-center h-40 bg-white transition-all duration-500 ease-in-out group-hover:h-60">
      <Image src={logo} alt={name} width={150} height={150} className="transition-opacity duration-500 ease-in-out" />
      {/* Down Arrow */}
      <div className="absolute bottom-[-5px] text-gray-500 group-hover:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-8 h-8 animate-bounce"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

    {/* Hidden Content (Visible on Hover) */}
    <div className="hidden group-hover:flex flex-col items-center justify-center text-center bg-white p-4 transition-all duration-500 ease-in-out">
      <p className="text-xs text-gray-700 mb-4">{brief}</p>
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-gray-700 hover:text-blue-400 hover:font-bold"
      >
        More
      </a>
    </div>
  </div>
);

export default Card;