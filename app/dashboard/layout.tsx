import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardTopbar from "@/components/dashboard/topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-gray-100 overflow-hidden">
      <DashboardTopbar />
      <DashboardSidebar />
      <div className="p-5 h-[calc(100vh-4rem)] mt-16 ml-[60px] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
