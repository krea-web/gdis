import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Settings, Shield, Wind, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Cilindrata", value: "125cc / 350cc" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina" },
  { icon: Users, label: "Posti", value: "2 (con passeggero)" },
  { icon: Settings, label: "Cambio", value: "Automatico CVT" },
  { icon: Shield, label: "Patente", value: "A1 (125) / A2 (350)" },
  { icon: Wind, label: "Dotazione", value: "2 caschi inclusi" },
];

const idealFor = [
  "Esplorare la costa senza traffico",
  "Raggiungere calette nascoste",
  "Muoversi agili a Porto Cervo",
  "Gite panoramiche sulla litoranea",
  "Coppie e viaggiatori singoli",
];

const faqs = [
  { q: "Posso andare in autostrada con l'Honda SH?", a: "Con l'SH 350 sì, è omologato per autostrada e superstrada. L'SH 125 è limitato a strade urbane e extraurbane." },
  { q: "I caschi sono inclusi?", a: "Sì, forniamo 2 caschi omologati (jet) per conducente e passeggero, igienizzati prima di ogni noleggio." },
  { q: "Che patente serve?", a: "Per l'SH 125 serve la Patente A1 (o Patente B con limitazione 125cc). Per l'SH 350 serve la Patente A2 o A." },
  { q: "Posso portare un passeggero?", a: "Sì, entrambi i modelli sono omologati per il trasporto passeggero." },
];

const HondaScooterPage = () => (
  <>
    <SEOHead
      title="Noleggio Honda SH 125 e 350 in Costa Smeralda — GDIS Rent"
      description="Noleggia uno scooter Honda SH in Sardegna. Cambio automatico, 2 caschi inclusi, consegna VIP in Costa Smeralda. Prenota online."
      canonical="/flotta/honda-sh"
    />

    {/* HERO */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Scooter Honda SH costa Sardegna" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
      </div>
      <div className="container relative z-10 py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Scooter</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight max-w-2xl">
            Noleggio Honda SH in Costa Smeralda
          </h1>
          <div className="flex flex-wrap gap-3 mt-8">
            {["Automatico", "2 Caschi Inclusi", "125cc / 350cc"].map((badge) => (
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

    {/* FEATURES */}
    <section className="py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
            <img src={featureImg} alt="Costa sarda" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Libertà su due ruote</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Agilità senza compromessi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'Honda SH è il re degli scooter: silenzioso, affidabile e con un vano sottosella capiente. 
              Perfetto per scivolare nel traffico estivo e raggiungere le spiagge più belle della Gallura.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Disponibile in due versioni: SH 125 per le strade costiere e SH 350 per chi vuole 
              anche percorrere le superstrade sarde.
            </p>
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
            <motion.div key={spec.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-xl p-6 text-center border border-primary-foreground/10">
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
            <motion.div key={item} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
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
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">Sali in sella</h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Prenota il tuo Honda SH in meno di 2 minuti. Caschi e consegna VIP inclusi.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/prenotaora">Prenota il tuo Scooter →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default HondaScooterPage;
