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
    <div className="rounded-xl h-fit left-0 top-0 sticky z-50 p-10 flex flex-col gap-16 bg-red-600 shadow-xl max-lg:hidden mx-5 my-5 ">
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
              className="flex gap-4 text-body-medium text-white">
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
          <div className="flex gap-4 text-body-medium items-center cursor-pointer text-white">
            <LogOut />
            <button type="submit">Logout</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LeftSideBar;
