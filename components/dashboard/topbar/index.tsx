import React from "react";
import SearchBar from "./SearchBar";
import { protectedLoggedInUserSession } from "@/lib/authProtected";
import AccountMenu from "./AccountMenu";

async function DashboardTopbar() {
  const session = await protectedLoggedInUserSession();
  return (
    <div className="fixed top-0 right-0 left-[60px] h-16 bg-white border-b border-r-gray-200 p-3">
      <div className="flex items-center justify-between gap-5">
        <div className="flex-1">
          <SearchBar />
        </div>
        <AccountMenu session={session} />
      </div>
    </div>
  );
}

export default DashboardTopbar;
