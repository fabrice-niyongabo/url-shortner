import { UserRole } from "@prisma/client";
import { User } from "next-auth";

// add role attribute to the session object
declare module "next-auth" {
  interface Session {
    user: User & {
      role: UserRole;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
