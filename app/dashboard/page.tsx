import Clicks from "@/components/features/user/dashboard/Clicks";
import DeviceStatistics from "@/components/features/user/dashboard/device-statistics";
import Engagement from "@/components/features/user/dashboard/engagement";
import QuickLink from "@/components/features/user/dashboard/QuickLink";
import Urls from "@/components/features/user/dashboard/Urls";
import { headers } from "next/headers";

async function page() {
  const header = await headers();
  const host = header.get("host");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="md:col-span-2">
          <QuickLink host={host || ""} />
        </div>
        <Clicks />
        <Urls />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
        <div className="col-span-3">
          <Engagement />
        </div>
        <div>
          <DeviceStatistics />
        </div>
      </div>
    </div>
  );
}

export default page;
