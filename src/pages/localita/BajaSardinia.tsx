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

const BajaSardiniaPage = () => (
  <>
    <SEOHead
      title="Noleggio Auto, Scooter e Quad a Baja Sardinia | GDIS Rent"
      description="Noleggia scooter e auto a Baja Sardinia. Phi Beach, Ritual Club e spiagge da sogno. Evita il traffico con GDIS Rent."
      canonical="/localita/baja-sardinia"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "GDIS Rent - Baja Sardinia",
        description: "Noleggio veicoli a Baja Sardinia, Costa Smeralda",
        areaServed: "Baja Sardinia",
      }}
    />

    <LocalitaHero
      name="Baja Sardinia"
      subtitle="Tramonti al Phi Beach, party al Ritual e spiagge caraibiche. In scooter è tutto più bello — e senza traffico."
      bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
    />

    <LocalitaScopri
      name="Baja Sardinia"
      intro="Baja Sardinia è il lato energico della Costa Smeralda. A pochi minuti da Porto Cervo ma con un'atmosfera completamente diversa: qui si viene per i tramonti spettacolari al Phi Beach, per i party al Ritual Club, e per le spiagge di sabbia bianca incastonate tra rocce di granito rosa. Il traffico estivo può essere feroce, ed è per questo che lo scooter è il veicolo più intelligente per vivere Baja Sardinia al massimo."
      spots={[
        { name: "Phi Beach", desc: "Il sunset bar più iconico della Sardegna. Dj set sulle rocce con vista sulle isole." },
        { name: "Spiaggia di Baja Sardinia", desc: "Sabbia fine, acqua turchese e tutti i servizi. Il centro della vita balneare." },
        { name: "Tre Monti", desc: "Sentiero panoramico che offre una vista mozzafiato sull'arcipelago de La Maddalena." },
        { name: "Battistoni Beach", desc: "Cala esclusiva con beach club chic. L'indirizzo più glamour della baia." },
      ]}
      image="https://images.unsplash.com/photo-1514890547357-a9ee288728e0?auto=format&fit=crop&w=800&q=80"
    />

    <LocalitaTrafficTips
      name="Baja Sardinia"
      tips={[
        { icon: "traffic", title: "Traffico Intenso", text: "In luglio-agosto il traffico verso Baja Sardinia è pesante, specialmente al tramonto per il Phi Beach. Lo scooter elimina il problema." },
        { icon: "parking", title: "Parcheggio Phi Beach", text: "Parcheggio limitatissimo al Phi Beach. In scooter trovi sempre posto, in auto rischi di camminare 20 minuti." },
        { icon: "ztl", title: "Centro Baja", text: "Il centro è compatto e parzialmente pedonale. Scooter e quad sono perfetti per muoversi." },
        { icon: "tip", title: "Da Porto Cervo", text: "Baja Sardinia è a 5 minuti da Porto Cervo in scooter. La soluzione ideale per chi vuole cenare a Porto Cervo e ballare qui." },
      ]}
    />

    <LocalitaNightlife
      name="Baja Sardinia"
      locali={[
        { name: "Phi Beach", type: "lounge", desc: "Sunset bar leggendario sulle rocce. Dj set internazionali, cocktail premium e vista infinita sull'arcipelago." },
        { name: "Ritual Club", type: "club", desc: "Il nuovo tempio della musica elettronica in Costa Smeralda. Serate a tema e guest dj da Ibiza." },
        { name: "Ristorante L'Ea Bianca", type: "ristorante", desc: "Cucina di mare contemporanea in un resort 5 stelle. Terrazza sulla baia con menu degustazione." },
        { name: "Bar La Piazzetta", type: "aperitivo", desc: "Pre-serata perfetta nel cuore di Baja. Mojito artigianali e atmosfera festosa." },
        { name: "Aquadream", type: "lounge", desc: "Parco acquatico e beach club. Perfetto di giorno per famiglie, aperitivi chic la sera." },
        { name: "La Tartaruga", type: "ristorante", desc: "Pizza gourmet e primi di mare sulla spiaggia. Ideale per una cena informale prima del Phi Beach." },
      ]}
    />

    <TrustMarquee />

    <LocalitaFAQ
      name="Baja Sardinia"
      faqs={[
        { q: "Posso parcheggiare lo scooter gratis al Phi Beach?", a: "Sì, al Phi Beach c'è un'area moto/scooter gratuita molto vicina all'ingresso. È decisamente la scelta più intelligente rispetto all'auto, specialmente nelle sere dei dj set." },
        { q: "Consegnate i veicoli direttamente a Baja Sardinia?", a: "Certo! Consegna VIP al tuo hotel, residence o direttamente sulla spiaggia. Contattaci su WhatsApp per organizzare." },
        { q: "Quale veicolo consigliate per la vita notturna a Baja Sardinia?", a: "Lo scooter Honda SH, senza dubbio. Niente problemi di parcheggio al Phi Beach o al Ritual, e torni in hotel in totale comodità." },
        { q: "Quanto dista Porto Cervo da Baja Sardinia?", a: "Solo 5 minuti in scooter! Puoi cenare a Porto Cervo e spostarti a Baja Sardinia per il dopo cena senza stress." },
      ]}
    />

    <section className="py-16 bg-muted/20">
      <div className="container px-4 text-center">
        <p className="text-muted-foreground">
          Da Baja Sardinia raggiungi in 5 minuti{" "}
          <Link to="/localita/porto-cervo" className="text-primary font-semibold hover:underline">Porto Cervo</Link>
          {" "}per lo shopping e la Marina, oppure sali verso{" "}
          <Link to="/localita/san-pantaleo" className="text-primary font-semibold hover:underline">San Pantaleo</Link>
          {" "}per il mercato del giovedì.
        </p>
      </div>
    </section>

    <Recensioni />
    <LocalitaCTA name="Baja Sardinia" />
  </>
);

export default BajaSardiniaPage;
