import prisma from "@/lib/prisma";
import { ChevronLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import path from "path";
import { UAParser } from "ua-parser-js";
import maxmind from "maxmind";
import fs from "fs";

interface PageProps {
  params: Promise<{ shortCode: string }>;
}

interface ILocation {
  ip?: string;
  city?: string;
  region?: string;
  country_code?: string;
  country_name?: string;
}

async function getClientIp() {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ||
    headersList.get("x-real-ip") ||
    headersList.get("cf-connecting-ip") ||
    headersList.get("x-vercel-forwarded-for") ||
    null;

  if (!ip || ip === "::1" || ip.startsWith("127.")) return null;
  return ip;
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortCode } = await params;

  // headers for getting user agent
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  // Detect device type
  const parser = new UAParser(userAgent);
  const deviceType = parser.getDevice().type || "desktop";

  // ---- LOCATION DETECTION ----
  let location: ILocation | null = null;

  const ip = await getClientIp();
  const dbPath = path.join(process.cwd(), "geo-db/GeoLite2-City.mmdb");

  if (ip && fs.existsSync(dbPath)) {
    const lookup = await maxmind.open(dbPath);
    const geo: any = lookup.get(ip);
    if (geo) {
      location = {
        ip,
        city: geo.city?.names?.en,
        region: geo.subdivisions?.[0]?.names?.en,
        country_code: geo.country?.iso_code,
        country_name: geo.country?.names?.en,
      };
    }
  } else {
    // get location using an external API
    try {
      const res = await fetch(
        `https://api.ipapi.com/api/check?access_key=${process.env.IPAPI_ACCESS_KEY}`
      );
      const data = await res.json();
      if (!data?.error) {
        location = {
          ip: data.ip,
          city: data.city,
          region: data.region,
          country_code: data.country_code,
          country_name: data.country_name,
        };
      }
    } catch (e) {
      console.error(e);
    }
  }
  console.log({ location });
  // ---- END LOCATION DETECTION ----

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
      device: deviceType,
    },
  });

  redirect(url.longUrl);
}
