import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { Plane, Clock, Car, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const distances = [
  { dest: "Centro Olbia", km: 4, min: 8, road: "SS125" },
  { dest: "Porto Isola Bianca", km: 6, min: 12, road: "SS125" },
  { dest: "San Teodoro", km: 30, min: 30, road: "SS131 dcn" },
  { dest: "Porto Cervo", km: 32, min: 35, road: "SS125 → SP59" },
  { dest: "San Pantaleo", km: 25, min: 30, road: "SS125 → SP73" },
  { dest: "Baja Sardinia", km: 35, min: 40, road: "SS125 → SP59" },
  { dest: "Golfo Aranci", km: 20, min: 22, road: "SS125 → SP82" },
  { dest: "La Maddalena (imbarco)", km: 45, min: 55, road: "SS125 fino a Palau" },
];

const carriers = [
  { name: "Volotea", segment: "Low-cost", note: "Hub principale OLB con base operativa" },
  { name: "easyJet", segment: "Low-cost", note: "Voli da Londra, Berlino, Milano e altre rotte EU" },
  { name: "Ryanair", segment: "Low-cost", note: "Stagionale estiva, principalmente UK e Irlanda" },
  { name: "ITA Airways", segment: "Full-service", note: "Continuità territoriale per Roma e Milano LIN" },
  { name: "Lufthansa", segment: "Full-service", note: "Estivi diretti da Monaco e Francoforte" },
  { name: "Air France", segment: "Full-service", note: "Stagionale Parigi CDG" },
];

const faqs = [
  {
    q: "Qual è il codice IATA dell'Aeroporto di Olbia?",
    a: (
      <>
        Il codice IATA è <strong>OLB</strong> (codice ICAO <strong>LIEO</strong>). Il nome ufficiale è{" "}
        <em>Aeroporto di Olbia – Costa Smeralda</em>, gestito da Geasar S.p.A. È il secondo aeroporto della
        Sardegna per traffico passeggeri dopo Cagliari-Elmas.
      </>
    ),
  },
  {
    q: "L'aeroporto di Olbia è aperto tutto l'anno o solo in estate?",
    a: (
      <>
        È aperto tutto l'anno, ma ha una stagionalità molto marcata: <strong>oltre il 60% del traffico</strong> si
        concentra tra giugno e settembre. In bassa stagione molte rotte internazionali si fermano e restano
        attivi soprattutto i collegamenti di continuità territoriale per Roma Fiumicino e Milano Linate.
      </>
    ),
  },
  {
    q: "Cosa succede se il volo è dirottato su Alghero o Cagliari?",
    a: (
      <>
        Capita raramente, soprattutto per maltempo. In caso di dirottamento contattaci subito su WhatsApp: in
        base all'orario possiamo riposizionare la consegna sull'aeroporto effettivo (con eventuale
        sovrapprezzo carburante concordato in trasparenza) oppure attenderti al rientro a Olbia se decidi di
        prendere bus o navetta.
      </>
    ),
  },
  {
    q: "Posso ritirare il veicolo se viaggio con animale domestico in trasportino?",
    a: (
      <>
        Sì. Ti chiediamo solo di indicarlo in prenotazione: per le auto stendiamo un telo coprisedile e per gli
        scooter forniamo info sui regolamenti di trasporto piccoli animali. Per chi viaggia con cane di taglia
        media/grande consigliamo la <Link to="/flotta/fiat-panda" className="text-primary underline">Fiat
        Panda</Link> (5 posti, baule capiente).
      </>
    ),
  },
  {
    q: "Si può noleggiare con voli notturni o all'alba?",
    a: (
      <>
        Sì, copriamo l'intera fascia oraria operativa dell'aeroporto. La consegna è gratuita per noleggi di 3+
        giorni anche in fasce notturne; sotto i 3 giorni applichiamo un piccolo supplemento per il fuori-orario
        comunicato in prenotazione.
      </>
    ),
  },
  {
    q: "I seggiolini bambino sono inclusi?",
    a: "Sì, su richiesta in prenotazione e gratuitamente. Disponibili seggiolini gruppo 0+/1/2/3 omologati ECE R44/04 o i-Size. Avvisaci dell'età del bambino così prepariamo quello giusto prima del tuo arrivo.",
  },
];

const NoleggioAeroportoOlbia = () => {
  const breadcrumbs = [
    { name: "Olbia", url: "/noleggio-auto-a-olbia" },
    { name: "Aeroporto Olbia (OLB)", url: "/noleggio-auto-aeroporto-olbia" },
  ];

  const schema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/noleggio-auto-aeroporto-olbia#localbusiness",
    description:
      "Noleggio auto in Aeroporto Olbia Costa Smeralda (OLB) con consegna VIP agli arrivi. Monitoraggio voli in tempo reale, distanze verso Costa Smeralda, info terminal e parcheggi.",
    areaServed: [
      { "@type": "Airport", name: "Aeroporto Olbia Costa Smeralda", iataCode: "OLB" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Aeroporto Olbia OLB | Consegna agli Arrivi | GDIS Rent"
        description="Noleggio auto Aeroporto Olbia Costa Smeralda OLB ✓ Consegna VIP direttamente agli arrivi ✓ Monitoraggio voli ✓ Distanze e tempi reali per Costa Smeralda. Prenota online H24."
        canonical="/noleggio-auto-aeroporto-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Aeroporto Olbia"
        h1Prefix="Noleggio Auto"
        h1Accent="Aeroporto Olbia"
        subtitle="Codice IATA OLB. Consegna VIP nel piazzale arrivi del Costa Smeralda Airport — atterri, ti consegniamo l'auto, parti."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-aeroporto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/vehicles/gdis-fiatpandacitycar.png"
        vehicleAlt="Noleggio auto aeroporto Olbia OLB"
      />

      {/* SEZIONE — Come funziona la consegna agli arrivi */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Plane className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Come funziona la consegna OLB
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Tre passaggi tra l'atterraggio e il tuo viaggio
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-primary text-3xl font-display font-bold mb-3">01</div>
              <h3 className="font-semibold mb-2">Atterraggio monitorato</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Tracciamo il volo in tempo reale tramite codice di prenotazione. Anticipi o ritardi sono
                gestiti senza che tu debba avvisarci: l'operatore si presenta all'arrivo effettivo del volo.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-primary text-3xl font-display font-bold mb-3">02</div>
              <h3 className="font-semibold mb-2">Incontro al cartello GDIS</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Il nostro operatore in uniforme ti aspetta nella sala arrivi con un cartello personalizzato.
                Riconoscibile, niente attese al desk, niente ricerche di banchi affollati.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-primary text-3xl font-display font-bold mb-3">03</div>
              <h3 className="font-semibold mb-2">Firma digitale & via</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Contratto firmato sullo smartphone, foto di stato del veicolo, chiavi in mano. In meno di 10
                minuti dal ritiro bagagli sei già sulla SS125.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEZIONE — Distanze e tempi dall'aeroporto */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Distanze reali da OLB
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Quanto ci metti a raggiungere la tua destinazione
          </h2>
          <p className="text-muted-foreground mb-8">
            Tempi calcolati senza traffico. In alta stagione (luglio-agosto, weekend) aggiungere 15-30%
            sulle tratte verso Costa Smeralda.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Destinazione</th>
                  <th className="text-right py-3 px-4 font-semibold">Km</th>
                  <th className="text-right py-3 px-4 font-semibold">Min</th>
                  <th className="text-left py-3 px-4 font-semibold">Strada</th>
                </tr>
              </thead>
              <tbody>
                {distances.map((d) => (
                  <tr key={d.dest} className="border-t border-border">
                    <td className="py-3 px-4 font-medium">{d.dest}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{d.km}</td>
                    <td className="py-3 px-4 text-right text-muted-foreground">{d.min}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{d.road}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SEZIONE — Compagnie aeree e voli */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Car className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Compagnie operative su OLB
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Atterri con qualunque compagnia, ti aspettiamo lo stesso
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            L'Aeroporto Costa Smeralda movimenta circa <strong>3 milioni di passeggeri</strong> nei mesi
            estivi, con voli da tutta Europa. Il nostro sistema riconosce qualunque numero di volo IATA: che
            tu arrivi con un low-cost stagionale o con un volo di continuità territoriale, la procedura di
            consegna è identica.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {carriers.map((c) => (
              <div
                key={c.name}
                className="rounded-xl border border-border bg-card p-4 flex items-start gap-3"
              >
                <div className="shrink-0 px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] uppercase tracking-wider font-semibold">
                  {c.segment}
                </div>
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{c.note}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 flex gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-foreground mb-1">Note operative aeroporto</p>
              <p className="text-muted-foreground leading-relaxed">
                Il terminal di Olbia è unico (no Schengen/non-Schengen separati lato arrivi). I tempi di
                ritiro bagagli in piena stagione possono superare i 30 minuti — è un dato a tuo favore: ti
                permette di non sentire la pressione del taxi/desk affollato e di trovarci con calma in sala
                arrivi.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LocalitaFAQ name="Aeroporto Olbia (OLB)" faqs={faqs} emitSchema />

      <section className="py-12 bg-muted/20">
        <div className="container px-4 text-center max-w-2xl">
          <p className="text-muted-foreground">
            Atterri al Costa Smeralda? Vedi anche le pagine dedicate alle nostre destinazioni:{" "}
            <Link to="/noleggio-auto-a-olbia" className="text-primary font-medium hover:underline">centro Olbia</Link>,{" "}
            <Link to="/noleggio-auto-a-porto-cervo" className="text-primary font-medium hover:underline">Porto Cervo</Link> e{" "}
            <Link to="/noleggio-auto-a-san-teodoro" className="text-primary font-medium hover:underline">San Teodoro</Link>.
          </p>
        </div>
      </section>

      <LocalitaCTA name="Aeroporto Olbia" />
    </>
  );
};

export default NoleggioAeroportoOlbia;
