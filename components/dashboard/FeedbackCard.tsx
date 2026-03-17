import { FeedbackItem } from "@/types/feedback";
import { FeedbackStatus
  
 } from "@/types/feedbackStatus";
// Status Badge
function StatusBadge({ status }: { status: FeedbackStatus }) {
  const styles: Record<FeedbackStatus, string> = {
    pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
    reviewed: "bg-blue-50 text-blue-700 border border-blue-200",
    resolved: "bg-green-50 text-green-700 border border-green-200",
  };
  return (
    <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${styles[status]}`}>
      {status}
    </span>
  );
}

// Rating display
function RatingDots({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${i <= rating ? "bg-blue-500" : "bg-gray-200"}`}
        />
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating}/5</span>
    </div>
  );
}

export default function FeedbackCard({ item }: { item: FeedbackItem }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm
      hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 flex flex-col gap-3">
      {/* Top row: title + status */}
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">{item.title}</h3>
        <StatusBadge status={item.status} />
      </div>

      {/* Comment preview */}
      <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{item.comment}</p>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-gray-100">
        {/* Category */}
        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
          {item.category}
        </span>

        {/* Rating */}
        <RatingDots rating={item.rating} />

        {/* Anonymous */}
        <span
          className={`text-xs px-2.5 py-1 rounded-md ${
            item.isAnonymous
              ? "bg-purple-50 text-purple-600"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {item.isAnonymous ? "Anonymous" : "Identified"}
        </span>

        {/* Date — pushed to the right on larger screens */}
        <span className="text-xs text-gray-400 ml-auto">
          {new Date(item.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}