import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import VehicleSpotlight from "@/components/localita/VehicleSpotlight";
import LocalitaTopSpots from "@/components/localita/LocalitaTopSpots";
import CockpitSpecs from "@/components/localita/CockpitSpecs";
import LocalitaTrafficTips from "@/components/localita/LocalitaTrafficTips";
import LocalitaNightlife from "@/components/localita/LocalitaNightlife";
import TrustMarquee from "@/components/home/TrustMarquee";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaTrustBlock from "@/components/localita/LocalitaTrustBlock";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import LocalitaInlineCTA from "@/components/localita/LocalitaInlineCTA";
import VehicleComparisonTable from "@/components/localita/VehicleComparisonTable";
import { Link } from "react-router-dom";

const breadcrumbs = [{ name: "San Pantaleo", url: "/noleggio-auto-a-san-pantaleo" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-san-pantaleo#localbusiness",
  description:
    "Noleggio scooter Honda SH e auto a San Pantaleo: borgo bohémien della Gallura, mercato del giovedì e trekking in granito.",
  areaServed: [
    { "@type": "City", name: "San Pantaleo" },
    { "@type": "AdministrativeArea", name: "Gallura" },
  ],
});

const SanPantaleoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto San Pantaleo | Borgo Gallurese e Mercato Giovedì | GDIS Rent"
      description="Noleggio scooter Honda SH e Fiat Panda a San Pantaleo ✓ Vicoli stretti, mercato del giovedì, rocce di granito ✓ A 15 minuti da Porto Cervo ✓ Consegna nel borgo. WhatsApp H24."
      canonical="/noleggio-auto-a-san-pantaleo"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="San Pantaleo"
      subtitle="Il borgo bohémien della Gallura: vicoli in pietra, mercatino artigianale del giovedì, rocce di granito che catturano la luce al tramonto. A 15 minuti dalle Marina di Porto Cervo, ma in un altro mondo."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-pantaleo/gdisrent-noleggio-san-pantaleo.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Honda SH 125 San Pantaleo"
    />

    <VehicleSpotlight
      tag="Perfetto per il Borgo"
      title="Lo Scooter nelle Strade Strette di San Pantaleo"
      description="Chi sceglie San Pantaleo come base estiva di solito sa cosa cerca: l'autenticità della Gallura senza rinunciare alla vicinanza con la Costa Smeralda. Ma c'è un dettaglio pratico che molti scoprono solo arrivando: il borgo non è pensato per le auto. Le vie sono strette, in pendenza, lastricate in pietra; il parcheggio nella piazzetta è limitato a poche decine di posti, e il giovedì mattina — giorno del leggendario mercato artigianale che attira centinaia di visitatori da tutta la costa — trovare un posto auto entro le 11:00 è un'impresa. L'Honda SH 125 risolve tutto: si infila nei vicoli senza graffiare gli specchietti, parcheggi a 30 metri da Café Nina senza pagare, e quando vuoi scendere a Porto Cervo per cena al Gianni Pedrinelli o al Sottovento, ci arrivi in 15 minuti di strada panoramica tra le rocce di granito che danno il nome a Capo Ferro. Per chi viaggia in coppia o con bambini, la Fiat Panda Hybrid è il compromesso ideale: stretta abbastanza per le strade del borgo, comoda per le escursioni di un'intera giornata verso Cala Liscia Ruja o l'arcipelago di La Maddalena. Per gli avventurosi, il quad Yamaha Raptor 700 apre l'entroterra gallurese: sentieri sterrati, vecchi nuraghi, panorami che le auto non vedono mai. Consegniamo direttamente al tuo agriturismo o alla casa in affitto a San Pantaleo."
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

    <LocalitaInlineCTA name="San Pantaleo" />

    <LocalitaTopSpots
      name="San Pantaleo"
      spots={[
        {
          name: "Mercato del Giovedì",
          category: "evento",
          description:
            "Il celebre mercato artigianale che ogni giovedì mattina anima la piazzetta del borgo da metà giugno a metà settembre. Bancarelle di ceramiche galluresi, tessuti tradizionali, gioielli in filigrana, piccolo antiquariato e prodotti gastronomici locali. Il giorno con più affluenza di tutta la Costa Smeralda.",
          distance: "Piazzetta centrale",
          cost: "Gratis",
          bestTime: "Giovedì 9:00-13:00",
        },
        {
          name: "Rocce di Granito",
          category: "panorama",
          description:
            "Le formazioni granitiche che circondano il borgo sono uno dei panorami più caratteristici della Gallura. Imponenti, levigate dal vento e dalla pioggia in milioni di anni. Si raggiungono con sentieri di trekking dolci che partono dal centro. Vista mozzafiato al tramonto, quando il granito diventa rosato.",
          distance: "5-15 min a piedi",
          cost: "Gratis",
          bestTime: "Tramonto",
        },
        {
          name: "Chiesa di San Pantaleo",
          category: "monumento",
          description:
            "Piccola chiesa parrocchiale di origini ottocentesche nel cuore del borgo, dedicata al santo che dà il nome al paese. Cornice delle feste patronali estive (luglio) con processioni in costume gallurese tradizionale. Visita rapida di 15-20 minuti.",
          distance: "Centro borgo",
          cost: "Gratis",
          bestTime: "Mattina o pre-tramonto",
        },
        {
          name: "Il Borgo di San Pantaleo",
          category: "centro",
          description:
            "Bohémien e fuori dal tempo, il borgo è composto da vicoli in pietra, piazzette ombreggiate, piccole gallerie d'arte (eredità dei pittori che vi si stabilirono negli anni '70-'80) e botteghe artigianali. Camminata circolare di 30-40 minuti per assaporarlo tutto. Pedonale.",
          distance: "Centro borgo",
          cost: "Gratis",
          bestTime: "Tardo pomeriggio",
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

    <VehicleComparisonTable
      title="Quale veicolo per San Pantaleo?"
      subtitle="Scooter per i vicoli del borgo, Panda per le escursioni in coppia."
      show={["honda", "panda"]}
      recommendation={
        <>
          <strong className="text-foreground">San Pantaleo non è fatto per le auto grandi.</strong> Lo scooter Honda
          SH è l'arma giusta: si infila nei vicoli del borgo senza graffi, parcheggia a 30 metri dalla Piazzetta anche
          il giovedì del mercato, e in 15 minuti ti porta a Porto Cervo per cena. La Fiat Panda è il compromesso per
          chi viaggia in coppia o famiglia, è soggiornato in agriturismo fuori centro, o vuole flessibilità per le
          escursioni di una giornata intera (Spiaggia del Principe, La Maddalena).
        </>
      }
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
          text: (<>In 15 minuti di scooter sei sulla Promenade du Port di <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Cervo</Link> per una cena vista yacht.</>),
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

    <TrustMarquee
      items={[
        "Borgo Gallurese",
        "Mercato Giovedì",
        "Granito",
        "Scooter",
        "15 min Porto Cervo",
        "Autenticità",
      ]}
    />

    <LocalitaFAQ
      name="San Pantaleo"
      emitSchema
      faqs={[
        {
          q: "Come arrivo al mercato del giovedì senza problemi di parcheggio?",
          a: (<>In <Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">scooter Honda SH</Link>! Il giovedì mattina è impossibile trovare posto auto. Lo scooter parcheggia a 2 passi dalla piazza.</>),
        },
        {
          q: "Posso raggiungere Porto Cervo da San Pantaleo in scooter?",
          a: (
            <>Certo! <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Cervo</Link> è a soli 15 minuti lungo una strada panoramica spettacolare tra le rocce di granito della Gallura.</>
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
        {
          q: "Conviene una Panda o uno scooter per chi soggiorna in agriturismo fuori dal centro?",
          a: "Dipende dalla strada di accesso. Se l'agriturismo è in salita su sterrato o in zona Capannoni-Capo Ferro, la Panda è più pratica: i bagagli, la spesa, le giornate di pioggia (sì, capitano anche d'estate) sono più gestibili. Se sei a 5 minuti dal centro su strada asfaltata, lo scooter ti dà più libertà e zero stress di parcheggio in piazzetta. Per soggiorni oltre la settimana valutiamo combo a tariffa scontata.",
        },
        {
          q: "Si può guidare a San Pantaleo dopo gli aperitivi serali in piazzetta?",
          a: "Sconsigliato come ovunque in Italia: limite alcolemico 0.5 g/l, controlli frequenti specie nei weekend estivi. Soluzione pratica: l'agriturismo Li Paràuli è a 5 minuti, molti B&B sono dentro il borgo, e per Porto Cervo conviene il taxi (numero unico Olbia-Costa Smeralda) oppure rientrare presto.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          San Pantaleo è la base perfetta per chi vuole il meglio di entrambi i mondi: il giorno tra le calette
          esclusive di{" "}
          <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Cervo
          </Link>{" "}
          (15 minuti di curve panoramiche) e la sera nel borgo, dove il rumore dei locali alla moda non arriva. In 25
          minuti scendi anche a Porto Rotondo e in 35 raggiungi i pini di San Teodoro. Il giovedì mattina, però, dedicalo
          al mercato: prendi lo scooter, parti presto, gira tra i banchi di tessuti, ceramiche e culurgiones, e fermati
          per pranzo al Giagoni. È l'esperienza che racconterai quando torni a casa.
        </p>
      </div>
    </section>

    <LocalitaTrustBlock name="San Pantaleo" />
    <LocalitaCTA name="San Pantaleo" />
  </>
);

export default SanPantaleoPage;
