import BackButton from "@/components/BackButton";
import PageHeader from "@/components/dashboard/PageHeader";
import NotFound from "@/components/NotFound";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { protectedAdminSession } from "@/lib/authProtected";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

interface PageProps {
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}

async function Users({ searchParams }: PageProps) {
  await protectedAdminSession();

  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.pageSize) || 10;
  const skip = (page - 1) * limit;

  const users = await prisma.user.findMany({
    where: {
      role: "USER",
    },
    include: {
      _count: {
        select: { urls: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit, // for pagination
    skip: skip, // for pagination
  });
  const totalCount = await prisma.user.count({
    where: {
      role: "USER",
    },
  });

  return (
    <div>
      <PageHeader title={`Users (${totalCount})`}>
        <BackButton href="/dashboard" label="Back to home" />
      </PageHeader>
      <div className="mt-5 bg-white p-5 rounded-md">
        {users.length === 0 ? (
          <NotFound title="No users found" />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th></th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-5 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Created at
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="text-sm odd:bg-gray-50">
                    <td>
                      {user?.image && (
                        <Image
                          src={user.image}
                          alt={user.name || ""}
                          className="w-10 h-10 rounded-full"
                        />
                      )}
                    </td>
                    <td className="px-5 py-5 text-gray-900 whitespace-nowrap">
                      {user.name}
                    </td>
                    <td className="px-5 py-5 text-gray-900 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-5 py-5 text-gray-900 whitespace-nowrap text-center">
                      {user._count.urls}
                    </td>
                    <td className="px-5 py-5 text-gray-900 whitespace-nowrap">
                      {new Date(user.createdAt).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {users.length > 0 && (
        <div className="py-10">
          <PaginationWithLinks
            page={page}
            pageSize={limit}
            pageSearchParam="page" // custom page search param
            totalCount={totalCount}
            navigationMode="router" // use router.push with loading states
            pageSizeSelectOptions={{
              pageSizeOptions: [10, 20, 30],
            }}
          />
        </div>
      )}
    </div>
  );
}

export default Users;
