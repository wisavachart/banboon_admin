import { getSession } from "@/lib/getSession";
import { redirect } from "next/navigation";
import React from "react";

const Home = async () => {
  const session = await getSession();
  const user = session?.user;

  if (user) {
    redirect("/dashboard");
  } else if (!user) {
    redirect("/login");
  }
  return <div>Baanboon</div>;
};

export default Home;
