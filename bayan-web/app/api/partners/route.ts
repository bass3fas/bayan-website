// app/api/partners/route.ts
import { PartnerProps } from "@/interfaces";

const partnersData: PartnerProps[] = [
  {
    name: "Partner One",
    link: "https://www.partnerone.com",
    brief: "Partner One is a leading provider of medical equipment and supplies.",
    logo: "/assets/logos/partnerone.png",
  },
  {
    name: "Partner Two",
    link: "https://www.partnertwo.com",
    brief: "Partner Two specializes in innovative healthcare solutions.",
    logo: "/assets/logos/partnertwo.png",
  },
  {
    name: "Partner Three",
    link: "https://www.partnerthree.com",
    brief: "Partner Three offers a wide range of medical devices and services.",
    logo: "/assets/logos/partnerthree.png",
  },
];

// Use the new Web standard API handler for Next.js 13
export async function GET(req: Request) {
  return new Response(JSON.stringify(partnersData), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
