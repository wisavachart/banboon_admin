import { navLinks } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";
import { getSession } from "@/lib/getSession";
import { signOut } from "@/auth";

const LeftSideBar = async () => {
  const session = await getSession();
  const user = session?.user;

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-banboon shadow-xl max-lg:hidden">
      <Image
        src="/banboon_logo.png"
        alt="logo"
        width={180}
        height={70}
        priority={true}
      />

      {user && (
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
      )}
      {!user && (
        <div className="flex gap-4 text-body-medium items-center cursor-pointer">
          <Link href="/login" className="flex gap-5">
            <LogIn />
            <p>Login</p>
          </Link>
        </div>
      )}
      {user && (
        <form
          action={async () => {
            "use server";
            await signOut();
          }}>
          <div className="flex gap-4 text-body-medium items-center cursor-pointer">
            <LogOut />
            <button type="submit">Logout</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeftSideBar;
