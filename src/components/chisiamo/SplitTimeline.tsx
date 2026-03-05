import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Car, Truck } from "lucide-react";

const timelineData = [
  {
    rent: { title: "Utilitarie & Berline", description: "Flotta moderna per spostamenti urbani ed extraurbani." },
    trasporti: { title: "Furgoni Leggeri", description: "Soluzioni agili per piccoli traslochi e consegne rapide." },
  },
  {
    rent: { title: "Scooter & Quad", description: "Libertà su due e quattro ruote per vivere la costa." },
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
    trasporti: { title: "Logistica Integrata", description: "Servizio completo di ritiro, trasporto e consegna." },
  },
];

const SplitTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

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
          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <span className="text-blue-600 font-display text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            Il Nostro Ecosistema
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Due anime, <span className="italic text-blue-600 font-light">una missione.</span>
          </h2>
          <p className="text-slate-500 text-lg md:text-xl font-light leading-relaxed">
            Dalla libertà di viaggiare in auto all'affidabilità dei trasporti merci. Stesso livello di eccellenza, due
            mondi connessi.
          </p>
        </motion.div>

        {/* TIMELINE ARCHITECTURE (Max-w blindato per precisione) */}
        <div className="relative max-w-5xl mx-auto">
          {/* LEGENDA ICONE (Desktop) */}
          <div className="hidden md:grid grid-cols-[1fr,auto,1fr] items-center mb-16 opacity-80 text-center">
            <div className="flex items-center justify-end gap-3 text-blue-600 pr-12">
              <Car size={28} />
              <span className="font-display text-2xl font-bold tracking-wide">Rent</span>
            </div>
            <div className="w-6" /> {/* Placeholder per asse centrale */}
            <div className="flex items-center justify-start gap-3 text-slate-700 pl-12">
              <Truck size={28} />
              <span className="font-display text-2xl font-bold tracking-wide">Trasporti</span>
            </div>
          </div>

          {/* LA LINEA CENTRALE FISSA (Background Grigio) */}
          {/* left-6 su mobile, md:left-1/2 md:-translate-x-1/2 su desktop */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-slate-200/50 rounded-full z-0">
            {/* IL PERCORSO LUMINOSO ANIMATO */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute top-0 left-0 right-0 w-full bg-blue-600 shadow-[0_0_20px_rgba(0,0,255,0.6)] rounded-full h-full"
            />
          </div>

          {/* CONTENUTI (LOOP DATI) */}
          <div className="space-y-16 md:space-y-0 relative z-10">
            {timelineData.map((item, i) => (
              // 1. LA RIGA (Blindata con Grid su Desktop)
              //items-start assicura che il pallino si allinei all'inizio del testo
              <div key={i} className="relative md:grid md:grid-cols-[1fr,auto,1fr] items-start md:gap-x-0">
                {/* 2. IL NODO (Checkpoint luminosi centrati staticamente nella grid) */}
                <div className="absolute left-6 md:relative md:left-auto md:top-auto md:translate-x-0 md:col-start-2 md:w-16 flex justify-center pt-8 md:pt-10 z-20">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-6 h-6 rounded-full bg-white border-4 border-blue-600 shadow-[0_0_15px_rgba(0,0,255,0.4)]"
                  />
                </div>

                {/* 3. SINISTRA: CARD RENT (md:col-start-1) */}
                <div className="w-full pl-20 md:pl-0 md:pr-12 md:col-start-1 md:text-right pt-4 md:pt-6 pb-4">
                  <motion.div
                    initial={{ opacity: 0, x: -40, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="bg-white/60 backdrop-blur-xl border border-white/80 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 rounded-3xl p-8"
                  >
                    <div className="md:hidden flex items-center gap-2 mb-3 text-blue-600">
                      <Car size={18} />
                      <span className="font-bold uppercase tracking-wider text-xs">Rent</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-slate-900 mb-3">{item.rent.title}</h3>
                    <p className="text-slate-500 font-light leading-relaxed">{item.rent.description}</p>
                  </motion.div>
                </div>

                {/* 4. DESTRA: CARD TRASPORTI (md:col-start-3) */}
                <div className="w-full pl-20 md:pl-12 md:pr-0 md:col-start-3 pt-4 md:pt-6 pb-4">
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
