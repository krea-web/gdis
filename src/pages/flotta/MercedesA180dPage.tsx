import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, BUSINESS_LEGAL_NAME } from "@/lib/siteSchema";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Wind, Fuel, Gauge, Settings, Luggage, MapPin, ShoppingBag, Star } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-mercedes-classe-a180d-costasmeralda.webp";
const featureImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-mercedes-classe-a180d.webp";
const featureImg2 =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-mercedes-classe-a180d-consegna-a-domicilio.webp";

const specs = [
  { icon: Gauge, label: "Motore", value: "2.0 Diesel 116cv" },
  { icon: Fuel, label: "Alimentazione", value: "Diesel" },
  { icon: Users, label: "Posti", value: "5" },
  { icon: Settings, label: "Cambio", value: "Automatico" },
  { icon: Wind, label: "Clima", value: "Climatizzatore Auto" },
  { icon: Luggage, label: "Bagagliaio", value: "355 litri" },
];

const scenarios = [
  {
    icon: Star,
    title: "Serate Esclusive a Porto Cervo",
    description:
      "Arriva con stile nei locali più rinomati della Promenade du Port e della Piazze. Il design inconfondibile Mercedes non passa inosservato.",
    highlight: true,
    locationLink: "/noleggio-auto-a-porto-cervo",
    locationName: "Porto Cervo",
  },
  {
    icon: MapPin,
    title: "Esplora da San Teodoro a Baja Sardinia",
    description:
      "Goditi il comfort dei sedili premium e la fluidità del cambio automatico 8G-DCT per i tuoi spostamenti lungo tutta la costa sarda.",
    highlight: false,
    locationLink: "/noleggio-auto-a-baja-sardinia",
    locationName: "Baja Sardinia",
  },
  {
    icon: ShoppingBag,
    title: "Viaggi Premium in Pieno Comfort",
    description:
      "Bagagliaio capiente per valigie o shopping di lusso, sistema di infotainment MBUX all'avanguardia e consumi ottimizzati grazie al motore diesel di ultima generazione.",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Il veicolo ha il cambio automatico?",
    a: "Assolutamente sì. La nostra Mercedes Classe A180d è dotata del fluido cambio automatico a doppia frizione 8G-DCT, perfetto per un'esperienza di guida rilassante.",
  },
  {
    q: "Che patente è necessaria per noleggiarla?",
    a: "È richiesta la Patente B standard. Tuttavia, trattandosi di un veicolo della categoria Premium, potrebbe essere richiesta una maggiore età minima o anni di patente (consulta le condizioni in fase di prenotazione).",
  },
  {
    q: "Posso avere la consegna presso la mia Villa o in Aeroporto?",
    a: "Certamente. Offriamo il servizio di consegna VIP direttamente all'Aeroporto di Olbia Costa Smeralda, ai porti principali o direttamente presso la tua villa/hotel in tutta la Costa Smeralda.",
  },
  {
    q: "Il carburante è incluso?",
    a: "Il veicolo viene consegnato con il pieno di carburante Diesel e va restituito con il pieno (Full-to-Full). Offriamo anche l'opzione 'pieno anticipato' per il massimo del comfort.",
  },
  {
    q: "È adatta per raggiungere spiagge non asfaltate?",
    a: (
      <>
        No, la Mercedes Classe A è un veicolo di lusso pensato per le strade asfaltate. Per esplorare percorsi off-road
        o sterrati impegnativi, ti consigliamo il nostro{" "}
        <Link
          to="/flotta/yamaha-raptor"
          className="text-primary-foreground underline hover:text-primary-foreground/80 transition-all"
        >
          Yamaha Raptor
        </Link>
        .
      </>
    ),
  },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const breadcrumbs = [
  { name: "Flotta", url: "/" },
  { name: "Mercedes Classe A 180d", url: "/flotta/mercedes-classe-a180d" },
];

const mercedesSchema = {
  "@context": "https://schema.org",
  "@type": "Car",
  name: "Mercedes Classe A 180d — Noleggio Premium Olbia e Costa Smeralda",
  description:
    "Mercedes Classe A 180d: comfort premium, cambio automatico, diesel efficiente. Il viaggio in Costa Smeralda che meriti.",
  brand: { "@type": "Brand", name: "Mercedes-Benz" },
  manufacturer: { "@type": "Organization", name: "Mercedes-Benz" },
  model: "Classe A 180d",
  vehicleTransmission: "Automatic",
  fuelType: "Diesel",
  numberOfDoors: 5,
  seatingCapacity: 5,
  image:
    "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-mercedesa180d.webp",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "79",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${SITE_URL}/flotta/mercedes-classe-a180d`,
    seller: { "@type": "Organization", name: BUSINESS_LEGAL_NAME },
  },
};

const MercedesA180dPage = () => (
  <>
    <SEOHead
      title="Noleggio Mercedes Classe A 180d Olbia | Premium | GDIS Rent"
      description="Noleggio Mercedes Classe A 180d a Olbia e Costa Smeralda ✓ Cambio automatico ✓ Comfort premium ✓ Consegna VIP Porto Cervo, villa, hotel. WhatsApp H24."
      canonical="/flotta/mercedes-classe-a180d"
      breadcrumbs={breadcrumbs}
      jsonLd={mercedesSchema}
    />
    <Breadcrumbs items={breadcrumbs} />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Mercedes Classe A 180d Costa Smeralda Sardegna"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--brand-dark))] via-transparent to-[hsl(var(--brand-dark)/0.6)]" />
      </div>
      <div className="container relative z-10 py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-4">Premium Fleet</p>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-primary-foreground leading-[1.1] mb-6">
              Mercedes-Benz
              <span className="block text-primary">Classe A 180d</span>
            </h1>
            <p className="text-primary-foreground/60 text-lg max-w-lg mb-8">
              Eleganza, tecnologia e comfort senza compromessi. Goditi la Costa Smeralda a bordo di un'icona di stile,
              dotata di cambio automatico e interni di lusso.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Cambio Automatico", "Diesel", "Premium Interior"].map((badge) => (
                <span
                  key={badge}
                  className="px-4 py-2 rounded-full bg-primary/15 text-primary border border-primary/30 text-sm font-medium backdrop-blur-sm"
                >
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
              alt="Mercedes Classe A 180d"
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-primary pl-8"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Lusso & Tecnologia</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Standard elevati per le tue vacanze
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La Mercedes Classe A 180d eleva l'esperienza del noleggio auto. Gli interni sono curati in ogni minimo
              dettaglio, offrendo un'atmosfera premium grazie ai materiali di alta qualità e al celebre sistema di
              infotainment MBUX.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Il motore diesel da 116cv abbinato all'avanzato cambio automatico garantisce una guida incredibilmente
              fluida, silenziosa e dai consumi ridotti. La scelta perfetta per chi non si accontenta.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={featureImg}
              alt="Mercedes Classe A interni premium"
              className="rounded-2xl shadow-2xl w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>

    {/* FEATURES ZIG-ZAG 2 */}
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <img
              src={featureImg2}
              alt="Mercedes Classe A Costa Smeralda"
              className="rounded-2xl shadow-2xl w-full"
              loading="lazy"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 border-l-4 border-primary pl-8"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Stile & Presenza</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Fatti notare in Costa Smeralda
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Dalle cene eleganti a{" "}
              <Link
                to="/noleggio-auto-a-porto-cervo"
                className="text-primary font-medium hover:underline transition-all"
              >
                Porto Cervo
              </Link>{" "}
              agli aperitivi al tramonto a{" "}
              <Link
                to="/noleggio-auto-a-porto-rotondo"
                className="text-primary font-medium hover:underline transition-all"
              >
                Porto Rotondo
              </Link>
              , questa vettura è il tuo biglietto da visita. Un design affusolato, moderno e dal carattere sportivo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              La tua esperienza Premium inizia subito: scegli la nostra Consegna VIP e ti faremo trovare l'auto pronta
              al tuo arrivo in aeroporto, al porto o direttamente presso la tua struttura.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    {/* COCKPIT SPECS */}
    <section className="py-24 bg-[hsl(var(--brand-dark))] text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3">Esperienze</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">Il Noleggio Perfetto per...</h2>
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
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,hsl(0_0%_100%/0.02)_20px,hsl(0_0%_100%/0.02)_40px)]" />
      <div className="container max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground">Domande Frequenti</h2>
        </motion.div>
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="rounded-2xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 px-6 hover:bg-primary-foreground/15 transition-all duration-300"
            >
              <AccordionTrigger className="text-left font-semibold text-primary-foreground hover:no-underline [&>svg]:text-primary-foreground">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-primary-foreground/70 font-light">{faq.a}</AccordionContent>
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
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground mb-6">
            Goditi il vero comfort.
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota la tua Mercedes Classe A in meno di 2 minuti. Consegna VIP in aeroporto, porto o hotel — in tutta la
            Costa Smeralda.
          </p>
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            <Link to="/prenotaora">Prenota la Classe A →</Link>
          </Button>
          <p className="mt-6 text-primary-foreground/70 text-sm">
            Domande?{" "}
            <Link to="/contatti" className="text-primary-foreground font-semibold underline-offset-4 hover:underline">
              Contattaci
            </Link>{" "}
            ·{" "}
            <Link to="/" className="text-primary-foreground font-semibold underline-offset-4 hover:underline">
              Torna alla home
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  </>
);

export default MercedesA180dPage;
