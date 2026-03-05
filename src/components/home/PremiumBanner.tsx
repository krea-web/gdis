import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
// Assicurati che l'immagine esista in questo percorso
import premiumBg from "@/assets/premium-banner-bg.jpg";

const PremiumBanner = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* 1. SFONDO CON EFFETTO PARALLAX/REVEAL */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8, ease: "easeOut" }}
      >
        <img src={premiumBg} alt="GDIS Luxury Fleet" className="w-full h-full object-cover" />
      </motion.div>

      {/* 2. OVERLAY GRADIENTE AVANZATO (Spotlight effect) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />

      {/* 3. CONTENITORE TESTO CON LINEA DI DESIGN */}
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
          {/* Eyebrow Text */}
          <motion.span
            variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.8 } } }}
            className="text-blue-500 font-display text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4 block drop-shadow-md"
          >
            GDIS Exclusive Collection
          </motion.span>

          {/* Titolo Principale */}
          <motion.h2
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="font-display text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 drop-shadow-xl"
          >
            Lusso, <br />
            <span className="font-light italic text-white/90">Senza Compromessi.</span>
          </motion.h2>

          {/* Paragrafo Descrittivo */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8 } } }}
            className="text-white/70 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light"
          >
            Accedi alla nostra flotta di veicoli di altissima gamma. Supercar, SUV premium e berline di rappresentanza
            per vivere la Sardegna al massimo livello.
          </motion.p>

          {/* Bottone WhatsApp Dinamico */}
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
  );
};

export default PremiumBanner;
