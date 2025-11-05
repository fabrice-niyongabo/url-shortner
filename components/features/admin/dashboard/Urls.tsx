import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { Link2 } from "lucide-react";

async function Urls() {
  const clicksCount = await prisma.url.count();
  return (
    <div className="bg-gradient-to-bl from-blue-900 via-blue-400 to-blue-900 p-5 rounded-md h-full">
      <p className="text-lg font-semibold flex gap-2 items-center">
        <Link2 /> <span>Total URLs</span>
      </p>
      <p className="text-4xl text-center mt-3">{minifyNumber(clicksCount)}</p>
    </div>
  );
}

export default Urls;
