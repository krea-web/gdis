import SEOHead from "@/components/SEOHead";
import Breadcrumbs from "@/components/Breadcrumbs";
import LocalitaHeroV2 from "@/components/localita/LocalitaHeroV2";
import LocalitaFAQ from "@/components/localita/LocalitaFAQ";
import LocalitaCTA from "@/components/localita/LocalitaCTA";
import ConsegnaVipExplainer from "@/components/home/ConsegnaVipExplainer";
import { Link } from "react-router-dom";
import { Ship, Anchor, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { buildLocalBusinessSchema } from "@/lib/siteSchema";

const routes = [
  { from: "Civitavecchia", duration: "5h - 8h", company: "Tirrenia, GNV, Grimaldi", note: "Diurno e notturno, alta frequenza" },
  { from: "Livorno", duration: "8h - 11h", company: "Moby, Grimaldi", note: "Notturno, ideale con auto al seguito" },
  { from: "Genova", duration: "10h - 13h", company: "Tirrenia, Moby, GNV", note: "Notturno, partenze serali" },
  { from: "Piombino", duration: "5h - 6h", company: "Moby, Grimaldi", note: "Stagionale estivo, diurno" },
  { from: "Nizza (FR)", duration: "12h - 14h", company: "Corsica/Sardinia Ferries", note: "Estivo, scalo Bastia opzionale" },
  { from: "Marsiglia (FR)", duration: "12h - 18h", company: "La Méridionale", note: "Stagionale, frequenza ridotta" },
];

const faqs = [
  {
    q: "Posso imbarcare l'auto a noleggio per andare in Corsica?",
    a: (
      <>
        Sì, ma serve l'<strong>autorizzazione scritta</strong> del locatore (cross-border permit) emessa
        prima della partenza. Contattaci almeno 48 ore prima con i dati del traghetto: predisponiamo il
        documento e una copia della carta di circolazione. Possibili sovrapprezzi assicurativi per la
        copertura in territorio francese.
      </>
    ),
  },
  {
    q: "Il Porto di Olbia ha più terminal? Dove vi trovo esattamente?",
    a: (
      <>
        Il porto principale è <strong>Isola Bianca</strong>, dove attraccano Tirrenia, Moby, GNV, Grimaldi e
        i traghetti veloci. Esiste anche il vecchio porto industriale ma non è usato per passeggeri. Ci
        troviamo nel piazzale antistante il terminal Isola Bianca, nell'area sosta navette/transfer
        autorizzati.
      </>
    ),
  },
  {
    q: "Cosa cambia tra arrivare con auto al seguito o senza?",
    a: (
      <>
        Se arrivi con la tua auto, puoi semplicemente non noleggiare nulla. Molti viaggiatori però arrivano
        in Sardegna come passeggero (più economico) e noleggiano sul posto: in quel caso ci troviamo
        all'uscita del terminal pedonale, lo stesso di chi arriva con auto. Risparmi sul biglietto traghetto
        ed eviti di mettere chilometri sulla tua auto.
      </>
    ),
  },
  {
    q: "I traghetti notturni arrivano molto presto: voi siete operativi all'alba?",
    a: (
      <>
        Sì. Lo sbarco da Livorno e Genova è tipicamente tra le 06:00 e le 07:30: è una delle nostre fasce
        più operative. Il caffè non lo offriamo ancora, ma il pieno dell'auto sì.
      </>
    ),
  },
  {
    q: "E se il traghetto viene cancellato per maltempo?",
    a: (
      <>
        Capita 2-3 volte l'anno, soprattutto a inizio/fine stagione. In caso di cancellazione comunicacelo
        appena hai la conferma della compagnia: riprogrammiamo la consegna alla data effettiva di arrivo
        senza penali. Se la tua nuova data è dopo la fine del periodo prenotato, rimborsiamo proporzionalmente.
      </>
    ),
  },
  {
    q: "Posso lasciare il bagaglio nel veicolo mentre vado in centro a Olbia?",
    a: (
      <>
        Sì, ma a tuo rischio: ti consigliamo di non lasciare oggetti di valore in vista. Il porto è
        videosorvegliato e generalmente sicuro, ma applichiamo lo stesso buon senso valido in qualunque
        parcheggio. La copertura furto è inclusa con franchigia.
      </>
    ),
  },
];

const NoleggioPortoOlbia = () => {
  const breadcrumbs = [
    { name: "Olbia", url: "/noleggio-auto-a-olbia" },
    { name: "Porto Isola Bianca", url: "/noleggio-auto-porto-olbia" },
  ];

  const schema = buildLocalBusinessSchema({
    id: "https://gdisrentservice.com/noleggio-auto-porto-olbia#localbusiness",
    description:
      "Noleggio auto al Porto di Olbia Isola Bianca: rotte traghetti, durate, procedure di sbarco e consegna direttamente al terminal.",
    areaServed: [
      { "@type": "Place", name: "Porto di Olbia Isola Bianca" },
      { "@type": "City", name: "Olbia" },
    ],
  });

  return (
    <>
      <SEOHead
        title="Noleggio Auto Porto Olbia Isola Bianca | Tirrenia Moby GNV | GDIS Rent"
        description="Noleggio auto Porto Olbia Isola Bianca ✓ Sbarco da Civitavecchia, Livorno, Genova, Piombino, Nizza ✓ Consegna al terminal traghetti ✓ WhatsApp H24."
        canonical="/noleggio-auto-porto-olbia"
        breadcrumbs={breadcrumbs}
        jsonLd={schema}
      />
      <Breadcrumbs items={breadcrumbs} />

      <LocalitaHeroV2
        name="Porto Isola Bianca"
        h1Prefix="Noleggio Auto"
        h1Accent="Porto Olbia"
        subtitle="Sbarchi da Civitavecchia, Livorno, Genova, Piombino o Nizza? Ti aspettiamo al terminal Isola Bianca con il veicolo pronto."
        bgImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/locations/olbia/gdisrent-noleggio-auto-porto-olbia.webp"
        vehicleImage="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/render/image/public/vehicles/gdis-fiatpandacitycar.png?width=600&quality=75"
        vehicleAlt="Noleggio auto porto Isola Bianca Olbia"
      />

      {/* SEZIONE — Tutte le rotte */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-5xl">
          <div className="flex items-center gap-3 mb-4">
            <Anchor className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Rotte traghetti per Olbia
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Da dove arrivi al Porto Isola Bianca
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Il Porto di Olbia movimenta in estate circa <strong>3 milioni di passeggeri</strong>, con punte
            di 70.000 al giorno tra fine luglio e fine agosto. Le compagnie operative sono Tirrenia
            (Grimaldi), Moby Lines, GNV (Grandi Navi Veloci), Grimaldi Lines e — sulla rotta francese — Corsica
            Sardinia Ferries e La Méridionale. Le durate di traversata variano molto: ti riportiamo qui sotto
            i tempi medi reali, non quelli nominali da brochure.
          </p>

          <div className="space-y-3">
            {routes.map((r, i) => (
              <motion.div
                key={r.from}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-5 grid sm:grid-cols-[1fr_auto_2fr_3fr] gap-3 sm:gap-6 items-center"
              >
                <div className="font-semibold">{r.from}</div>
                <div className="px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold inline-block">
                  {r.duration}
                </div>
                <div className="text-sm text-muted-foreground">{r.company}</div>
                <div className="text-xs text-muted-foreground/80">{r.note}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE — Procedura di sbarco */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Ship className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Lo sbarco passo passo
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">
            Da quando attracca la nave a quando hai le chiavi
          </h2>

          <div className="relative pl-8 border-l-2 border-primary/20 space-y-8">
            {[
              {
                t: "T-30 min — Avvistamento",
                d: "La nave entra nel Golfo di Olbia. Tracciamo la posizione AIS in tempo reale e ci posizioniamo nel piazzale Isola Bianca prima dello sbarco effettivo.",
              },
              {
                t: "T-0 — Attracco",
                d: "La nave attracca. Lo sbarco passeggeri pedoni inizia 10-15 minuti dopo l'attracco; lo sbarco auto al seguito può richiedere 30-60 minuti.",
              },
              {
                t: "T+15 min — Uscita terminal",
                d: "Esci dal terminal pedonale (cartelli 'Uscita passeggeri'). Ci trovi nel piazzale antistante con cartello GDIS personalizzato.",
              },
              {
                t: "T+25 min — Firma e via",
                d: "Foto perimetrali del veicolo, firma digitale del contratto sul tuo smartphone, chiavi in mano. Sei sulla SS125 in pochi minuti, direzione Olbia centro o Costa Smeralda.",
              },
            ].map((step) => (
              <div key={step.t} className="relative">
                <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <div className="font-semibold text-foreground mb-1">{step.t}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEZIONE — Cosa fare in Sardegna senza la propria auto */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="h-5 w-5 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-semibold">
              Arrivi senza auto al seguito?
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Risparmi sul traghetto e noleggi solo i giorni che servono
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Imbarcare l'auto da Civitavecchia o Livorno costa mediamente <strong>tra 130 e 280€</strong>{" "}
            sola andata in alta stagione, a cui aggiungere il rientro. Per soggiorni brevi (fino a 7-10
            giorni) viaggiare come passeggero e noleggiare sul posto è quasi sempre più conveniente: zero
            chilometri sulla tua auto, niente assicurazione kasko da casa, e flessibilità totale sul tipo di
            veicolo (puoi prendere uno scooter per i giorni in spiaggia e una citycar per le escursioni).
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Per la pianificazione, vedi le pagine dedicate alle nostre destinazioni più gettonate da chi
            sbarca al porto:{" "}
            <Link to="/noleggio-auto-a-porto-cervo" className="text-primary font-medium hover:underline">
              Porto Cervo
            </Link>
            ,{" "}
            <Link to="/noleggio-auto-a-san-teodoro" className="text-primary font-medium hover:underline">
              San Teodoro
            </Link>
            ,{" "}
            <Link to="/noleggio-auto-a-baja-sardinia" className="text-primary font-medium hover:underline">
              Baja Sardinia
            </Link>{" "}
            e{" "}
            <Link to="/noleggio-auto-a-golfo-aranci" className="text-primary font-medium hover:underline">
              Golfo Aranci
            </Link>
            .
          </p>
        </div>
      </section>

      <ConsegnaVipExplainer />

      <LocalitaFAQ name="Porto Isola Bianca" faqs={faqs} emitSchema />

      <LocalitaCTA name="Porto Olbia" />
    </>
  );
};

export default NoleggioPortoOlbia;
