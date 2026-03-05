import { motion } from "framer-motion";

const ChiSiamoHero = () => {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-foreground/80" />
        <div className="absolute inset-0 bg-brand-dark/50" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <h1 className="font-display text-5xl md:text-8xl font-bold text-primary-foreground tracking-tight">
          CHI SIAMO
        </h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="w-16 h-0.5 bg-primary mx-auto mt-6"
        />
      </motion.div>
    </section>
  );
};

export default ChiSiamoHero;
