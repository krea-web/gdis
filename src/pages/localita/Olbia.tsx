import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import VehicleSpotlight from "@/components/localita/VehicleSpotlight";
import BentoSpots from "@/components/localita/BentoSpots";
import CockpitSpecs from "@/components/localita/CockpitSpecs";
import LocalitaTrafficTips from "@/components/localita/LocalitaTrafficTips";
import LocalitaNightlife from "@/components/localita/LocalitaNightlife";
import TrustMarquee from "@/components/home/TrustMarquee";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import Recensioni from "@/components/home/Recensioni";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { Plane, Ship } from "lucide-react";
import { motion } from "framer-motion";

const breadcrumbs = [{ name: "Olbia", url: "/noleggio-auto-a-olbia" }];

const olbiaSchema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-olbia#localbusiness",
  description:
    "Noleggio auto a Olbia con consegna in Aeroporto Costa Smeralda e Porto Isola Bianca. Flotta Fiat Panda, Mercedes, scooter Honda SH e quad Yamaha.",
  areaServed: [
    { "@type": "City", name: "Olbia" },
    { "@type": "Airport", name: "Aeroporto Olbia Costa Smeralda" },
    { "@type": "Place", name: "Porto Isola Bianca" },
  ],
});

const OlbiaPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto Olbia | Consegna VIP Aeroporto e Porto | GDIS Rent"
      description="Noleggio auto Olbia ✓ Consegna VIP in Aeroporto Costa Smeralda e Porto Isola Bianca ✓ Fiat Panda, Mercedes, scooter, quad ✓ Prezzi dal mercato. Prenota WhatsApp H24."
      canonical="/noleggio-auto-a-olbia"
      breadcrumbs={breadcrumbs}
      jsonLd={olbiaSchema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Olbia"
      subtitle="Gateway della Costa Smeralda. Consegna VIP in Aeroporto e al Porto Isola Bianca — il tuo viaggio inizia senza attese."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-olbia.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Noleggio auto Olbia aeroporto"
    />

    {/* SEZIONE AEROPORTO */}
    <section className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Plane className="h-5 w-5 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Aeroporto Olbia Costa Smeralda
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Auto pronta allo sbarco in Aeroporto
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Il nostro servizio di noleggio auto all'Aeroporto di Olbia è pensato per chi odia le code ai desk.
              Dimentica le attese estenuanti: con la nostra Consegna VIP, un nostro operatore ti attende direttamente
              agli arrivi. Che tu abbia scelto una{" "}
              <Link to="/flotta/fiat-panda" className="text-primary font-medium hover:underline transition-all">
                Fiat Panda
              </Link>{" "}
              per la famiglia o uno{" "}
              <Link to="/flotta/honda-sh" className="text-primary font-medium hover:underline transition-all">
                scooter
              </Link>{" "}
              per sfidare il traffico, il tuo viaggio inizia nel momento in cui metti piede fuori dal terminal.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary font-bold">✓</span> Zero code ai desk dell'autonoleggio
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary font-bold">✓</span> Assistenza h24 per il tuo volo
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary font-bold">✓</span> Parcheggio riservato per ritiro rapido
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden"
          >
            <img
              src="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-aeroporto-olbia.webp"
              alt="Aeroporto Olbia Costa Smeralda"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>

    {/* SEZIONE PORTO */}
    <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] rounded-2xl overflow-hidden order-2 lg:order-1"
          >
            <img
              src="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-porto-olbia.webp"
              alt="Porto Isola Bianca Olbia"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <Ship className="h-5 w-5 text-primary" />
              <span className="text-xs uppercase tracking-widest text-primary font-semibold">
                Porto di Olbia — Isola Bianca
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Noleggio Auto al Porto: sbarca e vai
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Arrivi in Sardegna con il traghetto? Il nostro servizio di noleggio auto al Porto di Olbia Isola Bianca
              copre tutti i principali moli di sbarco. Ti consegniamo il veicolo (auto, scooter o quad) direttamente
              sotto la nave o al terminal crociere. Ideale per chi vuole raggiungere rapidamente{" "}
              <Link
                to="/noleggio-auto-a-porto-cervo"
                className="text-primary font-medium hover:underline transition-all"
              >
                Porto Cervo
              </Link>{" "}
              o{" "}
              <Link
                to="/noleggio-auto-a-san-teodoro"
                className="text-primary font-medium hover:underline transition-all"
              >
                San Teodoro
              </Link>{" "}
              senza dipendere dai mezzi pubblici o taxi costosi.
            </p>
            <div className="bg-card/60 border border-border/50 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-foreground mb-2">Perché sceglierci al Porto?</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Consegniamo il veicolo in base all'orario effettivo di sbarco della tua nave, gestendo in autonomia
                eventuali ritardi dei traghetti Moby, Tirrenia e GNV.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <VehicleSpotlight
      tag="Il Veicolo Giusto per Olbia"
      title="Dalla Fiat Panda alla Mercedes: scegli il tuo stile"
      description="Olbia è il punto di partenza perfetto per esplorare tutta la Costa Smeralda. Scegli la Fiat Panda per la praticità urbana e i consumi ridotti, l'Honda SH per muoverti agile nel traffico estivo, oppure la Mercedes Classe A per un'esperienza premium. Tutti i veicoli vengono consegnati con il pieno e climatizzatore acceso."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-fiatpandablu-noleggiocostasmeralda.webp"
      imageAlt="Flotta veicoli noleggio Olbia"
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Consegna VIP Aeroporto
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Consegna al Porto
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">Assistenza H24</span>
      </div>
    </VehicleSpotlight>

    <BentoSpots
      name="Olbia"
      spots={[
        {
          name: "Spiaggia Pittulongu",
          subtitle: "La spiaggia di Olbia",
          desc: "A soli 10 minuti dal centro, sabbia bianca e acque turchesi.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-spiaggia-pittulongu-olbia.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Corso Umberto",
          desc: "Il cuore dello shopping e della movida serale olbiese.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-corso-umberto-olbia.webp",
        },
        {
          name: "Basilica di San Simplicio",
          desc: "Gioiello romanico, simbolo storico della città.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-chiesa-san-simplicio-olbia.webp",
        },
        {
          name: "Porto Istana",
          desc: "Spiaggia caraibica con vista sull'isola di Tavolara.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-porto-istana-olbia.webp",
          span: "md:col-span-2",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Fiat Panda Hybrid"
      specs={[
        { label: "Patente", value: "B", icon: "license" },
        { label: "Posti", value: "4-5", icon: "seats" },
        { label: "Ideale per", value: "Famiglie & Coppie", icon: "use" },
        { label: "Consegna", value: "Aeroporto / Porto", icon: "delivery" },
      ]}
    />

    <LocalitaTrafficTips
      name="Olbia"
      tips={[
        {
          icon: "parking",
          title: "Parcheggio Aeroporto",
          text: "Parcheggi a pagamento al terminal. Con il nostro servizio VIP non ti serve: ti consegniamo l'auto direttamente.",
        },
        {
          icon: "traffic",
          title: "Traffico Estivo",
          text: "La SS125 verso sud e la SS131 verso Porto Cervo si congestionano nei weekend. Parti presto o scegli lo scooter.",
        },
        {
          icon: "ztl",
          title: "Centro Storico",
          text: "Corso Umberto è ZTL nelle sere estive. Parcheggia nelle vie laterali — la Panda entra ovunque.",
        },
        {
          icon: "tip",
          title: "Verso la Costa Smeralda",
          text: (
            <>
              In 30 minuti raggiungi{" "}
              <Link
                to="/noleggio-auto-a-porto-cervo"
                className="text-primary font-medium hover:underline transition-all"
              >
                Porto Cervo
              </Link>{" "}
              e in 20 minuti{" "}
              <Link
                to="/noleggio-auto-a-golfo-aranci"
                className="text-primary font-medium hover:underline transition-all"
              >
                Golfo Aranci
              </Link>
              .
            </>
          ),
        },
      ]}
    />

    <LocalitaNightlife
      name="Olbia"
      locali={[
        {
          name: "Jazz Hotel Rooftop",
          type: "lounge",
          desc: "Cocktail con vista panoramica sulla città e sul golfo. Atmosfera raffinata.",
        },
        {
          name: "Corso Umberto",
          type: "aperitivo",
          desc: "La passeggiata serale con decine di bar e lounge. L'aperitivo olbiese per eccellenza.",
        },
        {
          name: "Officina del Gusto",
          type: "ristorante",
          desc: "Cucina sarda contemporanea con ingredienti km0. Prenota in anticipo in alta stagione.",
        },
        {
          name: "Trattoria Il Porto",
          type: "ristorante",
          desc: "Pesce freschissimo direttamente dai pescatori del porto. Fregola con arselle imperdibile.",
        },
        {
          name: "B-Side",
          type: "club",
          desc: "Il locale notturno di riferimento. Musica live e DJ set nei weekend estivi.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Olbia"
      emitSchema
      faqs={[
        {
          q: "Consegnate l'auto direttamente all'Aeroporto di Olbia?",
          a: "Sì! Con il servizio Consegna VIP, un nostro operatore ti attende agli arrivi del terminal con il veicolo pronto, climatizzato e con il pieno fatto. Zero attese.",
        },
        {
          q: "Posso ritirare il veicolo al Porto Isola Bianca?",
          a: "Certamente. Consegniamo al porto in base all'orario effettivo di sbarco della tua nave (Moby, Tirrenia, GNV). Gestiamo anche eventuali ritardi del traghetto.",
        },
        {
          q: "Quali veicoli sono disponibili a Olbia?",
          a: (
            <>
              Tutta la nostra flotta:{" "}
              <Link to="/flotta/fiat-panda" className="text-primary font-medium hover:underline transition-all">
                Fiat Panda
              </Link>
              ,{" "}
              <Link to="/flotta/honda-sh" className="text-primary font-medium hover:underline transition-all">
                Honda SH
              </Link>
              ,{" "}
              <Link to="/flotta/yamaha-raptor" className="text-primary font-medium hover:underline transition-all">
                Yamaha Raptor
              </Link>{" "}
              e{" "}
              <Link
                to="/flotta/mercedes-classe-a180d"
                className="text-primary font-medium hover:underline transition-all"
              >
                Mercedes Classe A
              </Link>
              .
            </>
          ),
        },
        {
          q: "Quanto tempo ci vuole per raggiungere Porto Cervo da Olbia?",
          a: (
            <>
              Circa 30 minuti via SS125. Con la{" "}
              <Link to="/flotta/fiat-panda" className="text-primary font-medium hover:underline transition-all">
                Fiat Panda
              </Link>{" "}
              o la{" "}
              <Link
                to="/flotta/mercedes-classe-a180d"
                className="text-primary font-medium hover:underline transition-all"
              >
                Mercedes
              </Link>{" "}
              il viaggio è comodo e panoramico.
            </>
          ),
        },
        {
          q: "Accettate pagamenti senza carta di credito?",
          a: "Contattaci su WhatsApp per soluzioni di noleggio personalizzate anche senza carta di credito tradizionale.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Olbia è solo l'inizio. Esplora le spiagge di{" "}
          <Link to="/noleggio-auto-a-porto-cervo" className="text-primary font-medium hover:underline transition-all">
            Porto Cervo
          </Link>{" "}
          o il relax di{" "}
          <Link to="/noleggio-auto-a-san-teodoro" className="text-primary font-medium hover:underline transition-all">
            San Teodoro
          </Link>{" "}
          con i nostri mezzi.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Olbia" />
  </>
);

export default OlbiaPage;
