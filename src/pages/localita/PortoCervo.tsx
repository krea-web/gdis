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

const breadcrumbs = [{ name: "Porto Cervo", url: "/noleggio-auto-a-porto-cervo" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-porto-cervo#localbusiness",
  description:
    "Noleggio auto VIP, scooter e quad a Porto Cervo con consegna alla Marina, hotel o villa privata.",
  areaServed: [
    { "@type": "City", name: "Porto Cervo" },
    { "@type": "AdministrativeArea", name: "Costa Smeralda" },
  ],
});

const PortoCervoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto VIP Porto Cervo | Consegna Marina e Yacht | GDIS Rent"
      description="Noleggio auto VIP Porto Cervo ✓ Mercedes, supercar su richiesta ✓ Consegna a Marina, pontile yacht, villa o hotel 5 stelle ✓ Scooter per la Promenade. WhatsApp H24."
      canonical="/noleggio-auto-a-porto-cervo"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Porto Cervo"
      subtitle="Consegna VIP alla tua Marina, villa o yacht. Il lusso della Costa Smeralda su ruote, su richiesta WhatsApp."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/porto-cervo/gdisrent-noleggio-porto-cervo.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Auto VIP Porto Cervo"
    />

    <VehicleSpotlight
      tag="VIP Collection"
      title="Il Tuo Veicolo di Lusso, Consegnato Ovunque"
      description="Porto Cervo non è una destinazione: è un palcoscenico. Arrivare in Marina con un'auto qualunque vuol dire non capire il posto. Per questo, su richiesta via WhatsApp, organizziamo il noleggio di Mercedes Classe A 180d con cambio automatico (perfetta per i tornanti che salgono al Pevero Golf Club) e di auto VIP e supercar per eventi privati, serate al Billionaire, matrimoni in Costa Smeralda o semplicemente per vivere la Promenade du Port come un protagonista. La consegna avviene esattamente dove sei: al pontile del tuo yacht in Marina, al check-in dell'Hotel Cala di Volpe, alla tua villa privata sulle alture di Romazzino, oppure direttamente all'arrivo dell'Aeroporto Costa Smeralda. Per chi resta più giorni e vuole muoversi anche dentro il borgo — che in alta stagione diventa pedonale e ZTL — l'Honda SH 350 è l'arma segreta: parcheggi nelle aree moto a 10 metri dalla Promenade, eviti la coda eterna del parcheggio Marina, e in 15 minuti scendi a San Pantaleo per il mercato del giovedì o sali a Baja Sardinia per il sunset al Phi Beach. Tutti i nostri veicoli arrivano puliti, profumati e con il pieno fatto: l'unica cosa che devi pensare è dove andare."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-consegna-auto-scooter-quad-a-domicilio.webp"
      imageAlt="Servizio VIP Porto Cervo"
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Supercar su richiesta
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Consegna alla Marina
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">Servizio 24/7</span>
      </div>
    </VehicleSpotlight>

    <LocalitaInlineCTA name="Porto Cervo" />

    <LocalitaTopSpots
      name="Porto Cervo"
      spots={[
        {
          name: "Marina di Porto Cervo",
          category: "porto",
          description:
            "Una delle marine più esclusive del Mediterraneo, capolavoro di architettura mediterranea progettato negli anni '60 da Luigi Vietti su impulso dell'Aga Khan. Yacht da sogno ormeggiati, gallerie d'arte, boutique e ristoranti vista mare. Ingresso libero, parcheggio satellite.",
          distance: "Centro Porto Cervo",
          cost: "Gratis · parking €5-15/g",
          bestTime: "Tardo pomeriggio (rientro yacht)",
        },
        {
          name: "Chiesa Stella Maris",
          category: "monumento",
          description:
            "Iconica chiesa bianca progettata da Michele Busiri Vici nel 1968, riconoscibile per le forme organiche e il campanile asimmetrico. Custodisce un dipinto del Mater Dolorosa attribuito alla scuola di El Greco. Visitabile gratuitamente fuori dagli orari di celebrazione.",
          distance: "Centro Porto Cervo",
          cost: "Gratis",
          bestTime: "Mattina (luce naturale)",
        },
        {
          name: "Baia di Cala di Volpe",
          category: "spiaggia",
          description:
            "Una delle baie più iconiche della Costa Smeralda: sabbia chiara, acque turchesi e quel verde della macchia mediterranea che la rende inconfondibile. Accesso pubblico alla spiaggia anche se l'ambiente attorno è esclusivo. Da non perdere il colpo d'occhio dal promontorio.",
          distance: "15 min in auto",
          cost: "Gratis · parking limitato",
          bestTime: "Mattina (mare calmo)",
        },
        {
          name: "Spiaggia del Principe",
          category: "spiaggia",
          description:
            "Considerata una delle spiagge più belle del Mediterraneo: sabbia bianchissima a granuli fini, acque turchesi e una baia chiusa da scogli granitici. Si arriva con un breve sentiero pedonale dal parcheggio. In agosto arriva entro le 9:00 per trovare posto.",
          distance: "10 min + 5 min a piedi",
          cost: "Gratis · parking €10/g",
          bestTime: "Mattina presto",
        },
        {
          name: "Spiaggia del Pevero",
          category: "spiaggia",
          description:
            "Ampia spiaggia di sabbia chiara incorniciata dalla macchia mediterranea, fondali bassi adatti alle famiglie. Diversa dalla vicina spiaggia del Principe, è più estesa e attrezzata, con bar e noleggio ombrelloni. Perfetta per una giornata intera.",
          distance: "8 min in auto",
          cost: "Gratis · parking €10/g",
          bestTime: "Tutto il giorno",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Auto VIP su Richiesta"
      specs={[
        { label: "Patente", value: "B", icon: "license" },
        { label: "Posti", value: "2-5", icon: "seats" },
        { label: "Ideale per", value: "Eventi & Lusso", icon: "use" },
        { label: "Consegna", value: "Marina / Villa", icon: "delivery" },
      ]}
    />

    <VehicleComparisonTable
      title="Quale veicolo per Porto Cervo?"
      subtitle="Auto VIP per le serate, scooter per la Promenade. Ecco come scegliere."
      show={["mercedes", "honda", "panda"]}
      recommendation={
        <>
          <strong className="text-foreground">Tre veicoli per tre momenti diversi.</strong> La Mercedes A 180d con
          cambio automatico è la scelta naturale per le serate al Sottovento o le cene a Cala di Volpe. Lo scooter
          Honda SH è la chiave per la Promenade in alta stagione (ZTL pedonale, parcheggio Marina sempre pieno). La
          Fiat Panda funziona da jolly per chi gestisce bagagli o famiglia. Su richiesta WhatsApp, organizziamo
          supercar VIP per eventi privati.
        </>
      }
    />

    <LocalitaTrafficTips
      name="Porto Cervo"
      tips={[
        {
          icon: "ztl",
          title: "ZTL Centro",
          text: "Il centro di Porto Cervo è ZTL e pedonale in estate. Parcheggia prima e prosegui a piedi o fatti consegnare lo scooter.",
        },
        {
          icon: "parking",
          title: "Parcheggio Marina",
          text: "A pagamento e limitato. In alta stagione si riempie entro le 10. In scooter parcheggi gratis nelle aree moto.",
        },
        {
          icon: "traffic",
          title: "SS Arzachena",
          text: "La statale verso Porto Cervo è congestionata luglio-agosto. Lo scooter dimezza i tempi.",
        },
        {
          icon: "tip",
          title: "Bypass Baja Sardinia",
          text: (<>Per evitare il traffico serale verso <Link to="/noleggio-auto-a-baja-sardinia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Baja Sardinia</Link>, prendi lo scooter: 5 minuti senza code.</>),
        },
      ]}
    />

    <LocalitaNightlife
      name="Porto Cervo"
      locali={[
        {
          name: "Billionaire",
          type: "club",
          desc: "Il club più esclusivo della Sardegna. Cene-spettacolo e dj set internazionali fino all'alba.",
        },
        {
          name: "Pepero",
          type: "aperitivo",
          desc: "Cocktail bar sulla Promenade con vista sulla Marina. L'aperitivo perfetto al tramonto.",
        },
        {
          name: "Gianni Pedrinelli",
          type: "ristorante",
          desc: "Cucina gallurese raffinata con terrazza panoramica. Prenotazione obbligatoria in alta stagione.",
        },
        {
          name: "Sottovento",
          type: "club",
          desc: "Atmosfera glamour e musica live, il punto di riferimento della movida di Porto Cervo.",
        },
        {
          name: "Il Pescatore",
          type: "ristorante",
          desc: "Pesce freschissimo direttamente dalla barca. Ambiente intimo e romantico.",
        },
      ]}
    />

    <TrustMarquee
      items={[
        "Marina Porto Cervo",
        "Auto VIP",
        "Promenade",
        "Pevero",
        "Cala di Volpe",
        "Concierge H24",
      ]}
    />

    <LocalitaFAQ
      name="Porto Cervo"
      emitSchema
      faqs={[
        {
          q: "Consegnate auto VIP direttamente alla Marina di Porto Cervo?",
          a: "Sì, organizziamo consegna VIP alla Marina, al pontile del tuo yacht, al tuo hotel o alla villa privata. Contattaci su WhatsApp per coordinare.",
        },
        {
          q: "Posso noleggiare una supercar per una serata al Billionaire?",
          a: "Assolutamente. Su richiesta via WhatsApp organizziamo il noleggio di auto VIP e supercar per eventi, matrimoni e serate speciali a Porto Cervo.",
        },
        {
          q: "C'è la ZTL a Porto Cervo?",
          a: (
            <>Sì, il centro è pedonale/ZTL in estate. Con lo{" "}
              <Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">scooter Honda SH</Link>{" "}
              parcheggi nelle aree moto dedicate vicino alla Promenade, evitando completamente il problema.</>
          ),
        },
        {
          q: "Quanto dista Porto Cervo dall'aeroporto di Olbia?",
          a: (<>Circa 30 minuti via SS125. Consegniamo il veicolo direttamente all'<Link to="/noleggio-auto-a-olbia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">aeroporto di Olbia</Link> Costa Smeralda così non dipendi da taxi o transfer.</>),
        },
        {
          q: "Posso parcheggiare in Marina a Ferragosto?",
          a: "Onestamente no, non senza nervi. Nel picco stagionale (29 luglio – 22 agosto) il parcheggio Marina si esaurisce entro le 10 del mattino e le tariffe lievitano. La soluzione che consigliamo a tutti i clienti VIP: scooter Honda SH per i giri brevi, auto VIP solo per il tragitto serale verso il ristorante con consegna direttamente al locale.",
        },
        {
          q: "Quanto costa noleggiare una supercar per una sola serata?",
          a: "Le tariffe variano in base al modello (Lamborghini, Ferrari, Porsche su richiesta) e alla data. Scrivici su WhatsApp con data, ora e modello desiderato: ti facciamo un preventivo trasparente entro 30 minuti, senza obbligo.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Porto Cervo è il cuore della Costa Smeralda, ma non finisce qui: in 5 minuti di scooter sei a{" "}
          <Link to="/noleggio-auto-a-baja-sardinia" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Baja Sardinia
          </Link>{" "}
          per i tramonti leggendari del Phi Beach e le notti al Ritual Club, mentre in 15 minuti sali a{" "}
          <Link to="/noleggio-auto-a-san-pantaleo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            San Pantaleo
          </Link>{" "}
          per il mercato del giovedì e l'autenticità del borgo gallurese — la combinazione che permette ai nostri
          clienti di vivere l'estate come un local, non come un turista. Per chi arriva in yacht, organizziamo la
          consegna dell'auto al pontile in Marina sull'orario di sbarco; per chi soggiorna in villa privata, ritiriamo
          e riconsegniamo il veicolo a domicilio. Tutto su WhatsApp, h24, anche in lingua inglese o francese.
        </p>
      </div>
    </section>

    <LocalitaTrustBlock name="Porto Cervo" />
    <LocalitaCTA name="Porto Cervo" />
  </>
);

export default PortoCervoPage;
