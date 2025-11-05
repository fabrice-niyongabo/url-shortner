import { minifyNumber } from "@/lib/helpers";
import prisma from "@/lib/prisma";

async function Clicks() {
  const clicksCount = await prisma.clicks.count();
  return (
    <div className="bg-white p-5 rounded-md">
      <p className="text-lg font-semibold">Link clicks</p>
      <p className="text-4xl text-center mt-3">{minifyNumber(clicksCount)}</p>
    </div>
  );
}

export default Clicks;
