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

const GolfoAranciPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto, Scooter e Quad a Golfo Aranci | GDIS Rent"
      description="Noleggia auto, scooter e quad a Golfo Aranci. Consegna VIP al terminal traghetti. Cala Moresca, delfini e pesce fresco. GDIS Rent."
      canonical="/localita/golfo-aranci"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Golfo Aranci",
        description: "Noleggio veicoli a Golfo Aranci con consegna al terminal traghetti",
        areaServed: "Golfo Aranci",
      }}
    />

    <LocalitaHero
      name="Golfo Aranci"
      subtitle="Sbarca dal traghetto e trova il tuo veicolo pronto. Cala Moresca, delfini e i migliori ristoranti di pesce della Gallura."
      bgImage="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="Golfo Aranci"
      intro="Golfo Aranci è la porta d'ingresso alla Gallura per chi arriva in traghetto dalla penisola. Ma non è solo un punto di transito: questo borgo marinaro autentico nasconde alcune delle spiagge più belle e meno affollate della costa nord-est. Cala Moresca, con i suoi fondali di posidonia e acque smeraldo, è un paradiso per lo snorkeling. E al tramonto, il lungomare si trasforma in un salotto a cielo aperto con il miglior pesce della Sardegna."
      spots={[
        { name: "Cala Moresca", desc: "Piccola baia protetta con acque cristalline. Ideale per snorkeling e immersioni." },
        { name: "Spiaggia Bianca", desc: "La spiaggia principale del paese, sabbia bianchissima e servizi completi." },
        { name: "Capo Figari", desc: "Riserva naturale con sentieri panoramici e la stazione radio di Marconi." },
        { name: "Osservazione Delfini", desc: "Escursioni in barca per avvistare i delfini nel golfo. Esperienza unica." },
      ]}
      image="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="Golfo Aranci"
      tips={[
        { icon: "parking", title: "Terminal Traghetti", text: "Il parcheggio vicino al porto si riempie durante gli sbarchi. Ritira il veicolo e parti subito per evitare la coda." },
        { icon: "traffic", title: "Traffico Sbarco", text: "Nei giorni di sbarco (venerdì/domenica) il traffico aumenta. Lo scooter ti permette di sgusciare via in 2 minuti." },
        { icon: "ztl", title: "Lungomare", text: "Il lungomare è pedonale di sera in estate. Parcheggia nelle vie parallele." },
        { icon: "tip", title: "Verso Porto Rotondo", text: "In 20 minuti di panoramica raggiungi Porto Rotondo e le sue spiagge esclusive." },
      ]}
    />

    <LocalitaNightlife
      name="Golfo Aranci"
      locali={[
        { name: "Ristorante Terza Spiaggia", type: "ristorante", desc: "Pesce freschissimo con i piedi nella sabbia. Frittura di paranza leggendaria e aragosta alla griglia." },
        { name: "Il Vecchio Porto", type: "ristorante", desc: "Trattoria marinara autentica sul lungomare. Fregola con arselle da non perdere." },
        { name: "Bar del Porto", type: "aperitivo", desc: "L'aperitivo dei pescatori. Prosecco e ostriche guardando i traghetti all'orizzonte." },
        { name: "Lido Blu", type: "lounge", desc: "Beach bar con musica al tramonto. Cocktail tropicali e piedi nell'acqua." },
        { name: "Ristorante Capo Figari", type: "ristorante", desc: "Cucina di mare raffinata con terrazza panoramica sul golfo." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Golfo Aranci"
      faqs={[
        { q: "Consegnate il veicolo al terminal traghetti di Golfo Aranci?", a: "Sì! È il nostro servizio più richiesto. Ti aspettiamo direttamente allo sbarco con il veicolo pronto. Comunicaci l'orario del traghetto e pensiamo a tutto noi." },
        { q: "Quanto costa il parcheggio a Golfo Aranci?", a: "Il parcheggio in zona porto è a pagamento in estate (circa €2/ora). Con lo scooter parcheggi gratis ovunque. Con la Panda trovi facilmente nelle vie laterali." },
        { q: "Posso fare escursioni a Capo Figari in quad?", a: "Il sentiero di Capo Figari è pedonale e protetto. Il quad è perfetto per esplorare le spiagge più remote lungo la costa, come Cala Sassari e le calette verso Pittulongu." },
        { q: "Quanto dista Golfo Aranci da Olbia?", a: "Solo 15 minuti. Dall'aeroporto di Olbia raggiungi Golfo Aranci in un attimo." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da Golfo Aranci esplora verso sud{" "}
          <Link to="/localita/porto-rotondo" className="text-primary font-semibold hover:underline">Porto Rotondo</Link>
          {" "}e le sue baie esclusive, oppure prosegui lungo la costa fino a{" "}
          <Link to="/localita/san-teodoro" className="text-primary font-semibold hover:underline">San Teodoro</Link>
          {" "}e la spiaggia La Cinta.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Golfo Aranci" />
  </>
);

export default GolfoAranciPage;
