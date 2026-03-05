import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

const LuxuryBanner = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-foreground">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/95 to-primary/20" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 container flex flex-col md:flex-row items-center justify-between gap-10"
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="w-5 h-5 text-primary" />
            <span className="text-primary font-display font-medium text-sm uppercase tracking-widest">
              Luxury Collection
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-background mb-4 leading-tight">
            Guida l'eccellenza.
          </h2>
          <p className="text-background/50 text-lg leading-relaxed mb-8">
            La nostra selezione premium per chi cerca un'esperienza di guida senza compromessi. Eleganza, potenza e comfort in ogni dettaglio.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/prenotaora">Esplora la Collezione</Link>
          </Button>
        </div>

        {/* Decorative element */}
        <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border border-primary/20 flex items-center justify-center">
          <div className="w-48 h-48 md:w-60 md:h-60 rounded-full border border-primary/30 flex items-center justify-center">
            <Crown className="w-16 h-16 text-primary/40" />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LuxuryBanner;
