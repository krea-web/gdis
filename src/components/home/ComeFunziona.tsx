import { motion } from "framer-motion";
import { Car, PenTool, MapPin, Anchor, Hotel, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Car,
    num: "01",
    title: "Scegli il Veicolo",
    desc: "Esplora la nostra flotta e seleziona il veicolo perfetto per la tua avventura in Sardegna.",
  },
  {
    icon: PenTool,
    num: "02",
    title: "Firma Digitale Rapida",
    desc: "Completa la prenotazione con una firma digitale sicura, direttamente dal tuo smartphone.",
  },
  {
    icon: MapPin,
    num: "03",
    title: "Ritira o Consegna VIP",
    desc: "Ritira il veicolo in sede o ricevilo comodamente in hotel, porto o aeroporto.",
  },
];

const vipLocations = [
  { icon: Plane, label: "Aeroporto Olbia" },
  { icon: Anchor, label: "Porto Cervo" },
  { icon: Hotel, label: "Hotel & Villa" },
  { icon: MapPin, label: "San Teodoro" },
];

const ComeFunziona = () => (
  <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20"
      >
        <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Semplice & Veloce</p>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground">Come Funziona</h2>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-12 max-w-7xl mx-auto items-start">
        {/* LEFT: 3 Steps */}
        <div className="lg:col-span-3 space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex gap-6 group"
            >
              <div className="flex-shrink-0 relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="absolute -top-2 -left-2 text-xs font-display font-bold text-primary bg-primary/10 rounded-full w-7 h-7 flex items-center justify-center">
                  {step.num}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: VIP Delivery Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <div className="relative rounded-3xl overflow-hidden bg-primary p-8 md:p-10 text-primary-foreground shadow-[0_20px_60px_hsl(var(--primary)/0.4)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-primary-foreground/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <span className="text-primary-foreground/60 font-display text-xs font-bold uppercase tracking-[0.3em] mb-3 block">
                Esclusiva GDIS
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Consegna <span className="italic font-light">VIP</span>
              </h3>
              <p className="text-primary-foreground/70 font-light leading-relaxed mb-8">
                Portiamo il tuo veicolo ovunque: villa, yacht, hotel o aeroporto. In tutta la Costa Smeralda.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-8">
                {vipLocations.map((loc) => (
                  <div key={loc.label} className="flex items-center gap-2 bg-primary-foreground/10 rounded-xl px-3 py-3 backdrop-blur-sm">
                    <loc.icon className="h-4 w-4 text-primary-foreground/80 flex-shrink-0" />
                    <span className="text-sm font-medium text-primary-foreground/90">{loc.label}</span>
                  </div>
                ))}
              </div>

              <Button variant="secondary" size="lg" asChild className="w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold gap-2">
                <Link to="/prenotaora">
                  Prenota con Consegna
                  <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ComeFunziona;
