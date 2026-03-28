import { motion } from "framer-motion";
import { Shield, Users, Gauge, Key } from "lucide-react";

type Spec = { label: string; value: string; icon: "license" | "seats" | "use" | "delivery" };

type Props = {
  vehicleName: string;
  specs: Spec[];
};

const iconMap = {
  license: Key,
  seats: Users,
  use: Gauge,
  delivery: Shield,
};

const CockpitSpecs = ({ vehicleName, specs }: Props) => (
  <section className="py-20 md:py-28 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary/90 to-slate-900" />
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.3),transparent_60%)]" />

    <div className="container relative z-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-3">Specifiche</p>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-white">{vehicleName}</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {specs.map((spec, i) => {
          const Icon = iconMap[spec.icon];
          return (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-white/10 text-center group hover:border-primary/40 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <p className="text-xs text-white/50 uppercase tracking-wider mb-1">{spec.label}</p>
                <p className="text-lg font-bold text-white">{spec.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </section>
);

export default CockpitSpecs;
