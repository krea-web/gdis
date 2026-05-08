import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "gdis-cookie-consent";

type ConsentChoice = "accepted" | "rejected";

declare global {
  interface Window {
    gdisGrantConsent?: (granted: boolean) => void;
  }
}

function updateConsent(choice: ConsentChoice) {
  if (typeof window === "undefined") return;
  const granted = choice === "accepted";
  if (typeof window.gdisGrantConsent === "function") {
    window.gdisGrantConsent(granted);
    return;
  }
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer!.push(args);
    } as Window["gtag"];
  }
  window.gtag("consent", "update", {
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
    analytics_storage: granted ? "granted" : "denied",
  });
}

const CookieBannerIsland = () => {
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
      /* ignore */
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
        <a href="/cookie" className="underline text-primary hover:text-primary/80">
          Cookie Policy
        </a>
        .
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="flex-1 inline-flex items-center justify-center h-9 rounded-md px-3 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          Solo necessari
        </button>
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="flex-1 inline-flex items-center justify-center h-9 rounded-full px-3 text-sm font-semibold bg-primary text-primary-foreground hover:bg-brand-blue-deep shadow-lg shadow-primary/30 transition-all"
        >
          Accetta tutti
        </button>
      </div>
    </div>
  );
};

export default CookieBannerIsland;
