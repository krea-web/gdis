import { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { trackWhatsAppClick } from "@/lib/analytics";

const STORAGE_KEY = "gdis-exit-intent-shown";
const MIN_DWELL_MS = 30_000;

type Props = {
  /** Disabilita il popup quando il booking è già completato. */
  disabled?: boolean;
};

const ExitIntentDialog = ({ disabled }: Props) => {
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Non sei pronto a prenotare online?</DialogTitle>
          <DialogDescription className="text-base pt-2">
            Scrivici su WhatsApp con date e veicolo: ti facciamo un preventivo personalizzato in 2 minuti, senza impegno.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          <Button asChild className="bg-[#25D366] hover:bg-[#1EBE5D] text-white gap-2">
            <a
              href="https://wa.me/393520459150?text=Ciao%2C%20vorrei%20un%20preventivo%20rapido"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick("exit_intent_dialog")}
            >
              <WhatsAppIcon size={18} />
              Chatta su WhatsApp
            </a>
          </Button>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Continua la prenotazione
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntentDialog;
