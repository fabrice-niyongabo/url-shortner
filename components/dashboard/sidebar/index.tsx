import SidebarItem from "./SidebarItem";
import { Home, Kayak, Link, User, UsersRound } from "lucide-react";
import { Session } from "next-auth";
import NextLink from "next/link";
import { ComponentType } from "react";

interface IProps {
  session: Session | null;
}

interface IItem {
  label: string;
  icon: ComponentType;
  href: string;
}

function DashboardSidebar({ session }: IProps) {
  const sidebarItems: IItem[] =
    session?.user.role === "ADMIN"
      ? [
          {
            label: "Dashboard",
            icon: Home,
            href: "/dashboard",
          },
          {
            label: "Users",
            icon: UsersRound,
            href: "/dashboard/users",
          },
          {
            label: "Profile",
            icon: User,
            href: "/dashboard/profile",
          },
        ]
      : [
          {
            label: "Dashboard",
            icon: Home,
            href: "/dashboard",
          },
          {
            label: "Links",
            icon: Link,
            href: "/dashboard/links",
          },
          {
            label: "Profile",
            icon: User,
            href: "/dashboard/profile",
          },
        ];
  return (
    <div className="fixed top-0 bottom-0 w-[60px] bg-white border-r border-r-gray-200 p-3">
      <div className="flex items-center justify-center">
        <NextLink href="/">
          <Kayak className="text-[#F36500]" size={30} />
        </NextLink>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        {sidebarItems.map((item, index) => (
          <SidebarItem
            key={index}
            label={item.label}
            icon={item.icon}
            href={item.href}
          />
        ))}
      </div>
    </div>
  );
}

export default DashboardSidebar;
