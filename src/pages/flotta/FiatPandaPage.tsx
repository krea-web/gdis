import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Wind, Fuel, Gauge, Settings, Luggage, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Motore", value: "1.0 Hybrid 70cv" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina / Hybrid" },
  { icon: Users, label: "Posti", value: "5" },
  { icon: Settings, label: "Cambio", value: "Manuale" },
  { icon: Wind, label: "Clima", value: "Aria Condizionata" },
  { icon: Luggage, label: "Bagagliaio", value: "225 litri" },
];

const idealFor = [
  "Viaggi in gruppo fino a 5 persone",
  "Esplorare borghi e centri storici",
  "Shopping a Porto Cervo e Olbia",
  "Raggiungere spiagge con parcheggio",
  "Trasferimenti aeroporto / porto",
];

const faqs = [
  { q: "Posso andare fuoristrada con la Panda?", a: "No. La Fiat Panda Hybrid è progettata per strade asfaltate. Per percorsi off-road consigliamo il nostro Yamaha Raptor Quad." },
  { q: "Ha l'aria condizionata?", a: "Sì, tutte le nostre Panda sono dotate di aria condizionata perfettamente funzionante." },
  { q: "Che patente serve?", a: "È sufficiente la Patente B, valida anche per i neopatentati." },
  { q: "Il carburante è incluso?", a: "Il veicolo viene consegnato con il pieno e va restituito con il pieno. In alternativa è possibile acquistare l'opzione 'pieno anticipato'." },
];

const FiatPandaPage = () => (
  <>
    <SEOHead
      title="Noleggio Fiat Panda Hybrid in Costa Smeralda — GDIS Rent"
      description="Noleggia una Fiat Panda Hybrid in Sardegna. 5 posti, aria condizionata, consegna VIP in Costa Smeralda, Porto Cervo, Olbia. Prenota online."
      canonical="/flotta/fiat-panda"
    />

    {/* HERO */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Fiat Panda in Sardegna" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
      </div>
      <div className="container relative z-10 py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">City Car</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight max-w-2xl">
            Noleggio Fiat Panda Hybrid in Costa Smeralda
          </h1>
          <div className="flex flex-wrap gap-3 mt-8">
            {["5 Posti", "Aria Condizionata", "Hybrid"].map((badge) => (
              <span key={badge} className="px-4 py-2 rounded-full bg-primary/20 text-primary-foreground text-sm font-medium backdrop-blur-sm border border-primary/30">
                {badge}
              </span>
            ))}
          </div>
          <Button variant="hero" size="xl" asChild className="mt-10">
            <Link to="/prenotaora">Prenota Ora</Link>
          </Button>
        </motion.div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG */}
    <section className="py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Comfort & Praticità</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Compatta fuori, spaziosa dentro</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La Fiat Panda Hybrid è il veicolo ideale per muoversi agilmente tra le strade della Sardegna. 
              Consumi ridotti, facile da parcheggiare e sorprendentemente spaziosa per 5 passeggeri.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Perfetta per raggiungere le spiagge della Costa Smeralda, fare shopping a Porto Cervo 
              o esplorare i borghi dell'entroterra gallurense.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={featureImg} alt="Sardegna costa" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* TECH SPECS */}
    <section className="py-24 bg-brand-dark text-primary-foreground">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Specifiche</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold">Scheda Tecnica</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-xl p-6 text-center border border-primary-foreground/10"
            >
              <spec.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
              <p className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-1">{spec.label}</p>
              <p className="font-display font-semibold text-lg">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* IDEAL FOR */}
    <section className="py-24">
      <div className="container max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Perfetto per...</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 gap-4">
          {idealFor.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-muted/50"
            >
              <Check className="h-5 w-5 text-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section className="py-24 bg-muted/30">
      <div className="container max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">Domande Frequenti</h2>
        </motion.div>
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="glass rounded-xl border border-border/50 px-6">
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* GRAND CTA */}
    <section className="py-32 relative overflow-hidden bg-brand-dark">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_70%)]" />
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">
            Pronto a partire?
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Prenota la tua Fiat Panda Hybrid in meno di 2 minuti. Consegna VIP disponibile in tutta la Costa Smeralda.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/prenotaora">Prenota la tua Panda →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default FiatPandaPage;
