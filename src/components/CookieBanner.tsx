"use client";

import { useEffect, useMemo, useState } from "react";
import { Activity, Check, Cookie, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  getStoredConsent,
  setStoredConsent,
  type ConsentDecision,
} from "@/lib/analytics";
import { COOKIE_COPY, type Lang } from "@/lib/i18n";

interface Props {
  lang: Lang;
}

export default function CookieBanner({ lang }: Props) {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentDecision | null>(null);
  const [pendingDecision, setPendingDecision] = useState<ConsentDecision | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const decision = getStoredConsent();

    if (decision) {
      setConsent(decision);
      setVisible(false);
      return;
    }

    setVisible(true);
  }, []);

  const copy = useMemo(() => COOKIE_COPY[lang], [lang]);

  const panelAnimation = shouldReduceMotion
    ? {
        initial: { opacity: 1, scale: 1, y: 0 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 1, scale: 1, y: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.96, y: 18 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.96, y: 18 },
      };

  function handleDecision(decision: ConsentDecision) {
    setPendingDecision(decision);

    setTimeout(() => {
      setStoredConsent(decision);
      setConsent(decision);
      setVisible(false);
      setPendingDecision(null);
    }, 260);
  }

  const showManagerButton = !visible && consent !== null;
  const analyticsStatus =
    consent === "accepted"
      ? copy.analyticsStatusOn
      : consent === "rejected"
        ? copy.analyticsStatusOff
        : copy.analyticsStatusUnset;

  return (
    <>
      <AnimatePresence>
        {showManagerButton ? (
          <motion.div
            key="cookie-manager"
            className="fixed right-4 z-50 bottom-[calc(1rem+env(safe-area-inset-bottom))]"
            initial={panelAnimation.initial}
            animate={panelAnimation.animate}
            exit={panelAnimation.exit}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28 }}
            style={{ transformOrigin: "bottom right" }}
          >
            <Button
              size="icon"
              variant="outline"
              className="size-11 rounded-full border-border/80 bg-background/90 shadow-lg backdrop-blur"
              aria-label={copy.manage}
              onClick={() => setVisible(true)}
            >
              <Cookie />
            </Button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {visible ? (
          <motion.div
            key="cookie-panel"
            className="fixed inset-x-0 bottom-0 z-50 sm:right-4 sm:bottom-4 sm:left-auto sm:w-[32rem]"
            initial={panelAnimation.initial}
            animate={panelAnimation.animate}
            exit={panelAnimation.exit}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
          >
            <Card className="max-h-[88dvh] w-full gap-0 overflow-hidden rounded-b-none rounded-t-xl border-border/80 bg-card/95 py-0 shadow-2xl backdrop-blur sm:max-h-[min(88dvh,42rem)] sm:rounded-xl">
              <div className="flex justify-center pt-2 sm:hidden" aria-hidden="true">
                <div className="h-1 w-10 rounded-full bg-muted-foreground/25" />
              </div>
              <CardHeader className="relative shrink-0 gap-3 border-b border-border/70 bg-muted/25 px-4 pb-4 pt-3 sm:px-5 sm:py-5">
                {consent ? (
                  <button
                    type="button"
                    aria-label={copy.close}
                    onClick={() => setVisible(false)}
                    className="absolute top-3 right-3 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:top-4 sm:right-4"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
                <div className="flex items-start gap-3 pr-7 sm:pr-8">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm sm:size-10">
                    <Cookie className="size-4 sm:size-5" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-lg leading-tight sm:text-xl">{copy.title}</CardTitle>
                      <Badge variant={consent === "accepted" ? "default" : "secondary"}>
                        {analyticsStatus}
                      </Badge>
                      <a
                        href={`/${lang}/privacy`}
                        className="font-mono text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                      >
                        {lang === "es" ? "más info" : "learn more"}
                      </a>
                    </div>
                    <CardDescription className="text-sm leading-relaxed sm:text-base">
                      {copy.summary}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain px-4 py-3 sm:gap-4 sm:px-5 sm:py-5">
                <div className="hidden gap-2 sm:grid sm:grid-cols-2 sm:gap-3">
                  <div className="flex gap-3 rounded-lg border border-border/80 bg-background/70 p-3">
                    <ShieldCheck className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-sm font-semibold">{copy.technicalTitle}</p>
                        <Badge variant="outline">{copy.technicalStatus}</Badge>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {copy.technicalDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-lg border border-border/80 bg-background/70 p-3">
                    <Activity className="mt-0.5 size-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-mono text-sm font-semibold">{copy.analyticsTitle}</p>
                        <Badge variant={consent === "accepted" ? "default" : "secondary"}>
                          {analyticsStatus}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {copy.analyticsDescription}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="rounded-md border border-border/70 bg-background/60 px-3 py-2 font-mono text-sm leading-relaxed text-muted-foreground sm:border-0 sm:bg-transparent sm:px-0 sm:py-0">
                  {copy.mandatory}
                </p>

                <Accordion
                  type="single"
                  collapsible
                  aria-label={copy.detailsLabel}
                  className="rounded-lg border border-border/80 px-3"
                >
                  {copy.details.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-sm hover:no-underline sm:text-base">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>

              <CardFooter className="shrink-0 flex-col-reverse gap-2 border-t border-border/70 bg-card/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-[0_-12px_28px_rgb(0_0_0_/_0.08)] backdrop-blur sm:flex-row sm:justify-end sm:bg-muted/20 sm:px-5 sm:py-4 sm:shadow-none">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => handleDecision("rejected")}
                  disabled={pendingDecision !== null}
                >
                  <X data-icon="inline-start" />
                  {copy.reject}
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => handleDecision("accepted")}
                  disabled={pendingDecision !== null}
                >
                  <Check data-icon="inline-start" />
                  {copy.accept}
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
