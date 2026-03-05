import { motion } from "framer-motion";
import { MessageCircle, Crown } from "lucide-react";

const LuxuryCta = () => {
  return (
    <section className="relative py-24 md:py-32 bg-[#050B14] overflow-hidden flex items-center justify-center z-10">
      {/* 1. SFONDO: Pattern a griglia finissima e bagliore radiale blu profondo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4 flex justify-center">
        {/* 2. CARD GLASSMORPHISM (Effetto Vetro Esclusivo) */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full max-w-4xl rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-16 text-center shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group"
        >
          {/* Riflesso animato sulla card al passaggio del mouse */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />

          {/* Icona Corona Premium */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-blue-900 p-[2px] mb-8 shadow-lg"
          >
            <div className="w-full h-full rounded-full bg-[#050B14] flex items-center justify-center">
              <Crown className="text-blue-400 w-8 h-8 md:w-10 md:h-10" />
            </div>
          </motion.div>

          {/* Testi */}
          <span className="text-blue-400 font-display text-sm font-bold uppercase tracking-[0.4em] mb-4 block drop-shadow-md">
            The Private Collection
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Supera l'ordinario. <br />
            <span className="font-light italic text-white/80">Guida l'eccellenza.</span>
          </h2>

          <p className="text-blue-100/60 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            Supercar mozzafiato, SUV imponenti e berline di altissima rappresentanza. Il nostro parco auto esclusivo è
            disponibile su richiesta per garantirti un'esperienza senza eguali.
          </p>

          {/* Bottone WhatsApp Neon */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
            <a
              href="https://wa.me/393520459150"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full px-8 py-5 md:px-10 md:py-6 text-lg md:text-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] z-20"
            >
              <MessageCircle size={28} />
              <span>Verifica Disponibilità VIP</span>

              {/* Effetto pulsazione verde dietro al bottone */}
              <span className="absolute inset-0 rounded-full border border-[#25D366] animate-ping opacity-20" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryCta;
