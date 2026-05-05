import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE_URL, BUSINESS_LEGAL_NAME } from "@/lib/siteSchema";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gauge, Fuel, Users, Shield, Mountain, Wrench, Compass, Flame, Camera } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const heroImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-quad-yamaharaptor-offroadsardegna.webp";
const featureImg =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-quad-yamaharaptor-costasmeraldaoffroad.webp";
const featureImg2 =
  "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-quad-yamaharaptor-offroadsardegna.webp";

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
    description:
      "Affronta sentieri e percorsi off-road che le auto non possono raggiungere. Sospensioni da competizione per ogni terreno.",
    highlight: false,
  },
  {
    icon: Flame,
    title: "Adrenalina Pura",
    description:
      "686cc di potenza bruta sotto di te. Il Raptor 700 è la macchina definitiva per chi cerca emozioni senza filtri nella natura sarda.",
    highlight: true,
  },
  {
    icon: Camera,
    title: "Calette Segrete Inaccessibili",
    description:
      "Raggiungi spiagge dove nessun'auto può arrivare. Parcheggia ovunque, esplora senza limiti, fotografa paradisi nascosti.",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Mi basta davvero la patente B per guidare il Raptor 700?",
    a: "Sì, in Italia il Raptor 700 è omologato come quadriciclo a motore L7e e si guida con patente B (la stessa dell'auto). Non serve patente moto. Età minima 18 anni, almeno 2 anni di patente B nel nostro caso. Per i conducenti con meno di 25 anni applichiamo un supplemento giovane.",
  },
  {
    q: "È pericoloso? Sono mai stato su un quad.",
    a: "Il Raptor 700 con i suoi 686cc e 50cv è un mezzo serio, non un giocattolo da spiaggia. Se è la tua prima volta in quad, ti facciamo un briefing pratico di 20 minuti al ritiro: posizione di guida, gestione dell'acceleratore in curva, freno motore, cosa fare in fuoristrada. Va guidato con rispetto, non con paura: a 30-40 km/h sui sentieri sterrati di Capo Ferro è perfettamente sicuro.",
  },
  {
    q: "Cosa è incluso oltre al quad?",
    a: "Casco integrale omologato ECE 22.06 incluso (taglie M/L/XL), assicurazione RCA + furto/incendio, briefing tecnico al ritiro, mappa con i 5 migliori percorsi off-road della Gallura. Su richiesta forniamo anche giacca antivento, occhialini da sterrato e guanti — utili specie a giugno e settembre.",
  },
  {
    q: "Quanta autonomia ha e dove faccio benzina?",
    a: "Serbatoio 11 litri, consumo 6-8 L/100km in uso misto strada/sterrato = autonomia 150-180 km reali. Per una giornata di esplorazione delle cale di Punta Volpe o degli sterrati di Capo Ferro è più che sufficiente. Stazione di servizio più comoda: la Q8 di Olbiamare sulla SS125, o il distributore IP di Arzachena se sei in zona Costa Smeralda.",
  },
  {
    q: "Posso entrare in spiaggia con il quad?",
    a: "No, in Sardegna è severamente vietato circolare con qualsiasi mezzo a motore sulle spiagge (multa 500-2000 € + sequestro). Il Raptor è omologato per strade pubbliche e sentieri sterrati ma non per la sabbia. Quello che puoi fare: parcheggiarlo nelle aree sterrate adiacenti (es. Cala Petra Ruja, Punta Volpe) e fare gli ultimi 50-100 metri a piedi.",
  },
  {
    q: "Si può fare il pieno o lavarlo prima di restituirlo?",
    a: "Pieno: lo riconsegni con il pieno fatto come al ritiro, oppure paghi il saldo carburante a un costo trasparente comunicato in anticipo. Lavaggio: non obbligatorio (sappiamo che usi il quad anche off-road, è normale che sia sporco). Se è coperto di fango spesso ti chiediamo solo di togliere il grosso con una scopa per non rallentare la consegna successiva.",
  },
];

const floatAnimation = {
  y: [-8, 8, -8],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const breadcrumbs = [
  { name: "Flotta", url: "/" },
  { name: "Yamaha Raptor 700", url: "/flotta/yamaha-raptor" },
];

const yamahaSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  category: "Quad",
  name: "Yamaha Raptor 700 — Noleggio Quad Olbia e Costa Smeralda",
  description:
    "Quad Yamaha Raptor 700cc omologato strada. Avventure off-road in Gallura, cale nascoste in Costa Smeralda.",
  brand: { "@type": "Brand", name: "Yamaha" },
  manufacturer: { "@type": "Organization", name: "Yamaha" },
  model: "Raptor 700",
  image:
    "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-yamaharaptor-quad.webp",
  offers: {
    "@type": "Offer",
    priceCurrency: "EUR",
    price: "250",
    availability: "https://schema.org/InStock",
    priceValidUntil: "2026-12-31",
    url: `${SITE_URL}/flotta/yamaha-raptor`,
    seller: { "@type": "Organization", name: BUSINESS_LEGAL_NAME },
  },
};

const YamahaQuadPage = () => (
  <>
    <SEOHead
      title="Noleggio Quad Yamaha Raptor 700 Sardegna | Off-Road | GDIS Rent"
      description="Noleggio quad Yamaha Raptor 700 a Olbia ✓ 686cc omologato strada ✓ Cale nascoste Costa Smeralda, off-road in Gallura ✓ Consegna diretta. WhatsApp H24."
      canonical="/flotta/yamaha-raptor"
      breadcrumbs={breadcrumbs}
      jsonLd={yamahaSchema}
    />
    <Breadcrumbs items={breadcrumbs} />

    {/* HERO */}
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.15),hsl(var(--brand-dark))_70%)]">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Yamaha Raptor 700 Quad Sardegna off-road"
          className="w-full h-full object-cover opacity-20"
        />
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
              Adrenalina pura sugli sterrati della Gallura. 686cc di potenza, sospensioni off-road, esplorazione senza
              limiti.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {["686cc", "Patente B", "Off-Road Ready"].map((badge) => (
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
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border-l-4 border-primary pl-8"
          >
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Potenza & Avventura</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">Domina ogni terreno</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Il Yamaha Raptor 700 è la macchina definitiva per esplorare la Sardegna selvaggia. Con il suo monocilindro
              da 686cc e le sospensioni da competizione, affronta sterrati, sentieri costieri e piste off-road con una
              facilità disarmante.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Raggiungi calette segrete inaccessibili in auto, attraversa la macchia mediterranea e vivi un'esperienza
              di guida che non dimenticherai. Casco integrale e briefing inclusi.
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
              alt="Spiaggia nascosta Sardegna"
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
              alt="Costa sarda off-road"
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
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
              Esplorazione Senza Limiti
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Dove le auto non arrivano
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              La Gallura nasconde sentieri costieri, percorsi tra le rocce di granito e spiagge raggiungibili solo su
              due (o quattro) ruote.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Il Raptor 700, omologato anche per strada, ti permette di alternare asfalto e sterrato in totale libertà.
              Un'esperienza unica per chi cerca l'avventura vera.
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

    {/* PERCHÉ SCEGLIERE IL QUAD */}
    <section className="py-20 md:py-24 bg-muted/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Perché scegliere il quad</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
            Quad vs SUV: avventura vera contro comfort superficiale
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Tanti turisti cercano un SUV per "fare un po' di sterrato in Sardegna". È quasi sempre la scelta sbagliata
            per due motivi: i SUV a noleggio standard hanno polizze che <strong className="text-foreground">escludono i
            danni in fuoristrada</strong> (un graffio sotto la coppa olio = €2000 di risarcimento a tuo carico), e le
            piste vere della Gallura — quelle che portano alle calette nascoste di Punta Volpe o agli sterrati di Capo
            Ferro — non sono fatte per auto, sono fatte per quad.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">Il Yamaha Raptor 700 risolve esattamente questo</strong>: 686cc, 50cv,
            sospensioni progettate per il fuoristrada, omologato strada in Italia con patente B. La nostra
            assicurazione include la copertura su sterrato (è il suo uso naturale, non un'eccezione). Il prezzo è
            premium perché il mezzo lo è — ma è l'unico modo legale e sicuro di accedere a luoghi che il 99% dei
            turisti vede solo in cartolina.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Quando NON noleggiare il quad</strong>: se viaggi in più di 1 persona
            (è monoposto), se hai bisogno di trasportare bagagli, se sei a tuo agio solo su asfalto, se piove forte
            (la guida diventa scivolosa). In quei casi consigliamo Fiat Panda + quad solo per una giornata dedicata
            all'esplorazione off-road.
          </p>
        </motion.div>
      </div>
    </section>

    {/* QUAD IN SARDEGNA */}
    <section className="py-20 md:py-24 bg-background">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Yamaha Raptor in Sardegna</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 leading-tight">
            I 4 percorsi off-road che valgono il quad
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Quando consegniamo il Raptor includiamo una mappa con questi 4 percorsi battuti dai nostri clienti
            avventurosi. Non sono trekking estremi: sono accessibili a chi guida con criterio.
          </p>
          <ul className="space-y-3 text-base md:text-lg text-foreground/85">
            <li>
              <strong className="text-foreground">
                Punta Volpe (
                <Link to="/noleggio-auto-a-porto-rotondo" className="text-blue-600 hover:underline">
                  Porto Rotondo
                </Link>
                )
              </strong>
              {" "}— sterrato di 4 km che porta a 3 calette inaccessibili in auto. Mezza giornata di esplorazione,
              difficoltà media.
            </li>
            <li>
              <strong className="text-foreground">
                Capo Ferro (
                <Link to="/noleggio-auto-a-baja-sardinia" className="text-blue-600 hover:underline">
                  Baja Sardinia
                </Link>
                )
              </strong>
              {" "}— sentieri costieri verso il faro con vista sull'arcipelago di La Maddalena. Difficoltà bassa,
              panorami da fotografare assolutamente al tramonto.
            </li>
            <li>
              <strong className="text-foreground">
                Monte Nieddu (
                <Link to="/noleggio-auto-a-san-teodoro" className="text-blue-600 hover:underline">
                  San Teodoro
                </Link>
                )
              </strong>
              {" "}— entroterra montano con cascate e piscine naturali in granito. La pista finale è dissestata
              perfetta per il quad. Giornata intera consigliata.
            </li>
            <li>
              <strong className="text-foreground">Entroterra gallurese (San Pantaleo, Arzachena)</strong>
              {" "}— sentieri tra nuraghi, ulivi secolari e formazioni granitiche tipiche della Gallura. Difficoltà
              variabile, ottimo per chi vuole vedere la Sardegna autentica oltre il mare.
            </li>
          </ul>
          <p className="text-sm text-muted-foreground mt-6">
            Cerchi qualcosa per la famiglia? Vedi la <Link to="/flotta/fiat-panda" className="text-blue-600 hover:underline">Fiat Panda Hybrid</Link>.
            Vuoi un mezzo più semplice da guidare? Considera lo <Link to="/flotta/honda-sh" className="text-blue-600 hover:underline">scooter Honda SH</Link>.
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
            Scatena l'avventura
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Prenota il tuo Yamaha Raptor 700 in meno di 2 minuti. Casco integrale e briefing inclusi.
          </p>
          <Button
            asChild
            size="xl"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold text-lg rounded-full px-12 h-16 shadow-[0_10px_40px_hsl(0_0%_0%/0.3)] hover:shadow-[0_15px_50px_hsl(0_0%_0%/0.4)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
          >
            <Link to="/prenotaora">Prenota il tuo Quad →</Link>
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

export default YamahaQuadPage;
