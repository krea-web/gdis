import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Loader2, PenTool } from "lucide-react";
import { invokeN8nProxy } from "@/lib/n8nProxy";

type Props = {
  bookingId: string;
  onComplete: () => void;
};

const SignatureStep = ({ bookingId, onComplete }: Props) => {
  const sigRef = useRef<SignatureCanvas>(null);
  const [submitting, setSubmitting] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const clear = () => {
    sigRef.current?.clear();
    setHasSigned(false);
  };

  const handleSubmit = async () => {
    if (!sigRef.current || sigRef.current.isEmpty()) return;
    setSubmitting(true);

    try {
      const base64 = sigRef.current.getTrimmedCanvas().toDataURL("image/png");

      const res = await fetch(SIGN_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: bookingId, signature: base64 }),
      });

      if (!res.ok) throw new Error("Signature webhook failed");
      onComplete();
    } catch (err) {
      console.error("Signature error:", err);
      const { toast } = await import("sonner");
      toast.error("Errore nell'invio della firma. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        Firma il contratto
      </h2>
      <p className="text-muted-foreground mb-8">
        Firma digitalmente il contratto di noleggio per completare la prenotazione.
      </p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PenTool size={16} />
          <span>Disegna la tua firma nel riquadro sottostante</span>
        </div>

        <div className="border-2 border-dashed border-border rounded-xl overflow-hidden bg-background">
          <SignatureCanvas
            ref={sigRef}
            canvasProps={{
              className: "w-full",
              style: { width: "100%", height: 200 },
            }}
            {...({ onEnd: () => setHasSigned(true), penColor: "black", backgroundColor: "white" } as any)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={clear} className="gap-2">
            <Eraser size={14} />
            Cancella
          </Button>

          <Button
            variant="hero"
            size="lg"
            onClick={handleSubmit}
            disabled={!hasSigned || submitting}
            className="gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Invio firma...
              </>
            ) : (
              "Firma e Invia Contratto"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureStep;
