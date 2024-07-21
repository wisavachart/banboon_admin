import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

const LeftSideBar = () => {
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-banboon shadow-xl max-lg:hidden">
      <Image
        src="/banboon_logo.png"
        alt="logo"
        width={180}
        height={70}
        priority={true}
      />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className="flex gap-4 text-body-medium text-black">
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center"></div>
    </div>
  );
};

export default LeftSideBar;
