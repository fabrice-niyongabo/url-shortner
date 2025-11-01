import { auth } from "@/auth";
import CustomNav from "./custom-nav";

async function Nav() {
  const session = await auth();

  return <CustomNav session={session} />;
}

export default Nav;
