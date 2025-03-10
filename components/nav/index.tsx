import Link from "next/link";
import Conatiner from "../container";

function Nav() {
  return (
    <nav className="bg-[#031F39] text-white py-5">
      <Conatiner>
        <div className="flex items-center justify-between gap-4 md:gap-6">
          <Link href="/" className="text-2xl">
            URL <span className="text-[#F36500]">Shortener</span>
          </Link>

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
                className="bg-blue-600 py-3 px-5 rounded-md text-sm hover:bg-orange-500"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>
      </Conatiner>
    </nav>
  );
}

export default Nav;
