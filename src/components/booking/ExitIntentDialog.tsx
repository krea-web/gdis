import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

const STORAGE_KEY = "gdis-exit-intent-shown";
const MIN_DWELL_MS = 30_000;

type Props = {
  /** Disabilita il popup quando il booking è già completato. */
  disabled?: boolean;
  lang?: Locale;
};

const ExitIntentDialog = ({ disabled, lang = "it" }: Props) => {
  const t = useTranslations(lang);
  const [open, setOpen] = useState(false);
  const startRef = useRef<number>(Date.now());
  const firedRef = useRef(false);

  useEffect(() => {
    if (disabled) return;
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) firedRef.current = true;
    } catch {
      // sessionStorage potrebbe essere disabilitato
    }

    const onMouseLeave = (e: MouseEvent) => {
      if (firedRef.current) return;
      if (Date.now() - startRef.current < MIN_DWELL_MS) return;
      // l'utente porta il mouse sopra (verso la barra indirizzi/tab) → segnale di abbandono desktop
      if (e.clientY > 0) return;
      firedRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignora
      }
      setOpen(true);
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => document.removeEventListener("mouseleave", onMouseLeave);
  }, [disabled]);

  const whatsappHref = `https://wa.me/393520459150?text=${encodeURIComponent(t("booking.exitIntent.whatsappMessage"))}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">{t("booking.exitIntent.title")}</DialogTitle>
          <DialogDescription className="text-base pt-2">
            {t("booking.exitIntent.description")}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button asChild className="bg-[#25D366] hover:bg-[#1EBE5D] text-white gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("exit_intent_dialog")}
            >
              <WhatsAppIcon size={18} />
              {t("booking.exitIntent.whatsappCta")}
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            {t("booking.exitIntent.continue")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentDialog;
