import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  session: Session;
}

export default function AccountMenu({ session }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-2 items-center hover:cursor-pointer hover:text-white hover:bg-transparent hover:opacity-40"
        >
          {session.user.image ? (
            <Image
              src={session.user.image}
              alt="user"
              width={32}
              height={32}
              className="rounded-full w-8 h-8 "
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-500 text-lg flex items-center justify-center">
              {session.user.name?.charAt(0).toUpperCase()}
              {session.user.name?.split(" ")[1]?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="w-[100px]">
            <p className=" line-clamp-1 font-semibold capitalize">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1">
              {session.user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href="/dashboard/profile">
            <DropdownMenuItem className="cursor-pointer">
              Profile
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
            <DropdownMenuItem className="cursor-pointer">
              Dashboard
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-500 hover:cursor-pointer">
          Log out
          <DropdownMenuShortcut>
            <LogOutIcon className="h-4 w-4 text-red-500" />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
