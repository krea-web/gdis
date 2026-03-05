import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Car, Truck } from "lucide-react";

const timelineData = [
  {
    rent: {
      title: "Utilitarie & Berline",
      description: "Flotta moderna per spostamenti urbani ed extraurbani in tutta la Sardegna.",
    },
    trasporti: { title: "Furgoni Leggeri", description: "Soluzioni agili per piccoli traslochi e consegne rapide." },
  },
  {
    rent: {
      title: "Scooter & Quad",
      description: "Libertà su due e quattro ruote per vivere la costa e l'entroterra.",
    },
    trasporti: { title: "Camion Medi", description: "Per traslochi completi e logistica aziendale affidabile." },
  },
  {
    rent: { title: "SUV & Crossover", description: "Comfort e versatilità per famiglie e gruppi di amici." },
    trasporti: {
      title: "Trasporti Speciali",
      description: "Veicoli attrezzati per carichi particolari e merci delicate.",
    },
  },
  {
    rent: { title: "Luxury & Supercar", description: "Veicoli esclusivi per eventi e occasioni uniche." },
    trasporti: {
      title: "Logistica Integrata",
      description: "Servizio completo di ritiro, trasporto e consegna in tutta l'isola.",
    },
  },
];

const SplitTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracciamento dello scroll nel container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Aggiungiamo la fisica "Spring" per rendere la linea fluida e gommosa
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-transparent relative overflow-hidden">
      <div className="container px-4">
        {/* HEADER SEZIONE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <span className="text-blue-600 font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Il Nostro Ecosistema
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Due anime, <span className="italic text-blue-600 font-light">una missione.</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Dalla libertà di viaggiare in auto all'affidabilità di trasportare le tue merci. Stesso livello di
            eccellenza, due mondi connessi.
          </p>
        </motion.div>

        {/* TIMELINE ARCHITECTURE */}
        <div className="relative max-w-5xl mx-auto">
          {/* LEGENDA (Icone Rent / Trasporti fisse in alto) */}
          <div className="hidden md:flex justify-between items-center px-16 mb-12 opacity-80">
            <div className="flex items-center gap-3 text-blue-600">
              <Car size={28} />
              <span className="font-display text-2xl font-bold tracking-wide">Rent</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <Truck size={28} />
              <span className="font-display text-2xl font-bold tracking-wide">Trasporti</span>
            </div>
          </div>

          {/* LA LINEA CENTRALE (Background Grigio) */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200/50 rounded-full">
            {/* IL PERCORSO LUMINOSO (Si riempie con lo scroll) */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 right-0 w-full bg-blue-600 shadow-[0_0_20px_rgba(0,0,255,0.6)] rounded-full h-full"
            />
          </div>

          {/* NODI DELLA TIMELINE */}
          <div className="space-y-16 md:space-y-24">
            {timelineData.map((item, i) => (
              <div key={i} className="relative flex flex-col md:flex-row items-center justify-between group">
                {/* Il Nodo (Dot luminoso) */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  className="absolute left-6 md:left-1/2 top-1/2 md:-translate-y-1/2 -translate-x-[11px] md:-translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-[0_0_15px_rgba(0,0,255,0.4)] z-20"
                />

                {/* SINISTRA: CARD RENT */}
                <div className="w-full md:w-[45%] pl-20 md:pl-0 pr-0 md:pr-12 py-4">
                  <motion.div
                    initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8 md:text-right"
                  >
                    <div className="md:hidden flex items-center gap-2 mb-3 text-blue-600">
                      <Car size={18} />
                      <span className="font-bold uppercase tracking-wider text-xs">Rent</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">{item.rent.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed">{item.rent.description}</p>
                  </motion.div>
                </div>

                {/* DESTRA: CARD TRASPORTI */}
                <div className="w-full md:w-[45%] pl-20 md:pl-12 pr-0 md:pr-0 py-4 mt-6 md:mt-0">
                  <motion.div
                    initial={{ opacity: 0, x: 40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="bg-slate-50 border border-slate-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8"
                  >
                    <div className="md:hidden flex items-center gap-2 mb-3 text-slate-700">
                      <Truck size={18} />
                      <span className="font-bold uppercase tracking-wider text-xs">Trasporti</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">{item.trasporti.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed">{item.trasporti.description}</p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitTimeline;
