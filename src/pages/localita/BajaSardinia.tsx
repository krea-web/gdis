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

const breadcrumbs = [{ name: "Baja Sardinia", url: "/noleggio-auto-a-baja-sardinia" }];
const schema = buildLocalBusinessSchema({
  id: "https://gdisrentservice.com/noleggio-auto-a-baja-sardinia#localbusiness",
  description:
    "Noleggio scooter Honda SH e auto a Baja Sardinia: Phi Beach, Ritual e la vita notturna della Costa Smeralda senza problemi di parcheggio.",
  areaServed: [
    { "@type": "City", name: "Baja Sardinia" },
    { "@type": "AdministrativeArea", name: "Costa Smeralda" },
  ],
});

const BajaSardiniaPage = () => (
  <>
    <SEOHead
      title="Noleggio Quad e Scooter Baja Sardinia | Phi Beach e Capo Ferro | GDIS Rent"
      description="Noleggio Honda SH e quad Yamaha a Baja Sardinia ✓ Phi Beach, Ritual Club e sterrati di Capo Ferro ✓ Parcheggio gratis nelle aree moto ✓ Consegna VIP in hotel. WhatsApp H24."
      canonical="/noleggio-auto-a-baja-sardinia"
      breadcrumbs={breadcrumbs}
      jsonLd={schema}
    />
    <Breadcrumbs items={breadcrumbs} />

    <LocalitaHeroV2
      name="Baja Sardinia"
      subtitle="Tramonti dorati al Phi Beach, notti elettroniche al Ritual nel castello, sterrati di Capo Ferro al mattino. Lo scooter è il filo che tiene insieme la giornata perfetta — l'auto, in alta stagione, ti farebbe perdere tutto."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-noleggio-baja-sardinia.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
      vehicleAlt="Honda SH 350 Baja Sardinia"
    />

    <VehicleSpotlight
      tag="L'Unica Scelta Intelligente"
      title="Lo Scooter È l'Unico Modo di Vivere Baja Sardinia"
      description="Baja Sardinia ha una geografia perfida per le auto. La strada principale è una sola, stretta e tortuosa; la conca naturale del paese funziona come un imbuto; il Phi Beach è in cima a un promontorio raggiungibile da una stradina che non perdona errori di calcolo sull'orario. Risultato: in alta stagione, da metà luglio a fine agosto, chi sceglie l'auto rischia di passare due ore al giorno in coda — e di perdersi proprio le cose per cui è venuto qui. Lo scooter Honda SH 350 cambia totalmente l'equazione. La salita verso il Phi Beach con i suoi 28 cavalli la fai senza sforzo anche in due, parcheggi gratis nell'area moto a 80 metri dall'ingresso (gli automobilisti pagano 15-20 euro nel parcheggio satellite e camminano 800 metri), e quando comincia il dj set sei già seduto al cocktail bar invece che ancora al volante. Dopo il tramonto, in 5 minuti scendi alla Promenade du Port di Porto Cervo per cena al Sottovento o al Pepero, e a mezzanotte risali al Ritual Club nel castello senza il dramma del parcheggio. Per chi non ha la patente A2 o A, l'Honda SH 125 (guidabile con patente B) fa esattamente lo stesso lavoro con un po' meno potenza in salita. Per chi vuole esplorare gli sterrati di Capo Ferro al mattino — vista a 360° sull'arcipelago di La Maddalena — il quad Yamaha Raptor 700 è l'arma giusta. Consegniamo direttamente all'hotel, al residence, o al beach club di tua scelta."
      image="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdisrent-scooter-hondash350-costasmeralda.webp"
      imageAlt="Tramonto Baja Sardinia Phi Beach"
      reverse
    >
      <div className="flex flex-wrap gap-3">
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Parcheggio gratis Phi Beach
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          5 min da Porto Cervo
        </span>
        <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
          Perfetto per la night
        </span>
      </div>
    </VehicleSpotlight>

    <LocalitaInlineCTA name="Baja Sardinia" />

    <BentoSpots
      name="Baja Sardinia"
      spots={[
        {
          name: "Phi Beach",
          subtitle: "Tramonti Mozzafiato",
          desc: "Il sunset bar più iconico della Sardegna. Dj set sulle rocce con vista sulle isole.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-phi-beach-baja-sardinia.webp",
          span: "md:col-span-2 md:row-span-2",
        },
        {
          name: "Ritual Club",
          subtitle: "Il Club nel Castello",
          desc: "Il tempio della musica elettronica in Costa Smeralda. Guest dj da Ibiza.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-ritual-baja-sardinia.webp",
          span: "md:row-span-2",
        },
        {
          name: "Spiaggia Tre Monti",
          desc: "Sentiero panoramico con vista mozzafiato sull'arcipelago de La Maddalena.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-spiaggia-dei-tre-monti-baja-sardinia.webp",
        },
        {
          name: "Spiaggia di Baja",
          desc: "Sabbia fine, acqua turchese e tutti i servizi.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-spiaggia-di-baja-sardinia.webp",
        },
        {
          name: "Battistoni Beach",
          desc: "Cala esclusiva con beach club chic.",
          image: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-battistoni-beach-baja-sardinia.webp",
          span: "md:col-span-2",
        },
      ]}
    />

    <CockpitSpecs
      vehicleName="Honda SH 350i"
      specs={[
        { label: "Patente", value: "A2 / A", icon: "license" },
        { label: "Posti", value: "2", icon: "seats" },
        { label: "Ideale per", value: "Night & Sunset", icon: "use" },
        { label: "Consegna", value: "Hotel / Residence", icon: "delivery" },
      ]}
    />

    <VehicleComparisonTable
      title="Quale veicolo per Baja Sardinia?"
      subtitle="Scooter per il Phi Beach senza coda, quad per gli sterrati di Capo Ferro."
    />

    <LocalitaTrafficTips
      name="Baja Sardinia"
      tips={[
        {
          icon: "traffic",
          title: "Traffico al Sunset",
          text: "Luglio-agosto il traffico verso Phi Beach è pesante al tramonto. Lo scooter elimina il problema completamente.",
        },
        {
          icon: "parking",
          title: "Phi Beach Parking",
          text: "Parcheggio auto limitatissimo. In scooter trovi sempre posto nell'area moto vicino all'ingresso. Gratis.",
        },
        {
          icon: "ztl",
          title: "Centro Compatto",
          text: "Il centro di Baja è piccolo e parzialmente pedonale. Scooter perfetto per muoversi.",
        },
        {
          icon: "tip",
          title: "Porto Cervo Express",
          text: (<>5 minuti in scooter e sei alla Promenade du Port di <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Porto Cervo</Link> per cena. Poi torni a Baja per il Ritual.</>),
        },
      ]}
    />

    <LocalitaNightlife
      name="Baja Sardinia"
      locali={[
        {
          name: "Phi Beach",
          type: "lounge",
          desc: "Sunset bar leggendario sulle rocce. Dj set internazionali, cocktail premium e vista infinita.",
        },
        {
          name: "Ritual Club",
          type: "club",
          desc: "Il nuovo tempio della musica elettronica. Serate a tema e guest dj da Ibiza e Berlino.",
        },
        {
          name: "L'Ea Bianca",
          type: "ristorante",
          desc: "Cucina di mare contemporanea in un resort 5 stelle. Menu degustazione vista baia.",
        },
        {
          name: "Bar La Piazzetta",
          type: "aperitivo",
          desc: "Pre-serata nel cuore di Baja. Mojito artigianali e atmosfera festosa.",
        },
        {
          name: "La Tartaruga",
          type: "ristorante",
          desc: "Pizza gourmet e primi di mare sulla spiaggia. Cena informale prima del Phi Beach.",
        },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Baja Sardinia"
      emitSchema
      faqs={[
        {
          q: "Posso parcheggiare lo scooter gratis al Phi Beach?",
          a: "Sì! Al Phi Beach c'è un'area moto/scooter gratuita molto vicina all'ingresso. È la scelta più intelligente, specialmente nelle sere dei sunset dj set quando il parcheggio auto è impossibile.",
        },
        {
          q: "Il traffico verso Baja Sardinia è davvero così pesante?",
          a: "In luglio-agosto, soprattutto al tramonto e nel weekend, la strada verso Baja si paralizza. Lo scooter ti fa arrivare in 5 minuti quando le auto stanno in coda per 30+.",
        },
        {
          q: "Consegnate lo scooter direttamente al mio hotel a Baja?",
          a: "Certo! Consegna VIP al tuo hotel, residence o anche in spiaggia. Contattaci su WhatsApp.",
        },
        {
          q: "Quale scooter consigliate per Baja Sardinia?",
          a: (
            <>L'<Link to="/flotta/honda-sh" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">Honda SH 350</Link> per chi ha la patente A2/A e vuole più potenza per la salita verso Phi Beach (specie in due). L'SH 125 per chi ha solo la patente B: più che sufficiente in solitaria, un po' affaticato in due con bagagli.</>
          ),
        },
        {
          q: "Conviene cenare a Porto Cervo o a Baja Sardinia?",
          a: "Dipende dal budget e dall'occasione. Baja ha un'offerta più informale e a prezzi mediamente inferiori (ottimi La Tartaruga per la pizza, Bar La Piazzetta per l'aperitivo). Porto Cervo è la scelta per le serate evento (Gianni Pedrinelli, Sottovento). Il vantaggio dello scooter: in 5 minuti spostare la decisione. Molti dei nostri clienti aperitivano a Baja, scendono per cena a Porto Cervo, risalgono al Ritual per la notte.",
        },
        {
          q: "C'è un'alternativa al Phi Beach per il tramonto?",
          a: "Sì, e meno affollata: la Spiaggia dei Tre Monti, raggiungibile in 10 minuti di scooter dal centro di Baja. Il punto panoramico in alto sul sentiero offre una vista spettacolare sull'arcipelago di La Maddalena con luce dorata simile al Phi, ma senza la folla. È il consiglio che diamo ai clienti che vogliono il tramonto perfetto senza ressa.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 max-w-3xl mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed">
          Baja Sardinia funziona meglio se la pensi come parte di un sistema. In 5 minuti di scooter sei a{" "}
          <Link to="/noleggio-auto-a-porto-cervo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            Porto Cervo
          </Link>{" "}
          per lo shopping della Promenade e i ristoranti della Marina; in 15 minuti sali a{" "}
          <Link to="/noleggio-auto-a-san-pantaleo" className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition-all">
            San Pantaleo
          </Link>{" "}
          per il mercato del giovedì e la cucina autentica del borgo gallurese; in 30 minuti raggiungi le calette
          dell'arcipelago di La Maddalena partendo da Palau. Per chi sceglie Baja come base, il segreto è non
          trattarla come un'isola: muoversi è facile e veloce, e ogni località vicina aggiunge un tassello diverso
          alla vacanza. Lo scooter è la chiave che apre tutto questo senza spese extra di parcheggio o stress da
          coda. Per soggiorni lunghi (settimanali o quindicinali) consigliamo formula combo: scooter sempre + auto a
          chiamata per le giornate di pioggia o le escursioni a lungo raggio.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Baja Sardinia" />
  </>
);

export default BajaSardiniaPage;
