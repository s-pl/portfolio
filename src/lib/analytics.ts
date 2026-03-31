import { track } from "@vercel/analytics";

export type AnalyticsParams = Record<string, string | number | boolean | undefined>;
export type ConsentDecision = "accepted" | "rejected";

export const COOKIE_CONSENT_KEY = "cookie-consent";

export function getStoredConsent(): ConsentDecision | null {
  if (typeof window === "undefined") return null;

  const saved = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (saved === "accepted" || saved === "rejected") return saved;
  return null;
}

export function setStoredConsent(decision: ConsentDecision) {
  if (typeof window === "undefined") return;
  localStorage.setItem(COOKIE_CONSENT_KEY, decision);
}

export function hasAnalyticsConsent() {
  return getStoredConsent() === "accepted";
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  const payload = {
    ...params,
    event_source: "portfolio",
  };

  track(eventName, payload);
}
