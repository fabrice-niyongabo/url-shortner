import prisma from "@/lib/prisma";
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
    return <h1>404 - Not Found</h1>;
  }

  await prisma.clicks.create({
    data: {
      urlId: url.id,
    },
  });

  redirect(url.longUrl);
}
