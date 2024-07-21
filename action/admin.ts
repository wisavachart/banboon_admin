"use server";
import { redirect } from "next/navigation";
const adminLogin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (email !== process.env.USERNAME && password !== process.env.PASSWORD) {
      console.log("Wrong Credentials");
      return;
    }
  } catch (err) {
    console.log(err);
  }

  // try {
  //   await signIn("credentials", {
  //     redirect: false,
  //     callbackUrl: "/",
  //     email,
  //     password,
  //   });
  // } catch (error) {
  //   const someError = error as CredentialsSignin;
  //   return someError.cause;
  // }
  redirect("/dashboard");
};

export { adminLogin };
