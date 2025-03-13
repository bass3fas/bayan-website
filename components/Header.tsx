"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${visible ? "header-visible" : ""} bg-[#F4F4F4] shadow-md w-full h-20 flex items-center px-4 sm:px-10 fixed top-0 z-50`}>
      {/* Logo */}
      <div className="flex items-center justify-start h-full w-full sm:w-1/3 px-2 sm:px-4">
        <Image src="/assets/icons/icon.png" alt="Logo" width={55} height={100} className="w-10 h-auto sm:w-12" />
        <h1 className="text-[#03508C] font-medium text-lg sm:text-2xl px-2">Bayan Medical Co.</h1>
      </div>

      {/* Hamburger Menu Icon (for mobile) */}
      <div className="sm:hidden flex items-center justify-end w-1/3 px-3">
        <button onClick={toggleMobileMenu} className="text-[#003F63] focus:outline-none">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>

      {/* Nav (for desktop) */}
      <nav className="hidden sm:flex flex-1 justify-end">
        <ul className="flex justify-between w-2/3 h-full items-center">
          <li>
            <Link href="#home" className="text-[#003F63] font-regular hover:text-[#2593D1]">Home</Link>
          </li>
          <li>
            <Link href="#about" className="text-[#003F63] font-regular hover:text-[#2593D1]">About</Link>
          </li>
          <li>
            <Link href="#partners" className="text-[#003F63] font-regular hover:text-[#2593D1]">Partners</Link>
          </li>
          <li>
            <Link href="#contact" className="text-[#003F63] font-regular hover:text-[#2593D1]">Careers</Link>
          </li>
          <li>
            <Link href="#violation-report" className="text-[#003F63] font-regular hover:text-[#2593D1]">Violation Report</Link>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu (for small screens) */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed top-20 right-0 w-full bg-[#F4F4F4] shadow-md z-40">
          <ul className="flex flex-col items-center py-4">
            <li className="w-full text-center py-2">
              <Link href="#home" onClick={closeMobileMenu} className="text-[#003F63] font-regular hover:text-[#2593D1] block py-2">Home</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="#about" onClick={closeMobileMenu} className="text-[#003F63] font-regular hover:text-[#2593D1] block py-2">About</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="#partners" onClick={closeMobileMenu} className="text-[#003F63] font-regular hover:text-[#2593D1] block py-2">Partners</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="#contact" onClick={closeMobileMenu} className="text-[#003F63] font-regular hover:text-[#2593D1] block py-2">Contact</Link>
            </li>
            <li className="w-full text-center py-2">
              <Link href="#violation-report" onClick={closeMobileMenu} className="text-[#003F63] font-regular hover:text-[#2593D1] block py-2">Violation Report</Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}