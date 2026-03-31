import SEOHead from "@/components/SEOHead";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Smartphone, Clock, Truck, Car, Bike, Shield, Star, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FaqSection from "@/components/chisiamo/FaqSection";

const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";
const heroUrl =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/gdisrentservice-noleggio-auto-scooter-quad-olbia.webp";
const touristUrl =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-consegna-auto-scooter-quad-a-domicilio.webp";
const transportUrl =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/gdisrentservice-trasporto-merci-trasporti-eccezionali-trasporto-di-imbarcazioni.webp";

/* ── Vertical Timeline Node ── */
const TimelineNode = ({
  index,
  title,
  subtitle,
  icon: Icon,
  isLast,
}: {
  index: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  isLast?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative flex gap-6 md:gap-10">
      {/* Vertical line + node */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-[0_0_30px_hsl(var(--primary)/0.4)]"
        >
          <Icon className="w-7 h-7 text-primary-foreground" />
        </motion.div>
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-px flex-1 bg-gradient-to-b from-primary/50 to-primary/10 origin-top min-h-[60px]"
          />
        )}
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pb-14 md:pb-20"
      >
        <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.3em]">0{index + 1}</span>
        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-1 mb-3">{title}</h3>
        <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed max-w-lg">{subtitle}</p>
      </motion.div>
    </div>
  );
};

/* ── Marquee Content ── */
const marqueeItems = [
  "Noleggio Auto",
  "Consegne VIP",
  "Scooter & Quad",
  "Trasporti Speciali",
  "Assistenza 24/7",
  "Costa Smeralda",
];

const MarqueeContent = () => (
  <>
    {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map(
      (item, i) => (
        <div key={i} className="flex items-center px-6 md:px-10 flex-shrink-0">
          <span className="text-primary-foreground font-display font-black text-sm md:text-xl uppercase tracking-[0.2em] whitespace-nowrap">
            {item}
          </span>
          <img
            src={gdisLogo}
            alt="GDIS"
            className="h-6 md:h-8 w-auto opacity-90 drop-shadow-md ml-6 md:ml-10 flex-shrink-0"
          />
        </div>
      ),
    )}
  </>
);

const ChiSiamo = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.2]);
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

      {/* ═══════════════ HERO — Single Cinematic Image ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0 z-0">
          <img src={heroUrl} alt="GDIS Mobilità Costa Smeralda" className="w-full h-full object-cover" />
        </motion.div>
        {/* Deep gradient overlay for smooth transition */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900 z-[1]" />

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-blue-400 font-display text-sm font-semibold uppercase tracking-[0.3em] mb-4 block"
          >
            DAL 2025 IN SARDEGNA
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-primary-foreground leading-[0.95] tracking-tight drop-shadow-2xl"
          >
            La Nuova Era della <span className="italic font-light text-primary">Mobilità</span>
            <br />
            in Costa Smeralda
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-primary-foreground/50 text-lg md:text-2xl font-light mt-8 max-w-3xl mx-auto"
          >
            Nati nel 2025 per offrirti veicoli di ultima generazione, un processo 100% digitale e consegne VIP
            direttamente al tuo yacht o hotel.
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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

      {/* ═══════════════ GUIDED PATH (Vertical Timeline) ═══════════════ */}
      <section className="relative py-24 md:py-36 bg-background overflow-hidden">
        {/* Subtle top transition from dark hero */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[hsl(var(--brand-dark))] to-transparent pointer-events-none" />

        <div className="container px-4 relative z-10 max-w-3xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16 md:mb-20"
          >
            <span className="text-primary font-display text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
              Il Nostro DNA
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-black text-foreground leading-tight">
              Perché scegliere <span className="italic font-light text-primary">GDIS</span>
            </h2>
          </motion.div>

          <TimelineNode
            index={0}
            icon={Star}
            title="Nati per il Turismo"
            subtitle="Non siamo un vecchio autonoleggio. Siamo una startup digitale nata nel 2025, costruita da zero per offrire la miglior esperienza di mobilità turistica in Costa Smeralda."
          />
          <TimelineNode
            index={1}
            icon={Car}
            title="Flotta 2025"
            subtitle="Ogni veicolo della nostra flotta è nuovo, revisionato e assicurato. City Car, Scooter, Quad e Auto di Lusso su richiesta — solo il meglio per le tue vacanze."
          />
          <TimelineNode
            index={2}
            icon={Smartphone}
            title="100% Digitale"
            subtitle="Prenota online in 2 minuti, firma digitalmente il contratto e sei pronto a partire. Nessuna coda, nessun modulo cartaceo, nessuno stress."
          />
          <TimelineNode
            index={3}
            icon={Zap}
            title="Consegna VIP"
            subtitle="Il veicolo arriva direttamente a te: al tuo yacht, al tuo hotel, alla tua villa. Da Palau a San Teodoro, copriamo tutta la Gallura e la Costa Smeralda."
            isLast
          />
        </div>
      </section>

      {/* ═══════════════ TOURIST RENTAL (Primary — Light Gray bg) ═══════════════ */}
      <section ref={touristRef} className="relative py-32 md:py-48 bg-muted overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 md:-right-12 bg-primary rounded-2xl p-6 md:p-8 shadow-[0_20px_60px_hsl(var(--primary)/0.4)] max-w-[240px]"
              >
                <p className="text-primary-foreground font-display font-bold text-2xl md:text-3xl">VIP</p>
                <p className="text-primary-foreground/70 font-light text-sm mt-1">
                  Consegna a yacht, hotel e ville private
                </p>
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
                Esplora la Sardegna <span className="italic font-light text-primary">con stile</span>
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg font-light leading-relaxed">
                <p>
                  <strong className="text-foreground font-medium">City Car, Scooter e Quad</strong> di ultima
                  generazione per vivere ogni angolo della Costa Smeralda in totale libertà. Prenoti online in 2 minuti,
                  firmi digitalmente e ritiri — oppure te lo portiamo noi.
                </p>
                <p>
                  Il nostro <strong className="text-foreground font-medium">Servizio Consegna VIP</strong> è ciò che ci
                  rende unici: il veicolo arriva direttamente al tuo yacht a Palau, alla tua villa a Porto Cervo o al
                  tuo hotel a San Teodoro.{" "}
                  <strong className="text-foreground font-medium">Zero stress. Zero code. Solo il mare.</strong>
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-border">
                <h3 className="font-display text-xl font-bold text-foreground mb-3">🏎️ Auto di Lusso & Supercar</h3>
                <p className="text-muted-foreground font-light mb-6">
                  Disponibili <strong className="text-foreground font-medium">esclusivamente su richiesta</strong>.
                  Contattaci per configurare la tua esperienza VIP su misura.
                </p>
                <Button asChild variant="whatsapp" size="lg" className="rounded-full">
                  <a
                    href="https://wa.me/393520459150?text=Ciao%2C%20vorrei%20info%20su%20noleggio%20VIP%20Car"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" /> Richiedi VIP Car su WhatsApp
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TRUST MARQUEE DIVIDER ═══════════════ */}
      <section className="relative w-full flex items-center justify-center -my-8 z-20 pointer-events-none">
        <div className="absolute w-[200%] left-1/2 -translate-x-1/2 bg-primary transform -rotate-2 py-4 shadow-[0_10px_40px_hsl(var(--primary)/0.3)] border-y border-primary/30 overflow-hidden">
          <div className="flex w-max overflow-hidden">
            <motion.div
              className="flex items-center flex-shrink-0"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
            >
              <MarqueeContent />
            </motion.div>
          </div>
        </div>
        <div className="invisible py-4">
          <span className="font-display font-black text-xl uppercase tracking-[0.2em]">S</span>
        </div>
      </section>

      {/* ═══════════════ HEAVY TRANSPORT (B2B Secondary) ═══════════════ */}
      <section ref={transportRef} className="relative py-24 md:py-32 bg-muted overflow-hidden">
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
              <h2 className="font-display text-3xl md:text-5xl font-black text-foreground leading-[1.05] mb-6">
                Trasporti Speciali <span className="italic font-light text-primary">& Merci</span>
              </h2>
              <p className="text-muted-foreground text-lg font-light leading-relaxed mb-8">
                Oltre alla mobilità turistica, GDIS opera nel settore dei trasporti pesanti. Effettuiamo{" "}
                <strong className="text-foreground font-medium">
                  trasporto merci, trasporti eccezionali e trasporto di imbarcazioni
                </strong>
                . Operiamo esclusivamente con nostro personale qualificato (servizi con conducente), utilizzando la
                nostra flotta di TIR, Camion, Furgoni, Rimorchi e Semi-rimorchi.
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
                <Button asChild variant="whatsapp" size="lg" className="rounded-full">
                  <a
                    href="https://wa.me/393520459150?text=Ciao%2C%20vorrei%20un%20preventivo%20per%20trasporto%20merci"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
                <div className="absolute inset-0 bg-gradient-to-t from-muted via-transparent to-transparent" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ (White bg, before CTA) ═══════════════ */}
      <FaqSection />

      {/* ═══════════════ GRAND CTA — Dark Radial Premium ═══════════════ */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-[hsl(var(--brand-dark))]">
        {/* Radial glow behind */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,hsl(var(--primary)/0.15),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,hsl(var(--primary)/0.25),transparent_50%)]" />

        <div className="container px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground leading-[1.05] mb-6">
              Pronto a <span className="italic font-light text-primary">esplorare</span>
              <br />
              la Sardegna?
            </h2>
            <p className="text-primary-foreground/50 text-lg md:text-xl max-w-2xl mx-auto font-light mb-12">
              Scegli il tuo veicolo, prenota in 2 minuti e parti. Nessuna burocrazia.
            </p>

            {/* Glowing button container */}
            <div className="relative inline-block">
              {/* Glow effect behind button */}
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full bg-primary/30 blur-2xl -z-10 scale-150"
              />
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              >
                <Button
                  asChild
                  size="xl"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-black text-lg rounded-full px-14 h-16 shadow-[0_0_50px_hsl(var(--primary)/0.4),0_20px_60px_rgba(0,0,0,0.3)] hover:shadow-[0_0_70px_hsl(var(--primary)/0.6)] transition-all duration-500"
                >
                  <Link to="/prenotaora">
                    Prenota Ora <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="mt-8">
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="text-primary-foreground/50 hover:text-primary-foreground hover:bg-primary-foreground/5 rounded-full"
              >
                <a href="https://wa.me/393520459150" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Oppure contattaci su WhatsApp
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
