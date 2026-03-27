import SEOHead from "@/components/SEOHead";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FaqSection from "@/components/chisiamo/FaqSection";

/* ── Animated Counter ── */
const Counter = ({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <span className="font-display text-6xl md:text-8xl font-black text-primary-foreground tabular-nums">
        {count}{suffix}
      </span>
      <p className="text-primary-foreground/70 text-lg md:text-xl font-light mt-3 tracking-wide">{label}</p>
    </div>
  );
};

/* ── Hero Split Images ── */
const heroLeftUrl = "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80";
const heroRightUrl = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";
const logisticsUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1400&q=80";
const luxuryUrl = "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1400&q=80";

const ChiSiamo = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const logisticsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: logScroll } = useScroll({ target: logisticsRef, offset: ["start end", "end start"] });
  const logImgY = useTransform(logScroll, [0, 1], [80, -80]);

  const luxuryRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: luxScroll } = useScroll({ target: luxuryRef, offset: ["start end", "end start"] });
  const luxImgY = useTransform(luxScroll, [0, 1], [80, -80]);

  return (
    <>
      <SEOHead
        title="Chi Siamo — GDIS Service Srl | Trasporti, Logistica e Noleggio in Sardegna"
        description="GDIS Service Srl: l'infrastruttura invisibile del tuo movimento in Sardegna. Dalla logistica industriale al lusso senza compromessi."
        canonical="/chisiamo"
      />

      {/* ═══════════════ HERO: SPLIT SCREEN ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Split background */}
        <motion.div style={{ y: heroY, scale: heroScale }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 grid grid-cols-2">
            <div className="relative overflow-hidden">
              <img src={heroLeftUrl} alt="GDIS Logistica Industriale" className="w-full h-full object-cover object-center scale-110" />
              <div className="absolute inset-0 bg-[hsl(var(--brand-dark))/0.7]" />
            </div>
            <div className="relative overflow-hidden">
              <img src={heroRightUrl} alt="GDIS Esperienze di Lusso" className="w-full h-full object-cover object-center scale-110" />
              <div className="absolute inset-0 bg-[hsl(var(--brand-dark))/0.5]" />
            </div>
          </div>
          {/* Center gradient blend */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--brand-dark))/0.9] to-transparent" />
        </motion.div>

        {/* Vertical accent line */}
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
            L'Infrastruttura{" "}
            <span className="italic font-light text-primary">Invisibile</span>
            <br />
            del tuo Movimento
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-primary-foreground/50 text-lg md:text-2xl font-light mt-8 max-w-3xl mx-auto"
          >
            Dalla logistica industriale… al lusso senza compromessi.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 1, ease: "circOut" }}
            className="w-32 md:w-48 h-[3px] bg-primary mx-auto mt-10 shadow-[0_0_20px_hsl(var(--primary)/0.6)]"
          />
        </motion.div>

        {/* Scroll indicator */}
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

      {/* ═══════════════ SEZIONE 1: MOVIMENTO MERCI ═══════════════ */}
      <section ref={logisticsRef} className="relative py-32 md:py-48 bg-[hsl(var(--brand-dark))] overflow-hidden">
        {/* Background radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--primary)/0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />

        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                Core Business
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-primary-foreground leading-[1.05] mb-8">
                Movimento{" "}
                <span className="italic font-light text-primary">Merci</span>
              </h2>
              <div className="space-y-6 text-primary-foreground/60 text-lg font-light leading-relaxed">
                <p>
                  Ogni giorno, le nostre flotte industriali attraversano la Sardegna — dal porto di Olbia
                  alle zone industriali del Campidano. <strong className="text-primary-foreground font-medium">Trasporto conto terzi</strong> con
                  precisione militare, gestione <strong className="text-primary-foreground font-medium">intermodale terra-mare e rotaia</strong> per
                  connettere l'isola al continente.
                </p>
                <p>
                  Merci pericolose ADR, catena del freddo per deperibili, <strong className="text-primary-foreground font-medium">logistica
                  e gestione magazzini</strong>. Non siamo solo trasportatori — siamo l'infrastruttura
                  che tiene in moto l'economia sarda.
                </p>
                <p>
                  Le nostre <strong className="text-primary-foreground font-medium">aree attrezzate per parcheggio e rimessaggio</strong> ospitano
                  veicoli industriali, rimorchi e furgoni commerciali con servizio di lavaggio professionale integrato.
                </p>
              </div>
              <div className="mt-10 w-20 h-[2px] bg-primary/50" />
            </motion.div>

            {/* Image with parallax */}
            <motion.div
              style={{ y: logImgY }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img src={logisticsUrl} alt="Logistica GDIS Sardegna" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-transparent" />
              </motion.div>
              {/* Floating accent block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -left-6 md:-left-12 bg-primary rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_hsl(var(--primary)/0.4)] max-w-[240px]"
              >
                <p className="text-primary-foreground font-display font-bold text-2xl md:text-3xl">Copertura</p>
                <p className="text-primary-foreground/70 font-light text-sm mt-1">100% Sardegna e collegamenti nazionali</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SEZIONE 2: ESPERIENZE VIP ═══════════════ */}
      <section ref={luxuryRef} className="relative py-32 md:py-48 bg-background overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="container px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center max-w-7xl mx-auto">
            {/* Image with parallax — left on desktop */}
            <motion.div
              style={{ y: luxImgY }}
              className="relative order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl"
              >
                <img src={luxuryUrl} alt="Noleggio Lusso Costa Smeralda" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </motion.div>
              {/* Floating accent */}
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

            {/* Text — right on desktop */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                Noleggio Premium
              </span>
              <h2 className="font-display text-4xl md:text-6xl font-black text-foreground leading-[1.05] mb-8">
                Esperienze{" "}
                <span className="italic font-light text-primary">VIP</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  La stessa precisione logistica che muove tonnellate di merci attraverso la Sardegna
                  è al servizio della tua vacanza. <strong className="text-foreground font-medium">Auto, scooter, quad e furgoni commerciali</strong> —
                  la nostra flotta turistica è sempre pronta.
                </p>
                <p>
                  Ma è il nostro <strong className="text-foreground font-medium">Servizio Consegna VIP</strong> a fare la differenza.
                  Ti portiamo il veicolo direttamente al tuo yacht a Palau, alla tua villa a Porto Cervo,
                  al tuo hotel a San Teodoro. <strong className="text-foreground font-medium">Zero stress. Zero code. Solo il mare.</strong>
                </p>
                <p>
                  <strong className="text-foreground font-medium">Noleggio e permuta di veicoli industriali, rimorchi e imbarcazioni da diporto</strong> completano
                  un ecosistema di mobilità unico in Sardegna.
                </p>
              </div>
              <div className="mt-10 w-20 h-[2px] bg-primary/50" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SEZIONE 3: GDIS AUTHORITY (Counters) ═══════════════ */}
      <section className="relative py-32 md:py-44 bg-primary overflow-hidden">
        {/* Animated pattern */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_30px,hsl(0_0%_100%)_30px,hsl(0_0%_100%)_31px)]" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--primary)/0.3)_100%)]" />

        <div className="container px-4 relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground/50 font-display text-xs font-bold uppercase tracking-[0.5em] mb-16"
          >
            I Numeri Parlano
          </motion.p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 max-w-6xl mx-auto">
            <Counter target={50} suffix="+" label="Veicoli in Flotta" />
            <Counter target={15} suffix="+" label="Anni di Esperienza" />
            <Counter target={1000} suffix="+" label="Prenotazioni Completate" />
            <Counter target={100} suffix="%" label="Copertura Gallura" />
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <FaqSection />

      {/* ═══════════════ SEZIONE 4: GRAND CTA ═══════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[hsl(var(--brand-dark))]">
        {/* Dual glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.2),transparent_60%)]" />

        <div className="container px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-[1.05] mb-6">
              Un'unica realtà per{" "}
              <span className="italic font-light text-primary">ogni</span>
              <br />
              tipo di movimento
            </h2>
            <p className="text-primary-foreground/50 text-lg md:text-xl max-w-2xl mx-auto font-light mb-12">
              Trasporti industriali, noleggio turistico, logistica — contattaci per una soluzione su misura.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Button
                asChild
                size="xl"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg rounded-full px-14 h-16 shadow-[0_0_50px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_70px_hsl(var(--primary)/0.7)] transition-all duration-500"
              >
                <Link to="/prenotaora">
                  Prenota un Veicolo <ArrowRight className="ml-2 h-5 w-5" />
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
