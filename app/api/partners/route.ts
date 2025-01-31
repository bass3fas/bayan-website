// app/api/partners/route.ts
import { PartnerProps } from "@/interfaces";

const partnersData: PartnerProps[] = [
  {
    name: "Medtronic",
    link: "https://www.medtronic.com/us-en/index.html",
    brief: "Medtronic is the world’s largest medical technology company, offering an unprecedented breadth and depth of innovative therapies to fulfill a mission of alleviating pain, restoring health and extending life.",
    logo: "/assets/logos/medtronic.png",
  },
  {
    name: "Aesculap",
    link: "https://www.aesculap.com",
    brief: "Aesculap – Partner for Surgery A strong part of B. Braun for more than 40 years. As a product brand in the B. Braun portfolio, AESCULAP offers solutions for surgical and interventional core processes.",
    logo: "/assets/logos/aesculap.png",
  },
  {
    name: "BBraun",
    link: "https://www.bbraun.com/en.html",
    brief: "B. Braun is one of the world’s leading providers and manufacturers of healthcare solutions today. Every service that B. Braun provides incorporates the entirety of our knowledge and skills, the company’s deep understanding.",
    logo: "/assets/logos/bbraun.png",
  },
  {
    name: "GE Healthcare",
    link: "https://www.bkmedical.com/",
    brief: "For more than 40 years, BK Ultrasound solutions have played a central role in procedure-driven markets that include urology, surgery and point-of-care. With award-winning systems and unique transducer designs",
    logo: "/assets/logos/ge-bk.png",
  },
  {
    name: "Medartis",
    link: "https://www.medartis.com/",
    brief: "Medartis is a leading innovator in osteosynthesis implants for cranio-maxillofacial, upper and lower extremities. Their high-quality products significantly contribute to the restoration of bone fractures, accelerating rehabilitation and improving patient outcomes. ",
    logo: "/assets/logos/medartis.png",
  },
  {
    name: "Gesiter",
    link: "http://www.geister.com/",
    brief: "Geister, manufacturer and system suppliers for Surgical world with the highest quality instruments with best “ GERMAN WORKMANSHIP”. They develop technical innovations for the medical professionals for evolving patient friendly conventional and MIS procedures.",
    logo: "/assets/logos/geister.png",
  },
  {
    name: "Sophysa",
    link: "http://www.sophysa.com/",
    brief: "Sophysa offers a unique solution for the joint continuous measurements of intracranial pressure and temperature. With the Pressio® System, Sophysa offers a complete solution for the joint measurement of intracranial pressure (ICP) and temperature (ICT).",
    logo: "/assets/logos/sophysa.png",
  },
  {
    name: "Artivion",
    link: "https://artivion.com/",
    brief: "Artivion produces and markets medical devices for aortic and peripheral vascular diseases. Jotec portfolio encompasses conventional vascular grafts and interventional implants for vascular, cardiac surgery and radiology",
    logo: "/assets/logos/artivion.png",
  },


];

// Use the new Web standard API handler for Next.js 13
export async function GET() {
  return new Response(JSON.stringify(partnersData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
