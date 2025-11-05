import { headers } from "next/headers";
import Clicks from "./Clicks";
import DeviceStatistics from "./device-statistics";
import Engagement from "./engagement";
import QuickLink from "./QuickLink";
import Urls from "./Urls";

async function UserDashboard() {
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

export default UserDashboard;
