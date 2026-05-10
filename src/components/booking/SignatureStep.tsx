import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@/components/ui/button";
import { Eraser, Loader2, PenTool } from "lucide-react";
import { toast } from "sonner";
import { invokeN8nProxy } from "@/lib/n8nProxy";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type Props = {
  bookingId: string;
  onComplete: () => void;
  lang?: Locale;
};

const SignatureStep = ({ bookingId, onComplete, lang = "it" }: Props) => {
  const t = useTranslations(lang);
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

      await invokeN8nProxy("sign", { booking_id: bookingId, signature: base64 });
      onComplete();
    } catch {
      toast.error(t("booking.errors.signatureSendFailed"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
        {t("booking.signature.title")}
      </h2>
      <p className="text-muted-foreground mb-8">
        {t("booking.signature.subtitle")}
      </p>

      <div className="bg-card rounded-2xl border border-border p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <PenTool size={16} />
          <span>{t("booking.signature.instruction")}</span>
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
            {t("booking.signature.clear")}
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
                {t("booking.signature.submitting")}
              </>
            ) : (
              t("booking.signature.submit")
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignatureStep;
