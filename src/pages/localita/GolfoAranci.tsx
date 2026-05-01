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
import Recensioni from "@/components/home/Recensioni";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import LocalitaInlineCTA from "@/components/localita/LocalitaInlineCTA";
import VehicleComparisonTable from "@/components/localita/VehicleComparisonTable";
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
      title="Noleggio Auto Porto Golfo Aranci | Consegna allo Sbarco | GDIS Rent"
      description="Noleggio auto al porto di Golfo Aranci ✓ Consegna direttamente allo sbarco del traghetto Sardinia/Corsica Ferries ✓ Fiat Panda, scooter, quad ✓ Cala Moresca, Spiaggia Bianca, Capo Figari. WhatsApp H24."
      canonical="/noleggio-auto-a-golfo-aranci"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Golfo Aranci"
      subtitle="L'unico porto italiano della Sardinia/Corsica Ferries che ti fa sbarcare a 5 minuti da Cala Moresca. Sali sulla Panda e in un quarto d'ora sei già con i piedi nell'acqua trasparente di Capo Figari."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/golfo-aranci/gdisrent-noleggio-golfo-aranci.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Fiat Panda Golfo Aranci"
    />

    <VehicleSpotlight
      tag="Flessibilità Totale"
      title="La Panda Ti Aspetta allo Sbarco del Traghetto"
      description="Golfo Aranci ha un'identità precisa: è il porto sardo della Sardinia/Corsica Ferries — collegamento Livorno e Civitavecchia ad alta frequenza, sbarchi puntuali, terminal compatto e bene organizzato. Per chi arriva via mare, è la scelta più razionale: meno caotico di Olbia Isola Bianca, più vicino alle spiagge nord-orientali, con la Costa Smeralda raggiungibile in 25 minuti. Il nostro servizio più richiesto qui parla a questa esigenza: ti aspettiamo direttamente allo sbarco — anche se il traghetto arriva con un'ora di ritardo (succede regolarmente in alta stagione) — con la tua Fiat Panda Hybrid pronta, climatizzata, pieno fatto, posto bagagli vuoto. Niente desk, niente code, niente firme dopo 8 ore di nave: bastano 5 minuti di formalità all'aperto e parti. La Panda è il veicolo perfetto per la tipologia di turismo di Golfo Aranci: famiglie con bambini, coppie senior che vengono per Capo Figari e i delfini, viaggiatori indipendenti che vogliono esplorare la costa nord-orientale senza spendere una fortuna in carburante. Per chi sta più giorni e vuole muoversi anche per le calette del lungomare (Spiaggia Bianca, Terza Spiaggia), lo scooter Honda SH è l'aggiunta perfetta: parcheggia ovunque sul lungomare e al rientro lo lasci in hotel. E al ritorno, riconsegna direttamente al porto: sali sul traghetto e chiudi così la vacanza, senza altri pensieri."
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

    <LocalitaInlineCTA name="Golfo Aranci" />

    <LocalitaTopSpots
      name="Golfo Aranci"
      spots={[
        {
          name: "Cala Moresca",
          category: "spiaggia",
          description:
            "Piccola baia protetta ai piedi di Capo Figari, raggiungibile a piedi (15 min) o in macchina dal centro. Acque cristalline su fondali rocciosi: una delle migliori zone per lo snorkeling della costa nord-orientale. Servizi minimi, atmosfera selvaggia. Parcheggio limitato, arriva entro le 9:30 in alta stagione.",
          distance: "10 min in auto",
          cost: "Gratis · parking limitato",
          bestTime: "Mattina (mare calmo)",
        },
        {
          name: "Spiaggia Bianca",
          category: "spiaggia",
          description:
            "Una delle spiagge più belle della costa nord-orientale: sabbia candida, acque turchesi e fondali bassi adatti alle famiglie. Lunga circa 800 metri, attrezzata con noleggio ombrelloni e bar. Tramonti spettacolari per chi rimane fino a sera. Accesso a piedi dal parcheggio principale.",
          distance: "12 min in auto",
          cost: "Gratis · parking €5/g",
          bestTime: "Tutto il giorno",
        },
        {
          name: "Capo Figari",
          category: "panorama",
          description:
            "Promontorio selvaggio dell'Area Marina Protetta di Tavolara. Sentiero di trekking di 1h30 che porta alla storica stazione radio di Guglielmo Marconi (1932), da cui partirono i primi esperimenti di ponte radio a corte distanze. Vista a 360° sull'arcipelago. Adatto a tutti, ma serve buone scarpe.",
          distance: "15 min + 1h30 trek",
          cost: "Gratis",
          bestTime: "Mattina (caldo gestibile)",
        },
        {
          name: "Avvistamento Delfini",
          category: "escursione",
          description:
            "Il Golfo di Olbia e l'area di Tavolara ospitano una popolazione stabile di tursiopi (delfini comuni). Escursioni in barca dalla Marina di Golfo Aranci durano 2-3 ore con avvistamenti garantiti nella maggior parte dei casi. Includono spesso una sosta bagno in calette accessibili solo via mare.",
          distance: "Marina centro",
          cost: "€40-60 a persona",
          bestTime: "Mattina (8:00-11:00)",
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

    <VehicleComparisonTable
      title="Quale veicolo per Golfo Aranci?"
      subtitle="Panda allo sbarco del traghetto, scooter per le spiagge del lungomare."
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
        {
          q: "Cosa succede se il mio traghetto arriva in ritardo?",
          a: "Niente — è la norma in alta stagione e siamo organizzati per gestirlo. Monitoriamo gli orari ufficiali della tua compagnia (Sardinia Ferries, Corsica Ferries, Moby) e adattiamo l'orario di consegna automaticamente. Non paghi nulla in più per ritardi nave fino a 4 ore. Tu pensa solo a sbarcare con calma.",
        },
        {
          q: "C'è la possibilità di lasciare il veicolo direttamente al porto al ritorno?",
          a: "Sì, è il flusso più comodo per chi rientra in continente in traghetto. Fai check-out dall'hotel, guidi fino al porto, parcheggi nell'area indicata e ci consegni le chiavi (anche fuori orario, lasciandole in cassaforte). Ti facciamo trovare il modulo di riconsegna pre-compilato.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Golfo Aranci è il punto da cui si parte ma anche dove si torna. A sud, in 20 minuti di Panda, raggiungi la
          Marina di{" "}
          <Link to="/noleggio-auto-a-porto-rotondo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Rotondo
          </Link>{" "}
          e le cale nascoste di Punta Volpe. A ovest, in 30 minuti, sei nel cuore di{" "}
          <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Cervo
          </Link>{" "}
          per shopping e Marina di lusso. A nord, l'isola di Tavolara è raggiungibile via barca con escursioni
          giornaliere dal porto di Golfo Aranci stesso, e i delfini avvistabili dal promontorio di Capo Figari sono
          un'esperienza che pochissimi turisti italiani conoscono. La nostra raccomandazione: dedica almeno una mezza
          giornata al sentiero di Capo Figari fino alla stazione radio di Marconi — vista mozzafiato sull'arcipelago,
          con la Panda parcheggiata al punto di partenza del trekking.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Golfo Aranci" />
  </>
);

export default GolfoAranciPage;
