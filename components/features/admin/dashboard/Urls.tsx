import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import Link from "next/link";

async function Urls() {
  const clicksCount = await prisma.url.count();
  return (
    <Link href="/dashboard/links" className="block hover:opacity-90 h-full">
      <div className="bg-gradient-to-bl from-blue-900 via-blue-400 to-blue-900 p-5 rounded-md h-full">
        <p className="text-lg font-semibold">Total URLs</p>
        <p className="text-4xl text-center mt-3">{minifyNumber(clicksCount)}</p>
      </div>
    </Link>
  );
}

export default Urls;
