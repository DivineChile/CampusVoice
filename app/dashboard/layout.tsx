import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Fixed sidebar — desktop only */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-60 z-40">
        <Sidebar />
      </div>

      {/* Main content — offset by sidebar width on desktop */}
      <div className="md:ml-60 flex flex-col min-h-screen">
        {children}
      </div>

    </div>
  );
}