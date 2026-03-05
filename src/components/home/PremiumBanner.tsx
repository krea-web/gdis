import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
// Assicurati che l'immagine esista in questo percorso (quella della Lamborghini/Luxury car)
import luxuryCar from "@/assets/luxury-car.jpg";

const PremiumBanner = () => {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================
          PARTE 1: THE LUXURY EXPERIENCE (Scuro)
          ========================================= */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Sfondo Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <img src={luxuryCar} alt="GDIS Luxury Fleet Lamborghini" className="w-full h-full object-cover" />
        </motion.div>

        {/* Overlay Gradiente */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

        {/* Contenitore Testo */}
        <div className="relative z-10 container px-4 sm:px-6 py-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {},
            }}
            className="max-w-2xl border-l-4 border-blue-600 pl-6 md:pl-10"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="text-blue-500 font-display text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4 block drop-shadow-md"
            >
              GDIS Exclusive Collection
            </motion.span>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl"
            >
              Lusso, <br />
              <span className="font-light italic text-white/90">Senza Compromessi.</span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="text-white/70 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light"
            >
              Accedi alla nostra flotta di veicoli di altissima gamma. Supercar, SUV premium e berline di rappresentanza
              per vivere la Sardegna al massimo livello.
            </motion.p>

            {/* CTA WhatsApp per Luxury */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-8 py-7 text-lg font-medium transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] group"
                onClick={() => window.open("https://wa.me/393520459150", "_blank")}
              >
                <MessageCircle className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                Richiedi Disponibilità su WhatsApp
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          PARTE 2: FAST BOOKING ACTION (Blu Elettrico)
          ========================================= */}
      <section className="relative bg-blue-600 py-16 md:py-24 overflow-hidden">
        {/* Decorazione di sfondo */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative z-10 container px-4 flex flex-col md:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-white/90 font-semibold uppercase tracking-widest text-sm">Noleggio Istantaneo</span>
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Pronto a <span className="italic font-light">Partire?</span>
            </h3>
            <p className="text-blue-100 text-lg md:text-xl font-light">
              Noleggia Citycar, Scooter e Quad in meno di 2 minuti. Nessuna fila, tutto digitale.
            </p>
          </motion.div>

          {/* CTA Prenotazione Veloce */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-auto"
          >
            <Link to="/prenotaora" className="block w-full">
              <Button
                size="xl"
                className="w-full md:w-auto bg-white hover:bg-slate-50 text-blue-600 rounded-full px-12 py-8 text-xl font-bold transition-all duration-300 shadow-[0_10px_40px_rgba(255,255,255,0.3)] hover:shadow-[0_15px_50px_rgba(255,255,255,0.5)] group flex items-center justify-center gap-4"
              >
                Prenota Ora
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PremiumBanner;
