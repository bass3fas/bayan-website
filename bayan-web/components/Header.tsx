"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 50) {
        setVisible(true);
      } else if (window.scrollY !== 0) {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <header className={`header ${visible ? "header-visible" : ""} bg-[#F4F4F4] shadow-md w-full h-20 flex items-center px-10`}>
      {/* Logo */}
      <div className="flex items-center justify-start h-full w-1/3 px-4">
        <Image src="/assets/icons/icon.png" alt="Logo" width={55} height={100} />
        <h1 className="text-[#03508C] font-medium text-2xl px-2">Bayan Medical Co.</h1>
      </div>
      {/* Nav */}
      <nav className="flex-1 flex justify-end">
        <ul className="flex justify-between w-2/3 h-full items-center">
          <li>
            <Link href="/" className="text-[#003F63] font-regular hover:text-[#2593D1]">Home</Link>
          </li>
          <li>
            <Link href="/" className="text-[#003F63] font-regular hover:text-[#2593D1]">About</Link>
          </li>
          <li>
            <Link href="/" className="text-[#003F63] font-regular hover:text-[#2593D1]">Products</Link>
          </li>
          <li>
            <Link href="/" className="text-[#003F63] font-regular hover:text-[#2593D1]">Contact</Link>
          </li>
          <li>
            <Link href="/" className="text-[#003F63] font-regular hover:text-[#2593D1]">Violation Report</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
