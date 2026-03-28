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

const PortoCervoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto di Lusso a Porto Cervo | GDIS Rent Costa Smeralda"
      description="Noleggia auto VIP, scooter e quad a Porto Cervo con consegna alla Marina o alla tua villa. Servizio luxury su richiesta WhatsApp. GDIS Rent."
      canonical="/localita/porto-cervo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Porto Cervo",
        description: "Noleggio veicoli premium e VIP a Porto Cervo, Costa Smeralda",
        areaServed: "Porto Cervo",
      }}
    />

    <LocalitaHeroV2
      name="Porto Cervo"
      subtitle="Consegna VIP alla tua Marina, villa o yacht. Il lusso della Costa Smeralda su ruote, su richiesta WhatsApp."
      bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
      vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
      vehicleAlt="Auto VIP Porto Cervo"
    />

    <VehicleSpotlight
      tag="VIP Collection"
      title="Il Tuo Veicolo di Lusso, Consegnato Ovunque"
      description="Porto Cervo merita un arrivo in grande stile. Su richiesta via WhatsApp, organizziamo il noleggio di auto VIP e supercar per eventi, serate al Billionaire, o semplicemente per vivere la Promenade du Port come un protagonista. La consegna avviene direttamente alla tua Marina, al tuo hotel 5 stelle, o alla tua villa privata."
      image="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80"
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

    <MasonrySpots
      name="Porto Cervo"
      spots={[
        {
          name: "Spiaggia del Principe",
          desc: "Sabbia bianchissima e acque turchesi, una delle spiagge più belle del Mediterraneo.",
          image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "La Promenade du Port",
          desc: "Shopping di lusso, gallerie d'arte e aperitivi vista mega-yacht.",
          image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Cala di Volpe",
          desc: "La baia leggendaria con l'omonimo hotel, perfetta per un giro in scooter.",
          image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Stella Maris",
          desc: "Chiesa iconica con opere di El Greco, incastonata tra le rocce di granito.",
          image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=600&q=80",
        },
        {
          name: "Pevero Golf Club",
          desc: "18 buche tra macchia mediterranea e panorami da togliere il fiato.",
          image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
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
          text: "Per evitare il traffico serale verso Baja Sardinia, prendi lo scooter: 5 minuti senza code.",
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

    <TrustMarquee />

    <LocalitaFAQ
      name="Porto Cervo"
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
          a: "Sì, il centro è pedonale/ZTL in estate. Con lo scooter Honda SH parcheggi nelle aree moto dedicate vicino alla Promenade, evitando completamente il problema.",
        },
        {
          q: "Quanto dista Porto Cervo dall'aeroporto di Olbia?",
          a: "Circa 30 minuti. Consegniamo il veicolo direttamente all'aeroporto Olbia Costa Smeralda.",
        },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-lg text-muted-foreground">
          Da Porto Cervo raggiungi in 5 minuti{" "}
          <Link to="/localita/baja-sardinia" className="text-primary font-semibold hover:underline">
            Baja Sardinia
          </Link>{" "}
          per i tramonti al Phi Beach, evitando il traffico in scooter.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Porto Cervo" />
  </>
);

export default PortoCervoPage;
