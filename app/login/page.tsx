import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { adminLogin } from "@/action/admin";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";
const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/dashboard");
  return (
    <div className="border-2 h-full flex items-center">
      <div className="mt-10 max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white border border-[#121212]  dark:bg-black">
        <form className="my-8" action={adminLogin}>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            name="email"
          />
          <Label htmlFor="email">Password</Label>
          <Input
            id="password"
            placeholder="*************"
            type="password"
            name="password"
            className="mb-6"
          />
          <button className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
            Login &rarr;
          </button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
    </div>
  );
};

export default Login;
