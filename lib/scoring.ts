import { CLIENT_CONFIG } from "@/config/client";

export function calculateScore(answers: Record<string, string>): number {
  return CLIENT_CONFIG.quiz.questions.reduce((total, q) => {
    const chosen = q.options.find((o) => o.id === answers[q.key]);
    return total + (chosen?.points ?? 0);
  }, 0);
}

export function getCalendarUrl(answers: Record<string, string>): string {
  const score = calculateScore(answers);
  const { thresholds, calendars } = CLIENT_CONFIG.quiz;
  if (score >= thresholds.high) return calendars.high;
  if (score >= thresholds.mid) return calendars.mid;
  return calendars.low;
}
