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

const SanTeodoroPage = () => (
  <>
    <SEOHead
      title="Noleggio Scooter e Auto a San Teodoro | GDIS Rent Sardegna"
      description="Noleggia Honda SH, city car e quad a San Teodoro. La Cinta, Ambra Night e spiagge caraibiche. Consegna diretta con GDIS Rent."
      canonical="/localita/noleggio-san-teodoro"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - San Teodoro",
        description: "Noleggio scooter Honda SH e veicoli a San Teodoro",
        areaServed: "San Teodoro",
      }}
    />

    <LocalitaHeroV2
      name="San Teodoro"
      subtitle="La Cinta, movida e spiagge infinite. Il tuo Honda SH ti aspetta per un'estate senza traffico."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-noleggio-san-teodoro.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
      vehicleAlt="Honda SH 125 San Teodoro"
    />

    <VehicleSpotlight
      tag="Agilità Urbana"
      title="Lo Scooter Batte il Traffico di San Teodoro"
      description="In estate, San Teodoro si riempie. I parcheggi della Cinta si esauriscono presto, la SS131 è un calvario nel weekend. Con l'Honda SH 125 tutto cambia: parcheggi gratis nelle aree moto delle spiagge, sgusci nel traffico in secondi, e raggiungi Cala Brandinchi in un lampo. Il bello della Sardegna è la libertà, e lo scooter te la regala."
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
          name: "Ambra Night",
          subtitle: "Nightlife",
          desc: "Il club di riferimento. Dj set e atmosfera elettrica fino all'alba.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-mercatino-serale-san-teodoro.webp",
        },
        {
          name: "Cala Brandinchi",
          desc: "'Tahiti sarda' — acque trasparenti da raggiungere prima della folla.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/san-teodoro/gdisrent-spiaggia-cala-brandinchi.webp",
        },
        {
          name: "Puntaldia",
          desc: "Resort e campo da golf affacciato sull'isola di Tavolara.",
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
          text: (<>Con lo scooter o la <Link to="/flotta/fiat-panda" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Panda</Link> raggiungi <Link to="/localita/noleggio-golfo-aranci" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Golfo Aranci</Link> in 40 minuti lungo una strada panoramica mozzafiato.</>),
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
          a: "Solo 25 minuti. Consegniamo all'aeroporto Olbia Costa Smeralda o al tuo alloggio.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da San Teodoro parti verso nord per scoprire le calette segrete di{" "}
          <Link to="/localita/noleggio-golfo-aranci" className="text-primary font-semibold hover:underline">
            Golfo Aranci
          </Link>{" "}
          — perfette con la Fiat Panda.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="San Teodoro" />
  </>
);

export default SanTeodoroPage;
