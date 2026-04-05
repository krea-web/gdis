import SEOHead from "@/components/SEOHead";
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

const SanPantaleoPage = () => (
  <>
    <SEOHead
      title="Noleggio Scooter a San Pantaleo | Borgo Bohémien Gallura | GDIS Rent"
      description="Noleggia Honda SH a San Pantaleo, il borgo bohémien della Gallura. Mercato del giovedì, strade strette e montagne di granito. GDIS Rent."
      canonical="/localita/noleggio-san-pantaleo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - San Pantaleo",
        description: "Noleggio scooter Honda SH a San Pantaleo, Gallura",
        areaServed: "San Pantaleo",
      }}
    />

    <LocalitaHeroV2
      name="San Pantaleo"
      subtitle="Strade strette, mercati artigianali e montagne di granito. Lo scooter è l'unico modo per vivere questo borgo."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-noleggio-san-pantaleo.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
      vehicleAlt="Honda SH 125 San Pantaleo"
    />

    <VehicleSpotlight
      tag="Perfetto per il Borgo"
      title="Lo Scooter nelle Strade Strette di San Pantaleo"
      description="San Pantaleo non è fatto per le auto. Le vie del borgo sono strette, tortuose, e il giovedì mattina — giorno del leggendario mercato artigianale — trovare parcheggio è praticamente impossibile. L'Honda SH 125 è il veicolo perfetto: agile tra i vicoli, parcheggi ovunque, e quando hai voglia di lusso scendi a Porto Cervo in 15 minuti lungo una strada panoramica tra rocce di granito."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash350-costasmeralda.webp"
      imageAlt="Strade di San Pantaleo"
      reverse
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Agile nei vicoli
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Parcheggio zero stress
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          15 min da Porto Cervo
        </span>
      </div>
    </VehicleSpotlight>

    <BentoSpots
      name="San Pantaleo"
      spots={[
        {
          name: "Mercato del Giovedì",
          subtitle: "Arte e Tradizione",
          desc: "Artigianato locale, ceramiche, tessuti sardi e street food. Imperdibile.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-mercatino-san-pantaleo.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Rocce di Granito",
          desc: "Formazioni granitiche spettacolari. Tramonto indimenticabile.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-rocce-san-pantaleo.webp",
        },
        {
          name: "Chiesa di San Pantaleo",
          desc: "La piccola chiesa parrocchiale nel cuore del borgo, cornice delle feste patronali d'estate.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-san-pantaleo-chiesa.webp",
        },
        {
          name: "Il Borgo di San Pantaleo",
          desc: "Vicoli in pietra, piazzette nascoste e panorami sulle montagne di granito della Gallura.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-san-pantaleo.webp",
          span: "md:col-span-2",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Honda SH 125i"
      specs={[
        { label: "Patente", value: "B / AM", icon: "license" },
        { label: "Posti", value: "2", icon: "seats" },
        { label: "Ideale per", value: "Borghi & Vicoli", icon: "use" },
        { label: "Consegna", value: "San Pantaleo", icon: "delivery" },
      ]}
    />

    <LocalitaTrafficTips
      name="San Pantaleo"
      tips={[
        {
          icon: "parking",
          title: "Giovedì = Scooter",
          text: "Il giorno del mercato è impossibile parcheggiare l'auto. In scooter arrivi, parcheggi e ti godi l'atmosfera.",
        },
        {
          icon: "ztl",
          title: "Strade Strette",
          text: "Le vie del borgo sono strette e in pendenza. L'Honda SH 125 le naviga senza sforzo.",
        },
        {
          icon: "traffic",
          title: "SP13 Panoramica",
          text: "La strada verso Arzachena è bella ma con curve. Guida con calma e goditi il panorama.",
        },
        {
          icon: "tip",
          title: "Scendi a Porto Cervo",
          text: (<>In 15 minuti di scooter sei sulla Promenade du Port di <Link to="/localita/noleggio-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Cervo</Link> per una cena vista yacht.</>),
        },
      ]}
    />

    <LocalitaNightlife
      name="San Pantaleo"
      locali={[
        {
          name: "Giagoni",
          type: "ristorante",
          desc: "Cucina gallurese contemporanea con ingredienti a km zero. Zuppa gallurese memorabile.",
        },
        {
          name: "Café Nina",
          type: "aperitivo",
          desc: "Aperitivi artigianali nella piazzetta. Atmosfera bohémien e musica acustica il venerdì.",
        },
        {
          name: "Wine Bar L'Artigiano",
          type: "aperitivo",
          desc: "Cannonau e Vermentino locali. Taglieri di formaggi sardi artigianali.",
        },
        {
          name: "Agriturismo Li Paràuli",
          type: "ristorante",
          desc: "Esperienza rurale autentica a 5 minuti dal centro. Menu fisso con prodotti dell'azienda.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="San Pantaleo"
      faqs={[
        {
          q: "Come arrivo al mercato del giovedì senza problemi di parcheggio?",
          a: (<>In <Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">scooter Honda SH</Link>! Il giovedì mattina è impossibile trovare posto auto. Lo scooter parcheggia a 2 passi dalla piazza.</>),
        },
        {
          q: "Posso raggiungere Porto Cervo da San Pantaleo in scooter?",
          a: (
            <>Certo! <Link to="/localita/noleggio-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Cervo</Link> è a soli 15 minuti lungo una strada panoramica spettacolare tra le rocce di granito della Gallura.</>
          ),
        },
        {
          q: "Consegnate lo scooter direttamente a San Pantaleo?",
          a: "Sì, consegna VIP al tuo alloggio a San Pantaleo. Contattaci su WhatsApp per organizzare.",
        },
        {
          q: "Il quad è adatto per l'entroterra di San Pantaleo?",
          a: (
            <>Assolutamente. L'entroterra gallurese è pieno di sentieri sterrati perfetti per il{" "}
              <Link to="/flotta/yamaha-raptor" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Yamaha Raptor 700</Link>. Serve la patente B.</>
          ),
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da San Pantaleo scendi verso{" "}
          <Link to="/localita/noleggio-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Cervo
          </Link>{" "}
          per lo shopping di lusso e la Marina — 15 minuti di curve panoramiche.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="San Pantaleo" />
  </>
);

export default SanPantaleoPage;
