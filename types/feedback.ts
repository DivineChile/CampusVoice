import { FeedbackStatus } from "./feedbackStatus";

export interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  comment: string;
  rating: number;
  status: FeedbackStatus;
  sentiment: "positive" | "neutral" | "negative" | null;
  systemResponse: string | null;
  isAnonymous: boolean;
  createdAt: string;
}