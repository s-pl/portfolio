"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  getStoredConsent,
  setStoredConsent,
  updateAnalyticsConsent,
  type ConsentDecision,
} from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Copy = {
  title: string;
  summary: string;
  accept: string;
  reject: string;
  manage: string;
  currentAccepted: string;
  currentRejected: string;
  mandatory: string;
  details: Array<{ id: string; label: string; content: string }>;
};

const COPY: Record<Lang, Copy> = {
  es: {
    title: "Cookies y privacidad",
    summary:
      "Utilizo cookies tecnicas para que la web funcione y, solo si aceptas, cookies de analitica de Google Analytics para medir visitas, clics y mejorar contenido.",
    accept: "Aceptar analitica",
    reject: "Rechazar analitica",
    manage: "Gestionar cookies",
    currentAccepted: "Estado actual: analitica activada",
    currentRejected: "Estado actual: analitica desactivada",
    mandatory: "Las cookies tecnicas son necesarias y siempre estan activas.",
    details: [
      {
        id: "what",
        label: "Que cookies se usan",
        content:
          "Tecnicas: preferencia de idioma, tema y estado de consentimiento. Analitica (opcional): Google Analytics 4 para paginas vistas, origen de trafico, eventos de interaccion y rendimiento basico.",
      },
      {
        id: "purpose",
        label: "Para que se usan",
        content:
          "Las tecnicas permiten que la web funcione correctamente. Las de analitica ayudan a entender que secciones interesan mas, detectar mejoras de UX y priorizar cambios en el portfolio.",
      },
      {
        id: "legal",
        label: "Base legal y proveedor",
        content:
          "La base legal para analitica es tu consentimiento. El proveedor es Google Ireland Limited (Google Analytics). No se activan cookies de analitica hasta que aceptes.",
      },
      {
        id: "retention",
        label: "Conservacion",
        content:
          "La decision de consentimiento se guarda en este navegador con la clave cookie-consent para recordar tu eleccion en visitas futuras.",
      },
      {
        id: "manage",
        label: "Como cambiar tu decision",
        content:
          "Pulsa en el boton flotante de cookie para abrir este panel cuando quieras y cambiar tu decision. Si rechazas, no se envian eventos de analitica.",
      },
    ],
  },
  en: {
    title: "Cookies and privacy",
    summary:
      "I use technical cookies so the site works, and only if you accept, Google Analytics cookies to measure visits, clicks, and improve content.",
    accept: "Accept analytics",
    reject: "Reject analytics",
    manage: "Manage cookies",
    currentAccepted: "Current status: analytics enabled",
    currentRejected: "Current status: analytics disabled",
    mandatory: "Technical cookies are required and always enabled.",
    details: [
      {
        id: "what",
        label: "What cookies are used",
        content:
          "Technical: language, theme, and consent preference. Analytics (optional): Google Analytics 4 for page views, traffic sources, interaction events, and basic performance.",
      },
      {
        id: "purpose",
        label: "Why they are used",
        content:
          "Technical cookies keep the site functional. Analytics cookies help understand what sections perform best, identify UX improvements, and prioritize portfolio changes.",
      },
      {
        id: "legal",
        label: "Legal basis and provider",
        content:
          "The legal basis for analytics is your consent. Provider: Google Ireland Limited (Google Analytics). Analytics cookies stay disabled until you accept.",
      },
      {
        id: "retention",
        label: "Data retention",
        content:
          "Your consent decision is stored in this browser under cookie-consent so your preference is remembered in future visits.",
      },
      {
        id: "manage",
        label: "How to change your decision",
        content:
          "Use the floating cookie button to open this panel anytime and change your choice. If you reject, no analytics events are sent.",
      },
    ],
  },
};

interface Props {
  lang: Lang;
}

export default function CookieBanner({ lang }: Props) {
  const [visible, setVisible] = useState(false);
  const [consent, setConsent] = useState<ConsentDecision | null>(null);
  const [pendingDecision, setPendingDecision] = useState<ConsentDecision | null>(null);

  useEffect(() => {
    const decision = getStoredConsent();

    if (decision) {
      setConsent(decision);
      updateAnalyticsConsent(decision);
      setVisible(false);
      return;
    }

    setVisible(true);
  }, []);

  const copy = useMemo(() => COPY[lang], [lang]);

  function handleDecision(decision: ConsentDecision) {
    setPendingDecision(decision);

    setTimeout(() => {
      setStoredConsent(decision);
      updateAnalyticsConsent(decision);
      setConsent(decision);
      setVisible(false);
      setPendingDecision(null);
    }, 320);
  }

  const showManagerButton = !visible && consent !== null;

  return (
    <>
      {showManagerButton ? (
        <Button
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-md"
          aria-label={copy.manage}
          onClick={() => setVisible(true)}
        >
          <Cookie />
        </Button>
      ) : null}

      {visible ? (
        <div className="fixed bottom-4 right-4 z-50 w-[calc(100%-2rem)] sm:w-[30rem]">
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
                <p className="text-xs text-muted-foreground">
                  {consent === "accepted" ? copy.currentAccepted : copy.currentRejected}
                </p>
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
                className="relative overflow-hidden"
              >
                <span
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    pendingDecision === "rejected" ? "bg-red-500/20" : "w-0"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex w-full items-center justify-center",
                    pendingDecision === "rejected" ? "gap-2" : "gap-0"
                  )}
                >
                  {pendingDecision === "rejected" ? (
                    <X data-icon="inline-start" className="scale-110" />
                  ) : null}
                  {copy.reject}
                </span>
              </Button>
              <Button
                onClick={() => handleDecision("accepted")}
                disabled={pendingDecision !== null}
                className="relative overflow-hidden"
              >
                <span
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    pendingDecision === "accepted" ? "bg-emerald-500/20" : "w-0"
                  )}
                />
                <span
                  className={cn(
                    "relative inline-flex w-full items-center justify-center",
                    pendingDecision === "accepted" ? "gap-2" : "gap-0"
                  )}
                >
                  {pendingDecision === "accepted" ? (
                    <Check data-icon="inline-start" className="scale-110" />
                  ) : null}
                  {copy.accept}
                </span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : null}
    </>
  );
}
