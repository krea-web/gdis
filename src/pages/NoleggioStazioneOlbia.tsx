import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import { Link } from "react-router-dom";
import { TrainFront, Route, Bus } from "lucide-react";
import { motion } from "framer-motion";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const trainConnections = [
  { dest: "Sassari", time: "1h 45m - 2h 10m", freq: "5-6 corse/giorno", note: "Linea storica non elettrificata" },
  { dest: "Cagliari", time: "3h 50m - 4h 30m", freq: "1-2 corse/giorno", note: "Cambio a Chilivani o Oristano" },
  { dest: "Macomer", time: "2h 30m", freq: "3-4 corse/giorno", note: "Snodo per linee interne" },
  { dest: "Oristano", time: "3h 10m", freq: "2 corse/giorno", note: "Coincidenza per Cagliari" },
];

const faqs = [
  {
    q: "La stazione di Olbia è centrale o periferica?",
    a: (
      <>
        È molto centrale: si trova a circa <strong>10 minuti a piedi</strong> dal porto di Isola Bianca e a 5
        minuti dal Corso Umberto. L'aeroporto dista invece circa 4 km (8 minuti in auto). Geograficamente è
        una posizione comoda perché ti permette di lasciare bagagli rapidamente e iniziare l'esplorazione
        senza navette intermedie.
      </>
    ),
  },
  {
    q: "Perché ci sono così poche corse rispetto a una stazione del continente?",
    a: (
      <>
        La Sardegna ha una rete ferroviaria storica e <em>non elettrificata</em>: i convogli sono diesel e
        la velocità media è bassa rispetto agli standard nazionali. Trenitalia opera la rete principale (RFI)
        con frequenze ridotte, mentre le linee turistiche del <em>Trenino Verde</em> sono gestite da ARST e
        non passano per Olbia. È normale quindi avere 5-6 corse/giorno verso Sassari e 1-2 verso Cagliari.
      </>
    ),
  },
  {
    q: "Conviene combinare treno + noleggio auto a Olbia?",
    a: (
      <>
        Sì, soprattutto se arrivi in Sardegna da Cagliari (volo low-cost spesso più economico su CAG che su
        OLB) e poi prendi il treno diretto Cagliari-Olbia/Chilivani. Combinazione tipica:{" "}
        <strong>treno fino a Olbia + auto dal nostro punto in stazione</strong> per esplorare la Costa
        Smeralda. È anche utile per chi parte da Sassari o Alghero senza dover guidare 3 ore.
      </>
    ),
  },
  {
    q: "C'è un'alternativa al treno per spostarmi in Sardegna senza auto?",
    a: (
      <>
        Sì: la rete <strong>ARST</strong> (autobus regionali) copre tratte non servite dal treno con
        frequenze maggiori, soprattutto verso le località costiere (Costa Smeralda, San Teodoro, Palau). Per
        chi vuole flessibilità totale e accesso alle spiagge fuori percorso, però, il noleggio resta la
        scelta più pratica.
      </>
    ),
  },
  {
    q: "Posso ritirare il veicolo se arrivo in tarda serata con un treno in ritardo?",
    a: (
      <>
        Sì, copriamo la finestra operativa Trenitalia (ultimi treni in arrivo intorno alle 22:00-23:00). I
        ritardi sono frequenti sulla linea sarda: monitoriamo direttamente il numero del treno e ci
        presentiamo all'arrivo effettivo. Per arrivi oltre la mezzanotte chiediamo di concordare in
        prenotazione.
      </>
    ),
  },
  {
    q: "Devo riconsegnare il veicolo per prendere un treno: quanto margine serve?",
    a: (
      <>
        Per la riconsegna alla Stazione di Olbia ti chiediamo di arrivare almeno <strong>30 minuti
        prima</strong> della partenza del tuo treno. Tempo necessario per foto stato veicolo, eventuale
        rifornimento all'area di servizio adiacente e firma del verbale di riconsegna.
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
      "Noleggio auto alla Stazione di Olbia: collegamenti Trenitalia con Sassari e Cagliari, alternative ARST, combinazione treno + auto per Costa Smeralda.",
    areaServed: [
      { "@type": "TrainStation", name: "Stazione di Olbia" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Stazione Olbia | Combina Treno + Auto | GDIS Rent"
        description="Noleggio auto Stazione Olbia ✓ Collegamenti Trenitalia da Sassari e Cagliari ✓ Combo treno + auto per Costa Smeralda ✓ Consegna all'uscita. WhatsApp H24."
        canonical="/noleggio-auto-stazione-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Stazione Olbia"
        h1Prefix="Noleggio Auto"
        h1Accent="Stazione Olbia"
        subtitle="Arrivi in treno da Sassari, Cagliari o coincidenze interne? Trovi l'auto pronta nel piazzale antistante la stazione Trenitalia."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
        vehicleAlt="Noleggio auto stazione Trenitalia Olbia"
      />

      {/* SEZIONE — Linee e collegamenti */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Route className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Collegamenti ferroviari da/per Olbia
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            La rete Trenitalia in Sardegna
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            La <strong>Stazione di Olbia</strong> è uno snodo chiave della rete ferroviaria sarda gestita da
            RFI con servizio Trenitalia. La linea principale collega Olbia a Sassari attraverso Chilivani,
            con coincidenze per Cagliari, Oristano e l'entroterra. È una linea storica, suggestiva, su
            tracciato non elettrificato — i convogli sono diesel — quindi i tempi di percorrenza sono
            sensibilmente più lunghi di quanto suggerisca la sola distanza.
          </p>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Destinazione</th>
                  <th className="text-left py-3 px-4 font-semibold">Tempo medio</th>
                  <th className="text-left py-3 px-4 font-semibold">Frequenza</th>
                  <th className="text-left py-3 px-4 font-semibold">Note</th>
                </tr>
              </thead>
              <tbody>
                {trainConnections.map((c) => (
                  <tr key={c.dest} className="border-t border-border">
                    <td className="py-3 px-4 font-medium">{c.dest}</td>
                    <td className="py-3 px-4 text-muted-foreground">{c.time}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{c.freq}</td>
                    <td className="py-3 px-4 text-muted-foreground text-xs">{c.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground/80 mt-3">
            Frequenze indicative. Verifica sempre l'orario aggiornato sul sito ufficiale Trenitalia o
            sull'app prima del viaggio.
          </p>
        </div>
      </section>

      {/* SEZIONE — Combo treno + noleggio */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <TrainFront className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Strategia treno + noleggio
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Quando conviene davvero combinare treno e auto a noleggio
          </h2>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold mb-2">Atterri a Cagliari, esplori il nord</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                I voli low-cost su <strong>Cagliari Elmas (CAG)</strong> sono spesso più economici di quelli
                su Olbia in piena estate. Atterri a Cagliari, prendi l'Intercity diretto fino a Olbia (~4 ore
                con paesaggio panoramico) e ritiri la tua auto a noleggio direttamente alla stazione. Niente
                guida lunga dopo il volo, e bagaglio in spalla per pochi metri.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold mb-2">Sei a Sassari per lavoro o per vacanza</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Da Sassari il treno per Olbia impiega 1h45m e attraversa l'Anglona e la Gallura interna. Una
                volta arrivato, l'auto a noleggio ti apre tutta la Costa Smeralda in 30-40 minuti. Soluzione
                perfetta per weekend lunghi senza dover dipendere dall'auto privata.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="font-semibold mb-2">Treno turistico "Trenino Verde" + auto</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Per chi vuole vivere la linea storica panoramica del Trenino Verde (gestito da ARST,
                stazione di partenza diversa) e poi proseguire verso il mare: noleggia l'auto a Olbia per la
                seconda parte del viaggio, dove i bus diventano più rari e le calette più nascoste.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SEZIONE — ARST e alternative */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Bus className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Alternative al treno: rete ARST
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Bus regionali, e quando preferire l'auto
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong>ARST</strong> è il gestore unico del trasporto pubblico extraurbano sardo. La sua rete
            copre tratte molto più capillari del treno, soprattutto verso le località costiere della Costa
            Smeralda e verso La Maddalena. Linee come la Olbia–Palau (per imbarco su La Maddalena) o la
            Olbia–Porto Cervo–Baja Sardinia esistono ma con frequenze ridotte rispetto alla domanda estiva.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Se il tuo viaggio è puramente "Olbia città + 1-2 escursioni", il bus ARST può bastare. Se
            invece vuoi muoverti tra <strong>spiagge meno servite</strong> (es. Cala Brandinchi, La Cinta,
            Spiaggia del Principe), o nei weekend di alta stagione quando i bus si riempiono, il noleggio
            diventa l'unica soluzione realistica.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Vedi anche le pagine dedicate:{" "}
            <Link to="/noleggio-auto-a-olbia" className="text-primary font-medium hover:underline">
              centro Olbia
            </Link>
            ,{" "}
            <Link to="/noleggio-auto-aeroporto-olbia" className="text-primary font-medium hover:underline">
              Aeroporto OLB
            </Link>{" "}
            e{" "}
            <Link to="/noleggio-auto-porto-olbia" className="text-primary font-medium hover:underline">
              Porto Isola Bianca
            </Link>
            .
          </p>
        </div>
      </section>

      <LocalitaFAQ name="Stazione Olbia" faqs={faqs} emitSchema />

      <LocalitaCTA name="Stazione Olbia" />
    </>
  );
};

export default NoleggioStazioneOlbia;
