import { Car, Calendar, MapPin, Check } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { BookingState } from "@/components/booking/BookingFlow";
import { getMonthlyRate } from "@/hooks/useVehicles";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type Props = {
  booking: BookingState;
  currentStep: number;
  lang?: Locale;
  /** Triggered when the user taps "Send WhatsApp request" from the mobile bar. */
  onSendWhatsApp?: () => void;
  /** True only when we're on the last step AND the form is complete. */
  canSend?: boolean;
};

const StickyQuote = ({ booking, currentStep, lang = "it", onSendWhatsApp, canSend = false }: Props) => {
  const t = useTranslations(lang);
  const days =
    booking.startDate && booking.endDate
      ? Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const ratePerDay =
    booking.vehicle?.vehicleData && booking.startDate
      ? getMonthlyRate(booking.vehicle.vehicleData, booking.startDate.getMonth())
      : booking.vehicle?.pricePerDay ?? 0;

  const totalPrice = ratePerDay * days;

  const pickupDone =
    booking.pickupDropoff.pickupLocation === "sede" ||
    (booking.pickupDropoff.pickupLocation === "custom" &&
      booking.pickupDropoff.pickupCustomAddress.trim().length > 0);

  const stepsInfo = [
    { icon: Car, label: t("booking.summary.stepLabels.vehicle"), done: !!booking.vehicle },
    { icon: Calendar, label: t("booking.summary.stepLabels.dates"), done: !!booking.startDate && !!booking.endDate },
    { icon: MapPin, label: t("booking.summary.stepLabels.pickupDropoff"), done: pickupDone },
  ];

  return (
    <div className="lg:sticky lg:top-28">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-foreground">{t("booking.summary.title")}</h3>

          <div className="space-y-4">
            {stepsInfo.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center gap-3 text-sm ${
                  i <= currentStep ? "text-foreground" : "text-muted-foreground/50"
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  s.done ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                }`}>
                  {s.done ? <Check size={14} /> : <s.icon size={14} />}
                </div>
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-4 space-y-3">
            {booking.vehicle && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{booking.vehicle.name}</span>
                <span className="text-foreground font-medium">€{ratePerDay}{t("booking.summary.perDayShort")}</span>
              </div>
            )}
            {days > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t("booking.summary.duration")}</span>
                <span className="text-foreground font-medium">{days} {t("booking.summary.daysSuffix")}</span>
              </div>
            )}
          </div>

          {totalPrice > 0 && (
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-end">
                <span className="text-muted-foreground text-sm">{t("booking.summary.totalEstimate")}</span>
                <span className="font-display text-3xl font-bold text-primary">€{totalPrice}</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {t("booking.request.summary.indicative")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass border-t border-border px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            {booking.vehicle ? (
              <>
                <p className="text-sm font-medium text-foreground truncate">{booking.vehicle.name}</p>
                {totalPrice > 0 ? (
                  <>
                    <p className="font-display text-xl font-bold text-primary leading-tight">~€{totalPrice}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      €{ratePerDay}{t("booking.summary.perDayShort")} × {days} {days === 1 ? t("booking.summary.daySingular") : t("booking.summary.dayPlural")} · {t("booking.request.summary.indicative")}
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">{t("booking.summary.selectDates")}</p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t("booking.summary.selectVehicle")}</p>
            )}
          </div>
          {canSend ? (
            <button
              type="button"
              onClick={onSendWhatsApp}
              className="shrink-0 inline-flex items-center justify-center gap-2 h-11 px-4 rounded-full bg-[#25D366] hover:bg-[#22c160] text-white text-sm font-semibold shadow-lg shadow-[#25D366]/30 transition-colors"
              aria-label={t("booking.request.whatsappCta")}
            >
              <WhatsAppIcon size={16} />
              <span className="hidden sm:inline">{t("booking.request.whatsappCta")}</span>
              <span className="sm:hidden">{t("booking.request.whatsappCtaShort")}</span>
            </button>
          ) : (
            <div className="flex gap-1 shrink-0">
              {stepsInfo.map((s, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i <= currentStep ? (s.done ? "bg-primary" : "bg-primary/40") : "bg-muted"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StickyQuote;
