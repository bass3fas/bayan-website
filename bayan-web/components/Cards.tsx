import Image from "next/image";
import { PartnerProps } from "@/interfaces";

const Card: React.FC<PartnerProps> = ({ name, brief, logo, link }) => (
        <div className="card m-auto p-4 w-80 h-80 flex flex-col bg-white rounded-lg items-center justify-center"> 
            <Image src={logo} alt={name} width={100} height={100} />
            <h3 className="font-bold text-blue-500 m-4">{name}</h3>
            <p className="text-sm justify-center px-6 mx-4 text-gray-700">{brief}</p>
            <a href={link} target="_blank" rel="noreferrer" className="text-gray-700 hover:text-blue-400 hover:font-bold">More</a>
        </div>

);
export default Card;