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

const SanTeodoroPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto, Scooter e Quad a San Teodoro | GDIS Rent"
      description="Noleggia auto, scooter e quad a San Teodoro. Spiaggia La Cinta, vita notturna e avventure off-road. Consegna diretta con GDIS Rent."
      canonical="/localita/san-teodoro"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - San Teodoro",
        description: "Noleggio veicoli a San Teodoro, Sardegna",
        areaServed: "San Teodoro",
      }}
    />

    <LocalitaHero
      name="San Teodoro"
      subtitle="La Cinta, movida e spiagge infinite. Noleggia il tuo veicolo e vivi l'estate più bella della Gallura."
      bgImage="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="San Teodoro"
      intro="San Teodoro è la meta perfetta per chi cerca un mix esplosivo di spiagge caraibiche, divertimento notturno e natura selvaggia. La Cinta, con i suoi 5 km di sabbia finissima e lo stagno dei fenicotteri, è solo l'inizio. L'entroterra nasconde sentieri sterrati perfetti per il quad, mentre il centro si anima ogni sera con il celebre mercatino serale."
      spots={[
        { name: "Spiaggia La Cinta", desc: "5 km di sabbia dorata con vista su Tavolara. Lo stagno ospita colonie di fenicotteri rosa." },
        { name: "Cala Brandinchi", desc: "Chiamata 'Tahiti' per le acque trasparenti. Perfetta da raggiungere in scooter." },
        { name: "Lu Impostu", desc: "Laguna poco profonda ideale per famiglie, con un chiosco sulla spiaggia." },
        { name: "Monte Nieddu", desc: "Cascate e piscine naturali nell'entroterra. Avventura quad consigliata." },
      ]}
      image="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="San Teodoro"
      tips={[
        { icon: "parking", title: "Parcheggio La Cinta", text: "Parcheggio a pagamento (€3-5/giorno). In scooter puoi parcheggiare gratis nelle aree moto dedicate." },
        { icon: "traffic", title: "SS131 Estiva", text: "La statale è trafficata nel weekend. Parti presto per le spiagge o usa percorsi alternativi." },
        { icon: "ztl", title: "Centro Pedonale", text: "Il centro di San Teodoro è pedonale di sera. Perfetto per una passeggiata dopo aver parcheggiato." },
        { icon: "tip", title: "Verso Golfo Aranci", text: "Con la Fiat Panda raggiungi Golfo Aranci in 40 minuti lungo una strada panoramica mozzafiato." },
      ]}
    />

    <LocalitaNightlife
      name="San Teodoro"
      locali={[
        { name: "Ambra Night", type: "club", desc: "Il club di riferimento di San Teodoro. Dj set, serate a tema e atmosfera elettrica fino alle prime luci dell'alba." },
        { name: "Luna Glam Club", type: "club", desc: "Eleganza e musica house. Il punto d'incontro della movida giovane di San Teodoro." },
        { name: "Ristorante La Tartaruga", type: "ristorante", desc: "Cucina sarda autentica nel cuore del paese. I culurgiones sono leggendari." },
        { name: "Bar Centrale", type: "aperitivo", desc: "L'aperitivo in piazza, osservando il passeggio serale. Spritz perfetti e ambiente rilassato." },
        { name: "Da Nino al Porto", type: "ristorante", desc: "Pesce fresco e vista sul porticciolo. Atmosfera marinara autentica." },
        { name: "Mercatino Serale", type: "lounge", desc: "Ogni sera in estate: artigianato, street food e musica dal vivo nel centro del paese." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="San Teodoro"
      faqs={[
        { q: "Consegnate i veicoli a San Teodoro?", a: "Sì, offriamo consegna VIP direttamente al tuo hotel, B&B o residence a San Teodoro e nelle zone limitrofe." },
        { q: "Quale veicolo è migliore per le spiagge di San Teodoro?", a: "Per La Cinta e Cala Brandinchi lo scooter è perfetto. Per le spiagge più remote e i sentieri sterrati verso Monte Nieddu, il quad Yamaha Raptor è la scelta ideale." },
        { q: "Posso parcheggiare lo scooter gratis alle spiagge?", a: "Sì, alla Cinta e Brandinchi ci sono aree moto gratuite. Risparmierai rispetto al parcheggio auto." },
        { q: "Quanto dista l'aeroporto di Olbia da San Teodoro?", a: "Solo 25 minuti. Possiamo consegnare il veicolo all'aeroporto Olbia Costa Smeralda o direttamente al tuo alloggio." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da San Teodoro parti verso nord per scoprire{" "}
          <Link to="/localita/golfo-aranci" className="text-primary font-semibold hover:underline">Golfo Aranci</Link>
          {" "}e le sue calette segrete, oppure spingi fino alla glamour{" "}
          <Link to="/localita/porto-rotondo" className="text-primary font-semibold hover:underline">Porto Rotondo</Link>.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="San Teodoro" />
  </>
);

export default SanTeodoroPage;
