import { protectedLoggedInUserSession } from "@/lib/authProtected";
import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";

async function Clicks() {
  const session = await protectedLoggedInUserSession();
  const clicksCount = await prisma.clicks.count({
    where: {
      url: {
        userId: session.user.id,
      },
    },
  });
  return (
    <div className="bg-white p-5 rounded-md">
      <p className="text-lg font-semibold">Link clicks</p>
      <p className="text-4xl text-center mt-3">{minifyNumber(clicksCount)}</p>
    </div>
  );
}

export default Clicks;
