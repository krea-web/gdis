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

const breadcrumbs = [{ name: "San Teodoro", url: "/noleggio-auto-a-san-teodoro" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-san-teodoro#localbusiness",
  description:
    "Noleggio auto, scooter Honda SH e quad a San Teodoro. Spiaggia La Cinta, Ambra Night e Cala Brandinchi a portata di mano.",
  areaServed: [{ "@type": "City", name: "San Teodoro" }],
});

const SanTeodoroPage = () => (
  <>
    <SEOHead
      title="Noleggio Scooter e Auto San Teodoro | La Cinta e Brandinchi | GDIS Rent"
      description="Noleggio scooter Honda SH, Fiat Panda e quad a San Teodoro ✓ La Cinta a 5 km, Cala Brandinchi a 8 km ✓ Consegna in hotel, B&B o residence ✓ Parcheggio gratis nelle aree moto. WhatsApp H24."
      canonical="/noleggio-auto-a-san-teodoro"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="San Teodoro"
      subtitle="5 km di sabbia bianca alla Cinta, fenicotteri rosa nello stagno, e la movida di Ambra Night a 200 metri. Lo scooter è la chiave per goderti tutto senza perdere ore in coda."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-noleggio-san-teodoro.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Honda SH 125 San Teodoro"
    />

    <VehicleSpotlight
      tag="Agilità Urbana"
      title="Lo Scooter Batte il Traffico di San Teodoro"
      description="Da fine giugno alla seconda settimana di settembre, San Teodoro cambia faccia. Le auto si moltiplicano per dieci, il parcheggio della Cinta si esaurisce entro le 9:30, la SS131 verso Olbia diventa un serpente di lamiera nel weekend. Per chi viene qui in vacanza, scegliere lo scooter Honda SH 125 non è una preferenza: è il modo più intelligente per non rovinarsi le giornate. Con l'SH parcheggi gratis nelle aree moto dedicate all'ingresso della Cinta, di Lu Impostu e di Cala Brandinchi (la cosiddetta 'Tahiti sarda'), salti la coda al casello di accesso, e in 10 minuti scendi al mercatino serale del centro per una passeggiata. Per chi viaggia in famiglia o cerca più protezione, la Fiat Panda Hybrid è una valida alternativa: entra nei vicoli del centro storico, beve poco, e nel weekend ti porta in 25 minuti all'aeroporto di Olbia o in 40 minuti a Cala Coda Cavallo per le calette più nascoste. Per gli amanti dell'avventura, il quad Yamaha Raptor 700 è il biglietto d'ingresso ai sentieri sterrati del Monte Nieddu, dove cascate e piscine naturali aspettano chi sa raggiungerle. Tutti i veicoli vengono consegnati direttamente al tuo hotel, B&B o residence — basta indicarci l'indirizzo su WhatsApp."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash350-costasmeralda.webp"
      imageAlt="Spiagge di San Teodoro"
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Parcheggio gratis alle spiagge
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Consumi ridottissimi
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">Patente B o AM</span>
      </div>
    </VehicleSpotlight>

    <LocalitaInlineCTA name="San Teodoro" />

    <BentoSpots
      name="San Teodoro"
      spots={[
        {
          name: "Spiaggia La Cinta",
          subtitle: "5 km di Paradiso",
          desc: "Sabbia dorata con vista su Tavolara e colonie di fenicotteri rosa.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-spiaggia-la-cinta.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Mercatino Serale",
          subtitle: "Shopping & Tradizione",
          desc: "Bancarelle artigianali, street food sardo e atmosfera vivace ogni sera d'estate.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-mercatino-serale-san-teodoro.webp",
        },
        {
          name: "Cala Brandinchi",
          desc: "'Tahiti sarda' — acque trasparenti da raggiungere prima della folla.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-spiaggia-cala-brandinchi.webp",
        },
        {
          name: "Spiaggia Lu Impostu",
          desc: "Laguna poco profonda perfetta per famiglie, con sabbia finissima e acque calme.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-spiaggia-lu-impostu.webp",
          span: "md:col-span-2",
        },
        {
          name: "Monte Nieddu",
          desc: "Cascate e piscine naturali nell'entroterra. Perfette per il quad.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-monte-nieddu.webp",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Honda SH 125i"
      specs={[
        { label: "Patente", value: "B / AM", icon: "license" },
        { label: "Posti", value: "2", icon: "seats" },
        { label: "Ideale per", value: "Spiagge & Centro", icon: "use" },
        { label: "Consegna", value: "Hotel / B&B", icon: "delivery" },
      ]}
    />

    <VehicleComparisonTable
      title="Quale veicolo per San Teodoro?"
      subtitle="Scooter per le spiagge, Panda per le famiglie, quad per l'entroterra."
    />

    <LocalitaTrafficTips
      name="San Teodoro"
      tips={[
        {
          icon: "parking",
          title: "La Cinta Parking",
          text: "Parcheggio a pagamento (€3-5/giorno). In scooter parcheggi gratis nelle aree moto dedicate all'ingresso.",
        },
        {
          icon: "traffic",
          title: "SS131 Weekend",
          text: "La statale è trafficata sabato e domenica. Parti presto per le spiagge o usa lo scooter.",
        },
        {
          icon: "ztl",
          title: "Centro Pedonale",
          text: "Il centro di San Teodoro è pedonale la sera. Perfetto per la passeggiata dopo aver parcheggiato lo scooter.",
        },
        {
          icon: "tip",
          title: "Verso Golfo Aranci",
          text: (<>Con lo scooter o la <Link to="/flotta/fiat-panda" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Panda</Link> raggiungi <Link to="/noleggio-auto-a-golfo-aranci" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Golfo Aranci</Link> in 40 minuti lungo una strada panoramica mozzafiato.</>),
        },
      ]}
    />

    <LocalitaNightlife
      name="San Teodoro"
      locali={[
        {
          name: "Ambra Night",
          type: "club",
          desc: "Il club di riferimento. Dj set e atmosfera elettrica fino alle prime luci dell'alba.",
        },
        {
          name: "Luna Glam Club",
          type: "club",
          desc: "Eleganza e musica house. Il punto d'incontro della movida giovane.",
        },
        {
          name: "La Tartaruga",
          type: "ristorante",
          desc: "Cucina sarda autentica nel cuore del paese. I culurgiones sono leggendari.",
        },
        {
          name: "Bar Centrale",
          type: "aperitivo",
          desc: "Aperitivo in piazza, osservando il passeggio serale. Spritz perfetti.",
        },
        {
          name: "Da Nino al Porto",
          type: "ristorante",
          desc: "Pesce fresco e vista sul porticciolo. Atmosfera marinara autentica.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="San Teodoro"
      emitSchema
      faqs={[
        {
          q: "Posso parcheggiare lo scooter gratis alla Cinta?",
          a: "Sì! Alla Cinta e Brandinchi ci sono aree moto gratuite. Risparmierai rispetto al parcheggio auto e troverai posto anche in piena estate.",
        },
        {
          q: "Consegnate il veicolo al mio hotel a San Teodoro?",
          a: "Assolutamente. Consegna VIP al tuo hotel, B&B o residence. Comunicaci l'indirizzo e pensiamo a tutto noi.",
        },
        {
          q: "Serve la patente per lo scooter Honda SH 125?",
          a: (
            <>Basta la patente B o AM (per gli SH 125). Per l'SH 350 serve la patente A2 o A. Per il{" "}
              <Link to="/flotta/yamaha-raptor" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">quad</Link> serve la patente B.</>
          ),
        },
        {
          q: "Quanto dista l'aeroporto di Olbia da San Teodoro?",
          a: (<>Solo 25 minuti via SS125. Consegniamo all'<Link to="/noleggio-auto-a-olbia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">aeroporto di Olbia</Link> Costa Smeralda o direttamente al tuo alloggio a San Teodoro, in base a cosa preferisci.</>),
        },
        {
          q: "Quale strada conviene prendere per Cala Brandinchi?",
          a: "Da San Teodoro centro, prendi la SP24 in direzione nord per circa 6 km, poi la deviazione per Brandinchi è ben segnalata. In auto sono 12 minuti, in scooter 8. In alta stagione il parcheggio si esaurisce entro le 9:00 per le auto, mentre l'area moto/scooter ha posti tutto il giorno. Va benissimo anche partire la sera per il bagno al tramonto, quando la spiaggia si svuota.",
        },
        {
          q: "Posso andare in spiaggia direttamente in costume con lo scooter?",
          a: "Per legge no — bisogna indossare casco, scarpe chiuse e maglietta durante la guida. Tieni costume e parei nello scooter (sotto la sella entra un casco e una piccola sacca) o usa un baule. Una volta arrivato in spiaggia, ti cambi tranquillamente lì.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          San Teodoro è il punto perfetto da cui esplorare la costa nord-orientale. Verso nord, in 40 minuti di
          panoramica costiera raggiungi{" "}
          <Link to="/noleggio-auto-a-golfo-aranci" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Golfo Aranci
          </Link>{" "}
          e le sue calette nascoste, comode con la{" "}
          <Link to="/flotta/fiat-panda" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Fiat Panda
          </Link>
          . Verso ovest, l'entroterra di Monte Nieddu nasconde cascate e piscine naturali raggiungibili solo con il
          quad. Verso sud, in 25 minuti tocchi Budoni e in un'ora la riserva del Capo Comino. Il consiglio
          dell'esperto: se la tua vacanza è oltre i 5 giorni, alterna due veicoli (es. scooter per i giri brevi e
          Panda per le escursioni di un'intera giornata) — costa meno di un'auto sola tenuta tutto il tempo, e ti
          regala libertà reale.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="San Teodoro" />
  </>
);

export default SanTeodoroPage;
