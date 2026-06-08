import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { it as itLocale, enUS, de as deLocale, fr as frLocale } from "date-fns/locale";
import VehicleSelection from "@/components/booking/VehicleSelection";
import DateSelection from "@/components/booking/DateSelection";
import PickupDropoffStep from "@/components/booking/PickupDropoffStep";
import type { PickupDropoffData } from "@/components/booking/PickupDropoffStep";
import StickyQuote from "@/components/booking/StickyQuote";
import ExitIntentDialog from "@/components/booking/ExitIntentDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Car, Calendar, MapPin, Check } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Toaster } from "sonner";
import { type Vehicle, getMonthlyRate } from "@/hooks/useVehicles";
import { trackBookingStarted, trackBookingStep, trackWhatsAppClick } from "@/lib/analytics";
import { buildWhatsAppRequest } from "@/lib/whatsappRequest";
import { useTranslations } from "@/i18n/utils";
import type { Locale } from "@/i18n/utils";

export type BookingState = {
  vehicle: { id: string; name: string; image: string; pricePerDay: number; vehicleData?: Vehicle } | null;
  startDate: Date | null;
  endDate: Date | null;
  pickupDropoff: PickupDropoffData;
};

const initialPickupDropoff: PickupDropoffData = {
  pickupLocation: "sede",
  pickupCustomAddress: "",
  pickupTime: "",
  dropoffTime: "",
};

const DATE_LOCALES: Record<Locale, typeof itLocale> = {
  it: itLocale,
  en: enUS,
  de: deLocale,
  fr: frLocale,
};

type BookingFlowProps = {
  lang?: Locale;
};

const BookingFlow = ({ lang = "it" }: BookingFlowProps) => {
  const t = useTranslations(lang);
  const stepKeys = ["vehicle", "dates", "pickupDropoff"] as const;
  const steps = stepKeys.map((k) => t(`booking.steps.${k}`));

  const [step, setStep] = useState(0);
  const [initialVehicleSlug, setInitialVehicleSlug] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingState>({
    vehicle: null,
    startDate: null,
    endDate: null,
    pickupDropoff: { ...initialPickupDropoff },
  });

  // Read ?vehicle=<slug> on mount to allow pre-selection from fleet cards.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const slug = new URL(window.location.href).searchParams.get("vehicle");
    if (slug) setInitialVehicleSlug(slug);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (step > 0) {
      trackBookingStep(stepKeys[step], step);
    }
  }, [step]);

  useEffect(() => {
    trackBookingStarted();
  }, []);

  const updateBooking = useCallback((partial: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleVehicleSelect = useCallback((v: BookingState["vehicle"]) => {
    updateBooking({ vehicle: v });
    setTimeout(() => setStep(1), 350);
  }, [updateBooking]);

  const canNext = () => {
    switch (step) {
      case 0: return !!booking.vehicle;
      case 1: return !!booking.startDate && !!booking.endDate && booking.endDate > booking.startDate;
      case 2: {
        const p = booking.pickupDropoff;
        if (p.pickupLocation === "custom" && p.pickupCustomAddress.trim().length === 0) return false;
        return true;
      }
      default: return false;
    }
  };

  const days =
    booking.startDate && booking.endDate
      ? Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const ratePerDay =
    booking.vehicle?.vehicleData && booking.startDate
      ? getMonthlyRate(booking.vehicle.vehicleData, booking.startDate.getMonth())
      : booking.vehicle?.pricePerDay ?? 0;

  const priceEstimate = days > 0 ? ratePerDay * days : undefined;

  const pickupSummaryLabel = (): string | undefined => {
    if (!booking.vehicle) return undefined;
    const p = booking.pickupDropoff;
    if (p.pickupLocation === "sede") {
      return t("booking.request.pickup.sedeSummary");
    }
    if (p.pickupLocation === "custom" && p.pickupCustomAddress.trim().length > 0) {
      return t("booking.request.pickup.deliverySummary", { address: p.pickupCustomAddress.trim() });
    }
    return t("booking.request.pickup.toAgree");
  };

  const handleSendWhatsApp = () => {
    if (!booking.vehicle) return;
    const dateLocale = DATE_LOCALES[lang] ?? itLocale;
    const dateFmt = lang === "en" ? "MMM d, yyyy" : "d MMM yyyy";
    const startLabel = booking.startDate
      ? format(booking.startDate, dateFmt, { locale: dateLocale })
      : undefined;
    const endLabel = booking.endDate
      ? format(booking.endDate, dateFmt, { locale: dateLocale })
      : undefined;

    const url = buildWhatsAppRequest(lang, {
      vehicleName: booking.vehicle.name,
      startLabel,
      endLabel,
      days: days > 0 ? days : undefined,
      priceEstimate,
      pickupLabel: pickupSummaryLabel(),
    });

    trackWhatsAppClick("booking_request");

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleNext = () => {
    if (step < stepKeys.length - 1) {
      setStep(step + 1);
    } else {
      handleSendWhatsApp();
    }
  };

  // Progress: each completed step worth 1 / (n-1) chunk; final step at 100% only when all valid.
  const progress = Math.round((step / (stepKeys.length - 1)) * 100);

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <Toaster richColors position="top-center" />
      <div className="container py-6 md:py-8">
        {/* Progress line */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3 px-1">
            {steps.map((s, i) => (
              <div key={s} className="flex-1 flex flex-col items-center min-w-0">
                <div
                  className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all duration-500 ${
                    i < step ? "bg-primary text-primary-foreground" :
                    i === step ? "bg-primary text-primary-foreground ring-4 ring-primary/20" :
                    "bg-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                <span
                  className={`mt-1.5 text-[10px] md:text-[11px] font-medium uppercase tracking-wider truncate w-full text-center transition-colors ${
                    i <= step ? "text-foreground" : "text-muted-foreground/60"
                  }`}
                >
                  {s}
                </span>
              </div>
            ))}
          </div>
          {/* Animated progress bar */}
          <div className="relative h-1 bg-border rounded-full overflow-hidden mx-3">
            <div
              className="absolute inset-y-0 left-0 bg-primary rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              role="progressbar"
            />
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, animation: progress > 0 && progress < 100 ? "shimmer 2.4s ease-in-out infinite" : "none" }}
            />
          </div>
        </div>
      </div>

      <div className="container pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {step === 0 && (
                  <VehicleSelection
                    selected={booking.vehicle}
                    onSelect={handleVehicleSelect}
                    lang={lang}
                    initialSlug={initialVehicleSlug}
                  />
                )}
                {step === 1 && (
                  <DateSelection
                    startDate={booking.startDate}
                    endDate={booking.endDate}
                    onSelect={(start, end) => updateBooking({ startDate: start, endDate: end })}
                    lang={lang}
                  />
                )}
                {step === 2 && (
                  <>
                    <PickupDropoffStep
                      data={booking.pickupDropoff}
                      onChange={(pickupDropoff) => updateBooking({ pickupDropoff })}
                      lang={lang}
                    />

                    {/* Request summary card */}
                    <div className="mt-8 bg-card rounded-2xl border border-border p-6 md:p-8">
                      <h3 className="font-display text-lg font-bold text-foreground mb-4">
                        {t("booking.request.summaryTitle")}
                      </h3>
                      <div className="space-y-3 text-sm">
                        {booking.vehicle && (
                          <div className="flex items-start gap-3">
                            <Car size={18} className="text-primary shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="text-muted-foreground">{t("booking.request.summary.vehicle")}: </span>
                              <span className="font-medium text-foreground">{booking.vehicle.name}</span>
                            </div>
                          </div>
                        )}
                        {booking.startDate && booking.endDate && (
                          <div className="flex items-start gap-3">
                            <Calendar size={18} className="text-primary shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <span className="text-muted-foreground">{t("booking.request.summary.period")}: </span>
                              <span className="font-medium text-foreground">
                                {format(booking.startDate, "d MMM yyyy", { locale: DATE_LOCALES[lang] ?? itLocale })}
                                {" → "}
                                {format(booking.endDate, "d MMM yyyy", { locale: DATE_LOCALES[lang] ?? itLocale })}
                                {days > 0 && ` (${days} ${days === 1 ? t("booking.summary.daySingular") : t("booking.summary.dayPlural")})`}
                              </span>
                            </div>
                          </div>
                        )}
                        {priceEstimate !== undefined && (
                          <div className="flex items-start gap-3">
                            <span className="text-primary shrink-0 mt-0.5 text-base">💰</span>
                            <div className="flex-1">
                              <span className="text-muted-foreground">{t("booking.request.summary.estimate")}: </span>
                              <span className="font-medium text-foreground">~€{priceEstimate}</span>
                              <span className="ml-1 text-xs text-muted-foreground">
                                ({t("booking.request.summary.indicative")})
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="text-muted-foreground">{t("booking.request.summary.pickup")}: </span>
                            <span className="font-medium text-foreground">
                              {pickupSummaryLabel() ?? t("booking.request.pickup.toAgree")}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
                        {t("booking.request.estimateNote")}
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Desktop / tablet action row — mobile uses the sticky bottom bar instead */}
            <div className="hidden sm:flex sm:items-center sm:justify-between gap-3 mt-10 pb-28 lg:pb-0">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setStep(Math.max(0, step - 1))}
                disabled={step === 0}
                className="gap-2"
              >
                <ArrowLeft size={16} />
                {t("booking.cta.back")}
              </Button>

              {step < stepKeys.length - 1 ? (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={handleNext}
                  disabled={!canNext()}
                  className="gap-2"
                >
                  {t("booking.cta.next")}
                  <ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSendWhatsApp}
                  disabled={!canNext()}
                  className="gap-2 bg-[#25D366] hover:bg-[#22c160] text-white shadow-lg shadow-[#25D366]/30"
                >
                  <WhatsAppIcon size={18} />
                  {t("booking.request.whatsappCta")}
                </Button>
              )}
            </div>
            {/* Mobile back link only — primary action lives in the sticky bottom bar */}
            {step > 0 && (
              <div className="sm:hidden mt-6 pb-28">
                <button
                  type="button"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} />
                  {t("booking.cta.back")}
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <StickyQuote
              booking={booking}
              currentStep={step}
              totalSteps={stepKeys.length}
              lang={lang}
              onAction={handleNext}
              canAdvance={canNext()}
              isLastStep={step === stepKeys.length - 1}
            />
          </div>
        </div>
      </div>

      <ExitIntentDialog disabled={false} lang={lang} />
    </div>
  );
};

export default BookingFlow;
