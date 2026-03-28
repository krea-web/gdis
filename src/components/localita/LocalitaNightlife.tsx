import { motion } from "framer-motion";
import { Utensils, Wine, Music, Sunset } from "lucide-react";

type Locale = { name: string; type: "ristorante" | "aperitivo" | "club" | "lounge"; desc: string };

type Props = {
  name: string;
  locali: Locale[];
};

const typeConfig = {
  ristorante: { icon: Utensils, label: "Ristorante" },
  aperitivo: { icon: Wine, label: "Aperitivo" },
  club: { icon: Music, label: "Club" },
  lounge: { icon: Sunset, label: "Lounge" },
};

const LocalitaNightlife = ({ name, locali }: Props) => (
  <section className="py-24 md:py-32 bg-background relative">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
          Vita Notturna
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Locali & Ristoranti a {name}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {locali.map((locale, i) => {
          const config = typeConfig[locale.type];
          const Icon = config.icon;
          return (
            <motion.div
              key={locale.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group rounded-2xl p-6 bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 hover:shadow-[0_10px_40px_hsl(var(--primary)/0.1)] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{locale.name}</p>
                  <p className="text-xs text-primary font-medium uppercase tracking-wider">
                    {config.label}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{locale.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default LocalitaNightlife;
