import { motion } from "framer-motion";
import { MessageCircle, Plane, Ship, TrainFront, Key, Car, type LucideIcon } from "lucide-react";

export type ConsegnaVariant = "airport" | "port" | "station" | "generic";

type Step = {
  icon: LucideIcon;
  title: string;
  text: string;
};

const STEP_1_WHATSAPP: Step = {
  icon: MessageCircle,
  title: "1. Scrivi su WhatsApp",
  text: "Indica data, orario di arrivo e veicolo desiderato. Confermiamo entro 30 minuti, anche in inglese o francese.",
};

const STEP_2: Record<ConsegnaVariant, Step> = {
  airport: {
    icon: Plane,
    title: "2. Atterri al Costa Smeralda",
    text: "Monitoriamo il tuo volo in tempo reale via FlightAware: se sei in ritardo, adattiamo la consegna senza costi extra fino a 4 ore.",
  },
  port: {
    icon: Ship,
    title: "2. Sbarchi a Isola Bianca",
    text: "Tracciamo l'orario reale dello sbarco di Moby, Tirrenia, GNV e Grimaldi: se la nave arriva con ritardo, ti aspettiamo comunque.",
  },
  station: {
    icon: TrainFront,
    title: "2. Arrivi alla stazione di Olbia",
    text: "Ci comunichi il numero del treno Trenitalia: monitoriamo l'orario di arrivo al binario e ci coordiniamo sull'orario reale.",
  },
  generic: {
    icon: Plane,
    title: "2. Atterri o sbarchi",
    text: "Monitoriamo volo o traghetto: se sei in ritardo, adattiamo la consegna senza costi extra.",
  },
};

const STEP_3: Record<ConsegnaVariant, Step> = {
  airport: {
    icon: Key,
    title: "3. Ti aspettiamo agli arrivi",
    text: "Operatore presente al terminal arrivi del Costa Smeralda con cartello con il tuo nome. Veicolo climatizzato e pieno di benzina già fatto.",
  },
  port: {
    icon: Key,
    title: "3. Ti aspettiamo al pontile",
    text: "Operatore al pontile della tua compagnia (anche per traghetti notturni alle 6:00). Veicolo pronto sotto la nave, climatizzato e con il pieno.",
  },
  station: {
    icon: Key,
    title: "3. Ti aspettiamo all'uscita binari",
    text: "Operatore presente all'uscita dei binari della stazione di Olbia. Veicolo parcheggiato vicinissimo, già climatizzato e con il pieno.",
  },
  generic: {
    icon: Key,
    title: "3. Ritiri il veicolo",
    text: "Ti aspettiamo all'uscita arrivi o al porto con il veicolo climatizzato e con il pieno fatto.",
  },
};

const STEP_4: Step = {
  icon: Car,
  title: "4. Parti subito",
  text: "Firma rapida con tablet, foto patente, chiavi in mano. In 5 minuti sei in viaggio: niente code, niente desk, niente transfer extra.",
};

const SUBTITLE: Record<ConsegnaVariant, string> = {
  airport:
    "Niente file ai desk del terminal, niente transfer, niente attese. Ti consegniamo il veicolo direttamente all'arrivo all'Aeroporto di Olbia Costa Smeralda.",
  port:
    "Niente coda al porto, niente transfer dopo 8 ore di traghetto. Sbarchi e trovi il veicolo che ti aspetta sul pontile della tua compagnia.",
  station:
    "Scendi dal treno e trovi il veicolo già pronto. Niente taxi, niente attese, niente coda al desk autonoleggio del centro città.",
  generic:
    "Niente file ai desk, niente transfer, niente attese. Ti consegniamo il veicolo dove e quando ti serve — aeroporto, porto, hotel o villa.",
};

type Props = {
  variant?: ConsegnaVariant;
};

const ConsegnaVipExplainer = ({ variant = "generic" }: Props) => {
  const steps: Step[] = [STEP_1_WHATSAPP, STEP_2[variant], STEP_3[variant], STEP_4];
  return (
    <section className="py-20 md:py-28 bg-muted/20">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Come funziona</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            La Consegna VIP in 4 passi
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{SUBTITLE[variant]}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConsegnaVipExplainer;
