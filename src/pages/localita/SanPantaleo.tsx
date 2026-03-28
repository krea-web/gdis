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

const SanPantaleoPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto, Scooter e Quad a San Pantaleo | GDIS Rent"
      description="Noleggia scooter e auto a San Pantaleo, il borgo bohémien della Gallura. Mercato del giovedì, montagne e strade panoramiche. GDIS Rent."
      canonical="/localita/san-pantaleo"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - San Pantaleo",
        description: "Noleggio veicoli a San Pantaleo, Gallura",
        areaServed: "San Pantaleo",
      }}
    />

    <LocalitaHero
      name="San Pantaleo"
      subtitle="Il borgo bohémien della Gallura tra mercati artigianali, montagne di granito e strade panoramiche perfette per lo scooter."
      bgImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="San Pantaleo"
      intro="San Pantaleo è un piccolo gioiello incastonato tra le montagne di granito della Gallura. Lontano dal caos della costa, questo borgo conserva un'anima autentica: botteghe artigiane, gallerie d'arte, e il leggendario mercato del giovedì mattina che attira visitatori da tutta la Costa Smeralda. Le strade strette del centro sono il paradiso dello scooter: niente stress, solo bellezza."
      spots={[
        { name: "Piazza della Chiesa", desc: "Il cuore pulsante del borgo. Caffè all'ombra dei lecci e atmosfera d'altri tempi." },
        { name: "Mercato del Giovedì", desc: "Artigianato locale, ceramiche, tessuti sardi e street food. Un'esperienza imperdibile." },
        { name: "Rocce di Punta Cugnana", desc: "Formazioni granitiche spettacolari raggiungibili in quad per un tramonto indimenticabile." },
        { name: "Stazzo Gallurese", desc: "Antiche fattorie in pietra trasformate in agriturismi con cucina tradizionale." },
      ]}
      image="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="San Pantaleo"
      tips={[
        { icon: "parking", title: "Parcheggio Limitato", text: "Il centro ha pochissimi posti auto, specialmente il giovedì (mercato). Vieni in scooter ed è tutto più facile." },
        { icon: "ztl", title: "Strade Strette", text: "Le vie del borgo sono strette e tortuose. L'Honda SH 125 è il veicolo perfetto per navigarle." },
        { icon: "traffic", title: "Strada Panoramica", text: "La SP13 verso Arzachena è bellissima ma con curve: guida con calma e goditi il panorama." },
        { icon: "tip", title: "Verso Porto Cervo", text: "In 15 minuti di scooter scendi verso Porto Cervo per una cena vista mare." },
      ]}
    />

    <LocalitaNightlife
      name="San Pantaleo"
      locali={[
        { name: "Ristorante Giagoni", type: "ristorante", desc: "Cucina gallurese contemporanea con ingredienti a km zero. La zuppa gallurese è memorabile." },
        { name: "Café Nina", type: "aperitivo", desc: "Aperitivi artigianali nella piazzetta. Atmosfera bohémien e musica acustica il venerdì sera." },
        { name: "Da Roberto", type: "ristorante", desc: "Pizzeria storica del borgo. Impasto a lunga lievitazione e forno a legna." },
        { name: "Wine Bar L'Artigiano", type: "aperitivo", desc: "Selezione di Cannonau e Vermentino locali. Taglieri di formaggi sardi artigianali." },
        { name: "Agriturismo Li Paràuli", type: "ristorante", desc: "Esperienza rurale autentica a 5 minuti dal centro. Menu fisso con prodotti dell'azienda." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="San Pantaleo"
      faqs={[
        { q: "Come arrivo a San Pantaleo senza auto?", a: "Consegniamo scooter e auto direttamente a San Pantaleo. Lo scooter Honda SH è la scelta perfetta per il borgo e le sue strade strette." },
        { q: "Quando si tiene il mercato del giovedì?", a: "Ogni giovedì mattina da giugno a settembre, dalle 8 alle 13. Vieni presto in scooter per trovare posto e goderti l'atmosfera prima della folla." },
        { q: "Posso raggiungere Porto Cervo da San Pantaleo in scooter?", a: "Certo! Porto Cervo è a soli 15 minuti lungo una strada panoramica tra le rocce di granito. Perfetto per una serata fuori." },
        { q: "Il quad è adatto per esplorare l'entroterra intorno a San Pantaleo?", a: "Assolutamente sì. L'entroterra gallurese è pieno di sentieri sterrati e paesaggi mozzafiato perfetti per il Yamaha Raptor." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da San Pantaleo scendi in 15 minuti verso{" "}
          <Link to="/localita/porto-cervo" className="text-primary font-semibold hover:underline">Porto Cervo</Link>
          {" "}per lo shopping di lusso, oppure esplora le cale nascoste di{" "}
          <Link to="/localita/porto-rotondo" className="text-primary font-semibold hover:underline">Porto Rotondo</Link>.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="San Pantaleo" />
  </>
);

export default SanPantaleoPage;
