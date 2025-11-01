"use client";
import Link from "next/link";
import Links from "./Links";
import AccountMenu from "./AccountMenu";
import Container from "@/components/container";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { guestRoutes } from "@/lib/constants";

interface IProps {
  session: Session | null;
}
function CustomNav({ session }: IProps) {
  const pathname = usePathname();
  return (
    <>
      {guestRoutes.includes(pathname) && (
        <nav className="bg-[#031F39] text-white py-5">
          <Container>
            <div className="flex items-center justify-between gap-4 md:gap-6">
              <Link href="/" className="text-2xl">
                URL <span className="text-[#F36500]">Shortener</span>
              </Link>
              <Links />
              {!session?.user ? (
                <ul className="flex items-center justify-between gap-4 md:gap-6">
                  <li>
                    <Link
                      href="login"
                      className="font-bold text-sm hover:text-orange-500"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="register"
                      className="bg-blue-600 py-2 px-5 rounded-md text-sm hover:bg-orange-500"
                    >
                      Register
                    </Link>
                  </li>
                </ul>
              ) : (
                <AccountMenu session={session} />
              )}
            </div>
          </Container>
        </nav>
      )}
    </>
  );
}

export default CustomNav;
