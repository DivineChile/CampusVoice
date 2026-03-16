"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquarePlus,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { showToast } from "../ui/toast";

export const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Submit Feedback", href: "/dashboard/submit", icon: MessageSquarePlus },
  { label: "My Feedback", href: "/dashboard/feedback", icon: ClipboardList },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

 const handleLogout = async () => {
     // TODO: Add real logout logic here
     try {
       await signOut();
       showToast("Logged out successfully", "success")
       setTimeout(() => {
         router.push("/login")
       }, 1000)
     } catch (error) {
       showToast("Failed to log out, please try again.", "error")
     }
   };

  return (
    <aside className="w-60 h-full bg-gray-900 flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xs">CV</span>
          </div>
          <span className="text-white font-semibold text-base">CampusVoice</span>
        </Link>
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
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
            >
              <Icon size={17} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-3 py-5 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 cursor-pointer rounded-lg text-sm
            text-gray-400 hover:bg-gray-800 hover:text-white transition-colors duration-200"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );
}