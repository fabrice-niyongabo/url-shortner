import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}

interface ILocation {
  ip: string;
  city: string;
  region: string;
  country_code: string;
  country_name: string;
  currency: string;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params;

  // headers for getting user agent and ip address
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";
  const xForwardedFor = headersList.get("x-forwarded-for"); // IP (if behind proxy)

  // Detect device type
  const isMobile = /mobile|android|touch|webos|iphone|ipad/i.test(userAgent);
  const isDesktop = !isMobile;

  // IP address
  const ip = xForwardedFor?.split(",")[0] || "unknown";

  // get location using an external API
  let location: ILocation | null = null;
  if (ip !== "unknown") {
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await res.json();
      if (!data?.error) {
        location = data;
      }
    } catch (e) {
      console.error(e);
    }
  }

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
      country: location?.country_name,
      country_code: location?.country_code,
      region: location?.region,
      city: location?.city,
      device: isMobile ? "mobile" : "desktop",
    },
  });

  redirect(url.longUrl);
}
