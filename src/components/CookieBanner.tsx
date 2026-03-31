"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Cookie, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
        initial: { opacity: 0, scale: 0.86, y: 16 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.86, y: 16 },
      };

  function handleDecision(decision: ConsentDecision) {
    setPendingDecision(decision);

    setTimeout(() => {
      setStoredConsent(decision);
      setConsent(decision);
      setVisible(false);
      setPendingDecision(null);
    }, 320);
  }

  const showManagerButton = !visible && consent !== null;

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
              className="rounded-full shadow-md"
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
            className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-[30rem]"
            initial={panelAnimation.initial}
            animate={panelAnimation.animate}
            exit={panelAnimation.exit}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.28 }}
            style={{ transformOrigin: "bottom right" }}
          >
            <Card className="w-full border-border/80 shadow-lg backdrop-blur">
            <CardHeader className="gap-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Cookie className="size-4" />
                {copy.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">{copy.summary}</p>
            </CardHeader>

            <CardContent className="flex flex-col gap-3">
              <p className="text-xs text-muted-foreground">{copy.mandatory}</p>
              {consent ? (
                <Badge variant="outline" className="self-start">
                  {consent === "accepted" ? copy.currentAccepted : copy.currentRejected}
                </Badge>
              ) : null}

              <Accordion type="single" collapsible>
                {copy.details.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger>{item.label}</AccordionTrigger>
                    <AccordionContent>{item.content}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>

            <CardFooter className="flex-wrap justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => handleDecision("rejected")}
                disabled={pendingDecision !== null}
              >
                <X data-icon="inline-start" className={pendingDecision === "rejected" ? "opacity-100" : "opacity-0"} />
                {copy.reject}
                <span aria-hidden="true" className="size-4 shrink-0 opacity-0" />
              </Button>
              <Button
                onClick={() => handleDecision("accepted")}
                disabled={pendingDecision !== null}
              >
                <Check data-icon="inline-start" className={pendingDecision === "accepted" ? "opacity-100" : "opacity-0"} />
                {copy.accept}
                <span aria-hidden="true" className="size-4 shrink-0 opacity-0" />
              </Button>
            </CardFooter>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
