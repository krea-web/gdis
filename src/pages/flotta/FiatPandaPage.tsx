import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Wind, Fuel, Gauge, Settings, Luggage, Check, MapPin, ShoppingBag, Palmtree, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg = "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=900&q=80";
const featureImg = "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80";
const featureImg2 = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80";

const specs = [
  { icon: Gauge, label: "Motore", value: "1.0 Hybrid 70cv" },
  { icon: Fuel, label: "Alimentazione", value: "Benzina / Hybrid" },
  { icon: Users, label: "Posti", value: "5" },
  { icon: Settings, label: "Cambio", value: "Manuale" },
  { icon: Wind, label: "Clima", value: "Aria Condizionata" },
  { icon: Luggage, label: "Bagagliaio", value: "225 litri" },
];

const scenarios = [
  {
    icon: MapPin,
    title: "Spiagge Nascoste a San Teodoro",
    description: "Raggiungi Lu Impostu, Cala Brandinchi e La Cinta senza stress. Parcheggia ovunque grazie alle dimensioni compatte.",
    highlight: false,
  },
  {
    icon: ShoppingBag,
    title: "Shopping Serale a Porto Cervo",
    description: "Passeggia tra le boutique della Promenade du Port e torna comodamente con tutti i tuoi acquisti nel bagagliaio.",
    highlight: true,
  },
  {
    icon: Users,
    title: "Avventure in Gruppo fino a 5",
    description: "Spazio per tutta la famiglia o gli amici. Climatizzatore per le giornate calde, consumi ridotti per il portafoglio.",
    highlight: false,
  },
];

const faqs = [
  { q: "Posso andare fuoristrada con la Panda?", a: "No. La Fiat Panda Hybrid è progettata per strade asfaltate. Per percorsi off-road consigliamo il nostro Yamaha Raptor Quad." },
  { q: "Ha l'aria condizionata?", a: "Sì, tutte le nostre Panda sono dotate di aria condizionata perfettamente funzionante — essenziale per l'estate sarda." },
  { q: "Che patente serve?", a: "È sufficiente la Patente B, valida anche per i neopatentati." },
  { q: "Il carburante è incluso?", a: "Il veicolo viene consegnato con il pieno e va restituito con il pieno. In alternativa è possibile acquistare l'opzione 'pieno anticipato'." },
  { q: "La consegna VIP è disponibile?", a: "Sì! Consegniamo direttamente in aeroporto, porto, hotel o villa in tutta la Costa Smeralda." },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
};

const FiatPandaPage = () => (
  <>
    <SEOHead
      title="Noleggio Fiat Panda Hybrid in Costa Smeralda — GDIS Rent"
      description="Noleggia una Fiat Panda Hybrid in Sardegna. 5 posti, aria condizionata, consegna VIP in Costa Smeralda, Porto Cervo, Olbia. Prenota online."
      canonical="/flotta/fiat-panda"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: "Noleggio Fiat Panda Hybrid",
        description: "Noleggio Fiat Panda Hybrid in Costa Smeralda, Sardegna.",
        brand: { "@type": "Brand", name: "GDIS Rent" },
      }}
    />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Fiat Panda Hybrid Costa Smeralda Sardegna" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-[hsl(var(--brand-dark)/0.6)]" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4">City Car</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Fiat Panda
              <span className="block text-primary">Hybrid</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-lg mb-8">
              Agilità senza compromessi in Costa Smeralda. Climatizzatore, 5 posti, consumi ridotti — l'auto perfetta per la tua vacanza sarda.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["5 Posti", "Aria Condizionata", "Hybrid"].map((badge) => (
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
              alt="Fiat Panda Hybrid"
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
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Comfort & Praticità</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Compatta fuori, spaziosa dentro</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La Fiat Panda Hybrid è il veicolo ideale per muoversi agilmente tra le strade della Sardegna.
              Con il suo motore mild-hybrid da 70cv, unisce consumi ridottissimi a una sorprendente vivacità.
              Facile da parcheggiare nei centri storici e spaziosa abbastanza per 5 passeggeri con bagagli.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Il climatizzatore mantiene l'abitacolo fresco anche nelle giornate più calde di agosto,
              mentre il bagagliaio da 225 litri ospita comodamente borse da spiaggia, ombrelloni e acquisti.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={featureImg} alt="Sardegna costa panoramica" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG 2 */}
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 md:order-1">
            <img src={featureImg2} alt="Spiaggia Costa Smeralda" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-1 md:order-2 border-l-4 border-primary pl-8">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Spazio per gli Amici</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Perfetta per raggiungere le spiagge</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dalla Spiaggia del Principe a Cala di Volpe, dalla Costa Smeralda a San Teodoro:
              la Panda ti porta ovunque con agilità e comfort.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Con la consegna VIP direttamente in aeroporto, porto o hotel,
              la tua vacanza inizia dal momento in cui atterri.
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
            Pronto a guidare la tua Panda?
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota in meno di 2 minuti. Consegna VIP in aeroporto, porto o hotel — in tutta la Costa Smeralda.
          </p>
          <Button asChild size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300">
            <Link to="/prenotaora">Prenota la tua Panda →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  </>
);

export default FiatPandaPage;
