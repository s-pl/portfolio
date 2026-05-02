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
            className="fixed bottom-4 right-4 z-50"
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
            className="fixed right-4 bottom-4 left-4 z-50 sm:left-auto sm:w-[32rem]"
            initial={panelAnimation.initial}
            animate={panelAnimation.animate}
            exit={panelAnimation.exit}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "bottom right" }}
          >
            <Card className="w-full overflow-hidden rounded-xl border-border/80 bg-card/95 py-0 shadow-2xl backdrop-blur">
              <CardHeader className="relative gap-3 border-b border-border/70 bg-muted/25 px-5 py-5">
                {consent ? (
                  <button
                    type="button"
                    aria-label={copy.close}
                    onClick={() => setVisible(false)}
                    className="absolute top-4 right-4 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X className="size-4" />
                  </button>
                ) : null}
                <div className="flex items-start gap-3 pr-8">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border bg-background text-foreground shadow-sm">
                    <Cookie className="size-5" />
                  </span>
                  <div className="flex min-w-0 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle className="text-xl leading-tight">{copy.title}</CardTitle>
                      <Badge variant={consent === "accepted" ? "default" : "secondary"}>
                        {analyticsStatus}
                      </Badge>
                    </div>
                    <CardDescription className="text-base leading-relaxed">
                      {copy.summary}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex flex-col gap-4 px-5 py-5">
                <div className="grid gap-3 sm:grid-cols-2">
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

                <p className="font-mono text-sm text-muted-foreground">{copy.mandatory}</p>

                <Accordion
                  type="single"
                  collapsible
                  aria-label={copy.detailsLabel}
                  className="rounded-lg border border-border/80 px-3"
                >
                  {copy.details.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="text-base hover:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                        {item.content}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>

              <CardFooter className="flex-col-reverse gap-2 border-t border-border/70 bg-muted/20 px-5 py-4 sm:flex-row sm:justify-end">
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
