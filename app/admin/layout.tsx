import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { createClient } from "@/lib/server";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1. Check session
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin-login");
  }

  // 2. Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // 3. If profile missing or invalid, block access
  if (profileError || !profile) {
    redirect("/dashboard");
  }

  // 4. Enforce admin-only access
  if (profile.role !== "admin") {
    redirect("/dashboard");
  }

  const adminName = profile.full_name || "Administrator";
  const adminInitials = getInitials(adminName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed sidebar — desktop only */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-40">
        <AdminSidebar />
      </div>

      {/* Main content */}
      <div className="md:ml-64 flex flex-col min-h-screen">
        <AdminHeader adminName={adminName} adminInitials={adminInitials} />
        <main className="flex-1 px-6 md:px-8 py-8">{children}</main>
      </div>
    </div>
  );
}