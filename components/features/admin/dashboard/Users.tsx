import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { Users2 } from "lucide-react";
import Link from "next/link";

async function Users() {
  const usersCount = await prisma.user.count({ where: { role: "USER" } });
  return (
    <Link href="/dashboard/users" className="block h-full">
      <div className="bg-white p-5 rounded-md hover:bg-gray-300">
        <p className="text-lg font-semibold flex gap-2 items-center">
          <Users2 /> <span>Users</span>
        </p>
        <p className="text-4xl text-center mt-3">{minifyNumber(usersCount)}</p>
      </div>
    </Link>
  );
}

export default Users;
