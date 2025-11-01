"use client";

import { guestRoutes } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Links() {
  const pathName = usePathname();
  return guestRoutes.includes(pathName) ? (
    <ul className="flex items-center justify-between gap-4 md:gap-6">
      <li>
        <Link href="#" className="text-sm hover:text-orange-500">
          Platform
        </Link>
      </li>
      <li>
        <Link href="#" className="text-sm hover:text-orange-500">
          Solutions
        </Link>
      </li>
      <li>
        <Link href="#" className="text-sm hover:text-orange-500">
          Pricing
        </Link>
      </li>
      <li>
        <Link href="#" className="text-sm hover:text-orange-500">
          Resources
        </Link>
      </li>
    </ul>
  ) : null;
}

export default Links;
