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

const breadcrumbs = [{ name: "Golfo Aranci", url: "/noleggio-auto-a-golfo-aranci" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-golfo-aranci#localbusiness",
  description:
    "Noleggio auto e scooter a Golfo Aranci con consegna al terminal traghetti. Cala Moresca, delfini e ristoranti di pesce a pochi minuti.",
  areaServed: [
    { "@type": "City", name: "Golfo Aranci" },
    { "@type": "Place", name: "Porto di Golfo Aranci" },
  ],
});

const GolfoAranciPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto Golfo Aranci | Consegna al Traghetto | GDIS Rent"
      description="Noleggio auto Golfo Aranci ✓ Consegna al terminal traghetti ✓ Fiat Panda, scooter, quad ✓ Cala Moresca e ristoranti di pesce. Prenota WhatsApp H24."
      canonical="/noleggio-auto-a-golfo-aranci"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Golfo Aranci"
      subtitle="Sbarca dal traghetto e il tuo veicolo è già pronto. Fiat Panda: la compagna perfetta per esplorare la Gallura."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-noleggio-golfo-aranci.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Fiat Panda Golfo Aranci"
    />

    <VehicleSpotlight
      tag="Flessibilità Totale"
      title="La Panda Ti Aspetta allo Sbarco del Traghetto"
      description="Golfo Aranci è la porta d'ingresso alla Gallura per chi arriva via mare. Il nostro servizio più richiesto? Ti aspettiamo direttamente allo sbarco con la tua Fiat Panda pronta, climatizzata, e con il pieno fatto. Nessuna coda, nessun transfer — sbarchi, sali, e in 15 minuti sei già a Cala Moresca per il primo bagno. La Panda è agile in città, economica sui consumi, e abbastanza spaziosa per tutta la famiglia e i bagagli."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-fiatpandablu-noleggiocostasmeralda.webp"
      imageAlt="Porto di Golfo Aranci"
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Consegna al traghetto
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">Climatizzatore</span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">Consumi ridotti</span>
      </div>
    </VehicleSpotlight>

    <BentoSpots
      name="Golfo Aranci"
      spots={[
        {
          name: "Cala Moresca",
          subtitle: "Snorkeling Paradise",
          desc: "Piccola baia protetta con acque cristalline.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-spiaggia-cala-moresca-golfo-aranci.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Spiaggia Bianca",
          desc: "Sabbia candida e acque turchesi, una delle spiagge più belle della costa nord-orientale.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-spiaggia-bianca-golfo-aranci.webp",
        },
        {
          name: "Capo Figari",
          desc: "Promontorio selvaggio con sentieri panoramici e la storica stazione radio di Marconi.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-capo-figari-golfo-aranci.webp",
        },
        {
          name: "Delfini nel Golfo",
          desc: "Escursioni per avvistare i delfini. Un'esperienza unica.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-delfini-golfo-aranci.webp",
          span: "md:col-span-2",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Fiat Panda Hybrid"
      specs={[
        { label: "Patente", value: "B", icon: "license" },
        { label: "Posti", value: "4-5", icon: "seats" },
        { label: "Ideale per", value: "Famiglie & Turismo", icon: "use" },
        { label: "Consegna", value: "Terminal Traghetti", icon: "delivery" },
      ]}
    />

    <LocalitaTrafficTips
      name="Golfo Aranci"
      tips={[
        {
          icon: "parking",
          title: "Terminal Traghetti",
          text: "Il parcheggio vicino al porto si riempie durante gli sbarchi. Ritira la Panda e parti subito.",
        },
        {
          icon: "traffic",
          title: "Sbarco Weekend",
          text: "Venerdì e domenica il traffico aumenta. Con la Panda prendi le vie laterali ed eviti la coda.",
        },
        {
          icon: "ztl",
          title: "Lungomare",
          text: "Il lungomare è pedonale la sera in estate. Parcheggia nelle vie parallele — la Panda entra ovunque.",
        },
        {
          icon: "tip",
          title: "Verso Porto Rotondo",
          text: (<>In 20 minuti di panoramica raggiungi <Link to="/noleggio-auto-a-porto-rotondo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Rotondo</Link> e le sue spiagge esclusive.</>),
        },
      ]}
    />

    <LocalitaNightlife
      name="Golfo Aranci"
      locali={[
        {
          name: "Terza Spiaggia",
          type: "ristorante",
          desc: "Pesce con i piedi nella sabbia. Frittura di paranza leggendaria e aragosta alla griglia.",
        },
        {
          name: "Il Vecchio Porto",
          type: "ristorante",
          desc: "Trattoria marinara autentica. Fregola con arselle da non perdere.",
        },
        {
          name: "Bar del Porto",
          type: "aperitivo",
          desc: "L'aperitivo dei pescatori. Prosecco e ostriche guardando i traghetti.",
        },
        {
          name: "Lido Blu",
          type: "lounge",
          desc: "Beach bar con musica al tramonto. Cocktail tropicali e piedi nell'acqua.",
        },
        {
          name: "Capo Figari",
          type: "ristorante",
          desc: "Cucina di mare raffinata con terrazza panoramica sul golfo.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Golfo Aranci"
      emitSchema
      faqs={[
        {
          q: "Consegnate la Panda direttamente al terminal traghetti?",
          a: "Sì! È il nostro servizio più richiesto a Golfo Aranci. Ti aspettiamo allo sbarco con il veicolo pronto. Comunicaci l'orario del traghetto e pensiamo a tutto.",
        },
        {
          q: "Quanto costa il parcheggio vicino al porto?",
          a: "Circa €2/ora in estate. Con la Panda trovi facilmente posto nelle vie laterali gratuite. In scooter parcheggi gratis ovunque.",
        },
        {
          q: "Posso esplorare la costa nord con la Fiat Panda?",
          a: (
            <>Assolutamente! Da Golfo Aranci raggiungi <Link to="/noleggio-auto-a-porto-rotondo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Rotondo</Link> in 20 minuti e <Link to="/noleggio-auto-a-san-teodoro" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">San Teodoro</Link> in 40. La Panda è perfetta per le strade costiere.</>
          ),
        },
        {
          q: "Noleggiate anche scooter e quad a Golfo Aranci?",
          a: (
            <>Certo! <Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Honda SH</Link> per il centro e le spiagge, <Link to="/flotta/yamaha-raptor" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Yamaha Raptor</Link> per l'entroterra. Consegna VIP inclusa.</>
          ),
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da Golfo Aranci esplora verso sud{" "}
          <Link to="/noleggio-auto-a-porto-rotondo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Rotondo
          </Link>{" "}
          — la Marina e le cale nascoste ti aspettano a 20 minuti di Panda.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Golfo Aranci" />
  </>
);

export default GolfoAranciPage;
