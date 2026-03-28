import SEOHead from "@/components/SEOHead";
import LocalitaHero from "@/components/localita/LocalitaHero";
import LocalitaScopri from "@/components/localita/LocalitaScopri";
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
      title="Noleggio Auto, Scooter e Quad a Porto Cervo | GDIS Rent"
      description="Noleggia auto, scooter e quad a Porto Cervo con consegna VIP a hotel, ville e yacht. Esplora la Costa Smeralda con stile. Prenota online con GDIS."
      canonical="/localita/porto-cervo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Porto Cervo",
        description: "Noleggio veicoli premium a Porto Cervo, Costa Smeralda",
        areaServed: "Porto Cervo",
      }}
    />

    <LocalitaHero
      name="Porto Cervo"
      subtitle="Consegna VIP direttamente al tuo yacht in Marina o alla tua villa privata. Lusso su due e quattro ruote nel cuore della Costa Smeralda."
      bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="Porto Cervo"
      intro="Porto Cervo è il gioiello indiscusso della Costa Smeralda, fondato dal Principe Aga Khan negli anni '60. Qui ogni dettaglio parla di lusso: la Promenade du Port con le sue boutique, la Marina che ospita i mega-yacht più prestigiosi del Mediterraneo, e le spiagge di acqua cristallina che si nascondono tra le rocce di granito."
      spots={[
        { name: "Spiaggia del Principe", desc: "Sabbia bianchissima e acque turchesi, una delle spiagge più belle del mondo." },
        { name: "La Promenade du Port", desc: "Shopping di lusso, gallerie d'arte e aperitivi vista yacht." },
        { name: "Stella Maris", desc: "La chiesa iconica progettata da Michele Busiri Vici, con opere di El Greco." },
        { name: "Cala di Volpe", desc: "La baia leggendaria con l'omonimo hotel, perfetta per un giro in scooter." },
      ]}
      image="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="Porto Cervo"
      tips={[
        { icon: "ztl", title: "ZTL Centro", text: "Il centro di Porto Cervo è pedonale in estate. Parcheggia prima e prosegui a piedi o in scooter." },
        { icon: "parking", title: "Parcheggio Marina", text: "Parcheggio a pagamento vicino alla Marina. In alta stagione si riempie presto: arriva entro le 10." },
        { icon: "traffic", title: "Traffico Estivo", text: "La SS Arzachena–Porto Cervo è congestionata da luglio ad agosto. Lo scooter è la soluzione ideale." },
        { icon: "tip", title: "Verso Baja Sardinia", text: "Raggiungi Baja Sardinia in soli 5 minuti in scooter evitando completamente il traffico." },
      ]}
    />

    <LocalitaNightlife
      name="Porto Cervo"
      locali={[
        { name: "Billionaire", type: "club", desc: "Il club più esclusivo della Sardegna. Cene-spettacolo e dj set internazionali fino all'alba." },
        { name: "Pepero", type: "aperitivo", desc: "Cocktail bar sulla Promenade con vista sulla Marina. L'aperitivo perfetto al tramonto." },
        { name: "Ristorante Gianni Pedrinelli", type: "ristorante", desc: "Cucina gallurese raffinata con terrazza panoramica. Prenotazione obbligatoria in alta stagione." },
        { name: "Sottovento", type: "club", desc: "Atmosfera glamour e musica live, il punto di riferimento della movida di Porto Cervo." },
        { name: "Il Pescatore", type: "ristorante", desc: "Pesce freschissimo direttamente dalla barca. Ambiente intimo e romantico." },
        { name: "Phi Beach", type: "lounge", desc: "Tecnicamente a Baja Sardinia, ma imperdibile. Raggiungi il sunset set in scooter da Porto Cervo." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Porto Cervo"
      faqs={[
        { q: "Consegnate i veicoli direttamente alla Marina di Porto Cervo?", a: "Sì, offriamo consegna VIP gratuita direttamente al pontile della Marina, al tuo hotel o alla tua villa privata. Contattaci su WhatsApp per coordinare." },
        { q: "Quale veicolo consigliate per muoversi a Porto Cervo?", a: "Per il centro e le spiagge, lo scooter Honda SH è perfetto: niente problemi di parcheggio e traffico. Per esplorare le cale nascoste, il quad Yamaha Raptor è imbattibile." },
        { q: "Posso noleggiare un'auto di lusso per eventi speciali?", a: "Assolutamente sì. Su richiesta via WhatsApp organizziamo il noleggio di auto VIP e supercar per eventi, matrimoni e serate speciali." },
        { q: "Quanto dista Porto Cervo dall'aeroporto di Olbia?", a: "Circa 30 minuti. Possiamo consegnare il veicolo direttamente all'aeroporto di Olbia Costa Smeralda." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da Porto Cervo puoi esplorare facilmente{" "}
          <Link to="/localita/baja-sardinia" className="text-primary font-semibold hover:underline">Baja Sardinia</Link>
          {" "}in 5 minuti, oppure salire verso il borgo bohémien di{" "}
          <Link to="/localita/san-pantaleo" className="text-primary font-semibold hover:underline">San Pantaleo</Link>.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Porto Cervo" />
  </>
);

export default PortoCervoPage;
