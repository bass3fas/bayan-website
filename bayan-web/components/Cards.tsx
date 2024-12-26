import Image from "next/image";
import { PartnerProps } from "@/interfaces";

const Card: React.FC<PartnerProps> = ({ name, brief, logo, link }) => (
  <div className="card m-auto p-2 w-80 h-80 flex flex-col bg-white rounded-lg items-center justify-center transform transition-transform duration-300 hover:scale-105">
    <Image src={logo} alt={name} width={150} height={150} />
    <p className="text-xs justify-center px-6 mx-4 text-gray-700 py-4">{brief}</p>
    <a href={link} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-400 hover:font-bold">More</a>
  </div>
);

export default Card;