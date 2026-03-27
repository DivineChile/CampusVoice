export type FeedbackSentiment = "positive" | "neutral" | "negative";

interface SentimentResult {
  sentiment: FeedbackSentiment;
  confidence: number;
  score: number;
}

interface FeedbackProcessingResult {
  sentiment: FeedbackSentiment;
  confidence: number;
  score: number;
  systemResponse: string;
}

const POSITIVE_KEYWORDS: Record<string, number> = {
  good: 2,
  excellent: 3,
  great: 3,
  helpful: 2,
  clean: 2,
  fast: 2,
  satisfied: 2,
  effective: 2,
  appreciate: 2,
  comfortable: 2,
  reliable: 2,
  amazing: 3,
  nice: 1,
  supportive: 2,
  improved: 2,
  working: 1,
};

const NEGATIVE_KEYWORDS: Record<string, number> = {
  poor: -2,
  bad: -2,
  terrible: -3,
  dirty: -2,
  broken: -3,
  late: -2,
  slow: -2,
  missing: -2,
  unfair: -3,
  unsafe: -3,
  problem: -2,
  issue: -1,
  uncomfortable: -2,
  hot: -1,
  worst: -3,
  inadequate: -2,
  unreliable: -2,
  difficult: -1,
  frustrating: -2,
  delay: -2,
};

const POSITIVE_PHRASES: Record<string, number> = {
  "very good": 3,
  "works well": 2,
  "very helpful": 3,
  "well organized": 2,
  "clean environment": 2,
  "fast response": 2,
};

const NEGATIVE_PHRASES: Record<string, number> = {
  "not working": -3,
  "does not work": -3,
  "too slow": -3,
  "very bad": -3,
  "no light": -2,
  "no water": -3,
  "very late": -2,
  "not clean": -2,
  "poor condition": -2,
  "misses classes": -3,
};

const NEGATION_WORDS = ["not", "never", "no", "hardly"];

function normalizeText(text: string) {
  return text.toLowerCase().trim();
}

function tokenize(text: string) {
  return normalizeText(text)
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
}

function countPhraseScore(text: string) {
  let score = 0;

  for (const [phrase, weight] of Object.entries(POSITIVE_PHRASES)) {
    if (text.includes(phrase)) {
      score += weight;
    }
  }

  for (const [phrase, weight] of Object.entries(NEGATIVE_PHRASES)) {
    if (text.includes(phrase)) {
      score += weight;
    }
  }

  return score;
}

function countKeywordScore(tokens: string[]) {
  let score = 0;

  for (let i = 0; i < tokens.length; i++) {
    const word = tokens[i];
    const previousWord = i > 0 ? tokens[i - 1] : "";
    const hasNegation = NEGATION_WORDS.includes(previousWord);

    if (word in POSITIVE_KEYWORDS) {
      const baseScore = POSITIVE_KEYWORDS[word];
      score += hasNegation ? -baseScore : baseScore;
    }

    if (word in NEGATIVE_KEYWORDS) {
      const baseScore = NEGATIVE_KEYWORDS[word];
      score += hasNegation ? Math.abs(baseScore) : baseScore;
    }
  }

  return score;
}

function calculateConfidence(score: number) {
  const absoluteScore = Math.abs(score);

  if (absoluteScore >= 6) return 0.9;
  if (absoluteScore >= 4) return 0.8;
  if (absoluteScore >= 2) return 0.7;
  if (absoluteScore >= 1) return 0.6;

  return 0.5;
}

export function detectSentiment(comment: string): SentimentResult {
  const normalizedComment = normalizeText(comment);
  const tokens = tokenize(comment);

  const phraseScore = countPhraseScore(normalizedComment);
  const keywordScore = countKeywordScore(tokens);
  const totalScore = phraseScore + keywordScore;

  let sentiment: FeedbackSentiment = "neutral";

  if (totalScore > 0) {
    sentiment = "positive";
  } else if (totalScore < 0) {
    sentiment = "negative";
  }

  return {
    sentiment,
    confidence: calculateConfidence(totalScore),
    score: totalScore,
  };
}

export function generateSystemResponse(
  category: string,
  sentiment: FeedbackSentiment,
  confidence: number
): string {
  const normalizedCategory = category.trim().toLowerCase();
  const highConfidence = confidence >= 0.8;

  if (sentiment === "positive") {
    return highConfidence
      ? "Thank you for your positive feedback. We appreciate your experience and your submission has been recorded."
      : "Thank you for your feedback. We appreciate you taking the time to share your experience.";
  }

  if (sentiment === "neutral") {
    return "Thank you for your feedback. Your submission has been recorded successfully and will be reviewed.";
  }

  if (normalizedCategory === "academics") {
    return "Your academic concern has been received and recorded for review by the relevant department.";
  }

  if (normalizedCategory === "lecturers") {
    return "Thank you for your feedback regarding a lecturer. Your submission has been recorded and will be reviewed appropriately.";
  }

  if (normalizedCategory === "facilities") {
    return "Thank you for reporting this facilities issue. Your feedback has been recorded and will be reviewed by the appropriate unit.";
  }

  if (normalizedCategory === "administration") {
    return "Thank you for sharing this administrative concern. It has been logged and will be reviewed accordingly.";
  }

  if (normalizedCategory === "hostel") {
    return "Thank you for reporting this hostel-related issue. Your submission has been recorded for further review.";
  }

  if (normalizedCategory === "security") {
    return "Thank you for reporting this security concern. Your feedback has been logged and will be treated with attention.";
  }

  return "Thank you for your feedback. Your submission has been recorded and will be reviewed by the appropriate unit.";
}

export function processFeedback(
  category: string,
  comment: string
): FeedbackProcessingResult {
  const { sentiment, confidence, score } = detectSentiment(comment);
  const systemResponse = generateSystemResponse(category, sentiment, confidence);

  return {
    sentiment,
    confidence,
    score,
    systemResponse,
  };
}