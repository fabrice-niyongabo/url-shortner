export const runtime = "nodejs";

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";

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

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials!.password as string,
          user.password
        );

        if (!isValid) return null;

        // Return all user fields EXCEPT the password
        const { password, ...userWithoutPassword } = user;

        return userWithoutPassword as any;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user) return false;
      return true;
    },
  },
});
