import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Settings, Shield, Wind, ParkingCircle, Zap, Bike } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80";
const featureImg2 = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Cilindrata", value: "125cc / 350cc" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina" },
  { icon: Users, label: "Posti", value: "2 (con passeggero)" },
  { icon: Settings, label: "Cambio", value: "Automatico CVT" },
  { icon: Shield, label: "Patente", value: "A1 (125) / A2 (350)" },
  { icon: Wind, label: "Dotazione", value: "2 caschi inclusi" },
];

const scenarios = [
  {
    icon: ParkingCircle,
    title: "Zero Stress da Parcheggio",
    description: "Mentre tutti cercano posto auto a Porto Cervo, tu parcheggi ovunque in 3 secondi. Niente code, niente stress estivo.",
    highlight: false,
  },
  {
    icon: Bike,
    title: "Litoranea da Sogno",
    description: "Percorri la strada costiera tra Olbia e San Teodoro sentendo il vento e il profumo del mare. Stile italiano, libertà totale.",
    highlight: true,
  },
  {
    icon: Zap,
    title: "Consumi Ridicoli",
    description: "Con meno di 10€ di benzina percorri l'intera Costa Smeralda. Il budget risparmiato? Cena vista mare a Porto Rotondo.",
    highlight: false,
  },
];

const faqs = [
  { q: "Posso andare in autostrada con l'Honda SH?", a: "Con l'SH 350 sì, è omologato per autostrada e superstrada. L'SH 125 è limitato a strade urbane e extraurbane." },
  { q: "I caschi sono inclusi?", a: "Sì, forniamo 2 caschi omologati (jet) per conducente e passeggero, igienizzati prima di ogni noleggio." },
  { q: "Che patente serve?", a: "Per l'SH 125 serve la Patente A1 (o Patente B con limitazione 125cc). Per l'SH 350 serve la Patente A2 o A." },
  { q: "Posso portare un passeggero?", a: "Sì, entrambi i modelli sono omologati per il trasporto passeggero. Forniamo 2 caschi inclusi." },
  { q: "La consegna VIP è disponibile?", a: "Assolutamente sì! Consegniamo lo scooter direttamente in aeroporto, porto, hotel o villa." },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const HondaScooterPage = () => (
  <>
    <SEOHead
      title="Noleggio Honda SH 125 e 350 in Costa Smeralda — GDIS Rent"
      description="Noleggia uno scooter Honda SH in Sardegna. Cambio automatico, 2 caschi inclusi, consegna VIP in Costa Smeralda. Prenota online."
      canonical="/flotta/honda-sh"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Noleggio Honda SH Scooter",
        description: "Noleggio scooter Honda SH 125 e 350 in Costa Smeralda, Sardegna.",
        brand: { "@type": "Brand", name: "GDIS Rent" },
      }}
    />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Honda SH Scooter Costa Smeralda Sardegna" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-[hsl(var(--brand-dark)/0.6)]" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4">Scooter</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Honda SH
              <span className="block text-primary">125 / 350</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-lg mb-8">
              Zero stress da parcheggio, consumi ridicoli, stile italiano. Lo scooter perfetto per vivere la Costa Smeralda in libertà.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Automatico", "2 Caschi Inclusi", "125cc / 350cc"].map((badge) => (
                <span key={badge} className="px-4 py-2 rounded-full bg-primary/15 text-primary border border-primary/30 text-sm font-medium backdrop-blur-sm">
                  {badge}
                </span>
              ))}
            </div>
            <Button variant="hero" size="xl" asChild>
              <Link to="/prenotaora">Prenota Ora</Link>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:block"
          >
            <motion.img
              animate={floatAnimation}
              src={heroImg}
              alt="Honda SH Scooter"
              className="w-full max-w-lg mx-auto drop-shadow-[0_20px_60px_hsl(var(--primary)/0.3)] rounded-2xl"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG 1 */}
    <section className="py-24 bg-background">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
            <img src={featureImg} alt="Costa sarda scooter" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2 border-l-4 border-primary pl-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Libertà su Due Ruote</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Agilità senza compromessi</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'Honda SH è il re degli scooter: silenzioso, affidabile e con un vano sottosella capiente.
              Perfetto per scivolare nel traffico estivo e raggiungere le spiagge più belle della Gallura
              senza la tortura del parcheggio.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Con il cambio automatico CVT, guidi senza pensieri. Basta girare la manopola e goderti
              il panorama — il motore fa tutto il resto.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG 2 */}
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border-l-4 border-primary pl-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Due Versioni, Una Scelta</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">SH 125 o SH 350?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">SH 125:</strong> Perfetto per le strade costiere, i centri storici e gli spostamenti urbani.
              Leggero, scattante, ideale per chi ha la Patente B con limitazione 125cc.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">SH 350:</strong> Per chi vuole anche percorrere le superstrade sarde e coprire
              distanze maggiori con comfort superiore. Perfetto per la litoranea Olbia-San Teodoro.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={featureImg2} alt="Spiaggia Sardegna scooter" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* COCKPIT SPECS */}
    <section className="py-24 bg-[hsl(var(--brand-dark))] text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Specifiche</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold">Scheda Tecnica</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-xl p-6 text-center bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-md hover:border-primary/50 hover:shadow-[0_0_30px_hsl(var(--primary)/0.15)] transition-all duration-300"
            >
              <spec.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs uppercase tracking-wider text-primary-foreground/50 mb-1">{spec.label}</p>
              <p className="font-display font-semibold text-lg text-primary-foreground">{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* SCENARIO CARDS */}
    <section className="py-24 bg-background">
      <div className="container max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Dove ti porta</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Perfetto per...</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {scenarios.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className={`rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                s.highlight
                  ? "bg-primary text-primary-foreground shadow-[0_10px_40px_hsl(var(--primary)/0.4)]"
                  : "bg-muted/50 border border-border/50 text-foreground"
              }`}
            >
              <s.icon className={`h-10 w-10 mb-4 ${s.highlight ? "text-primary-foreground" : "text-primary"}`} />
              <h3 className="font-display font-bold text-xl mb-3">{s.title}</h3>
              <p className={`leading-relaxed ${s.highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {s.description}
              </p>
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
            <AccordionItem key={i} value={`faq-${i}`} className="rounded-xl border border-border/50 bg-background px-6 shadow-sm">
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>

    {/* GRAND CTA */}
    <section className="py-32 relative overflow-hidden bg-primary">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,hsl(0_0%_100%/0.03)_20px,hsl(0_0%_100%/0.03)_40px)]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(0_0%_100%/0.1),transparent_60%)]"
        />
      </div>
      <div className="container relative z-10 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6">
            Sali in sella
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota il tuo Honda SH in meno di 2 minuti. 2 caschi e consegna VIP inclusi.
          </p>
          <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
            <Link to="/prenotaora">Prenota il tuo Scooter →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default HondaScooterPage;
