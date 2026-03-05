import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const MinimalIntro = () => {
  return (
    <section className="relative py-32 md:py-48 flex items-center justify-center bg-transparent z-10">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          {/* 1. EYEBROW TEXT (Piccolo, elegante, ultra-spaziato) */}
          <div className="overflow-hidden mb-6">
            <motion.span
              variants={itemVariants}
              className="block uppercase tracking-[0.3em] text-blue-600 text-xs md:text-sm font-semibold"
            >
              L'Eccellenza in Movimento
            </motion.span>
          </div>

          {/* 2. TITOLO PRINCIPALE CON MASCHERA (Text Reveal) */}
          <h2 className="font-display text-5xl sm:text-7xl md:text-[6rem] leading-[1.1] tracking-tighter text-slate-900 mb-8">
            <div className="overflow-hidden pb-2">
              <motion.span variants={itemVariants} className="block font-light">
                Il tuo noleggio
              </motion.span>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.span variants={itemVariants} className="block font-bold text-blue-600 drop-shadow-sm">
                parte da qui.
              </motion.span>
            </div>
          </h2>

          {/* 3. SOTTOTITOLO EDITORIALE */}
          <div className="overflow-hidden mb-12">
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed"
            >
              Dimentica le code e la burocrazia. Un'esperienza digitale fluida per portarti sulla strada in pochi
              istanti.
            </motion.p>
          </div>

          {/* 4. LINEA DIVISORIA ELEGANTE (Sottile e sfumata) */}
          <motion.div
            variants={{
              hidden: { width: 0, opacity: 0 },
              visible: {
                width: "120px",
                opacity: 1,
                transition: { duration: 1.2, delay: 0.8, ease: "circOut" },
              },
            }}
            className="h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default MinimalIntro;
