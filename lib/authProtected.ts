import { auth } from "@/auth";
import { UserRole } from "@prisma/client";
import { Session } from "next-auth";
import { redirect } from "next/navigation";

export const protectedLoggedInUserSession = async (): Promise<Session> => {
  const session = await auth();
  if (!session) return redirect("/login");

  return session;
};

export const protectedUserRoleSession = async (): Promise<Session> => {
  const session = await auth();
  if (!session) return redirect("/login");

  if (session.user.role !== UserRole.USER) return redirect("/dashboard");

  return session;
};

export const protectedAdminRoleSession = async (): Promise<Session> => {
  const session = await auth();
  if (!session) return redirect("/login");

  if (session.user.role !== UserRole.ADMIN) return redirect("/dashboard");

  return session;
};
