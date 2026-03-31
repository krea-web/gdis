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

const PortoRotondoPage = () => (
  <>
    <SEOHead
      title="Noleggio Quad a Porto Rotondo | Cale Nascoste Off-Road | GDIS Rent"
      description="Noleggia il Yamaha Raptor 700 a Porto Rotondo. Raggiungi cale nascoste, esplora Punta Volpe e vivi l'avventura off-road. GDIS Rent."
      canonical="/localita/noleggio-porto-rotondo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Porto Rotondo",
        description: "Noleggio quad Yamaha Raptor a Porto Rotondo",
        areaServed: "Porto Rotondo",
      }}
    />

    <LocalitaHeroV2
      name="Porto Rotondo"
      subtitle="Cale nascoste raggiungibili solo off-road. Il Yamaha Raptor 700 ti porta dove le auto non arrivano."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-noleggio-porto-rotondo.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
      vehicleAlt="Yamaha Raptor 700 Porto Rotondo"
    />

    <VehicleSpotlight
      tag="Avventura Off-Road"
      title="Il Quad Apre le Cale Segrete di Porto Rotondo"
      description="Porto Rotondo è eleganza sulla superficie, ma la vera magia si nasconde nelle calette di Punta Volpe, nelle spiagge di Marinella raggiungibili solo via sterrato, e nei sentieri che si arrampicano tra la macchia mediterranea. Il Yamaha Raptor 700 è progettato per questo: sospensioni off-road, potenza da vendere, e la capacità di portarti dove nessuna auto potrà mai arrivare. Esplora, scopri, conquista — e al tramonto torna sulla Piazzetta San Marco per l'aperitivo."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-quad-yamaharaptor-costasmeraldaoffroad.webp"
      imageAlt="Cale nascoste Porto Rotondo"
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Sospensioni off-road
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Patente B obbligatoria
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Cale irraggiungibili
        </span>
      </div>
    </VehicleSpotlight>

    <MasonrySpots
      name="Porto Rotondo"
      spots={[
        {
          name: "Spiaggia di Ira",
          desc: "Due baie gemelle separate da uno sperone roccioso. Acque limpide e fondali per lo snorkeling.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-porto-rotondo-spiaggia-ira.webp",
        },
        {
          name: "Piazzetta San Marco",
          desc: "Anfiteatro all'aperto con sculture di Andrea Cascella. L'aperitivo perfetto.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-piazzetta-san-marco-porto-rotondo.webp",
        },
        {
          name: "Punta Volpe",
          desc: "Litorale selvaggio con calette raggiungibili solo in quad o a piedi.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-spiaggia-punta-volpe-porto-rotondo.webp",
        },
        {
          name: "Spiaggia dei Sassi",
          desc: "Caletta intima con pochi turisti. Massima privacy.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-spiaggia-dei-sassi-porto-rotondo.webp",
        },
        {
          name: "Marina di Porto Rotondo",
          desc: "Yacht e barche a vela. L'eleganza discreta della Costa Smeralda.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-marina-porto-rotondo.webp",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Yamaha Raptor 700R"
      specs={[
        { label: "Patente", value: "B", icon: "license" },
        { label: "Posti", value: "1", icon: "seats" },
        { label: "Ideale per", value: "Off-Road & Cale", icon: "use" },
        { label: "Consegna", value: "Marina / Hotel", icon: "delivery" },
      ]}
    />

    <LocalitaTrafficTips
      name="Porto Rotondo"
      tips={[
        {
          icon: "parking",
          title: "Piazzetta Parking",
          text: "Parcheggio limitato vicino alla Piazzetta. In quad o scooter trovi posto ovunque.",
        },
        {
          icon: "traffic",
          title: "Olbia-Porto Rotondo",
          text: "Il tratto è trafficato nelle ore di punta estive. Il quad prende le scorciatoie sterrate.",
        },
        {
          icon: "ztl",
          title: "Centro Pedonale",
          text: "La Piazzetta e il lungomare sono pedonali. Lo scooter parcheggia nelle aree dedicate.",
        },
        {
          icon: "tip",
          title: "Cale in Quad",
          text: "Le calette di Punta Volpe e Marinella sono perfette per il quad: strade sterrate e zero folla.",
        },
      ]}
    />

    <LocalitaNightlife
      name="Porto Rotondo"
      locali={[
        {
          name: "S'Astore",
          type: "ristorante",
          desc: "Alta cucina sarda con vista sulla baia. Aragoste e ricci di mare freschi.",
        },
        {
          name: "Country Club",
          type: "lounge",
          desc: "Pool bar esclusivo con dj set al tramonto. Dress code elegante.",
        },
        {
          name: "Bar della Piazzetta",
          type: "aperitivo",
          desc: "L'aperitivo serale con vino sardo e taglieri di pecorino. Vista anfiteatro.",
        },
        {
          name: "Tartarughino",
          type: "ristorante",
          desc: "Pesce alla griglia e pasta fresca sulla terrazza con vista Marina.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Porto Rotondo"
      faqs={[
        {
          q: "Consegnate il quad alla Marina di Porto Rotondo?",
          a: "Sì! Consegna VIP alla Marina, al tuo hotel o alla villa. Il Yamaha Raptor 700 ti aspetta pronto per l'avventura.",
        },
        {
          q: "Serve la patente per il quad Yamaha Raptor?",
          a: "Sì, serve la patente B. Il Raptor 700 è un veicolo potente che richiede esperienza di guida.",
        },
        {
          q: "Posso raggiungere le cale nascoste senza quad?",
          a: "Alcune spiagge come Punta Volpe sono raggiungibili a piedi (30+ minuti) ma il quad è infinitamente più comodo e veloce.",
        },
        {
          q: "Noleggiate anche scooter e auto a Porto Rotondo?",
          a: "Certo! Offriamo Honda SH per il centro, Fiat Panda per le famiglie, e auto VIP su richiesta WhatsApp.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Dopo l'avventura off-road, sali verso il borgo montano di{" "}
          <Link to="/localita/noleggio-san-pantaleo" className="text-primary font-semibold hover:underline">
            San Pantaleo
          </Link>{" "}
          per il mercato del giovedì e la cucina gallurese.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Porto Rotondo" />
  </>
);

export default PortoRotondoPage;
