import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Shield, Mountain, Wrench, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Cilindrata", value: "686cc monocilindro" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina" },
  { icon: Users, label: "Posti", value: "1 (singolo)" },
  { icon: Wrench, label: "Cambio", value: "Manuale 5 marce" },
  { icon: Shield, label: "Patente", value: "Patente B" },
  { icon: Mountain, label: "Terreno", value: "On/Off-Road" },
];

const idealFor = [
  "Avventure off-road e sterrati",
  "Raggiungere spiagge nascoste",
  "Esperienze adrenaliniche in Gallura",
  "Fotografia e esplorazione",
  "Chi cerca emozioni uniche",
];

const faqs = [
  { q: "Che patente serve per il Quad?", a: "Serve la Patente B, la stessa dell'automobile. Il Raptor 700 è omologato per strada." },
  { q: "I caschi sono inclusi?", a: "Sì, forniamo casco integrale omologato incluso nel prezzo del noleggio." },
  { q: "Posso circolare su strada normale?", a: "Sì, il Yamaha Raptor 700 è completamente omologato per la circolazione su strade pubbliche oltre che su sterrato." },
  { q: "È adatto ai principianti?", a: "Il Raptor 700 è un quad potente. Consigliamo esperienza pregressa alla guida di veicoli a motore. Forniamo un briefing completo prima della partenza." },
];

const YamahaQuadPage = () => (
  <>
    <SEOHead
      title="Noleggio Yamaha Raptor 700 Quad in Sardegna — GDIS Rent"
      description="Noleggia un Quad Yamaha Raptor 700 in Sardegna. 686cc, omologato strada, avventure off-road in Costa Smeralda. Prenota online."
      canonical="/flotta/yamaha-raptor"
    />

    {/* HERO */}
    <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-brand-dark">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Yamaha Raptor 700 Quad Sardegna" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-transparent" />
      </div>
      <div className="container relative z-10 py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">Quad</p>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight max-w-2xl">
            Noleggio Yamaha Raptor 700 in Sardegna
          </h1>
          <div className="flex flex-wrap gap-3 mt-8">
            {["686cc", "Patente B", "Off-Road Ready"].map((badge) => (
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
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Potenza & Avventura</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Domina ogni terreno</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il Yamaha Raptor 700 è la macchina definitiva per esplorare la Sardegna selvaggia. 
              Con il suo monocilindro da 686cc, affronta sterrati, sentieri costieri e piste off-road con facilità.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Raggiungi calette segrete inaccessibili in auto, attraversa la macchia mediterranea 
              e vivi un'esperienza di guida che non dimenticherai.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={featureImg} alt="Spiaggia nascosta Sardegna" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
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
          <h2 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground mb-6">Scatena l'avventura</h2>
          <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-10">
            Prenota il tuo Yamaha Raptor 700 in meno di 2 minuti. Casco e briefing inclusi.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/prenotaora">Prenota il tuo Quad →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default YamahaQuadPage;
