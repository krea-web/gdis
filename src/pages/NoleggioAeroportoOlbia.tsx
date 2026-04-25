import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { Plane, Check } from "lucide-react";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const faqs = [
  {
    q: "Dove avviene la consegna in Aeroporto Olbia Costa Smeralda?",
    a: (
      <>
        La consegna avviene direttamente nel piazzale antistante gli arrivi (Terminal Partenze/Arrivi,
        codice IATA <strong>OLB</strong>). Un nostro operatore ti attende con il veicolo già contrattualizzato:
        scarichi il bagaglio e parti, zero code ai desk.
      </>
    ),
  },
  {
    q: "Quanto costa la consegna all'aeroporto?",
    a: (
      <>La consegna e il ritiro in Aeroporto Olbia sono <strong>gratuiti</strong> per prenotazioni superiori a 3 giorni.</>
    ),
  },
  {
    q: "E se il volo è in ritardo?",
    a: (
      <>
        Monitoriamo costantemente lo stato dei voli: in caso di ritardo il nostro operatore è comunque presente
        all'atterraggio effettivo. Nessun sovrapprezzo.
      </>
    ),
  },
  {
    q: "Posso restituire il veicolo in aeroporto?",
    a: (
      <>
        Sì, riconsegna in Aeroporto Olbia inclusa. Ti chiediamo solo di informarci via WhatsApp 2 ore prima del check-in
        del volo di ritorno.
      </>
    ),
  },
  {
    q: "Quali veicoli sono disponibili all'aeroporto?",
    a: (
      <>
        Tutta la nostra flotta: <Link to="/flotta/fiat-panda" className="text-primary underline">Fiat Panda</Link>,{" "}
        <Link to="/flotta/mercedes-classe-a180d" className="text-primary underline">Mercedes Classe A</Link>,{" "}
        <Link to="/flotta/honda-sh" className="text-primary underline">scooter Honda SH</Link> e{" "}
        <Link to="/flotta/yamaha-raptor" className="text-primary underline">quad Yamaha Raptor</Link>.
      </>
    ),
  },
];

const NoleggioAeroportoOlbia = () => {
  const breadcrumbs = [
    { name: "Olbia", url: "/noleggio-auto-a-olbia" },
    { name: "Aeroporto Olbia", url: "/noleggio-auto-aeroporto-olbia" },
  ];

  const schema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/noleggio-auto-aeroporto-olbia#localbusiness",
    description:
      "Noleggio auto in Aeroporto Olbia Costa Smeralda (OLB) con consegna VIP direttamente agli arrivi.",
    areaServed: [
      { "@type": "Airport", name: "Aeroporto Olbia Costa Smeralda" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Aeroporto Olbia (OLB) | Consegna VIP | GDIS Rent"
        description="Noleggio auto in Aeroporto Olbia Costa Smeralda: consegna VIP direttamente agli arrivi, zero code, flotta Fiat / Mercedes / scooter / quad. Prenota online H24."
        canonical="/noleggio-auto-aeroporto-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Aeroporto Olbia"
        h1Prefix="Noleggio Auto"
        h1Accent="Aeroporto Olbia"
        subtitle="Consegna VIP direttamente agli arrivi del Costa Smeralda Airport (OLB). Zero code ai desk, zero attese."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
        vehicleAlt="Noleggio auto aeroporto Olbia"
      />

      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Olbia Costa Smeralda Airport
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Auto pronta allo sbarco, senza code
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Atterrare in <strong>Aeroporto Olbia Costa Smeralda</strong> significa una cosa sola: voler iniziare
            la vacanza il prima possibile. Con il nostro servizio di noleggio auto all'aeroporto OLB il veicolo è
            già pronto e contrattualizzato quando arrivi agli arrivi. Nessuna fila, nessun parcheggio lontano,
            nessun navetta.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Ti aspettiamo in uniforme con un cartello personalizzato. Ti consegniamo il veicolo, firmiamo
            digitalmente il contratto e in meno di 10 minuti sei sulla{" "}
            <Link to="/noleggio-auto-a-olbia" className="text-primary underline">strada per Olbia</Link> o verso la{" "}
            <Link to="/noleggio-auto-in-costa-smeralda" className="text-primary underline">Costa Smeralda</Link>.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mt-10">
            {[
              "Consegna agli arrivi — Terminal OLB",
              "Monitoraggio voli in tempo reale",
              "Firma digitale del contratto",
              "Nessun sovrapprezzo aeroportuale",
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

      <LocalitaFAQ name="Aeroporto Olbia" faqs={faqs} emitSchema />
      <LocalitaCTA name="Aeroporto Olbia" />
    </>
  );
};

export default NoleggioAeroportoOlbia;
