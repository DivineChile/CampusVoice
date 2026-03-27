import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Fixed sidebar — desktop only */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-40">
        <AdminSidebar />
      </div>

      {/* Main content — offset by sidebar width on desktop */}
      <div className="md:ml-64 flex flex-col min-h-screen">

        {/* Sticky header */}
        <AdminHeader adminName="Admin User" adminInitials="AU" />

        {/* Page content */}
        <main className="flex-1 px-6 md:px-8 py-8">
          {children}
        </main>

      </div>
    </div>
  );
}