import { motion } from "framer-motion";
import { Car, PenTool, MapPin } from "lucide-react";

const steps = [
  {
    icon: Car,
    title: "Scegli il Veicolo",
    desc: "Esplora la nostra flotta e seleziona il veicolo perfetto per la tua avventura in Sardegna.",
  },
  {
    icon: PenTool,
    title: "Firma Digitale Rapida",
    desc: "Completa la prenotazione con una firma digitale sicura, direttamente dal tuo smartphone.",
  },
  {
    icon: MapPin,
    title: "Ritira o Consegna VIP",
    desc: "Ritira il veicolo in sede o ricevilo comodamente in hotel, porto o aeroporto.",
  },
];

const ComeFunziona = () => (
  <section className="py-24 bg-muted/30 relative overflow-hidden">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Semplice & Veloce</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">Come Funziona</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="relative text-center group"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
              <step.icon className="h-9 w-9 text-primary" />
            </div>
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-7xl font-display font-bold text-primary/5 select-none">
              {i + 1}
            </span>
            <h3 className="text-xl font-display font-semibold text-foreground mb-3">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ComeFunziona;
