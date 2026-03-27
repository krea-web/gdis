import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Shield, Mountain, Wrench, Compass, Flame, Camera } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80";
const featureImg2 = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Cilindrata", value: "686cc monocilindro" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina" },
  { icon: Users, label: "Posti", value: "1 (singolo)" },
  { icon: Wrench, label: "Cambio", value: "Manuale 5 marce" },
  { icon: Shield, label: "Patente", value: "Patente B" },
  { icon: Mountain, label: "Terreno", value: "On/Off-Road" },
];

const scenarios = [
  {
    icon: Mountain,
    title: "Sterrati della Gallura",
    description: "Affronta sentieri e percorsi off-road che le auto non possono raggiungere. Sospensioni da competizione per ogni terreno.",
    highlight: false,
  },
  {
    icon: Flame,
    title: "Adrenalina Pura",
    description: "686cc di potenza bruta sotto di te. Il Raptor 700 è la macchina definitiva per chi cerca emozioni senza filtri nella natura sarda.",
    highlight: true,
  },
  {
    icon: Camera,
    title: "Calette Segrete Inaccessibili",
    description: "Raggiungi spiagge dove nessun'auto può arrivare. Parcheggia ovunque, esplora senza limiti, fotografa paradisi nascosti.",
    highlight: false,
  },
];

const faqs = [
  { q: "Che patente serve per il Quad?", a: "Serve la Patente B, la stessa dell'automobile. Il Raptor 700 è omologato per strada." },
  { q: "I caschi sono inclusi?", a: "Sì, forniamo casco integrale omologato incluso nel prezzo del noleggio." },
  { q: "Posso circolare su strada normale?", a: "Sì, il Yamaha Raptor 700 è completamente omologato per la circolazione su strade pubbliche oltre che su sterrato." },
  { q: "È adatto ai principianti?", a: "Il Raptor 700 è un quad potente. Consigliamo esperienza pregressa alla guida di veicoli a motore. Forniamo un briefing completo prima della partenza." },
  { q: "Quanto dura la batteria/autonomia?", a: "Il serbatoio da 11 litri garantisce un'autonomia di circa 150km a seconda dello stile di guida e del terreno." },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const YamahaQuadPage = () => (
  <>
    <SEOHead
      title="Noleggio Yamaha Raptor 700 Quad in Sardegna — GDIS Rent"
      description="Noleggia un Quad Yamaha Raptor 700 in Sardegna. 686cc, omologato strada, avventure off-road in Costa Smeralda. Prenota online."
      canonical="/flotta/yamaha-raptor"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Noleggio Yamaha Raptor 700 Quad",
        description: "Noleggio Quad Yamaha Raptor 700 per avventure off-road in Sardegna.",
        brand: { "@type": "Brand", name: "GDIS Rent" },
      }}
    />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Yamaha Raptor 700 Quad Sardegna off-road" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-[hsl(var(--brand-dark)/0.6)]" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4">Quad</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Yamaha Raptor
              <span className="block text-primary">700</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-lg mb-8">
              Adrenalina pura sugli sterrati della Gallura. 686cc di potenza, sospensioni off-road, esplorazione senza limiti.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["686cc", "Patente B", "Off-Road Ready"].map((badge) => (
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
              alt="Yamaha Raptor 700"
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
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border-l-4 border-primary pl-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Potenza & Avventura</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Domina ogni terreno</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il Yamaha Raptor 700 è la macchina definitiva per esplorare la Sardegna selvaggia.
              Con il suo monocilindro da 686cc e le sospensioni da competizione, affronta sterrati,
              sentieri costieri e piste off-road con una facilità disarmante.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Raggiungi calette segrete inaccessibili in auto, attraversa la macchia mediterranea
              e vivi un'esperienza di guida che non dimenticherai. Casco integrale e briefing inclusi.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={featureImg} alt="Spiaggia nascosta Sardegna" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG 2 */}
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
            <img src={featureImg2} alt="Costa sarda off-road" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2 border-l-4 border-primary pl-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Esplorazione Senza Limiti</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Dove le auto non arrivano</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La Gallura nasconde sentieri costieri, percorsi tra le rocce di granito e spiagge
              raggiungibili solo su due (o quattro) ruote.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Il Raptor 700, omologato anche per strada, ti permette di alternare asfalto e sterrato
              in totale libertà. Un'esperienza unica per chi cerca l'avventura vera.
            </p>
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
            Scatena l'avventura
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota il tuo Yamaha Raptor 700 in meno di 2 minuti. Casco integrale e briefing inclusi.
          </p>
          <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
            <Link to="/prenotaora">Prenota il tuo Quad →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default YamahaQuadPage;
