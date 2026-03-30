import { FeedbackStatus } from "./feedbackStatus";

export interface RecentFeedback {
  id: string;
  title: string;
  category: string;
  status: FeedbackStatus;
  date: string;
  comment: string;
}