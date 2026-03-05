import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VehicleSelection from "@/components/booking/VehicleSelection";
import DateSelection from "@/components/booking/DateSelection";
import DriverForm from "@/components/booking/DriverForm";
import SecondDriverStep from "@/components/booking/SecondDriverStep";
import StickyQuote from "@/components/booking/StickyQuote";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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

const PrenotaOra = () => {
  const [step, setStep] = useState(0);
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

  const canNext = () => {
    switch (step) {
      case 0: return !!booking.vehicle;
      case 1: return !!booking.startDate && !!booking.endDate;
      case 2: {
        const d = booking.driver;
        return d.nome && d.cognome && d.dataNascita && d.luogoNascita &&
          d.viaResidenza && d.cittaResidenza && d.email && d.telefono && d.codiceFiscale;
      }
      case 3: return true;
      default: return false;
    }
  };

  const handleSubmit = () => {
    // Future: submit to Supabase
    alert("Prenotazione inviata! Ti contatteremo presto.");
  };

  return (
    <div className="min-h-screen bg-brand-surface pt-20">
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
                    onSelect={(v) => updateBooking({ vehicle: v })}
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
                  className="gap-2"
                >
                  Conferma Prenotazione
                  <Check size={16} />
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
