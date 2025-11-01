import QuickLink from "@/components/features/user/dashboard/QuickLink";
import { headers } from "next/headers";

async function page() {
  const header = await headers();
  const host = header.get("host");
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <QuickLink host={host || ""} />
        </div>
      </div>
    </div>
  );
}

export default page;
