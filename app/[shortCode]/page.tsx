import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  params: { shortCode: string };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = params;
  const url = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });

  if (!url) {
    return (
      <div className="w-full h-screen p-5 flex items-center justify-center">
        <div className="w-1/2 p-5 rounded-lg bg-red-200">
          <h1 className="text-red-700 text-center">404 - Not Found</h1>
          <Link
            href="/"
            className="mt-5 flex items-center justify-center gap-2 text-blue-700 text-center"
          >
            <ChevronLeft />
            <span>Go back to homepage</span>
          </Link>
        </div>
      </div>
    );
  }

  await prisma.clicks.create({
    data: {
      urlId: url.id,
    },
  });

  redirect(url.longUrl);
}
