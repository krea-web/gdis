import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { Ship, Check } from "lucide-react";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const faqs = [
  {
    q: "Dove avviene la consegna al Porto di Olbia Isola Bianca?",
    a: (
      <>
        La consegna avviene direttamente nel piazzale antistante il terminal traghetti Isola Bianca.
        Un nostro operatore ti attende con il veicolo già contrattualizzato: scarichi il bagaglio dal
        traghetto e parti senza navette o taxi.
      </>
    ),
  },
  {
    q: "Quanto costa la consegna al porto?",
    a: (
      <>
        La consegna e il ritiro al <strong>Porto di Olbia Isola Bianca</strong> sono{" "}
        <strong>gratuiti</strong> per prenotazioni superiori a 3 giorni.
      </>
    ),
  },
  {
    q: "E se il traghetto arriva in ritardo?",
    a: (
      <>
        Monitoriamo costantemente gli orari di arrivo di Tirrenia, Moby, GNV e Grimaldi: in caso di
        ritardo il nostro operatore è comunque presente allo sbarco effettivo. Nessun sovrapprezzo.
      </>
    ),
  },
  {
    q: "Posso prendere il traghetto con l'auto a noleggio?",
    a: (
      <>
        Sì, è possibile portare il veicolo a noleggio sul traghetto (es. per Corsica o altre
        destinazioni), ma serve l'<strong>autorizzazione scritta</strong> del locatore prima della
        partenza. Contattaci via WhatsApp almeno 48 ore prima.
      </>
    ),
  },
  {
    q: "Quali veicoli sono disponibili al porto?",
    a: (
      <>
        Tutta la nostra flotta:{" "}
        <Link to="/flotta/fiat-panda" className="text-primary underline">Fiat Panda</Link>,{" "}
        <Link to="/flotta/mercedes-classe-a180d" className="text-primary underline">Mercedes Classe A</Link>,{" "}
        <Link to="/flotta/honda-sh" className="text-primary underline">scooter Honda SH</Link> e{" "}
        <Link to="/flotta/yamaha-raptor" className="text-primary underline">quad Yamaha Raptor</Link>.
      </>
    ),
  },
];

const NoleggioPortoOlbia = () => {
  const breadcrumbs = [
    { name: "Olbia", url: "/noleggio-auto-a-olbia" },
    { name: "Porto Olbia", url: "/noleggio-auto-porto-olbia" },
  ];

  const schema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/noleggio-auto-porto-olbia#localbusiness",
    description:
      "Noleggio auto al Porto di Olbia Isola Bianca con consegna direttamente al terminal traghetti.",
    areaServed: [
      { "@type": "Place", name: "Porto di Olbia Isola Bianca" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Porto Olbia Isola Bianca | Consegna al Terminal | GDIS Rent"
        description="Noleggio auto al Porto di Olbia Isola Bianca: consegna direttamente al terminal traghetti, zero attese, flotta Fiat / Mercedes / scooter / quad. Prenota online H24."
        canonical="/noleggio-auto-porto-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Porto Olbia"
        h1Prefix="Noleggio Auto"
        h1Accent="Porto Olbia"
        subtitle="Consegna al terminal traghetti Isola Bianca. Scendi dal traghetto, trovi la tua auto pronta e parti."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
        vehicleAlt="Noleggio auto porto Olbia Isola Bianca"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Ship className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Porto Isola Bianca — Olbia
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Dal traghetto direttamente in auto
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Il <strong>Porto di Olbia Isola Bianca</strong> è uno dei porti più trafficati del
            Mediterraneo: ogni estate accoglie centinaia di migliaia di passeggeri da Civitavecchia,
            Livorno, Genova, Piombino e Nizza. Con il nostro servizio di noleggio auto al porto il
            veicolo è pronto e contrattualizzato quando scendi dalla nave.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ti aspettiamo in uniforme all'uscita del terminal. Firma digitale, consegna foto-documentata
            e in meno di 10 minuti sei sulla{" "}
            <Link to="/noleggio-auto-a-olbia" className="text-primary underline">strada per Olbia</Link>{" "}
            o verso la{" "}
            <Link to="/noleggio-auto-in-costa-smeralda" className="text-primary underline">Costa Smeralda</Link>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              "Consegna al terminal Isola Bianca",
              "Monitoraggio orari traghetti in tempo reale",
              "Firma digitale del contratto",
              "Nessun sovrapprezzo portuale",
              "Flotta completa disponibile",
              "WhatsApp H24 per assistenza",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-card border border-border rounded-xl">
                <Check className="text-primary mt-0.5 shrink-0" size={18} />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalitaFAQ name="Porto Olbia" faqs={faqs} emitSchema />
      <LocalitaCTA name="Porto Olbia" />
    </>
  );
};

export default NoleggioPortoOlbia;
