import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Car, Truck } from "lucide-react";

const timelineData = [
  {
    rent: { title: "Utilitarie & Berline", description: "Flotta moderna per spostamenti urbani ed extraurbani in tutta la Sardegna." },
    trasporti: { title: "Furgoni Leggeri", description: "Soluzioni agili per piccoli traslochi e consegne rapide." },
  },
  {
    rent: { title: "Scooter & Quad", description: "Libertà su due e quattro ruote per vivere la costa e l'entroterra." },
    trasporti: { title: "Camion Medi", description: "Per traslochi completi e logistica aziendale affidabile." },
  },
  {
    rent: { title: "SUV & Crossover", description: "Comfort e versatilità per famiglie e gruppi di amici." },
    trasporti: { title: "Trasporti Speciali", description: "Veicoli attrezzati per carichi particolari e merci delicate." },
  },
  {
    rent: { title: "Luxury & Supercar", description: "Veicoli esclusivi per eventi, matrimoni e occasioni uniche." },
    trasporti: { title: "Logistica Integrata", description: "Servizio completo di ritiro, trasporto e consegna in tutta l'isola." },
  },
];

const SplitTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="section-padding bg-background relative">
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Due anime, <span className="text-gradient-blue">una missione</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Noleggio e trasporti: due servizi, un unico standard di eccellenza.
          </p>
        </motion.div>

        {/* Column headers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="flex items-center justify-center md:justify-end gap-3 md:pr-16">
            <Car className="text-primary" size={24} />
            <span className="font-display text-xl font-bold text-foreground">Rent</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-3 md:pl-16">
            <Truck className="text-primary" size={24} />
            <span className="font-display text-xl font-bold text-foreground">Trasporti</span>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line container */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border">
            {/* Luminous fill */}
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-primary luminous-line rounded-full"
            />
          </div>

          {/* Items */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, i) => (
              <div key={i} className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full bg-primary blue-glow-sm z-10"
                />

                {/* Rent side */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="md:text-right pl-12 md:pl-0 md:pr-16"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.rent.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.rent.description}
                  </p>
                </motion.div>

                {/* Trasporti side */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="pl-12 md:pl-16"
                >
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {item.trasporti.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.trasporti.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitTimeline;
