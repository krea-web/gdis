import { motion } from "framer-motion";

type Spot = { name: string; desc: string; image: string };

type Props = {
  name: string;
  spots: Spot[];
};

const MasonrySpots = ({ name, spots }: Props) => (
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

      <div className="max-w-6xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {spots.map((spot, i) => (
          <motion.div
            key={spot.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="break-inside-avoid group relative rounded-2xl overflow-hidden"
          >
            <img
              src={spot.image}
              alt={spot.name}
              className={`w-full object-cover ${i % 3 === 0 ? "h-[380px]" : i % 3 === 1 ? "h-[280px]" : "h-[320px]"}`}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-lg font-bold text-white mb-1">{spot.name}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{spot.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default MasonrySpots;
