import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import Logout from "./Logout";

interface IProps {
  session: Session;
}

export default function AccountMenu({ session }: IProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-2 items-center hover:cursor-pointer hover:text-black"
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
            <div className="w-8 h-8 rounded-full bg-[#F36500] text-sm text-white flex items-center justify-center">
              {session.user.name?.charAt(0).toUpperCase()}
              {session.user.name?.split(" ")[1]?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="w-[100px]">
            <p className="line-clamp-1 font-semibold capitalize text-left">
              {session.user?.name}
            </p>
            <p className="text-xs text-gray-500 line-clamp-1 text-left">
              {session.user?.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between gap-2">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt="user"
                width={50}
                height={50}
                className="rounded-full w-12 h-12 "
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#F36500] text-xl text-white flex items-center justify-center">
                {session.user.name?.charAt(0).toUpperCase()}
                {session.user.name?.split(" ")[1]?.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex-1">
              <p>{session.user?.name}</p>
              <p className="text-xs text-gray-500">{session.user?.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
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
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
