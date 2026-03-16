export interface Feedback {
  id: string
  category_id: string
  title: string
  rating: number
  comment: string
  sentiment: "positive" | "neutral" | "negative"
  created_at: string
}