import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleSelection from "@/components/booking/VehicleSelection";
import DateSelection from "@/components/booking/DateSelection";
import DriverForm from "@/components/booking/DriverForm";
import SecondDriverStep from "@/components/booking/SecondDriverStep";
import StickyQuote from "@/components/booking/StickyQuote";
import BookingSuccess from "@/components/booking/BookingSuccess";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type BookingState = {
  vehicle: { id: string; name: string; image: string; pricePerDay: number } | null;
  startDate: Date | null;
  endDate: Date | null;
  driver: {
    nome: string; cognome: string; dataNascita: string; luogoNascita: string;
    viaResidenza: string; cittaResidenza: string; email: string; telefono: string;
    codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
  };
  secondDriver: {
    enabled: boolean;
    nome: string; cognome: string; dataNascita: string; luogoNascita: string;
    viaResidenza: string; cittaResidenza: string; email: string; telefono: string;
    codiceFiscale: string; patenteFronte: File | null; patenteRetro: File | null;
  };
};

const initialDriver = {
  nome: "", cognome: "", dataNascita: "", luogoNascita: "",
  viaResidenza: "", cittaResidenza: "", email: "", telefono: "",
  codiceFiscale: "", patenteFronte: null as File | null, patenteRetro: null as File | null,
};

const steps = ["Veicolo", "Date", "Dati Conducente", "Secondo Guidatore"];

async function uploadLicense(file: File, prefix: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const path = `${prefix}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from("documents").upload(path, file);
  if (error) {
    console.error("Upload error:", error);
    return null;
  }
  const { data } = supabase.storage.from("documents").getPublicUrl(path);
  return data.publicUrl;
}

const PrenotaOra = () => {
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [booking, setBooking] = useState<BookingState>({
    vehicle: null,
    startDate: null,
    endDate: null,
    driver: { ...initialDriver },
    secondDriver: { enabled: false, ...initialDriver },
  });

  const updateBooking = useCallback((partial: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...partial }));
  }, []);

  const handleVehicleSelect = useCallback((v: BookingState["vehicle"]) => {
    updateBooking({ vehicle: v });
    // Auto-advance to step 2
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

  const handleSubmit = async () => {
    if (!booking.vehicle || !booking.startDate || !booking.endDate) return;
    setSubmitting(true);

    try {
      // Upload license photos
      let frontUrl: string | null = null;
      let backUrl: string | null = null;

      if (booking.driver.patenteFronte) {
        frontUrl = await uploadLicense(booking.driver.patenteFronte, "license-front");
      }
      if (booking.driver.patenteRetro) {
        backUrl = await uploadLicense(booking.driver.patenteRetro, "license-back");
      }

      // Calculate total
      const days = Math.ceil(
        (booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      const totalPrice = booking.vehicle.pricePerDay * days;

      // Get current user (optional)
      const { data: { user } } = await supabase.auth.getUser();

      // Build second driver JSON
      const driver2Info = booking.secondDriver.enabled
        ? JSON.stringify({
            nome: booking.secondDriver.nome,
            cognome: booking.secondDriver.cognome,
            dataNascita: booking.secondDriver.dataNascita,
            luogoNascita: booking.secondDriver.luogoNascita,
            viaResidenza: booking.secondDriver.viaResidenza,
            cittaResidenza: booking.secondDriver.cittaResidenza,
            email: booking.secondDriver.email,
            telefono: booking.secondDriver.telefono,
            codiceFiscale: booking.secondDriver.codiceFiscale,
          })
        : null;

      const { error } = await supabase.from("bookings").insert({
        user_id: user?.id ?? null,
        vehicle_id: booking.vehicle.id,
        start_date: booking.startDate.toISOString().split("T")[0],
        end_date: booking.endDate.toISOString().split("T")[0],
        total_price: totalPrice,
        driver_license_front_url: frontUrl,
        driver_license_back_url: backUrl,
        driver_2_info: driver2Info,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      console.error("Booking error:", err);
      toast.error("Errore durante la prenotazione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return <BookingSuccess booking={booking} />;
  }

  return (
    <div className="min-h-screen bg-transparent pt-20">
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
          {/* Main content */}
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
                  />
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
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
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
                  onClick={() => setStep(step + 1)}
                  disabled={!canNext()}
                  className="gap-2"
                >
                  Avanti
                  <ArrowRight size={16} />
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
                      Invio in corso...
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
          </div>

          {/* Sticky quote sidebar */}
          <div className="lg:col-span-4">
            <StickyQuote booking={booking} currentStep={step} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrenotaOra;
