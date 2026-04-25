import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { TrainFront, Check } from "lucide-react";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const faqs = [
  {
    q: "Dove avviene la consegna alla Stazione di Olbia?",
    a: (
      <>
        La consegna avviene nel piazzale antistante la <strong>Stazione di Olbia</strong> (Trenitalia,
        ex FS). Un nostro operatore ti attende con il veicolo già contrattualizzato all'uscita della
        stazione.
      </>
    ),
  },
  {
    q: "Quanto costa la consegna alla stazione ferroviaria?",
    a: (
      <>
        La consegna e il ritiro alla Stazione di Olbia sono <strong>gratuiti</strong> per prenotazioni
        superiori a 3 giorni.
      </>
    ),
  },
  {
    q: "E se il treno arriva in ritardo?",
    a: (
      <>
        Monitoriamo gli orari Trenitalia in tempo reale: in caso di ritardo il nostro operatore è
        comunque presente all'arrivo effettivo del treno. Nessun sovrapprezzo.
      </>
    ),
  },
  {
    q: "Posso restituire il veicolo alla stazione?",
    a: (
      <>
        Sì, riconsegna alla Stazione di Olbia inclusa. Ti chiediamo solo di informarci via WhatsApp 2
        ore prima della partenza del treno.
      </>
    ),
  },
  {
    q: "Quali veicoli sono disponibili alla stazione?",
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

const NoleggioStazioneOlbia = () => {
  const breadcrumbs = [
    { name: "Olbia", url: "/noleggio-auto-a-olbia" },
    { name: "Stazione Olbia", url: "/noleggio-auto-stazione-olbia" },
  ];

  const schema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/noleggio-auto-stazione-olbia#localbusiness",
    description:
      "Noleggio auto alla Stazione di Olbia con consegna direttamente all'uscita dei treni Trenitalia.",
    areaServed: [
      { "@type": "TrainStation", name: "Stazione di Olbia" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Stazione Olbia | Consegna all'Arrivo | GDIS Rent"
        description="Noleggio auto alla Stazione di Olbia: consegna direttamente all'uscita del treno, zero attese, flotta Fiat / Mercedes / scooter / quad. Prenota online H24."
        canonical="/noleggio-auto-stazione-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Stazione Olbia"
        h1Prefix="Noleggio Auto"
        h1Accent="Stazione Olbia"
        subtitle="Consegna direttamente alla Stazione di Olbia. Scendi dal treno e trovi la tua auto pronta."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
        vehicleAlt="Noleggio auto stazione Olbia"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <TrainFront className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Stazione Trenitalia — Olbia
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Dal treno direttamente al volante
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            La <strong>Stazione di Olbia</strong> collega la Sardegna nord-orientale con Sassari, Cagliari
            e l'entroterra. Con il nostro servizio di noleggio auto alla stazione il veicolo è pronto e
            contrattualizzato quando scendi dal treno. Nessun taxi, nessun trasferimento.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ti aspettiamo all'uscita della stazione con un cartello personalizzato. Ti consegniamo il
            veicolo, firmiamo digitalmente il contratto e in pochi minuti sei verso{" "}
            <Link to="/noleggio-auto-a-olbia" className="text-primary underline">il centro di Olbia</Link>{" "}
            o la{" "}
            <Link to="/noleggio-auto-in-costa-smeralda" className="text-primary underline">Costa Smeralda</Link>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              "Consegna all'uscita stazione",
              "Monitoraggio orari Trenitalia",
              "Firma digitale del contratto",
              "Nessun costo aggiuntivo",
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

      <LocalitaFAQ name="Stazione Olbia" faqs={faqs} emitSchema />
      <LocalitaCTA name="Stazione Olbia" />
    </>
  );
};

export default NoleggioStazioneOlbia;
