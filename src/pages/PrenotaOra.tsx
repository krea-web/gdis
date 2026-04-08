import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import VehicleSelection from "@/components/booking/VehicleSelection";
import DateSelection from "@/components/booking/DateSelection";
import DriverForm from "@/components/booking/DriverForm";
import SecondDriverStep from "@/components/booking/SecondDriverStep";
import PickupDropoffStep from "@/components/booking/PickupDropoffStep";
import type { PickupDropoffData } from "@/components/booking/PickupDropoffStep";
import SignatureStep from "@/components/booking/SignatureStep";
import StickyQuote from "@/components/booking/StickyQuote";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getMonthlyRate, type Vehicle } from "@/hooks/useVehicles";
import { invokeN8nProxy } from "@/lib/n8nProxy";
import { useNavigate } from "react-router-dom";

/* ── Types ─────────────────────────────────── */

export type DriverData = {
  email: string; telefono: string;
  codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
};

export type SecondDriverData = DriverData & { enabled: boolean };

export type BookingState = {
  vehicle: { id: string; name: string; image: string; pricePerDay: number; vehicleData?: Vehicle } | null;
  startDate: Date | null;
  endDate: Date | null;
  driver: DriverData;
  secondDriver: SecondDriverData;
  pickupDropoff: PickupDropoffData;
};

const initialDriver: DriverData = {
  email: "", telefono: "",
  codiceFiscale: "", patenteFronte: null, patenteRetro: null,
};

const initialPickupDropoff: PickupDropoffData = {
  pickupLocation: "sede",
  pickupCustomAddress: "",
  pickupTime: "",
  dropoffTime: "",
};

const steps = ["Veicolo", "Date", "Conducente", "2° Guidatore", "Ritiro/Consegna", "Firma"];

/* ── Helpers ───────────────────────────────── */

async function uploadLicense(file: File, prefix: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${prefix}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("licenses").upload(path, file);
  if (error) { console.error("Upload error:", error); return null; }
  const { data } = supabase.storage.from("licenses").getPublicUrl(path);
  return data.publicUrl;
}

/* ── Component ─────────────────────────────── */

const PrenotaOra = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    vehicle: null,
    startDate: null,
    endDate: null,
    driver: { ...initialDriver },
    secondDriver: { enabled: false, ...initialDriver },
    pickupDropoff: { ...initialPickupDropoff },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

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
      case 1: return !!booking.startDate && !!booking.endDate;
      case 2: {
        const d = booking.driver;
        return !!(d.email && d.telefono);
      }
      case 3: return true;
      case 4: {
        const pd = booking.pickupDropoff;
        const hasPickup = pd.pickupLocation === "sede" || pd.pickupCustomAddress.trim() !== "";
        return hasPickup && !!pd.pickupTime && !!pd.dropoffTime;
      }
      default: return false;
    }
  };

  const handleNextFromDates = async () => {
    if (!booking.vehicle || !booking.startDate || !booking.endDate) return;
    setCheckingAvailability(true);
    try {
      const { data, error } = await supabase.functions.invoke("n8n-proxy", {
        body: {
          endpoint: "check-availability",
          data: {
            vehicle_id: booking.vehicle.id,
            start_date: booking.startDate.toISOString().split("T")[0],
            end_date: booking.endDate.toISOString().split("T")[0],
          },
        },
      });

      if (error || data?.success === false || data?.available === false) {
        const msg = data?.error || "Il veicolo è già stato prenotato per queste date. Scegli un altro periodo.";
        toast.error(msg);
        return;
      }

      setStep(2);
    } catch (err) {
      console.error("Availability check failed:", err);
      toast.error("Impossibile verificare la disponibilità. Riprova.");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const handleSubmit = async () => {
    if (!booking.vehicle || !booking.startDate || !booking.endDate) return;
    setSubmitting(true);

    try {
      let frontUrl: string | null = null;
      let backUrl: string | null = null;
      let secondFrontUrl: string | null = null;
      let secondBackUrl: string | null = null;

      if (booking.driver.patenteFronte)
        frontUrl = await uploadLicense(booking.driver.patenteFronte, "license-front");
      if (booking.driver.patenteRetro)
        backUrl = await uploadLicense(booking.driver.patenteRetro, "license-back");
      if (booking.secondDriver.enabled && booking.secondDriver.patenteFronte)
        secondFrontUrl = await uploadLicense(booking.secondDriver.patenteFronte, "second-license-front");
      if (booking.secondDriver.enabled && booking.secondDriver.patenteRetro)
        secondBackUrl = await uploadLicense(booking.secondDriver.patenteRetro, "second-license-back");

      const days = Math.ceil(
        (booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const ratePerDay = booking.vehicle.vehicleData
        ? getMonthlyRate(booking.vehicle.vehicleData, booking.startDate.getMonth())
        : booking.vehicle.pricePerDay;
      const totalPrice = ratePerDay * days;

      const { data: { user } } = await supabase.auth.getUser();

      const pickupLoc = booking.pickupDropoff.pickupLocation === "sede"
        ? "Sede GDIS Rent — Olbia"
        : booking.pickupDropoff.pickupCustomAddress;

      const insertPayload = {
        user_id: user?.id ?? null,
        vehicle_id: booking.vehicle.id,
        start_date: booking.startDate.toISOString().split("T")[0],
        end_date: booking.endDate.toISOString().split("T")[0],
        total_price: totalPrice,
        email: booking.driver.email,
        phone: booking.driver.telefono,
        tax_code: booking.driver.codiceFiscale || null,
        license_front_url: frontUrl,
        license_back_url: backUrl,
        has_second_driver: booking.secondDriver.enabled,
        pickup_location: pickupLoc,
        pickup_time: booking.pickupDropoff.pickupTime,
        dropoff_location: "Sede GDIS Rent — Olbia",
        dropoff_time: booking.pickupDropoff.dropoffTime,
        ...(booking.secondDriver.enabled ? {
          second_driver_email: booking.secondDriver.email,
          second_driver_phone: booking.secondDriver.telefono,
          second_driver_cf: booking.secondDriver.codiceFiscale || null,
          second_driver_license_front_url: secondFrontUrl,
          second_driver_license_back_url: secondBackUrl,
        } : {}),
      };

      const { data: insertedBooking, error } = await supabase
        .from("bookings")
        .insert(insertPayload)
        .select("id")
        .single();

      if (error) throw error;

      const newBookingId = insertedBooking.id;
      setBookingId(newBookingId);

      await invokeN8nProxy("create-booking", { ...insertPayload, id: newBookingId });

      // Move to signature step
      setStep(5);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("Errore durante la prenotazione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignatureComplete = () => {
    setShowSuccess(true);
  };

  const handleNext = () => {
    if (step === 1) {
      handleNextFromDates();
    } else if (step === 4) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <SEOHead
        title="Prenota Ora — GDIS Rent | Noleggio Online in Sardegna"
        description="Prenota online il tuo veicolo in Sardegna: auto, scooter, quad e luxury. Procedura rapida in 6 step, firma digitale e consegna VIP inclusa."
        canonical="/prenotaora"
      />

      {/* Step indicator */}
      <div className="container py-8">
        <div className="flex items-center justify-center gap-1 md:gap-2 mb-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1 md:gap-2">
              <div
                className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-all ${
                  i < step ? "bg-primary text-primary-foreground" :
                  i === step ? "bg-primary text-primary-foreground blue-glow-sm" :
                  "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-4 md:w-12 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center font-display text-sm text-muted-foreground uppercase tracking-widest">
          {steps[step]}
        </p>
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
                  <VehicleSelection selected={booking.vehicle} onSelect={handleVehicleSelect} />
                )}
                {step === 1 && (
                  <DateSelection
                    startDate={booking.startDate}
                    endDate={booking.endDate}
                    onSelect={(start, end) => updateBooking({ startDate: start, endDate: end })}
                  />
                )}
                {step === 2 && (
                  <DriverForm
                    data={booking.driver}
                    onChange={(driver) => updateBooking({ driver })}
                  />
                )}
                {step === 3 && (
                  <SecondDriverStep
                    data={booking.secondDriver}
                    onChange={(secondDriver) => updateBooking({ secondDriver })}
                  />
                )}
                {step === 4 && (
                  <PickupDropoffStep
                    data={booking.pickupDropoff}
                    onChange={(pickupDropoff) => updateBooking({ pickupDropoff })}
                  />
                )}
                {step === 5 && bookingId && (
                  <SignatureStep
                    bookingId={bookingId}
                    onComplete={handleSignatureComplete}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {step < 5 && (
              <div className="flex items-center justify-between mt-10">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={step === 0}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  Indietro
                </Button>

                {step < 4 ? (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleNext}
                    disabled={!canNext() || checkingAvailability}
                    className="gap-2"
                  >
                    {checkingAvailability ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Verifica disponibilità...
                      </>
                    ) : (
                      <>
                        Avanti
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={!canNext() || submitting}
                    className="gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Generazione contratto in corso...
                      </>
                    ) : (
                      <>
                        Conferma Prenotazione
                        <Check size={16} />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-4">
            <StickyQuote booking={booking} currentStep={step} />
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader className="items-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <DialogTitle className="font-display text-2xl">
              Prenotazione Confermata!
            </DialogTitle>
            <DialogDescription className="text-base">
              La tua prenotazione è stata completata con successo. Riceverai una email di conferma con tutti i dettagli.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => {
                // TODO: add Google review link
              }}
            >
              <Star size={16} className="text-yellow-500" />
              Lascia una recensione su Google
            </Button>
            <Button
              variant="hero"
              onClick={() => {
                setShowSuccess(false);
                navigate("/");
              }}
            >
              Torna alla Home
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrenotaOra;
