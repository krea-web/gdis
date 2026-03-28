import { motion } from "framer-motion";

type Spot = { name: string; desc: string };

type Props = {
  name: string;
  intro: string;
  spots: Spot[];
  image: string;
};

const LocalitaScopri = ({ name, intro, spots, image }: Props) => (
  <section className="py-24 md:py-32 bg-background relative">
    <div className="container px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-3">
          Da Scoprire
        </p>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Scopri {name}
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{intro}</p>
          <div className="space-y-6">
            {spots.map((spot, i) => (
              <motion.div
                key={spot.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{spot.name}</p>
                  <p className="text-sm text-muted-foreground">{spot.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={image}
              alt={`Spiagge e panorami di ${name}`}
              className="w-full h-[400px] object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default LocalitaScopri;
