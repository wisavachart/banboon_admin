"use server";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import { redirect } from "next/navigation";
const adminLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  console.log(email, password);
  if (email !== process.env.USERNAME || password !== process.env.PASSWORD) {
    return;
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const someError = error as CredentialsSignin;
    if (someError) {
      redirect("/login");
    }
  }
  redirect("/dashboard");
};

export { adminLogin };
