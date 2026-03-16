"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, LogOut,
  LayoutDashboard, MessageSquarePlus, ClipboardList,
  Bell, Send,
} from "lucide-react";
import { signOut } from "@/lib/auth";
import { showToast } from "../ui/toast";
import { useRouter } from "next/navigation";

const navLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Submit Feedback", href: "/dashboard/submit-feedback", icon: MessageSquarePlus },
  { label: "My Feedback", href: "/dashboard/my-feedback", icon: ClipboardList },
];

interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  studentName?: string;
  studentInitials?: string;
}

export default function DashboardHeader({
  title = "Student Dashboard",
  subtitle = "Manage your feedback activities",
  studentName = "David Okafor",
  studentInitials = "DO",
}: DashboardHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
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
    // e.g. clear auth token/session, then router.push("/login")
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-50 border-b border-slate-200">

      {/* Main header row */}
      <div className="flex items-center justify-between px-6 py-4">

        {/* LEFT — Logo (mobile only) + Title */}
        <div className="flex items-center gap-3">
          {/* Logo — mobile only */}
          <Link href="/" className="flex items-center gap-2 md:hidden">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">CV</span>
            </div>
          </Link>

          {/* Title + subtitle */}
          <div>
            <h1 className="text-base font-semibold text-gray-900 leading-tight">{title}</h1>
            <p className="text-xs text-gray-500 hidden sm:block mt-0.5">{subtitle}</p>
          </div>
        </div>

        {/* RIGHT — Desktop actions + mobile hamburger */}
        <div className="flex items-center gap-3">

          {/* Submit Feedback button — desktop only */}
          <Link
            href="/dashboard/submit-feedback"
            className="hidden md:flex items-center gap-2 bg-blue-600 text-white text-sm
              font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Send size={15} />
            Submit Feedback
          </Link>

          {/* Notification bell — desktop only */}
          <button
            className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg
              text-gray-500 hover:bg-slate-200 transition-colors duration-200"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>

          {/* User mini-profile — desktop only */}
          <div className="hidden md:flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-slate-300 flex items-center justify-center shrink-0">
              <span className="text-sm font-semibold text-slate-700">{studentInitials}</span>
            </div>
            <span className="text-sm font-medium text-gray-700">{studentName}</span>
          </div>

          {/* Avatar — mobile only (name hidden) */}
          <div className="flex md:hidden items-center justify-center w-9 h-9 rounded-full bg-slate-300 shrink-0">
            <span className="text-sm font-semibold text-slate-700">{studentInitials}</span>
          </div>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-slate-200 bg-slate-50 px-4 py-3 flex flex-col gap-1">
          {navLinks.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:bg-slate-200 hover:text-gray-900"
                  }`}
              >
                <Icon size={17} />
                {label}
              </Link>
            );
          })}

          {/* Logout */}
          <div className="border-t border-slate-200 mt-2 pt-2">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm
                text-gray-600 hover:bg-slate-200 hover:text-gray-900 transition-colors"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </nav>
      )}

    </header>
  );
}