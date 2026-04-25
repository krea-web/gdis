import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        el: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
          appearance?: "always" | "execute" | "interaction-only";
        },
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type Props = {
  onToken: (token: string) => void;
  onExpired?: () => void;
  onError?: () => void;
};

const TurnstileWidget = ({ onToken, onExpired, onError }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined;

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;

    const render = () => {
      if (!window.turnstile || !containerRef.current) return;
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: onToken,
        "expired-callback": onExpired,
        "error-callback": onError,
        appearance: "interaction-only",
        theme: "auto",
      });
    };

    if (window.turnstile) {
      render();
    } else {
      const existing = document.querySelector(`script[src="${TURNSTILE_SCRIPT_SRC}"]`);
      if (existing) {
        existing.addEventListener("load", render, { once: true });
      } else {
        const script = document.createElement("script");
        script.src = TURNSTILE_SCRIPT_SRC;
        script.async = true;
        script.defer = true;
        script.addEventListener("load", render, { once: true });
        document.head.appendChild(script);
      }
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [siteKey, onToken, onExpired, onError]);

  if (!siteKey) return null;

  return <div ref={containerRef} className="flex justify-center" />;
};

export default TurnstileWidget;
