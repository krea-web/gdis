import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEOHead from "@/components/SEOHead";
import VehicleSelection from "@/components/booking/VehicleSelection";
import DateSelection from "@/components/booking/DateSelection";
import DriverForm from "@/components/booking/DriverForm";
import SecondDriverStep from "@/components/booking/SecondDriverStep";
import SignatureStep from "@/components/booking/SignatureStep";
import StickyQuote from "@/components/booking/StickyQuote";
import BookingSuccess from "@/components/booking/BookingSuccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/* ── Types ─────────────────────────────────── */

export type DriverData = {
  nome: string; cognome: string; dataNascita: string; luogoNascita: string;
  viaResidenza: string; cittaResidenza: string; email: string; telefono: string;
  codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
};

export type SecondDriverData = DriverData & { enabled: boolean };

export type BookingState = {
  vehicle: { id: string; name: string; image: string; pricePerDay: number } | null;
  startDate: Date | null;
  endDate: Date | null;
  driver: DriverData;
  secondDriver: SecondDriverData;
};

const initialDriver: DriverData = {
  nome: "", cognome: "", dataNascita: "", luogoNascita: "",
  viaResidenza: "", cittaResidenza: "", email: "", telefono: "",
  codiceFiscale: "", patenteFronte: null, patenteRetro: null,
};

const steps = ["Veicolo", "Date", "Dati Conducente", "Secondo Guidatore", "Firma"];

/* ── Webhook URLs ──────────────────────────── */

const CHECK_AVAILABILITY_URL = "https://n8n.kreareweb.com/webhook/gdisrent/check-availability";
const CREATE_BOOKING_URL = "https://n8n.kreareweb.com/webhook/gdisrent/create-booking";

/* ── Helpers ───────────────────────────────── */

async function uploadLicense(file: File, prefix: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${prefix}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("documents").upload(path, file);
  if (error) { console.error("Upload error:", error); return null; }
  const { data } = supabase.storage.from("documents").getPublicUrl(path);
  return data.publicUrl;
}

/* ── Component ─────────────────────────────── */

const PrenotaOra = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [booking, setBooking] = useState<BookingState>({
    vehicle: null,
    startDate: null,
    endDate: null,
    driver: { ...initialDriver },
    secondDriver: { enabled: false, ...initialDriver },
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
        return !!(d.nome && d.cognome && d.dataNascita && d.luogoNascita &&
          d.viaResidenza && d.cittaResidenza && d.email && d.telefono && d.codiceFiscale);
      }
      case 3: return true;
      default: return false;
    }
  };

  const handleNextFromDates = async () => {
    if (!booking.vehicle || !booking.startDate || !booking.endDate) return;
    setCheckingAvailability(true);
    try {
      const res = await fetch(CHECK_AVAILABILITY_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          vehicle_id: booking.vehicle.id,
          start_date: booking.startDate.toISOString().split("T")[0],
          end_date: booking.endDate.toISOString().split("T")[0],
        }),
      });
      if (!res.ok) throw new Error("unavailable");
      const data = await res.json();
      if (data?.available === false) {
        toast.error("Veicolo non disponibile per le date selezionate. Scegli un altro periodo.");
        return;
      }
      setStep(2);
    } catch {
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
      const totalPrice = booking.vehicle.pricePerDay * days;

      const { data: { user } } = await supabase.auth.getUser();

      const insertPayload = {
        user_id: user?.id ?? null,
        vehicle_id: booking.vehicle.id,
        start_date: booking.startDate.toISOString().split("T")[0],
        end_date: booking.endDate.toISOString().split("T")[0],
        total_price: totalPrice,
        customer_name: booking.driver.nome,
        customer_surname: booking.driver.cognome,
        email: booking.driver.email,
        phone: booking.driver.telefono,
        tax_code: booking.driver.codiceFiscale,
        birth_date: booking.driver.dataNascita,
        birth_place: booking.driver.luogoNascita,
        residence_address: booking.driver.viaResidenza,
        city: booking.driver.cittaResidenza,
        license_front_url: frontUrl,
        license_back_url: backUrl,
        has_second_driver: booking.secondDriver.enabled,
        ...(booking.secondDriver.enabled ? {
          second_driver_name: booking.secondDriver.nome,
          second_driver_surname: booking.secondDriver.cognome,
          second_driver_email: booking.secondDriver.email,
          second_driver_phone: booking.secondDriver.telefono,
          second_driver_cf: booking.secondDriver.codiceFiscale,
          second_driver_birth_date: booking.secondDriver.dataNascita,
          second_driver_birth_place: booking.secondDriver.luogoNascita,
          second_driver_residence_address: booking.secondDriver.viaResidenza,
          second_driver_city: booking.secondDriver.cittaResidenza,
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

      await fetch(CREATE_BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...insertPayload, id: newBookingId }),
      });

      setStep(4);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("Errore durante la prenotazione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      handleNextFromDates();
    } else if (step === 3) {
      handleSubmit();
    } else {
      setStep(step + 1);
    }
  };

  if (success) {
    return <BookingSuccess booking={booking} />;
  }

  return (
    <div className="min-h-screen bg-transparent pt-20">
      <SEOHead
        title="Prenota Ora — GDIS Rent | Noleggio Online in Sardegna"
        description="Prenota online il tuo veicolo in Sardegna: auto, scooter, quad e luxury. Procedura rapida in 5 step, firma digitale e consegna VIP inclusa."
        canonical="/prenotaora"
      />

      {/* Step indicator */}
      <div className="container py-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  i < step ? "bg-primary text-primary-foreground" :
                  i === step ? "bg-primary text-primary-foreground blue-glow-sm" :
                  "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 md:w-16 h-0.5 ${i < step ? "bg-primary" : "bg-border"}`} />
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
                {step === 4 && bookingId && (
                  <SignatureStep
                    bookingId={bookingId}
                    onComplete={() => setSuccess(true)}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {step < 4 && (
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

                {step < 3 ? (
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
                    disabled={submitting}
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
    </div>
  );
};

export default PrenotaOra;
