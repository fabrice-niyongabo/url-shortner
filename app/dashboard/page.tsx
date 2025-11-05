import AdminDashboard from "@/components/features/admin/dashboard";
import UserDashboard from "@/components/features/user/dashboard";
import { protectedSession } from "@/lib/authProtected";

async function page() {
  const session = await protectedSession();
  return (
    <>{session.user.role === "USER" ? <UserDashboard /> : <AdminDashboard />}</>
  );
}

export default page;
