import StatusBadge from "./StatusBadge";
import SentimentBadge from "./SentimentBadge";
import { FeedbackStatus } from "@/types/feedbackStatus";
import { FeedbackSentiment } from "@/types/feedbackSentiment";
import RatingDots from "./RatingDots";

import { Loader2, MessageSquareText } from "lucide-react";
import { formatDate } from "@/utils/formatDate";

interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  comment: string;
  rating: number;
  status: FeedbackStatus;
  sentiment: FeedbackSentiment;
  systemResponse: string | null;
  isAnonymous: boolean;
  createdAt: string;
  studentName: string | null;
  studentEmail: string | null;
}

export default function FeedbackManagementCard({
  item,
  onStatusChange,
  isUpdating,
}: {
  item: FeedbackItem;
  onStatusChange: (id: string, nextStatus: FeedbackStatus) => void;
  isUpdating: boolean;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col gap-4">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{item.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{item.category}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <StatusBadge status={item.status} />
          <SentimentBadge sentiment={item.sentiment} />
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">{item.comment}</p>

      <div className="flex flex-wrap items-center gap-3 pt-1 border-t border-gray-100">
        <RatingDots rating={item.rating} />

        <span
          className={`text-xs px-2.5 py-1 rounded-md ${
            item.isAnonymous
              ? "bg-purple-50 text-purple-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {item.isAnonymous ? "Anonymous Submission" : "Identified Submission"}
        </span>

        {!item.isAnonymous && (item.studentName || item.studentEmail) && (
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md">
            {item.studentName || item.studentEmail}
          </span>
        )}

        <span className="text-xs text-gray-400 ml-auto">
          {formatDate(item.createdAt)}
        </span>
      </div>

      {item.systemResponse && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <MessageSquareText size={16} className="text-blue-700 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-700 mb-1">
                System Response
              </p>
              <p className="text-sm text-blue-900 leading-relaxed">
                {item.systemResponse}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
            Update Status
          </p>
          <select
            value={item.status}
            onChange={(e) =>
              onStatusChange(item.id, e.target.value as FeedbackStatus)
            }
            disabled={isUpdating}
            className="px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-700
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition
              disabled:opacity-60"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>

        {isUpdating && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Loader2 size={14} className="animate-spin" />
            Updating...
          </div>
        )}
      </div>
    </div>
  );
}