import NotFound from "@/components/NotFound";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import {
  Calendar,
  ChevronLeft,
  CircleX,
  CopyIcon,
  ImageIcon,
  Share,
} from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Location from "./Location";
import Devices from "./devices";
import Cities from "./Cities";
import Engagement from "./engagement";
import BackButton from "@/components/BackButton";
import ShareButton from "@/components/ShareButton";
import CopyButton from "@/components/CopyButton";
import DeleteButton from "@/components/features/user/link-details/DeleteButton";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}
async function LinkDetails({ params }: PageProps) {
  const { shortCode } = await params;
  const header = await headers();
  const url = await prisma.url.findUnique({
    where: {
      shortCode,
    },
  });
  if (!url) {
    return <NotFound title="Invalid short code" />;
  }

  return (
    <div>
      <BackButton href="/dashboard/links" label="Back to list" />
      <div className="mt-5 bg-white rounded-md p-10">
        <div className="flex items-center justify-between gap-5">
          <h1 className="text-2xl font-bold line-clamp-1 flex-1">
            {url.title}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <CopyButton textToCopy={`${header.get("host")}/${url.shortCode}`} />
            <ShareButton url={`${header.get("host")}/${url.shortCode}`} />
            <DeleteButton urlId={url.id} />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex items-center justify-center p-2 border rounded-full">
            {url.icon ? (
              <Image
                src={url.icon}
                alt={url.title || ""}
                width={35}
                height={35}
              />
            ) : (
              <ImageIcon size={35} />
            )}
          </div>
          <div className="flex-1">
            <p className="text-md text-blue-600 font-semibold  line-clamp-1">
              <a
                className="hover:underline"
                href={"/" + url.shortCode}
                target="_blank"
              >{`${header.get("host")}/${shortCode}`}</a>
            </p>
            <p className="text-md text-gray-500 line-clamp-1 w-full">
              <a className="hover:underline" href={url.longUrl} target="_blank">
                {url.longUrl}
              </a>
            </p>
          </div>
        </div>

        {/* footer */}
        <div className="border-t pt-2 mt-5">
          <div className="flex items-center justify-start gap-2">
            <Calendar size={18} />
            <p className="text-sm"> {url.createdAt.toUTCString()}</p>
          </div>
        </div>
      </div>

      <Engagement urlId={url.id} />
      <Cities urlId={url.id} />
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2">
            <Location urlId={url.id} />
          </div>
          <div>
            <Devices urlId={url.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LinkDetails;
