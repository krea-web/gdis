import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowRight, Zap, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
// Assicurati che l'immagine esista in questo percorso
import luxuryCar from "@/assets/luxury-car.jpg";

const PremiumBanner = () => {
  return (
    <div className="flex flex-col w-full">
      {/* =========================================
          PARTE 1: THE LUXURY EXPERIENCE
          ========================================= */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Sfondo Parallax */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.15 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <img src={luxuryCar} alt="GDIS Luxury Fleet" className="w-full h-full object-cover" />
        </motion.div>

        {/* Overlay Gradiente Cinematografico */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#020617]/95 via-[#020617]/70 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#020617] via-transparent to-black/40" />

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
            className="max-w-2xl border-l-[3px] border-blue-600 pl-6 md:pl-10"
          >
            <motion.span
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              className="text-blue-500 font-display text-sm md:text-base font-bold uppercase tracking-[0.4em] mb-4 block drop-shadow-md"
            >
              GDIS Exclusive Collection
            </motion.span>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-2xl"
            >
              Lusso, <br />
              <span className="font-light italic text-white/80">Senza Compromessi.</span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
              className="text-white/60 text-lg md:text-xl mb-12 max-w-lg leading-relaxed font-light"
            >
              Accedi alla nostra flotta di veicoli di altissima gamma. Supercar, SUV premium e berline di rappresentanza
              per vivere la Sardegna al livello che meriti.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            >
              <Button
                size="lg"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-8 py-7 md:px-10 md:py-8 text-lg md:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] group hover:-translate-y-1"
                onClick={() => window.open("https://wa.me/393520459150", "_blank")}
              >
                <MessageCircle className="mr-3 h-6 w-6 md:h-7 md:w-7 group-hover:scale-110 transition-transform" />
                Richiedi Disponibilità VIP
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =========================================
          PARTE 2: FAST BOOKING ACTION (Dark Premium)
          ========================================= */}
      <section className="relative py-24 md:py-32 bg-[#020617] overflow-hidden flex items-center justify-center">
        {/* Sfondo Astratto con Bagliori */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Pattern Puntinato Leggerissimo */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

        <div className="relative z-10 container px-4 flex justify-center">
          {/* Glass Card Esclusiva */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl rounded-[3rem] border border-white/10 bg-white/[0.02] backdrop-blur-2xl p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative group"
          >
            {/* Riflesso animato sulla card */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />

            {/* Testo a sinistra */}
            <div className="text-left max-w-xl relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-600/20 p-2 rounded-full border border-blue-500/30">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm">Noleggio Smart</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-white drop-shadow-lg">
                Senza Fila. <br />
                <span className="italic font-light text-white/70">100% Digitale.</span>
              </h3>

              <p className="text-blue-100/60 text-lg md:text-xl font-light leading-relaxed mb-8">
                Citycar, Scooter e Quad pronti in meno di 2 minuti. Scegli il veicolo, firma online e ritira le chiavi.
                Il tuo tempo è prezioso.
              </p>

              <div className="flex items-center gap-4 text-sm text-white/50 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" /> Assicurazione inclusa
                </div>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <div className="flex items-center gap-2">
                  <Zap size={18} className="text-blue-400" /> Conferma Istantanea
                </div>
              </div>
            </div>

            {/* CTA Bottone Gigante a destra */}
            <div className="w-full lg:w-auto shrink-0 relative z-10">
              <Link to="/prenotaora" className="block">
                <Button
                  size="xl"
                  className="relative w-full lg:w-auto bg-blue-600 hover:bg-blue-500 text-white rounded-full px-10 py-8 md:px-14 md:py-10 text-xl md:text-2xl font-bold transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] group hover:-translate-y-2 flex items-center justify-center gap-4 overflow-hidden"
                >
                  <span className="relative z-10">Prenota Ora</span>
                  <ArrowRight className="relative z-10 w-7 h-7 group-hover:translate-x-3 transition-transform duration-300" />

                  {/* Effetto Sweep interno al bottone */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PremiumBanner;
