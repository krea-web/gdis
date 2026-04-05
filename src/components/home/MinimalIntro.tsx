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

const logos = [
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/Audi.webp", alt: "Audi" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/bmw.webp", alt: "BMW" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/fiat.webp", alt: "Fiat" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/honda.webp", alt: "Honda" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/jeep.webp", alt: "Jeep" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/mercedes.webp", alt: "Mercedes" },
  { src: "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/loghi/Yamaha.webp", alt: "Yamaha" },
];

const floatVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -6, 0],
    transition: {
      duration: 2.5,
      ease: "easeInOut",
      repeat: Infinity,
      delay: i * 0.3,
    },
  }),
};

const MinimalIntro = () => {
  return (
    <section className="relative py-20 md:py-28 flex items-center justify-center bg-transparent z-10">
      <div className="container px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
        >
          <div className="overflow-hidden mb-6">
            <motion.span
              variants={itemVariants}
              className="block uppercase tracking-[0.3em] text-blue-600 text-xs md:text-sm font-semibold"
            >
              L'Eccellenza in Movimento
            </motion.span>
          </div>

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

          <div className="overflow-hidden mb-10">
            <motion.p
              variants={itemVariants}
              className="max-w-2xl mx-auto text-slate-500 text-lg md:text-xl font-light leading-relaxed"
            >
              Dimentica le code e la burocrazia. Un'esperienza digitale fluida per portarti sulla strada in pochi
              istanti.
            </motion.p>
          </div>

          {/* Brand Logos */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6 md:gap-10 mb-12 flex-wrap"
          >
            {logos.map((logo, i) => (
              <motion.img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                custom={i}
                variants={floatVariants}
                animate="animate"
                whileHover={{ scale: 1.3, y: 0 }}
                className={`h-8 md:h-10 w-auto opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-pointer grayscale hover:grayscale-0${logo.alt === "BMW" ? " invert" : ""}`}
              />
            ))}
          </motion.div>

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
