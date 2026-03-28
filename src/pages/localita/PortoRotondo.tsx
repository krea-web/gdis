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

const PortoRotondoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto, Scooter e Quad a Porto Rotondo | GDIS Rent"
      description="Noleggia auto, scooter e quad a Porto Rotondo. Piazzetta San Marco, Ira Beach e Marina. Consegna VIP diretta con GDIS Rent."
      canonical="/localita/porto-rotondo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Porto Rotondo",
        description: "Noleggio veicoli a Porto Rotondo, Costa Smeralda",
        areaServed: "Porto Rotondo",
      }}
    />

    <LocalitaHero
      name="Porto Rotondo"
      subtitle="Eleganza discreta, spiagge da sogno e una Marina esclusiva. Consegna VIP direttamente alla tua villa o al tuo ormeggio."
      bgImage="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="Porto Rotondo"
      intro="Porto Rotondo incarna l'eleganza discreta della Costa Smeralda. Meno caotica di Porto Cervo ma altrettanto raffinata, questa perla affacciata sul Golfo di Cugnana offre una Piazzetta San Marco che ricorda Venezia, una Marina con yacht da sogno, e alcune delle spiagge più belle della Sardegna nord-orientale. Qui il tempo scorre lento, tra un bagno in acque cristalline e un aperitivo al tramonto."
      spots={[
        { name: "Spiaggia di Ira", desc: "Due baie gemelle separate da uno sperone roccioso. Acque limpide e fondali perfetti per lo snorkeling." },
        { name: "Piazzetta San Marco", desc: "L'anfiteatro all'aperto con la chiesa e le sculture di Andrea Cascella." },
        { name: "Spiaggia dei Sassi", desc: "Caletta intima raggiungibile a piedi. Pochi turisti, massima privacy." },
        { name: "Punta Volpe", desc: "Litorale selvaggio con calette raggiungibili solo in quad o a piedi." },
      ]}
      image="https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="Porto Rotondo"
      tips={[
        { icon: "parking", title: "Parcheggio Piazzetta", text: "Parcheggio limitato vicino alla Piazzetta. In scooter trovi posto ovunque, anche in piena estate." },
        { icon: "traffic", title: "Traffico Moderato", text: "Meno congestionata di Porto Cervo, ma il tratto Olbia-Porto Rotondo è trafficato nelle ore di punta." },
        { icon: "ztl", title: "Centro Pedonale", text: "La Piazzetta e il lungomare sono pedonali. Lo scooter è l'ideale per arrivarci e parcheggiare vicino." },
        { icon: "tip", title: "Cale Nascoste in Quad", text: "Le calette di Punta Volpe e Marinella sono perfette per il quad: strade sterrate e zero folla." },
      ]}
    />

    <LocalitaNightlife
      name="Porto Rotondo"
      locali={[
        { name: "Ristorante S'Astore", type: "ristorante", desc: "Alta cucina sarda con vista sulla baia. Degustazione di aragoste e ricci di mare freschi." },
        { name: "Country Club Porto Rotondo", type: "lounge", desc: "Pool bar esclusivo con dj set al tramonto. Dress code elegante." },
        { name: "Bar della Piazzetta", type: "aperitivo", desc: "Il punto di ritrovo per l'aperitivo serale. Vino sardo e taglieri di pecorino." },
        { name: "Ristorante Tartarughino", type: "ristorante", desc: "Pesce alla griglia e pasta fresca sulla terrazza con vista Marina." },
        { name: "La Terrazza Lounge", type: "lounge", desc: "Cocktail d'autore e musica soft con panorama sul golfo." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Porto Rotondo"
      faqs={[
        { q: "Consegnate i veicoli alla Marina di Porto Rotondo?", a: "Sì, offriamo consegna VIP alla Marina, al tuo hotel o alla tua villa. Contattaci su WhatsApp per organizzare il ritiro." },
        { q: "Come raggiungo le spiagge nascoste intorno a Porto Rotondo?", a: "Le calette di Punta Volpe e le spiagge più isolate sono raggiungibili al meglio con il quad Yamaha Raptor. Per Ira Beach, anche lo scooter è perfetto." },
        { q: "Porto Rotondo è adatta per famiglie?", a: "Assolutamente. Le acque basse di Marinella e Ira Beach sono ideali per i bambini. La Fiat Panda è perfetta per la famiglia." },
        { q: "Quanto dista Olbia da Porto Rotondo?", a: "Solo 15 minuti in auto. Consegniamo anche all'aeroporto e al porto di Olbia." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da Porto Rotondo sali verso il borgo montano di{" "}
          <Link to="/localita/san-pantaleo" className="text-primary font-semibold hover:underline">San Pantaleo</Link>
          {" "}per il mercato del giovedì, oppure scendi verso{" "}
          <Link to="/localita/golfo-aranci" className="text-primary font-semibold hover:underline">Golfo Aranci</Link>
          {" "}per pesce fresco e tramonti sul mare.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Porto Rotondo" />
  </>
);

export default PortoRotondoPage;
