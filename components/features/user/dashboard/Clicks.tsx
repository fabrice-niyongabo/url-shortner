import { protectedUserSession } from "@/lib/authProtected";
import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";
import { MousePointerClick } from "lucide-react";

async function Clicks() {
  const session = await protectedUserSession();
  const clicksCount = await prisma.clicks.count({
    where: {
      url: {
        userId: session.user.id,
      },
    },
  });
  return (
    <div className="bg-white p-5 rounded-md">
      <p className="text-lg font-semibold flex gap-2 items-center">
        <MousePointerClick />
        <span>Link clicks</span>
      </p>
      <p className="text-4xl text-center mt-3">{minifyNumber(clicksCount)}</p>
    </div>
  );
}

export default Clicks;
