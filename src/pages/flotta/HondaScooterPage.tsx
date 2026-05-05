import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, BUSINESS_LEGAL_NAME } from "@/lib/siteSchema";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Settings, Shield, Wind, ParkingCircle, Zap, Bike } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash-125-350-costasmeralda.webp";
const featureImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash350-costasmeralda.webp";
const featureImg2 =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash-125-350-noleggiocostasmeralda.webp";

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
    description:
      "Mentre tutti cercano posto auto a Porto Cervo, tu parcheggi ovunque in 3 secondi. Niente code, niente stress estivo.",
    highlight: false,
    locationLink: "/noleggio-auto-a-porto-cervo",
    locationName: "Porto Cervo",
  },
  {
    icon: Bike,
    title: "Litoranea da Sogno",
    description:
      "Percorri la litoranea costiera sentendo il vento e il profumo del mare. Stile italiano, libertà totale.",
    highlight: true,
    locationLink: "/noleggio-auto-a-san-teodoro",
    locationName: "San Teodoro",
  },
  {
    icon: Zap,
    title: "Consumi Ridicoli",
    description:
      "Con meno di 10€ di benzina percorri l'intera Costa Smeralda. Il budget risparmiato? Cena vista mare a Porto Rotondo.",
    highlight: false,
    locationLink: "/noleggio-auto-a-porto-rotondo",
    locationName: "Porto Rotondo",
  },
];

const faqs = [
  {
    q: "Honda SH 125 o SH 350: quale scegliere?",
    a: "L'SH 125 va bene per chi resta in città e fa giri brevi (Olbia, San Teodoro, Pittulongu). L'SH 350 è la scelta giusta se viaggi in due con bagagli, se devi salire al Phi Beach (la salita verso Capo Ferro chiede potenza), se ti sposti su distanze lunghe o vuoi prendere la SS131 (autostrada). Stessa estetica, stesso comfort, +120cc di muscolo per chi serve.",
  },
  {
    q: "Quale patente serve davvero?",
    a: "SH 125: Patente A1 (16+) oppure Patente B (per chi ha conseguito la B prima del 1/2/2013, copre fino a 125cc; chi l'ha presa dopo deve fare la prova pratica AM o A1). SH 350: Patente A2 (18+) o A (24+). Se non sei sicuro della tua categoria, mandaci foto della patente su WhatsApp e ti diciamo se puoi guidare quale.",
  },
  {
    q: "I caschi e l'antifurto sono inclusi?",
    a: "Sempre. Forniamo 2 caschi jet omologati ECE 22.06 (taglie M/L/XL disponibili, igienizzati prima di ogni noleggio), antifurto a U bloccaruota e copertura assicurativa furto/incendio nel prezzo. Per chi vuole un casco integrale possiamo organizzarlo su richiesta.",
  },
  {
    q: "Quanto consuma l'Honda SH e quanto costa il pieno?",
    a: "SH 125: circa 2.5 L/100km, serbatoio 7.7 L = autonomia 280-300 km. Pieno: ~13 €. SH 350: 3.0-3.2 L/100km, serbatoio 9.1 L = autonomia 280 km. Pieno: ~15 €. Per una settimana di vacanza standard in Costa Smeralda si fanno 1-2 pieni totali. Il costo al km è frazione di quello dell'auto.",
  },
  {
    q: "Posso parcheggiarlo gratis ovunque?",
    a: (
      <>
        Quasi. Le 2 ruote in Sardegna possono usare le aree moto/scooter dedicate, presenti in tutte le spiagge
        principali (La Cinta, Brandinchi, Phi Beach) e nei centri ZTL come <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 hover:underline">Porto Cervo</Link>.
        Sui parcheggi blu paghi metà tariffa o gratis a seconda del comune. Risparmio reale per una settimana: 50-100 € rispetto all'auto.
      </>
    ),
  },
  {
    q: "Vado all'aeroporto con lo scooter? Dove parcheggio?",
    a: "Aeroporto di Olbia ha un parcheggio scooter coperto a 50m dal terminal a 3 €/giorno. Comodissimo per chi parcheggia in aeroporto e parte in scooter, ma se preferisci ti consegniamo lo scooter direttamente al ritiro bagagli senza pensarci.",
  },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const breadcrumbs = [
  { name: "Flotta", url: "/" },
  { name: "Honda SH Scooter", url: "/flotta/honda-sh" },
];

const hondaSchema = {
  "@context": "https://schema.org",
  "@type": "Motorcycle",
  name: "Honda SH 125 / 350 — Noleggio Scooter Olbia e Costa Smeralda",
  description:
    "Honda SH 125 e 350. Scooter premium ideale per Olbia, Porto Cervo e Costa Smeralda: agile, comodo, 2 caschi inclusi.",
  brand: { "@type": "Brand", name: "Honda" },
  manufacturer: { "@type": "Organization", name: "Honda" },
  model: "SH 125/350",
  vehicleTransmission: "Automatic",
  fuelType: "Benzina",
  image:
    "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-hondash-scooter.webp",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "50",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${SITE_URL}/flotta/honda-sh`,
    seller: { "@type": "Organization", name: BUSINESS_LEGAL_NAME },
  },
};

const HondaScooterPage = () => (
  <>
    <SEOHead
      title="Noleggio Scooter Honda SH 125 e 350 Olbia | GDIS Rent"
      description="Noleggio Honda SH a Olbia e Costa Smeralda ✓ 125cc e 350cc ✓ 2 caschi inclusi ✓ Consegna VIP aeroporto, porto, hotel ✓ Ideale ZTL. Prenota online H24."
      canonical="/flotta/honda-sh"
      breadcrumbs={breadcrumbs}
      jsonLd={hondaSchema}
    />
    <Breadcrumbs items={breadcrumbs} />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Honda SH Scooter Costa Smeralda Sardegna"
          className="w-full h-full object-cover opacity-20"
        />
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
              Zero stress da parcheggio, consumi ridicoli, stile italiano. Lo scooter perfetto per vivere la Costa
              Smeralda in libertà.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["Automatico", "2 Caschi Inclusi", "125cc / 350cc"].map((badge) => (
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
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <img src={featureImg} alt="Costa sarda scooter" className="rounded-2xl shadow-2xl w-full" loading="lazy" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2 border-l-4 border-primary pl-8"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Libertà su Due Ruote</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Agilità senza compromessi
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              L'Honda SH è il re degli scooter: silenzioso, affidabile e con un vano sottosella capiente. Perfetto per
              scivolare nel traffico estivo e raggiungere le spiagge più belle della Gallura senza la tortura del
              parcheggio.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Con il cambio automatico CVT, guidi senza pensieri. Basta girare la manopola e goderti il panorama — il
              motore fa tutto il resto.
            </p>
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
            className="border-l-4 border-primary pl-8"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Due Versioni, Una Scelta
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">SH 125 o SH 350?</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">SH 125:</strong> Perfetto per le strade costiere, i centri storici e
              gli spostamenti urbani. Leggero, scattante, ideale per chi ha la Patente B con limitazione 125cc.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">SH 350:</strong> Per chi vuole anche percorrere le superstrade sarde e
              coprire distanze maggiori con comfort superiore. Perfetto per la litoranea <Link to="/noleggio-auto-a-olbia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Olbia</Link>-<Link to="/noleggio-auto-a-san-teodoro" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">San Teodoro</Link>.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={featureImg2}
              alt="Spiaggia Sardegna scooter"
              className="rounded-2xl shadow-2xl w-full"
              loading="lazy"
            />
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

    {/* PERCHÉ SCEGLIERE LO SCOOTER */}
    <section className="py-20 md:py-24 bg-muted/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Perché scegliere lo scooter</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
            Scooter vs auto: i vantaggi che nessuno ti racconta
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            La maggior parte dei turisti italiani che vengono in Costa Smeralda noleggia un'auto per default,
            <strong className="text-foreground"> per abitudine, senza valutare alternative</strong>. Sbagliato in
            molti casi: in alta stagione lo scooter Honda SH non è solo un'opzione, è la scelta più intelligente.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Vantaggi reali misurati nella nostra esperienza</strong>: il tempo di
            arrivo al Phi Beach al tramonto da Baja Sardinia in scooter è 5 minuti, in auto 30+ minuti perché la
            strada si paralizza. Il parcheggio nelle spiagge come La Cinta o Brandinchi è gratuito nelle aree moto,
            mentre l'auto paga 5 €/giorno (e in agosto si esaurisce entro le 9:30). Nei centri ZTL di Porto Cervo o
            San Pantaleo lo scooter ti fa parcheggiare a 30 metri dalla Promenade o dalla Piazzetta — l'auto deve
            stare in parcheggi satellite a 800+ metri. Il consumo settimanale di carburante è 1/4 rispetto a un'auto.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Quando NON scegliere lo scooter</strong>: se piove (in Sardegna
            d'estate raro ma possibile, soprattutto a giugno e settembre), se viaggi in più di 2 persone, se hai
            valigie grandi (lo scooter porta una giornaliera + 1 zaino sotto la sella), se non sei a tuo agio sulle 2
            ruote nel traffico estivo. Per famiglie con bambini consigliamo Fiat Panda + scooter combinato.
          </p>
        </motion.div>
      </div>
    </section>

    {/* HONDA SH IN SARDEGNA */}
    <section className="py-20 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Honda SH in Sardegna</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
            Le località dove lo scooter è imbattibile
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Sulla base delle nostre prenotazioni, queste sono le destinazioni dove l'Honda SH è il veicolo più scelto
            (spesso in combinazione con altri mezzi):
          </p>
          <ul className="space-y-3 text-base md:text-lg text-foreground/85">
            <li>
              <strong className="text-foreground">
                <Link to="/noleggio-auto-a-baja-sardinia" className="text-blue-600 hover:underline">
                  Baja Sardinia
                </Link>
              </strong>
              {" "}— per il Phi Beach e il Ritual Club. La salita serale verso il sunset bar in scooter dura 5
              minuti, in auto un'ora di coda. Parcheggio moto a 80 metri dall'ingresso, gratuito.
            </li>
            <li>
              <strong className="text-foreground">
                <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 hover:underline">
                  Porto Cervo
                </Link>
              </strong>
              {" "}— centro ZTL pedonale tutta l'estate. In scooter parcheggi nelle aree moto a 10 metri dalla
              Promenade du Port; l'auto deve fermarsi nei parcheggi satellite a piedi.
            </li>
            <li>
              <strong className="text-foreground">
                <Link to="/noleggio-auto-a-san-pantaleo" className="text-blue-600 hover:underline">
                  San Pantaleo
                </Link>
              </strong>
              {" "}— vicoli del borgo gallurese e mercato del giovedì. L'unico modo intelligente per arrivare
              entro le 11:00 senza dover lasciare l'auto a 1 km dalla piazzetta.
            </li>
            <li>
              <strong className="text-foreground">
                <Link to="/noleggio-auto-a-san-teodoro" className="text-blue-600 hover:underline">
                  San Teodoro
                </Link>
              </strong>
              {" "}— per le spiagge della Cinta, Cala Brandinchi, Lu Impostu. Parcheggio moto gratis vs auto a 5 €/g
              che si esauriscono entro le 9:30.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            Devi portare una famiglia? Vedi la <Link to="/flotta/fiat-panda" className="text-blue-600 hover:underline">Fiat Panda Hybrid</Link>.
            Cerchi un mezzo per gli sterrati? Considera lo <Link to="/flotta/yamaha-raptor" className="text-blue-600 hover:underline">Yamaha Raptor 700</Link>.
          </p>
        </motion.div>
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
            Sali in sella
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota il tuo Honda SH in meno di 2 minuti. 2 caschi e consegna VIP inclusi.
          </p>
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            <Link to="/prenotaora">Prenota il tuo Scooter →</Link>
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

export default HondaScooterPage;
