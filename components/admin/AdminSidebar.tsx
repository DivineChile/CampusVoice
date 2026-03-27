"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquareText,
  BarChart2,
  FileText,
  LogOut,
} from "lucide-react";

const navLinks = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "All Feedback", href: "/admin/feedback", icon: MessageSquareText },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart2 },
  { label: "Reports", href: "/admin/reports", icon: FileText },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = () => {
    // TODO: Add real logout logic here
    // e.g. clear session/token, then router.push("/login")
  };

  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col">

      {/* Logo / Title area */}
      <div className="px-6 py-5 border-b border-gray-200">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">CV</span>
          </div>
          <span className="font-semibold text-gray-900 text-base">Admin Panel</span>
        </div>
        <p className="text-xs text-gray-400 pl-9">Institutional feedback management</p>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-5 flex flex-col gap-1">
        {navLinks.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors duration-200
                ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
            text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>

    </aside>
  );
}