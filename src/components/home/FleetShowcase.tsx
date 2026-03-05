import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import fleetCitycar from "@/assets/fleet-citycar.jpg";
import fleetScooter from "@/assets/fleet-scooter.jpg";
import fleetQuad from "@/assets/fleet-quad.jpg";

const categories = [
  {
    title: "Citycar",
    subtitle: "Utilitarie e berline",
    description: "Perfette per muoverti in città e lungo la costa.",
    image: fleetCitycar,
    span: "md:col-span-2 md:row-span-2",
    tall: true,
  },
  {
    title: "Scooter",
    subtitle: "Due ruote",
    description: "Libertà su due ruote nella brezza mediterranea.",
    image: fleetScooter,
    span: "md:col-span-1",
    tall: false,
  },
  {
    title: "Quad",
    subtitle: "Avventura off-road",
    description: "Esplora sentieri e spiagge nascoste.",
    image: fleetQuad,
    span: "md:col-span-1",
    tall: false,
  },
];

const FleetShowcase = () => {
  return (
    <section className="section-padding bg-brand-surface">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-primary font-display text-sm font-semibold uppercase tracking-[0.2em] mb-3 block">
            La Flotta
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Scegli il tuo mezzo
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[220px]">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`${cat.span}`}
            >
              <Link
                to="/prenotaora"
                className="group relative rounded-2xl overflow-hidden h-full flex flex-col justify-end p-6 md:p-8 cursor-pointer block"
              >
                {/* Background image */}
                <div className="absolute inset-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                </div>

                {/* Blue glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-primary/10 mix-blend-overlay" />

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-primary-foreground/60 text-xs font-medium uppercase tracking-widest">
                    {cat.subtitle}
                  </span>
                  <div className="flex items-end justify-between mt-1">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
                      {cat.title}
                    </h3>
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <ArrowUpRight size={18} className="text-primary-foreground" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FleetShowcase;
