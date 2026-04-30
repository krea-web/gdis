import { motion } from "framer-motion";
import { MessageCircle, Plane, Key, Car } from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    title: "1. Scrivi su WhatsApp",
    text: "Indica data, orario di arrivo e veicolo desiderato. Confermiamo entro 30 minuti.",
  },
  {
    icon: Plane,
    title: "2. Atterri o sbarchi",
    text: "Monitoriamo il tuo volo o traghetto. Se sei in ritardo, adattiamo la consegna senza costi extra.",
  },
  {
    icon: Key,
    title: "3. Ritiri il veicolo",
    text: "Ti aspettiamo all'uscita arrivi o al porto con il veicolo già climatizzato e con il pieno fatto.",
  },
  {
    icon: Car,
    title: "4. Parti subito",
    text: "Firma rapida con tablet, chiavi in mano, e in 5 minuti sei in viaggio. Niente code, niente desk.",
  },
];

const ConsegnaVipExplainer = () => (
  <section className="py-20 md:py-28 bg-muted/20">
    <div className="container px-4 max-w-6xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Come funziona</p>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
          La Consegna VIP in 4 passi
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Niente file ai desk, niente transfer, niente attese. Ti consegniamo il veicolo dove e quando ti serve —
          aeroporto, porto, hotel o villa.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <s.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ConsegnaVipExplainer;
