import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Car, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { BookingState } from "@/pages/PrenotaOra";

type Props = { booking: BookingState };

const BookingSuccess = ({ booking }: Props) => {
  const navigate = useNavigate();

  const days =
    booking.startDate && booking.endDate
      ? Math.ceil((booking.endDate.getTime() - booking.startDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  const total = booking.vehicle ? booking.vehicle.pricePerDay * days : 0;

  return (
    <div className="min-h-screen bg-transparent pt-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="container max-w-lg text-center space-y-8 py-20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <CheckCircle2 size={40} className="text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Prenotazione completata!
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-lg">
            <Mail size={18} />
            <p>Controlla la tua email per il contratto firmato.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card rounded-2xl border border-border p-6 space-y-4 text-left"
        >
          {booking.vehicle && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Veicolo</p>
                <p className="font-semibold text-foreground">{booking.vehicle.name}</p>
              </div>
            </div>
          )}
          {booking.startDate && booking.endDate && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Periodo</p>
                <p className="font-semibold text-foreground">
                  {booking.startDate.toLocaleDateString("it-IT")} – {booking.endDate.toLocaleDateString("it-IT")}
                  <span className="text-muted-foreground font-normal ml-1">({days}g)</span>
                </p>
              </div>
            </div>
          )}
          <div className="border-t border-border pt-4 flex justify-between items-end">
            <span className="text-muted-foreground">Totale</span>
            <span className="font-display text-3xl font-bold text-primary">€{total}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="hero" size="lg" onClick={() => navigate("/")}>
            Torna alla Home
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default BookingSuccess;
