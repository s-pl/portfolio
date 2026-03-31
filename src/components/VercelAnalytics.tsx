"use client";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { hasAnalyticsConsent } from "@/lib/analytics";

export default function VercelAnalytics() {
  return (
    <>
      <Analytics beforeSend={(event) => (hasAnalyticsConsent() ? event : null)} />
      <SpeedInsights beforeSend={(event) => (hasAnalyticsConsent() ? event : null)} />
    </>
  );
}
