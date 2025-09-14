import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

class InvalidLoginError extends CredentialsSignin {
  code = "Invalid identifier or password";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email as any },
        });

        if (!user || !user.password) {
          throw new InvalidLoginError();
        }

        const isValid = await bcrypt.compare(
          credentials!.password as string,
          user.password
        );

        if (!isValid) {
          //   throw new Error("Invalid password.");
          throw new InvalidLoginError();
        }

        // Return all user fields EXCEPT the password
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword as any;
      },
    }),
  ],
});
