import { motion } from "framer-motion";

const ChiSiamoHero = () => {
  const bgImageUrl = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/premium-banner-bg.jpg";

  return (
    <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#050B14]">
      {/* 1. IMMAGINE DI SFONDO (Con animazione Zoom-Out Premium) */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img src={bgImageUrl} alt="GDIS Rent Chi Siamo" className="w-full h-full object-cover object-center" />
      </motion.div>

      {/* 2. OVERLAY CINEMATOGRAFICI (Per garantire la leggibilità perfetta del testo) */}
      <div className="absolute inset-0 z-0 bg-black/50" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050B14] via-transparent to-black/40" />

      {/* 3. TESTO E LINEA ANIMATA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 text-center px-4"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-widest uppercase drop-shadow-2xl">
          Chi Siamo
        </h1>

        {/* Linea Blu Elettrico Neon */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "circOut" }}
          className="w-24 md:w-32 h-[2px] md:h-[3px] bg-blue-600 mx-auto mt-6 shadow-[0_0_15px_rgba(0,0,255,0.6)]"
        />
      </motion.div>
    </section>
  );
};

export default ChiSiamoHero;
