import { motion } from "framer-motion";
import {
  Waves,
  Mountain,
  Church,
  TreePine,
  Anchor,
  MapPin,
  Sun,
  Clock,
  Wallet,
  ShoppingBag,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type SpotCategory =
  | "spiaggia"
  | "panorama"
  | "monumento"
  | "natura"
  | "porto"
  | "centro"
  | "evento"
  | "escursione";

const CATEGORY_META: Record<SpotCategory, { icon: LucideIcon; label: string; gradient: string }> = {
  spiaggia: { icon: Waves, label: "Spiaggia", gradient: "from-sky-400/20 to-cyan-400/10" },
  panorama: { icon: Mountain, label: "Panorama", gradient: "from-amber-400/20 to-orange-300/10" },
  monumento: { icon: Church, label: "Monumento", gradient: "from-stone-400/20 to-stone-300/10" },
  natura: { icon: TreePine, label: "Natura", gradient: "from-emerald-400/20 to-green-300/10" },
  porto: { icon: Anchor, label: "Marina / Porto", gradient: "from-blue-500/20 to-indigo-300/10" },
  centro: { icon: MapPin, label: "Centro Storico", gradient: "from-rose-400/20 to-pink-300/10" },
  evento: { icon: ShoppingBag, label: "Evento", gradient: "from-purple-400/20 to-fuchsia-300/10" },
  escursione: { icon: Compass, label: "Escursione", gradient: "from-teal-400/20 to-cyan-300/10" },
};

export type Spot = {
  name: string;
  category: SpotCategory;
  /** 2-3 frasi, ~50-90 parole. */
  description: string;
  /** Es. "10 min dal centro", "20 min in scooter". */
  distance: string;
  /** Es. "Gratis", "Parking €5/g", "€40-60 escursione". */
  cost: string;
  /** Es. "Mattina", "Tramonto", "Tutto il giorno". */
  bestTime: string;
};

type Props = {
  name: string;
  spots: Spot[];
  /** Emette JSON-LD ItemList di TouristAttraction per SEO. Default: true. */
  emitSchema?: boolean;
};

const LocalitaTopSpots = ({ name, spots, emitSchema = true }: Props) => {
  const itemListSchema = emitSchema
    ? {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `Cosa vedere a ${name}`,
        itemListElement: spots.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "TouristAttraction",
            name: s.name,
            description: s.description,
            isAccessibleForFree: /gratis/i.test(s.cost),
          },
        })),
      }
    : null;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Cosa vedere</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            I posti migliori a {name}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Selezione curata di spiagge, panorami, monumenti ed esperienze imperdibili — con tempi di percorrenza e
            consigli pratici.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {spots.map((s, i) => {
            const meta = CATEGORY_META[s.category];
            const Icon = meta.icon;
            return (
              <motion.article
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative bg-card rounded-2xl border border-border p-6 hover:border-primary/40 transition-colors overflow-hidden"
              >
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${meta.gradient} rounded-full blur-3xl -z-10 opacity-60`}
                  aria-hidden="true"
                />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-muted-foreground">
                    {meta.label}
                  </span>
                </div>

                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">{s.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{s.description}</p>

                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs pt-4 border-t border-border/60">
                  <span className="flex items-center gap-1.5 text-foreground/70">
                    <Clock size={12} className="text-primary" aria-hidden="true" />
                    <span className="sr-only">Distanza:</span>
                    {s.distance}
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground/70">
                    <Wallet size={12} className="text-primary" aria-hidden="true" />
                    <span className="sr-only">Costo:</span>
                    {s.cost}
                  </span>
                  <span className="flex items-center gap-1.5 text-foreground/70">
                    <Sun size={12} className="text-primary" aria-hidden="true" />
                    <span className="sr-only">Quando:</span>
                    {s.bestTime}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {itemListSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
        />
      )}
    </section>
  );
};

export default LocalitaTopSpots;
