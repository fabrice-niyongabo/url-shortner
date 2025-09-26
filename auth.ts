import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt", // force JWT so middleware can read it
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findFirst({
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
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.role = token.role as any;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await prisma.user.findFirst({
        where: {
          email: user?.email || token.email || "",
        },
      });

      if (!dbUser) return token;

      token.id = dbUser.id;
      token.email = dbUser.email;
      token.name = dbUser.name;
      token.picture = dbUser.image;
      token.role = dbUser.role;

      return token;
    },
  },
});
