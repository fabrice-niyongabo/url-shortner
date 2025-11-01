"use client";

import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };
  return (
    <DropdownMenuItem
      className="text-red-500 hover:cursor-pointer"
      onClick={handleLogout}
    >
      Log out
      <DropdownMenuShortcut>
        <LogOutIcon className="h-4 w-4 text-red-500" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );
}

export default Logout;
