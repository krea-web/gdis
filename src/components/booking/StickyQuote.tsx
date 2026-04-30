import { Car, Calendar, User, Users, MapPin, PenTool, Check } from "lucide-react";
import type { BookingState } from "@/pages/PrenotaOra";
import { getMonthlyRate } from "@/hooks/useVehicles";

type Props = {
  booking: BookingState;
  currentStep: number;
};

const StickyQuote = ({ booking, currentStep }: Props) => {
  const days =
    booking.startDate && booking.endDate
      ? Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const ratePerDay =
    booking.vehicle?.vehicleData && booking.startDate
      ? getMonthlyRate(booking.vehicle.vehicleData, booking.startDate.getMonth())
      : booking.vehicle?.pricePerDay ?? 0;

  const totalPrice = ratePerDay * days;

  const stepsInfo = [
    { icon: Car, label: "Veicolo", done: !!booking.vehicle },
    { icon: Calendar, label: "Date", done: !!booking.startDate && !!booking.endDate },
    { icon: User, label: "Conducente", done: !!booking.driver.email },
    { icon: Users, label: "2° Guidatore", done: booking.secondDriver.enabled && !!booking.secondDriver.email },
    { icon: MapPin, label: "Ritiro/Consegna", done: !!booking.pickupDropoff.pickupTime && !!booking.pickupDropoff.dropoffTime },
    { icon: PenTool, label: "Firma", done: currentStep > 5 },
  ];

  return (
    <div className="lg:sticky lg:top-28">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <h3 className="font-display text-lg font-bold text-foreground">Il tuo preventivo</h3>

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
                <span className="text-foreground font-medium">€{ratePerDay}/g</span>
              </div>
            )}
            {days > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Durata</span>
                <span className="text-foreground font-medium">{days} giorni</span>
              </div>
            )}
          </div>

          {totalPrice > 0 && (
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-end">
                <span className="text-muted-foreground text-sm">Totale stimato</span>
                <span className="font-display text-3xl font-bold text-primary">€{totalPrice}</span>
              </div>
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
                    <p className="font-display text-xl font-bold text-primary leading-tight">€{totalPrice}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">
                      €{ratePerDay}/g × {days} {days === 1 ? "giorno" : "giorni"} · assicurazione inclusa
                    </p>
                  </>
                ) : (
                  <p className="text-xs text-muted-foreground">Scegli le date per vedere il preventivo</p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Seleziona un veicolo</p>
            )}
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default StickyQuote;
