import Link from "next/link";
import Image from "next/image";
export default function Header() {
    return(
        <header className="bg-[#F4F4F4] shadow-md w-full h-20 flex items-center px-10">
            {/* Logo */}
            <div className="flex items-center justify-start h-full w-1/3 px-4">
                <Image src="/assets/icons/icon.png" alt="Logo" width={65} height={100} />
                <h1 className="text-[#03508C] font-reg text-3xl px-4 ">Bayan Medical Co.</h1>
            </div>
            {/* Nav */}
            <nav className="flex-1 flex justify-end">
                <ul className="flex justify-between w-2/3 h-full items-center">
                    <li>
                        <Link href="/" className="text-[#003F63] font-regular">Home</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#003F63] font-regular">About</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#003F63] font-regular">Products</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#003F63] font-regular">Contact</Link>
                    </li>
                    <li>
                        <Link href="/" className="text-[#003F63] font-regular">Violation Report</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
