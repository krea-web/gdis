import { motion } from "framer-motion";
import { MapPin, ArrowRight, Shield, Clock, Star } from "lucide-react";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import TrustMarquee from "@/components/home/TrustMarquee";
import FleetShowcase from "@/components/home/FleetShowcase";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";

/* ── Section 1: Hero ───────────────────────── */
const HeroSection = () => (
  <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-background">
    {/* Ambient glow */}
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />

    <div className="relative z-10 container px-4 text-center py-32">
      <motion.img
        src={gdisLogo}
        alt="GDIS Rent e Service"
        className="w-32 md:w-40 h-auto mx-auto mb-8 drop-shadow-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="font-display text-4xl sm:text-5xl md:text-7xl font-bold text-foreground leading-[1.1] mb-6"
      >
        Noleggio Auto e Scooter
        <br />
        <span className="text-primary italic font-light">in Costa Smeralda</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed"
      >
        Vivi la libertà della Sardegna con la nostra flotta premium. Citycar, scooter, quad e veicoli luxury
        consegnati direttamente al tuo hotel, villa o yacht.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="hero" size="xl" asChild className="gap-3">
            <Link to="/prenotaora">
              Prenota Ora
              <ArrowRight size={20} />
            </Link>
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button variant="whatsapp" size="xl" asChild className="gap-3">
            <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={20} />
              Contattaci su WhatsApp
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

/* ── Section 3: VIP Delivery ───────────────── */
const DeliverySection = () => {
  const locations = [
    { name: "Porto Cervo", desc: "Hotel, marina e boutique del lusso", to: "/localita/noleggio-porto-cervo" },
    { name: "Palau", desc: "Porto e collegamenti per La Maddalena" },
    { name: "San Teodoro", desc: "Spiagge cristalline e vita notturna", to: "/localita/noleggio-san-teodoro" },
    { name: "Olbia", desc: "Aeroporto, porto e centro città", to: "/localita/noleggio-olbia" },
  ];

  return (
    <section className="py-20 md:py-28 bg-transparent relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Servizio Esclusivo
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
            Consegna VIP <span className="text-primary italic font-light">ovunque tu sia</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-light">
            Portiamo il tuo veicolo direttamente alla tua villa, hotel o yacht in tutta la Costa Smeralda.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => {
            const card = (
              <motion.div
                key={loc.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm p-8 text-center hover:-translate-y-2 hover:shadow-[0_15px_40px_hsl(var(--primary)/0.15)] hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">{loc.name}</h3>
                <p className="text-muted-foreground text-sm font-light">{loc.desc}</p>
              </motion.div>
            );
            return loc.to ? (
              <Link key={loc.name} to={loc.to} className="block">
                {card}
              </Link>
            ) : (
              card
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="lg" asChild className="gap-2">
            <Link to="/prenotaora">
              Prenota con Consegna VIP
              <ArrowRight size={18} />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Section 5: Costa Smeralda FAQ ─────────── */
const CostaFaq = () => {
  const faqs = [
    {
      q: "Posso ricevere il veicolo direttamente in hotel o villa?",
      a: "Assolutamente sì! Con il nostro Servizio Consegna VIP, portiamo il veicolo direttamente dove ti trovi: hotel, villa, yacht o aeroporto. Il servizio copre tutta la Costa Smeralda da Palau a San Teodoro.",
    },
    {
      q: "Come funziona il parcheggio a Porto Cervo e nelle zone ZTL?",
      a: "Porto Cervo ha zone ZTL attive in estate. Ti forniamo una mappa aggiornata delle zone a traffico limitato e dei parcheggi disponibili. Gli scooter e le citycar sono la scelta ideale per muoversi agilmente.",
    },
    {
      q: "Quali veicoli consigliate per la Costa Smeralda?",
      a: "Per la costa consigliamo scooter per gli spostamenti brevi e le spiagge nascoste, citycar per comfort e parcheggio facile, e quad per le avventure off-road nell'entroterra gallurese.",
    },
    {
      q: "Posso noleggiare un veicolo all'aeroporto di Olbia?",
      a: (<>Sì, offriamo consegna e ritiro presso l'<Link to="/localita/noleggio-olbia" className="text-primary font-medium hover:underline transition-all">aeroporto di Olbia</Link> Costa Smeralda. Prenota online e troverai il tuo veicolo ad aspettarti all'arrivo.</>),
    },
    {
      q: "Quali documenti servono per noleggiare?",
      a: "Patente di guida valida, carta d'identità o passaporto, e carta di credito intestata al conducente. Per i cittadini extra-UE serve anche il permesso internazionale di guida.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/30 relative">
      <div className="container px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="w-full lg:w-1/3">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-32"
            >
              <span className="text-primary font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
                FAQ Costa Smeralda
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Tutto ciò che <br />
                <span className="italic font-light text-primary">devi sapere.</span>
              </h2>
              <p className="text-muted-foreground text-lg font-light mb-10">
                Le risposte alle domande più frequenti sul noleggio in Costa Smeralda.
              </p>
              <Button variant="whatsapp" size="lg" className="w-full gap-2" asChild>
                <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={20} />
                  Chatta con noi
                </a>
              </Button>
            </motion.div>
          </div>

          <div className="w-full lg:w-2/3">
            <Accordion type="single" collapsible className="space-y-4 w-full">
              {faqs.map((faq, i) => (
                <motion.div
                  key={`costa-faq-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <AccordionItem
                    value={`costa-faq-${i}`}
                    className="bg-card border border-border rounded-2xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-left font-display text-lg font-medium text-foreground hover:no-underline py-6">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground font-light leading-relaxed pb-6">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Final CTA ─────────────────────────────── */
const FinalCta = () => (
  <section className="py-20 md:py-28 bg-transparent relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
    <div className="container px-4 relative z-10 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex justify-center gap-4 mb-8">
          {[Shield, Clock, Star].map((Icon, i) => (
            <div key={i} className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-primary" />
            </div>
          ))}
        </div>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-6">
          Pronto a esplorare la <span className="text-primary italic">Costa Smeralda?</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 font-light">
          Prenota in 2 minuti. Firma digitale. Consegna VIP inclusa.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="hero" size="xl" asChild className="gap-3">
              <Link to="/prenotaora">
                Prenota Ora
                <ArrowRight size={20} />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="whatsapp" size="xl" asChild className="gap-3">
              <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={20} />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ── Page Component ────────────────────────── */
const NoleggioCostaSmeralda = () => {
  return (
    <>
      <SEOHead
        title="Noleggio Auto e Scooter in Costa Smeralda | GDIS Rent"
        description="Noleggio auto, scooter e quad in Costa Smeralda. Consegna VIP a Porto Cervo, Palau, San Teodoro e Olbia. Prenota online, firma digitale e ritiro immediato."
        canonical="/noleggio-in-costa-smeralda"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AutoRental",
          name: "GDIS Rent — Noleggio Costa Smeralda",
          description: "Noleggio auto, scooter, quad in Costa Smeralda con consegna VIP",
          areaServed: [
            { "@type": "Place", name: "Porto Cervo" },
            { "@type": "Place", name: "Palau" },
            { "@type": "Place", name: "San Teodoro" },
            { "@type": "Place", name: "Olbia" },
          ],
          url: "https://gdisrentservice.com/noleggio-in-costa-smeralda",
        }}
      />
      <HeroSection />
      <TrustMarquee />
      <DeliverySection />
      <FleetShowcase />
      <CostaFaq />
      <FinalCta />
    </>
  );
};

export default NoleggioCostaSmeralda;
