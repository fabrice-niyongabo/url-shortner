import { auth } from "@/auth";
import GuestNav from "./guest";

async function Nav() {
  const session = await auth();

  return <GuestNav session={session} />;
}

export default Nav;
