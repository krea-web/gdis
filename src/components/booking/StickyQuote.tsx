import { Car, Calendar, MapPin, Check, ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { BookingState } from "@/components/booking/BookingFlow";
import { getMonthlyRate } from "@/hooks/useVehicles";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

type Props = {
  booking: BookingState;
  currentStep: number;
  totalSteps: number;
  lang?: Locale;
  /** Triggered when the user taps the action button on the mobile sticky bar. */
  onAction?: () => void;
  /** True when the current step is valid and the user can advance / send. */
  canAdvance?: boolean;
  /** True only when we're on the last step. */
  isLastStep?: boolean;
};

const StickyQuote = ({
  booking,
  currentStep,
  totalSteps,
  lang = "it",
  onAction,
  canAdvance = false,
  isLastStep = false,
}: Props) => {
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
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

      {/* Mobile bottom bar — always present action button (Avanti / Invia richiesta WhatsApp) */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur-xl px-3 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]"
      >
        <div className="flex items-stretch gap-3">
          <div className="min-w-0 flex-1 flex flex-col justify-center">
            {booking.vehicle ? (
              <>
                <p className="text-[13px] font-semibold text-foreground truncate leading-tight">{booking.vehicle.name}</p>
                {totalPrice > 0 ? (
                  <>
                    <p className="font-display text-lg font-bold text-primary leading-tight mt-0.5">
                      ~€{totalPrice}
                    </p>
                    <p className="text-[10px] text-muted-foreground leading-snug">
                      €{ratePerDay}{t("booking.summary.perDayShort")} · {days} {days === 1 ? t("booking.summary.daySingular") : t("booking.summary.dayPlural")} · {t("booking.request.summary.indicative")}
                    </p>
                  </>
                ) : (
                  <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                    {currentStep === 0 ? t("booking.summary.selectVehicle") : t("booking.summary.selectDates")}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="text-[13px] font-semibold text-foreground">{t("booking.summary.title")}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {t("booking.summary.selectVehicle")}
                </p>
              </>
            )}
            {/* Compact step dots */}
            <div className="flex items-center gap-1 mt-1.5" aria-label={`Step ${currentStep + 1} of ${totalSteps}`}>
              {stepsInfo.map((_s, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 max-w-[28px] rounded-full transition-colors duration-300 ${
                    i < currentStep ? "bg-primary" :
                    i === currentStep ? "bg-primary/60" :
                    "bg-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action button — Avanti on steps 0-1, WhatsApp green on final step */}
          <button
            type="button"
            onClick={onAction}
            disabled={!canAdvance}
            aria-label={isLastStep ? t("booking.request.whatsappCta") : t("booking.cta.next")}
            className={`shrink-0 inline-flex items-center justify-center gap-1.5 h-auto min-h-[52px] px-4 rounded-2xl text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed ${
              isLastStep
                ? "bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:bg-[#22c160]"
                : "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90"
            }`}
          >
            {isLastStep ? (
              <>
                <WhatsAppIcon size={18} />
                <span className="whitespace-nowrap">{t("booking.request.whatsappCtaShort")}</span>
              </>
            ) : (
              <>
                <span className="whitespace-nowrap">{t("booking.cta.next")}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StickyQuote;
