import { MessageSquarePlus, ClipboardList, UserCircle } from "lucide-react";
import DashboardHeader from "@/components/dashboard/DashbardHeader";
import QuickActionCard from "@/components/dashboard/QuickActionCard";

const quickActions = [
  {
    title: "Submit Feedback",
    description: "Report an issue or share your thoughts about academics, facilities, or campus life.",
    href: "/dashboard/submit-feedback",
    icon: MessageSquarePlus,
    buttonLabel: "Submit Now",
  },
  {
    title: "My Feedback",
    description: "View all the feedback you have submitted and track their current status.",
    href: "/dashboard/my-feedback",
    icon: ClipboardList,
    buttonLabel: "View Feedback",
  },
  {
    title: "Profile Overview",
    description: "Review your account details and manage your student profile settings.",
    href: "/dashboard/profile",
    icon: UserCircle,
    buttonLabel: "View Profile",
  },
];

export default function DashboardPage() {
  return (
     <div>

        {/* Welcome Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Welcome back 👋
          </h2>
          <p className="text-sm text-gray-500">
            Use this dashboard to submit feedback about your campus experience and track
            responses from your institution.
          </p>
        </section>

        {/* Quick Action Cards */}
        <section className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Quick Actions
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickActions.map((action) => (
              <QuickActionCard key={action.title} {...action} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mt-5">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">
            Recent Activity
          </h3>
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm px-6 py-10 text-center">
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <ClipboardList size={20} className="text-gray-400" />
            </div>
            <p className="text-sm font-medium text-gray-600">No recent feedback yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Your submitted feedback will appear here once you get started.
            </p>
          </div>
        </section>
      </div>
  );
}