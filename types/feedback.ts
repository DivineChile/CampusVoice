import { FeedbackStatus } from "./feedbackStatus";

export interface FeedbackItem {
  id: string;
  title: string;
  category: string;
  comment: string;
  rating: number;
  status: FeedbackStatus;
  isAnonymous: boolean;
  createdAt: string;
}