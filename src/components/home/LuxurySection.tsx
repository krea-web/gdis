import { motion } from "framer-motion";
import { ChevronDown, Crown } from "lucide-react";

const LuxurySection = () => {
  // Funzione per scorrere morbidamente alla sezione scura sottostante
  const scrollToPremium = () => {
    window.scrollBy({ top: 600, behavior: "smooth" });
  };

  return (
    <section className="relative py-16 md:py-20 bg-transparent overflow-hidden flex flex-col items-center justify-center text-center z-10">
      <div className="container px-4 flex flex-col items-center">
        {/* Icona Corona Premium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mb-8 shadow-sm"
        >
          <Crown className="text-blue-600 w-8 h-8" />
        </motion.div>

        {/* Titolo Elegante */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-slate-900 leading-tight mb-6"
        >
          Cerchi qualcosa di <span className="font-bold text-blue-600 italic">Speciale?</span>
        </motion.h2>

        {/* Paragrafo Descrittivo */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-slate-500 text-lg md:text-xl max-w-2xl mb-16 font-light leading-relaxed"
        >
          Oltre alla nostra flotta standard, offriamo l'accesso a una selezione ristretta e privata di veicoli high-end.
          Prepara i tuoi sensi per la nostra Exclusive Collection.
        </motion.p>

        {/* Bottone Scroll Down Animato */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <button
            onClick={scrollToPremium}
            className="group flex flex-col items-center gap-4 text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em]">Scorri per scoprire</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-12 h-12 rounded-full bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:shadow-lg group-hover:scale-105 transition-all"
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxurySection;
