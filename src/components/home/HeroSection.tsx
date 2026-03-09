import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
const gdisLogo = "https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/GDISlogo.webp";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* 1. VIDEO BACKGROUND */}
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0 opacity-80">
        {/* Sostituisci questo src con il link o il file locale del tuo video premium */}
        <source
          src="https://zgazhrzjgefvjxknyffy.supabase.co/storage/v1/object/public/asset/HERO%20VERA.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. OVERLAY CINEMATOGRAFICO (Scurisce il video e aggiunge un leggero blur) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-0" />

      {/* 3. EFFETTO LUCE DINAMICA (Opzionale, dà un tocco tech) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/20 blur-[150px] z-0 pointer-events-none"
      />

      <div className="relative z-10 container text-center flex flex-col items-center justify-center h-full px-4">
        {/* 4. LOGO GIGANTE E ANIMATO */}
        <motion.img
          src={gdisLogo}
          alt="GDIS Rent e Service"
          className="w-64 md:w-80 lg:w-[450px] h-auto mb-6 drop-shadow-2xl"
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* 5. TYPOGRAPHY MINIMAL E POTENTE */}
        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Il tuo noleggio parte da qui.
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Citycar, Scooter, Quad e Luxury. <br className="hidden md:block" /> Esplora la Sardegna senza limiti.
        </motion.p>

        {/* 6. CALL TO ACTION AVANZATE */}
        <motion.div
          className="flex flex-col sm:flex-row items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Bottone Primario: Effetto Neon Glow */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/prenotaora">
              <Button
                size="lg"
                className="relative group bg-blue-600 hover:bg-blue-500 text-white border border-blue-400/50 shadow-[0_0_30px_rgba(0,0,255,0.4)] hover:shadow-[0_0_50px_rgba(0,0,255,0.6)] rounded-full px-10 py-7 text-lg font-semibold transition-all duration-300"
              >
                Prenota Ora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Bottone Secondario: Effetto Glassmorphism */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/chisiamo">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/5 hover:bg-white/10 text-white border-white/20 backdrop-blur-md rounded-full px-10 py-7 text-lg font-medium transition-all duration-300"
              >
                Scopri la Flotta
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 7. INDICATORE DI SCORRIMENTO */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
        animate={{ y: [0, 15, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
