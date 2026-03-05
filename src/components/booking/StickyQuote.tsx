import { Car, Calendar, User, Users, Check } from "lucide-react";
import type { BookingState } from "@/pages/PrenotaOra";

type Props = {
  booking: BookingState;
  currentStep: number;
};

const StickyQuote = ({ booking, currentStep }: Props) => {
  const days =
    booking.startDate && booking.endDate
      ? Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;

  const totalPrice = booking.vehicle ? booking.vehicle.pricePerDay * days : 0;

  const stepsInfo = [
    { icon: Car, label: "Veicolo", done: !!booking.vehicle },
    { icon: Calendar, label: "Date", done: !!booking.startDate && !!booking.endDate },
    { icon: User, label: "Conducente", done: !!booking.driver.nome },
    { icon: Users, label: "2° Guidatore", done: booking.secondDriver.enabled && !!booking.secondDriver.nome },
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
                <span className="text-foreground font-medium">€{booking.vehicle.pricePerDay}/g</span>
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
        <div className="flex items-center justify-between">
          <div>
            {booking.vehicle && (
              <p className="text-sm font-medium text-foreground">{booking.vehicle.name}</p>
            )}
            {totalPrice > 0 ? (
              <p className="font-display text-xl font-bold text-primary">€{totalPrice}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Seleziona un veicolo</p>
            )}
          </div>
          <div className="flex gap-1">
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
