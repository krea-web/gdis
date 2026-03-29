import SEOHead from "@/components/SEOHead";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import VehicleSpotlight from "@/components/localita/VehicleSpotlight";
import MasonrySpots from "@/components/localita/MasonrySpots";
import CockpitSpecs from "@/components/localita/CockpitSpecs";
import LocalitaTrafficTips from "@/components/localita/LocalitaTrafficTips";
import LocalitaNightlife from "@/components/localita/LocalitaNightlife";
import TrustMarquee from "@/components/home/TrustMarquee";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import Recensioni from "@/components/home/Recensioni";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";

const GolfoAranciPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto a Golfo Aranci | Consegna al Traghetto | GDIS Rent"
      description="Noleggia la Fiat Panda a Golfo Aranci con consegna al terminal traghetti. Cala Moresca, delfini e ristoranti di pesce. GDIS Rent."
      canonical="/localita/golfo-aranci"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Golfo Aranci",
        description: "Noleggio Fiat Panda con consegna al terminal traghetti di Golfo Aranci",
        areaServed: "Golfo Aranci",
      }}
    />

    <LocalitaHeroV2
      name="Golfo Aranci"
      subtitle="Sbarca dal traghetto e il tuo veicolo è già pronto. Fiat Panda: la compagna perfetta per esplorare la Gallura."
      bgImage="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
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

    <MasonrySpots
      name="Golfo Aranci"
      spots={[
        {
          name: "Cala Moresca",
          desc: "Piccola baia protetta con acque cristalline. Paradiso per lo snorkeling.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Spiaggia Bianca",
          desc: "La spiaggia principale: sabbia bianchissima e servizi completi.",
          image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Capo Figari",
          desc: "Riserva naturale con sentieri panoramici e la storica stazione radio di Marconi.",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Delfini nel Golfo",
          desc: "Escursioni in barca per avvistare i delfini. Un'esperienza unica in Sardegna.",
          image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
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
          text: "In 20 minuti di panoramica raggiungi Porto Rotondo e le sue spiagge esclusive.",
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
          a: "Assolutamente! Da Golfo Aranci raggiungi Porto Rotondo in 20 minuti e San Teodoro in 40. La Panda è perfetta per le strade costiere.",
        },
        {
          q: "Noleggiate anche scooter e quad a Golfo Aranci?",
          a: "Certo! Honda SH per il centro e le spiagge, Yamaha Raptor per l'entroterra. Consegna VIP inclusa.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da Golfo Aranci esplora verso sud{" "}
          <Link to="/localita/porto-rotondo" className="text-primary font-semibold hover:underline">
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
