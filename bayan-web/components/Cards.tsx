import Image from "next/image";
import { PartnerProps } from "@/interfaces";

const Card: React.FC<PartnerProps> = ({ name, brief, logo, link }) => (
        <div className="card m-auto p-4 w-80 h-80 flex flex-col bg-blue-200 rounded-lg items-center justify-center"> 
            <Image src={logo} alt={name} width={100} height={100} />
            <h3>{name}</h3>
            <p>{brief}</p>
            <a href={link} target="_blank" rel="noreferrer">More</a>
        </div>

);
export default Card;