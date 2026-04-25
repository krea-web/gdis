import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const STORAGE_KEY = "gdis-cookie-consent";

type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function updateConsent(choice: ConsentChoice) {
  const granted = choice === "accepted";
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer!.push(arguments);
    } as typeof window.gtag;
  }
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
      else updateConsent(stored as ConsentChoice);
    } catch {
      setVisible(true);
    }
  }, []);

  const choose = (choice: ConsentChoice) => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // ignore storage failures
    }
    updateConsent(choice);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informativa cookie"
      className="fixed bottom-3 left-3 right-3 md:left-6 md:right-auto md:max-w-md z-[70] rounded-2xl bg-background border border-border shadow-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Rispettiamo la tua privacy
        </h2>
        <button
          onClick={() => choose("rejected")}
          aria-label="Rifiuta cookie non necessari"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={18} />
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Usiamo cookie tecnici indispensabili al funzionamento del sito e, con il tuo consenso,
        cookie analitici per migliorare l'esperienza. Consulta la{" "}
        <Link to="/cookie" className="underline text-primary hover:text-primary/80">
          Cookie Policy
        </Link>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => choose("rejected")}
          className="flex-1"
        >
          Solo necessari
        </Button>
        <Button
          variant="hero"
          size="sm"
          onClick={() => choose("accepted")}
          className="flex-1"
        >
          Accetta tutti
        </Button>
      </div>
    </div>
  );
};

export default CookieBanner;
