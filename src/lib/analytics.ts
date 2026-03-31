export type AnalyticsParams = Record<string, string | number | boolean | undefined>;
export type ConsentDecision = "accepted" | "rejected";

export const COOKIE_CONSENT_KEY = "cookie-consent";

type WindowWithAnalytics = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

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

export function updateAnalyticsConsent(decision: ConsentDecision) {
  if (typeof window === "undefined") return;

  const analyticsWindow = window as WindowWithAnalytics;
  const granted = decision === "accepted";

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined") return;
  if (getStoredConsent() !== "accepted") return;

  const payload = {
    ...params,
    event_source: "portfolio",
  };

  const analyticsWindow = window as WindowWithAnalytics;

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", eventName, payload);
    return;
  }

  if (Array.isArray(analyticsWindow.dataLayer)) {
    analyticsWindow.dataLayer.push({ event: eventName, ...payload });
  }
}
