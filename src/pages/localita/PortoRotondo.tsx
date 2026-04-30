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
import LocalitaInlineCTA from "@/components/localita/LocalitaInlineCTA";
import VehicleComparisonTable from "@/components/localita/VehicleComparisonTable";
import { Link } from "react-router-dom";

const breadcrumbs = [{ name: "Porto Rotondo", url: "/noleggio-auto-a-porto-rotondo" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-porto-rotondo#localbusiness",
  description:
    "Noleggio quad Yamaha Raptor, auto e scooter a Porto Rotondo. Ideale per raggiungere cale nascoste e Punta Volpe.",
  areaServed: [
    { "@type": "City", name: "Porto Rotondo" },
    { "@type": "AdministrativeArea", name: "Costa Smeralda" },
  ],
});

const PortoRotondoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto Porto Rotondo | Quad per Punta Volpe e Marinella | GDIS Rent"
      description="Noleggio Yamaha Raptor 700, Fiat Panda e scooter a Porto Rotondo ✓ Cale di Punta Volpe e Marinella raggiungibili off-road ✓ Consegna in Marina, villa o Piazzetta. WhatsApp H24."
      canonical="/noleggio-auto-a-porto-rotondo"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Porto Rotondo"
      subtitle="L'eleganza della Piazzetta San Marco di giorno, le cale segrete di Punta Volpe nel pomeriggio. Solo il quad ti permette di vivere entrambi i lati di Porto Rotondo nella stessa giornata."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-noleggio-porto-rotondo.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Yamaha Raptor 700 Porto Rotondo"
    />

    <VehicleSpotlight
      tag="Avventura Off-Road"
      title="Il Quad Apre le Cale Segrete di Porto Rotondo"
      description="Porto Rotondo è due posti diversi nella stessa cartina. C'è il borgo elegante progettato negli anni '60 dai conti Donà delle Rose, con la Piazzetta San Marco e l'anfiteatro di Andrea Cascella, dove si beve l'aperitivo guardando le barche a vela rientrare in Marina. E poi c'è il Porto Rotondo selvaggio: le calette di Punta Volpe, le insenature di Marinella, gli sterrati che salgono verso la macchia mediterranea sopra Cugnana. Per vivere il primo basta una Fiat Panda Hybrid — entra nella zona pedonale, parcheggia in via dei Lecci, ti gusti la Piazzetta. Per vivere il secondo serve un mezzo diverso: il Yamaha Raptor 700, quad omologato con patente B, sospensioni off-road e potenza da 686cc, è il veicolo che apre tutte le porte. Imbocchi la pista di terra battuta che le auto non possono prendere, e in 10 minuti sei su una caletta dove ci sono 4 persone in tutto. Per chi non vuole rinunciare a nulla, il combo perfetto è scooter Honda SH per i giorni in Piazzetta + quad noleggiato per una giornata sola dedicata all'esplorazione delle cale: massima libertà, costo contenuto. La Marina di Porto Rotondo è il secondo porto turistico più grande del Mediterraneo dopo Porto Cervo: per chi arriva in barca, organizziamo la consegna direttamente al pontile."
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

    <LocalitaInlineCTA name="Porto Rotondo" />

    <BentoSpots
      name="Porto Rotondo"
      spots={[
        {
          name: "Piazzetta San Marco",
          subtitle: "Cuore del Borgo",
          desc: "Anfiteatro con sculture di Andrea Cascella. L'aperitivo perfetto.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-piazzetta-san-marco-porto-rotondo.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Spiaggia di Ira",
          desc: "Due baie gemelle con acque limpide e fondali per lo snorkeling.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-porto-rotondo-spiaggia-ira.webp",
        },
        {
          name: "Marina di Porto Rotondo",
          desc: "Porto turistico elegante con barche a vela e ristoranti sulla banchina.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-marina-porto-rotondo.webp",
        },
        {
          name: "Punta Volpe",
          desc: "Litorale selvaggio con calette raggiungibili solo in quad.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-rotondo/gdisrent-spiaggia-punta-volpe-porto-rotondo.webp",
          span: "md:col-span-2",
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

    <VehicleComparisonTable
      title="Quale veicolo per Porto Rotondo?"
      subtitle="Quad per le cale, Panda per la Piazzetta. Ecco la differenza."
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
      emitSchema
      faqs={[
        {
          q: "Consegnate il quad alla Marina di Porto Rotondo?",
          a: (
            <>Sì! Consegna VIP alla Marina, al tuo hotel o alla villa. Il{" "}
              <Link to="/flotta/yamaha-raptor" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Yamaha Raptor 700</Link> ti aspetta pronto per l'avventura.</>
          ),
        },
        {
          q: "Serve la patente per il quad Yamaha Raptor?",
          a: "Sì, serve la patente B. Il Raptor 700 è un veicolo potente che richiede esperienza di guida.",
        },
        {
          q: "Posso raggiungere le cale nascoste senza quad?",
          a: "Punta Volpe è raggiungibile a piedi con un sentiero di circa 30 minuti dal parcheggio più vicino, ma in alta stagione il parcheggio si esaurisce alle 9:00. Marinella è invece praticamente off-limits senza un mezzo a 4 ruote motrici o un quad: la pista di accesso è dissestata e le auto a noleggio standard sono escluse dalle assicurazioni se ci si avventura. Il quad risolve entrambi i problemi.",
        },
        {
          q: "Quanto dura la batteria di una giornata di quad off-road?",
          a: "Il Yamaha Raptor è benzina (non elettrico), serbatoio da 11 litri = circa 150-180 km di autonomia in uso misto on/off road. Per una giornata standard di esplorazione delle cale di Porto Rotondo basta e avanza. Stazione di servizio più comoda: la Q8 di Olbiamare, sulla SS125.",
        },
        {
          q: "Noleggiate anche scooter e auto a Porto Rotondo?",
          a: (
            <>Certo! Offriamo <Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Honda SH</Link> per il centro,{" "}
              <Link to="/flotta/fiat-panda" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Fiat Panda</Link> per le famiglie, e auto VIP su richiesta WhatsApp.</>
          ),
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Porto Rotondo è il punto d'equilibrio della Costa Smeralda: meno mondano di Porto Cervo, più strutturato di
          Baja Sardinia, vicinissimo a Olbia. Dopo l'avventura off-road tra le cale, sali in 25 minuti al borgo
          collinare di{" "}
          <Link to="/noleggio-auto-a-san-pantaleo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            San Pantaleo
          </Link>{" "}
          per il mercato del giovedì e la cucina gallurese del Giagoni; oppure scendi in 15 minuti sul porto di Olbia
          per cenare al{" "}
          <Link to="/noleggio-auto-a-olbia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Trattoria Il Porto
          </Link>{" "}
          con la fregola di arselle. Per chi viaggia in famiglia o gruppo, suggeriamo Porto Rotondo come base: prezzi
          più ragionevoli rispetto a Porto Cervo, accessi facili a tutta la zona, e una flotta a noleggio che permette
          di adattare il mezzo a ogni giornata.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Porto Rotondo" />
  </>
);

export default PortoRotondoPage;
