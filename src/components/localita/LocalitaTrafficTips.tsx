import { motion } from "framer-motion";
import { AlertTriangle, ParkingCircle, Clock, Car } from "lucide-react";

type Tip = { icon: "ztl" | "parking" | "traffic" | "tip"; title: string; text: string };

type Props = {
  name: string;
  tips: Tip[];
};

const iconMap = {
  ztl: AlertTriangle,
  parking: ParkingCircle,
  traffic: Clock,
  tip: Car,
};

const LocalitaTrafficTips = ({ name, tips }: Props) => (
  <section className="py-24 md:py-32 bg-muted/30 relative">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
          Consigli Utili
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Traffico & Parcheggi a {name}
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {tips.map((tip, i) => {
          const Icon = iconMap[tip.icon];
          return (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group rounded-2xl p-6 bg-background/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.text}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default LocalitaTrafficTips;
