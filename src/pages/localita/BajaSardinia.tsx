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

const BajaSardiniaPage = () => (
  <>
    <SEOHead
      title="Noleggio Scooter a Baja Sardinia | Phi Beach & Ritual | GDIS Rent"
      description="Noleggia Honda SH a Baja Sardinia. Evita il traffico del Phi Beach, parcheggia gratis e vivi la Costa Smeralda senza stress. GDIS Rent."
      canonical="/localita/noleggio-baja-sardinia"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Baja Sardinia",
        description: "Noleggio scooter Honda SH a Baja Sardinia per Phi Beach e vita notturna",
        areaServed: "Baja Sardinia",
      }}
    />

    <LocalitaHeroV2
      name="Baja Sardinia"
      subtitle="Phi Beach, Ritual Club e tramonti leggendari. In scooter è tutto più bello — e senza traffico."
      bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-noleggio-baja-sardinia.webp"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
      vehicleAlt="Honda SH 350 Baja Sardinia"
    />

    <VehicleSpotlight
      tag="L'Unica Scelta Intelligente"
      title="Lo Scooter È l'Unico Modo di Vivere Baja Sardinia"
      description="Baja Sardinia in estate è un paradiso — ma il traffico è feroce. Al tramonto, quando tutti puntano verso il Phi Beach per il sunset dj set, la strada si paralizza. In auto rischi di perderti il tramonto in coda. Con l'Honda SH arrivi in 5 minuti, parcheggi gratis nell'area moto vicino all'ingresso, e ti godi lo spettacolo. Dopo? In 5 minuti sei a Porto Cervo per cena, e poi torni al Ritual Club per ballare. Zero stress, zero parcheggio, massima libertà."
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

    <MasonrySpots
      name="Baja Sardinia"
      spots={[
        {
          name: "Phi Beach",
          desc: "Il sunset bar più iconico della Sardegna. Dj set sulle rocce con vista sulle isole.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-phi-beach-baja-sardinia.webp",
        },
        {
          name: "Spiaggia di Baja",
          desc: "Sabbia fine, acqua turchese e tutti i servizi. Il cuore della vita balneare.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-spiaggia-di-baja-sardinia.webp",
        },
        {
          name: "Battistoni Beach",
          desc: "Cala esclusiva con beach club chic. L'indirizzo più glamour della baia.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-battistoni-beach-baja-sardinia.webp",
        },
        {
          name: "Tre Monti",
          desc: "Sentiero panoramico con vista mozzafiato sull'arcipelago de La Maddalena.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-spiaggia-dei-tre-monti-baja-sardinia.webp",
        },
        {
          name: "Ritual Club",
          desc: "Il tempio della musica elettronica in Costa Smeralda. Guest dj da Ibiza.",
          image:
            "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/baja-sardinia/gdisrent-ritual-baja-sardinia.webp",
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
          text: "5 minuti in scooter e sei alla Promenade du Port per cena. Poi torni a Baja per il Ritual.",
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
          a: "L'Honda SH 350 per chi ha la patente A2/A e vuole più potenza per la salita verso Phi Beach. L'SH 125 per chi ha solo la patente B.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da Baja Sardinia in 5 minuti di scooter sei a{" "}
          <Link to="/localita/noleggio-porto-cervo" className="text-primary font-semibold hover:underline">
            Porto Cervo
          </Link>{" "}
          per lo shopping di lusso e la Marina — il combo perfetto.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Baja Sardinia" />
  </>
);

export default BajaSardiniaPage;
