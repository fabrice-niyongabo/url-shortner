import SidebarItem from "./SidebarItem";
import { GalleryHorizontal, Home, Kayak, Link, User2 } from "lucide-react";
import { ComponentType } from "react";

interface IItem {
  label: string;
  icon: ComponentType;
  href: string;
}

function DashboardSidebar() {
  const sidebarItems: IItem[] = [
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
      label: "Settings",
      icon: GalleryHorizontal,
      href: "/settings",
    },
  ];
  return (
    <div className="fixed top-0 bottom-0 w-[60px] bg-white border-r border-r-gray-200 p-3">
      <div className="flex items-center justify-center">
        <Kayak className="text-[#F36500]" size={30} />
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
