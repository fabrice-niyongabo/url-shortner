import CopyButton from "@/components/CopyButton";
import PageHeader from "@/components/dashboard/PageHeader";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { PaginationWithLinks } from "@/components/ui/pagination-with-links";
import { protectedUserRoleSession } from "@/lib/authProtected";
import prisma from "@/lib/prisma";
import {
  Calendar,
  ChartNoAxesColumn,
  CopyIcon,
  ImageIcon,
  LinkIcon,
  Share,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  searchParams?: Promise<{ page?: string; pageSize?: string }>;
}

async function Links({ searchParams }: PageProps) {
  const session = await protectedUserRoleSession();

  const header = await headers();

  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.pageSize) || 10;
  const skip = (page - 1) * limit;

  const links = await prisma.url.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: { Clicks: true }, // select the count of clicks
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: limit, // for pagination
    skip: skip, // for pagination
  });
  const total = await prisma.url.count({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div>
      <PageHeader title="Links">
        <Link href="/dashboard/links/new">
          <Button className="bg-blue-500 text-white font-bold px-5 py-3 mt-5 rounded-md hover:bg-orange-500 hover:cursor-pointer">
            Create link
          </Button>
        </Link>
      </PageHeader>
      <div className="mt-5 flex flex-col gap-5">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white p-5 rounded-md flex items-start justify-between gap-4"
          >
            <div className="flex items-center justify-center p-2 border rounded-full">
              {link.icon ? (
                <Image
                  src={link.icon}
                  alt={link.title || ""}
                  width={35}
                  height={35}
                />
              ) : (
                <ImageIcon size={35} />
              )}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <div className="flex items-center justify-between gap-2">
                <a
                  href={link.longUrl}
                  className="flex-1 text-xl font-semibold line-clamp-1 hover:underline"
                  target="_blank"
                >
                  {link.title}
                </a>
                <div className="flex items-center justify-center gap-2">
                  <CopyButton
                    textToCopy={`${header.get("host")}/${link.shortCode}`}
                  />
                  <ShareButton url={link.shortCode} />
                  <Link href={`/dashboard/links/${link.shortCode}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="hover:cursor-pointer hover:bg-amber-600 hover:text-white"
                    >
                      <LinkIcon />
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
              <div>
                <p className="line-clamp-1">
                  <a
                    href={`/${link.shortCode}`}
                    className="text-blue-700 font-bold hover:underline"
                    target="_blank"
                  >
                    {`${header.get("host")}/${link.shortCode}`}
                  </a>
                </p>
                <p className="line-clamp-1">
                  <a
                    href={link.longUrl}
                    className="text-xs hover:underline"
                    target="_blank"
                  >
                    {link.longUrl}
                  </a>
                </p>
              </div>

              {/* statistics */}
              <div className="flex items-center justify-start gap-4 mt-5">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <ChartNoAxesColumn size={16} />
                  <span>Clicks {link._count.Clicks}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Calendar size={16} />
                  <span>{new Date(link.createdAt).toDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="py-10">
        <PaginationWithLinks
          page={page}
          pageSize={limit}
          pageSearchParam="page" // custom page search param
          totalCount={total}
          navigationMode="router" // use router.push with loading states
          pageSizeSelectOptions={{
            pageSizeOptions: [10, 20, 30],
          }}
        />
      </div>
    </div>
  );
}

export default Links;
