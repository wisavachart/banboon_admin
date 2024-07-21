import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined;
        const password = credentials.password as string | undefined;

        if (
          email !== "baanboon@gmail.com" ||
          password !== "baanboonadmin1212312121"
        ) {
          throw new CredentialsSignin("Wrong Credentials Naja");
        }
        const user = email;
        const userData = {
          email: user,
        };

        return userData;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
