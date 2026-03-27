import SEOHead from "@/components/SEOHead";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight, Smartphone, Clock, Truck, Car, Bike, Shield, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FaqSection from "@/components/chisiamo/FaqSection";

/* ── Hero Split Images ── */
const heroLeftUrl = "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80";
const heroRightUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
const touristUrl = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80";
const transportUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80";

/* ── Animated Stat Block ── */
const StatBlock = ({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-4">
        <Icon className="w-8 h-8 text-primary-foreground" />
      </div>
      <p className="font-display text-3xl md:text-4xl font-black text-primary-foreground">{title}</p>
      <p className="text-primary-foreground/60 text-sm md:text-base font-light mt-2">{subtitle}</p>
    </motion.div>
  );
};

const ChiSiamo = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const touristRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: tourScroll } = useScroll({ target: touristRef, offset: ["start end", "end start"] });
  const tourImgY = useTransform(tourScroll, [0, 1], [80, -80]);

  const transportRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: transScroll } = useScroll({ target: transportRef, offset: ["start end", "end start"] });
  const transImgY = useTransform(transScroll, [0, 1], [60, -60]);

  return (
    <>
      <SEOHead
        title="Chi Siamo — GDIS Service Srl | Noleggio Veicoli in Costa Smeralda"
        description="GDIS Service Srl: la nuova era della mobilità in Sardegna. Noleggio 100% digitale di city car, scooter, quad e auto VIP in Costa Smeralda dal 2025."
        canonical="/chisiamo"
      />

      {/* ═══════════════ HERO ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative overflow-hidden">
              <img src={heroLeftUrl} alt="GDIS Veicoli Premium" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-[hsl(var(--brand-dark))/0.7]" />
            </div>
            <div className="relative overflow-hidden">
              <img src={heroRightUrl} alt="Costa Smeralda" className="w-full h-full object-cover scale-110" />
              <div className="absolute inset-0 bg-[hsl(var(--brand-dark))/0.5]" />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--brand-dark))/0.9] to-transparent" />
        </motion.div>

        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/30 z-10 hidden md:block" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-20 text-center px-4 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-primary font-display text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-6"
          >
            DAL 2025 IN SARDEGNA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground leading-[0.95] tracking-tight drop-shadow-2xl"
          >
            La Nuova Era della{" "}
            <span className="italic font-light text-primary">Mobilità</span>
            <br />
            in Costa Smeralda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-primary-foreground/50 text-lg md:text-2xl font-light mt-8 max-w-3xl mx-auto"
          >
            Nati nel 2025 per offrirti veicoli di ultima generazione, un processo 100% digitale
            e consegne VIP direttamente al tuo yacht o hotel.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: "circOut" }}
            className="w-32 md:w-48 h-[3px] bg-primary mx-auto mt-10 shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section className="relative py-24 md:py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_30px,hsl(0_0%_100%)_30px,hsl(0_0%_100%)_31px)]" />
        </div>
        <div className="container px-4 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 max-w-5xl mx-auto">
            <StatBlock icon={Car} title="Flotta 2025" subtitle="Veicoli nuovi e sicuri" />
            <StatBlock icon={Smartphone} title="100% Digitale" subtitle="Prenota e firma in 2 minuti" />
            <StatBlock icon={Star} title="Zero Fila" subtitle="Consegna VIP dedicata" />
            <StatBlock icon={Shield} title="24/7" subtitle="Assistenza sempre al tuo fianco" />
          </div>
        </div>
      </section>

      {/* ═══════════════ TOURIST RENTAL (Primary) ═══════════════ */}
      <section ref={touristRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Image */}
            <motion.div style={{ y: tourImgY }} className="relative order-2 lg:order-1">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img src={touristUrl} alt="Noleggio turistico Costa Smeralda" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:-right-12 bg-primary rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_hsl(var(--primary)/0.4)] max-w-[240px]"
              >
                <p className="text-primary-foreground font-display font-bold text-2xl md:text-3xl">VIP</p>
                <p className="text-primary-foreground/70 font-light text-sm mt-1">Consegna a yacht, hotel e ville private</p>
              </motion.div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                Il Nostro Core
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-foreground leading-[1.05] mb-8">
                Esplora la Sardegna{" "}
                <span className="italic font-light text-primary">con stile</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  <strong className="text-foreground font-medium">City Car, Scooter e Quad</strong> di ultima generazione
                  per vivere ogni angolo della Costa Smeralda in totale libertà. Prenoti online in 2 minuti,
                  firmi digitalmente e ritiri — oppure te lo portiamo noi.
                </p>
                <p>
                  Il nostro <strong className="text-foreground font-medium">Servizio Consegna VIP</strong> è ciò che ci
                  rende unici: il veicolo arriva direttamente al tuo yacht a Palau, alla tua villa a Porto Cervo
                  o al tuo hotel a San Teodoro. <strong className="text-foreground font-medium">Zero stress. Zero code. Solo il mare.</strong>
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">
                  🏎️ Auto di Lusso & Supercar
                </h3>
                <p className="text-muted-foreground font-light mb-6">
                  Disponibili <strong className="text-foreground font-medium">esclusivamente su richiesta</strong>.
                  Contattaci per configurare la tua esperienza VIP su misura.
                </p>
                <Button
                  asChild
                  variant="whatsapp"
                  size="lg"
                  className="rounded-full"
                >
                  <a href="https://wa.me/393520459150?text=Ciao%2C%20vorrei%20info%20su%20noleggio%20VIP%20Car" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> Richiedi VIP Car su WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <FaqSection />

      {/* ═══════════════ HEAVY TRANSPORT (B2B Secondary) ═══════════════ */}
      <section ref={transportRef} className="relative py-24 md:py-32 bg-[hsl(var(--brand-dark))] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.1),transparent_60%)]" />

        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                Servizi B2B
              </span>
              <h2 className="font-display text-3xl md:text-5xl font-black text-primary-foreground leading-[1.05] mb-6">
                Trasporti Speciali{" "}
                <span className="italic font-light text-primary">& Merci</span>
              </h2>
              <p className="text-primary-foreground/60 text-lg font-light leading-relaxed mb-8">
                Oltre alla mobilità turistica, GDIS opera nel settore dei trasporti pesanti.
                Effettuiamo <strong className="text-primary-foreground font-medium">trasporto merci, trasporti eccezionali
                e trasporto di imbarcazioni</strong>. Operiamo esclusivamente con nostro personale qualificato
                (servizi con conducente), utilizzando la nostra flotta di TIR, Camion, Furgoni,
                Rimorchi e Semi-rimorchi.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-bold"
                >
                  <a href="mailto:info@gdisservice.it">
                    Richiedi Preventivo Trasporti <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  asChild
                  variant="whatsapp"
                  size="lg"
                  className="rounded-full"
                >
                  <a href="https://wa.me/393520459150?text=Ciao%2C%20vorrei%20un%20preventivo%20per%20trasporto%20merci" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div style={{ y: transImgY }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl"
              >
                <img src={transportUrl} alt="Trasporti pesanti GDIS" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ GRAND CTA ═══════════════ */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-[hsl(var(--brand-dark))]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.2),transparent_60%)]" />
        <div className="container px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-[1.05] mb-6">
              Pronto a{" "}
              <span className="italic font-light text-primary">esplorare</span>
              <br />
              la Sardegna?
            </h2>
            <p className="text-primary-foreground/50 text-lg md:text-xl max-w-2xl mx-auto font-light mb-12">
              Scegli il tuo veicolo, prenota in 2 minuti e parti. Nessuna burocrazia.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                asChild
                size="xl"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg rounded-full px-14 h-16 shadow-[0_0_50px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_70px_hsl(var(--primary)/0.7)] transition-all duration-500"
              >
                <Link to="/prenotaora">
                  Prenota Ora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="xl"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-lg rounded-full px-14 h-16 transition-all duration-300"
              >
                <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
                  Contattaci su WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ChiSiamo;
