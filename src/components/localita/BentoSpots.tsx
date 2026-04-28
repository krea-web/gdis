import { motion } from "framer-motion";

type Spot = {
  name: string;
  desc: string;
  subtitle?: string;
  image: string;
  span?: string;
};

type Props = {
  name: string;
  spots: Spot[];
};

const BentoSpots = ({ name, spots }: Props) => (
  <section className="py-24 md:py-32 bg-muted/20 relative overflow-hidden">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">Da Scoprire</p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">I Luoghi di {name}</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {spots.map((spot, i) => (
          <motion.div
            key={spot.name}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden group border border-white/10"
          >
            <img
              src={spot.image}
              alt={spot.name}
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              {spot.subtitle && (
                <p className="text-xs font-semibold tracking-wider uppercase text-blue-400 mb-1">{spot.subtitle}</p>
              )}
              <h3 className="text-lg font-bold text-white mb-1">{spot.name}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{spot.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BentoSpots;
